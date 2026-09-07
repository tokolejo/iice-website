import { getSupabaseBrowserClient } from './supabase/client';
import { recordAuditLog } from './auditLogger';

/**
 * Exports all main Supabase tables to a structured JSON object or SQL Dump
 * and triggers a client-side file download.
 */
export async function exportDatabaseBackup({ format = 'json', userEmail = 'admin' } = {}) {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
        throw new Error('Supabase client is not configured.');
    }

    const tables = [
        { name: 'conference_registrations_2026', label: 'კონფერენცია 2026 რეგისტრაციები' },
        { name: 'staff_members', label: 'თანამშრომლები' },
        { name: 'departments', label: 'განყოფილებები' },
        { name: 'news', label: 'სიახლეები' },
        { name: 'user_profiles', label: 'მომხმარებელთა როლები' },
        { name: 'audit_logs', label: 'აუდიტის ჟურნალი' }
    ];

    const backupData = {
        meta: {
            appName: 'TSU IICE Portal',
            version: '2.0.0',
            exportedAt: new Date().toISOString(),
            exportedBy: userEmail,
            format: format.toUpperCase(),
        },
        stats: {},
        tables: {}
    };

    // Fetch data table by table
    for (const table of tables) {
        try {
            const { data, error, count } = await supabase
                .from(table.name)
                .select('*', { count: 'exact' });

            if (error) {
                console.warn(`Error fetching ${table.name} for backup:`, error.message);
                backupData.tables[table.name] = [];
                backupData.stats[table.name] = 0;
            } else {
                backupData.tables[table.name] = data || [];
                backupData.stats[table.name] = data?.length || 0;
            }
        } catch (e) {
            console.warn(`Exception reading table ${table.name}:`, e);
            backupData.tables[table.name] = [];
            backupData.stats[table.name] = 0;
        }
    }

    const dateStamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');

    if (format === 'sql') {
        // Generate SQL Insert Dump
        let sqlContent = `-- ==========================================================\n`;
        sqlContent += `-- TSU IICE PORTAL DATABASE BACKUP (SQL DUMP)\n`;
        sqlContent += `-- Exported At: ${backupData.meta.exportedAt}\n`;
        sqlContent += `-- Exported By: ${backupData.meta.exportedBy}\n`;
        sqlContent += `-- ==========================================================\n\n`;

        for (const [tableName, rows] of Object.entries(backupData.tables)) {
            if (!rows || rows.length === 0) continue;
            sqlContent += `-- Table: public.${tableName} (${rows.length} rows)\n`;
            
            for (const row of rows) {
                const keys = Object.keys(row);
                const values = keys.map(k => {
                    const val = row[k];
                    if (val === null || val === undefined) return 'NULL';
                    if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
                    if (typeof val === 'number') return val;
                    if (typeof val === 'object') {
                        return `'${JSON.stringify(val).replace(/'/g, "''")}'::jsonb`;
                    }
                    return `'${String(val).replace(/'/g, "''")}'`;
                });

                sqlContent += `INSERT INTO public.${tableName} (${keys.map(k => `"${k}"`).join(', ')}) VALUES (${values.join(', ')}) ON CONFLICT DO NOTHING;\n`;
            }
            sqlContent += `\n`;
        }

        const blob = new Blob([sqlContent], { type: 'text/sql;charset=utf-8;' });
        downloadBlob(blob, `iice_db_backup_${dateStamp}.sql`);
    } else {
        // Default: Full Structured JSON
        const jsonContent = JSON.stringify(backupData, null, 2);
        const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
        downloadBlob(blob, `iice_db_backup_${dateStamp}.json`);
    }

    // Record audit log
    try {
        await recordAuditLog({
            userEmail,
            action: 'DATABASE_BACKUP_EXPORTED',
            tableName: 'system',
            details: {
                format,
                stats: backupData.stats,
                totalTables: tables.length,
                timestamp: backupData.meta.exportedAt
            }
        });
    } catch (auditErr) {
        console.warn('Audit logging backup notice:', auditErr);
    }

    return backupData.stats;
}

function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
