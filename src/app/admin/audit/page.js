'use client';

import { useState, useEffect, useMemo } from 'react';
import { getSupabaseBrowserClient } from '../../../lib/supabase/client';
import AdminModal from '../../../components/admin/AdminModal';
import {
    History,
    Search,
    Shield,
    Calendar,
    User,
    FileText,
    RefreshCw,
    Download,
    Eye,
    LogIn,
    LogOut,
    UserPlus,
    GraduationCap,
    Users,
    Newspaper,
    Building2,
    ShieldCheck,
    Globe,
    Laptop,
    Clock,
    Filter,
    CheckCircle2,
    AlertCircle,
    ShieldAlert,
    FileSpreadsheet,
    Copy,
    Check,
    X
} from 'lucide-react';

const CATEGORIES = [
    { id: 'ALL', label: 'ყველა მოვლენა', icon: History },
    { id: 'STAFF', label: 'თანამშრომლები', icon: Users },
    { id: 'NEWS', label: 'სიახლეები & კატეგორიები', icon: Newspaper },
    { id: 'DEPARTMENTS', label: 'განყოფილებები', icon: Building2 },
    { id: 'CONFERENCE', label: 'კონფერენცია 2026', icon: GraduationCap },
    { id: 'USERS', label: 'როლები & RBAC', icon: ShieldCheck },
    { id: 'AUTH', label: 'ავტორიზაცია & სესიები', icon: LogIn },
    { id: 'BACKUP', label: 'ბაზის ბექაფი', icon: Download },
];

const TIME_RANGES = [
    { id: 'all', label: 'ყველა დრო' },
    { id: 'today', label: 'დღეს' },
    { id: '7days', label: 'ბოლო 7 დღე' },
    { id: '30days', label: 'ბოლო 30 დღე' },
];

function getActionBadge(action = '') {
    const act = (action || '').toUpperCase();
    const isCritical =
        act.includes('DELETE') ||
        act.includes('REMOVE') ||
        act.includes('DROP') ||
        act.includes('ROLE') ||
        act.includes('RBAC') ||
        act.includes('BATCH') ||
        act.includes('PERMISSION') ||
        act.includes('BACKUP');

    if (act.includes('SIGN_IN') || act.includes('LOGIN')) {
        return {
            bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            dot: 'bg-emerald-500',
            label: 'ავტორიზაცია',
            icon: LogIn,
            isCritical: false
        };
    }
    if (act.includes('SIGN_OUT') || act.includes('LOGOUT')) {
        return {
            bg: 'bg-slate-100 text-slate-700 border-slate-300',
            dot: 'bg-slate-400',
            label: 'გამოსვლა',
            icon: LogOut,
            isCritical: false
        };
    }
    if (act.includes('DELETE') || act.includes('REMOVE')) {
        return {
            bg: 'bg-rose-50 text-rose-700 border-rose-300',
            dot: 'bg-rose-500',
            label: 'წაშლა',
            icon: AlertCircle,
            isCritical: true,
            criticalLabel: 'მონაცემთა წაშლა'
        };
    }
    if (act.includes('ROLE') || act.includes('RBAC') || act.includes('ADMIN_INVITE')) {
        return {
            bg: 'bg-red-50 text-red-700 border-red-300',
            dot: 'bg-red-600',
            label: 'როლები / RBAC',
            icon: ShieldAlert,
            isCritical: true,
            criticalLabel: 'სისტემური უფლებები'
        };
    }
    if (act.includes('BATCH')) {
        return {
            bg: 'bg-amber-50 text-amber-800 border-amber-300',
            dot: 'bg-amber-600',
            label: 'ჯგუფური ცვლილება',
            icon: RefreshCw,
            isCritical: true,
            criticalLabel: 'მასიური ოპერაცია'
        };
    }
    if (act.includes('REGISTER') || act.includes('CREATE') || act.includes('INSERT')) {
        return {
            bg: 'bg-blue-50 text-blue-700 border-blue-200',
            dot: 'bg-blue-500',
            label: 'შექმნა / დამატება',
            icon: UserPlus,
            isCritical: false
        };
    }
    if (act.includes('UPDATE') || act.includes('EDIT') || act.includes('STATUS') || act.includes('NOTE')) {
        return {
            bg: 'bg-purple-50 text-[#60318e] border-purple-200',
            dot: 'bg-[#60318e]',
            label: 'ცვლილება',
            icon: RefreshCw,
            isCritical: false
        };
    }
    if (act.includes('BACKUP') || act.includes('EXPORT') || act.includes('ZIP')) {
        return {
            bg: 'bg-amber-50 text-amber-700 border-amber-200',
            dot: 'bg-amber-500',
            label: 'ექსპორტი / ბექაფი',
            icon: Download,
            isCritical: act.includes('BACKUP'),
            criticalLabel: act.includes('BACKUP') ? 'მონაცემთა ბაზა' : undefined
        };
    }
    return {
        bg: 'bg-gray-50 text-gray-700 border-gray-200',
        dot: 'bg-gray-500',
        label: act,
        icon: FileText,
        isCritical,
        criticalLabel: isCritical ? 'მაღალი რისკი' : undefined
    };
}

function LogDiffViewer({ details }) {
    if (!details || typeof details !== 'object' || Object.keys(details).length === 0) {
        return (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-gray-500">
                დამატებითი დეტალები არ არის ჩაწერილი
            </div>
        );
    }

    // Check if details contain previous/next style diff
    const hasDiff =
        ('old' in details && 'new' in details) ||
        ('before' in details && 'after' in details) ||
        ('previous' in details && 'current' in details);

    if (hasDiff) {
        const beforeData = details.old || details.before || details.previous || {};
        const afterData = details.new || details.after || details.current || {};
        const allKeys = Array.from(new Set([...Object.keys(beforeData), ...Object.keys(afterData)]));

        return (
            <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-gray-700">
                    <span>მონაცემთა შედარება (Before / After Diff):</span>
                    <span className="text-[11px] text-gray-400 font-normal">შეცვლილი ველები</span>
                </div>
                <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-200 text-xs">
                    <div className="grid grid-cols-12 bg-slate-100 font-bold p-2.5 text-gray-600">
                        <div className="col-span-3">ველი (Field)</div>
                        <div className="col-span-4 text-rose-700">მანამდე (Before)</div>
                        <div className="col-span-5 text-emerald-700">შემდეგ (After)</div>
                    </div>
                    {allKeys.map(k => {
                        const bVal = beforeData[k];
                        const aVal = afterData[k];
                        const isChanged = JSON.stringify(bVal) !== JSON.stringify(aVal);
                        return (
                            <div key={k} className={`grid grid-cols-12 p-2.5 gap-2 items-start transition-colors ${isChanged ? 'bg-amber-50/40' : 'bg-white'}`}>
                                <div className="col-span-3 font-mono font-bold text-gray-700 break-all">{k}</div>
                                <div className="col-span-4 font-mono text-[11px] text-rose-800 bg-rose-50/70 p-1.5 rounded-lg break-all line-through">
                                    {bVal === undefined ? '—' : typeof bVal === 'object' ? JSON.stringify(bVal) : String(bVal)}
                                </div>
                                <div className="col-span-5 font-mono text-[11px] text-emerald-800 bg-emerald-50/70 p-1.5 rounded-lg break-all font-semibold">
                                    {aVal === undefined ? '—' : typeof aVal === 'object' ? JSON.stringify(aVal) : String(aVal)}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    // Standard object key-value visual inspector
    const entries = Object.entries(details).filter(([k]) => k !== 'ip' && k !== 'userAgent');

    return (
        <div className="space-y-3">
            <span className="text-xs font-bold text-gray-700 block">
                ცვლილებებისა და პარამეტრების სტრუქტურული ხედი:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {entries.map(([key, val]) => {
                    const isObj = typeof val === 'object' && val !== null;
                    return (
                        <div key={key} className="p-3 rounded-xl bg-slate-50 border border-slate-200/90 text-xs">
                            <span className="text-[10px] font-mono font-bold text-purple-700 uppercase tracking-wider block mb-1">
                                {key}
                            </span>
                            {isObj ? (
                                <pre className="font-mono text-[10px] text-gray-800 bg-white p-2 rounded-lg border border-slate-100 overflow-x-auto max-h-32">
                                    {JSON.stringify(val, null, 2)}
                                </pre>
                            ) : typeof val === 'boolean' ? (
                                <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-bold ${val ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                                    {val ? 'TRUE' : 'FALSE'}
                                </span>
                            ) : (
                                <span className="font-semibold text-gray-900 break-all text-xs">
                                    {String(val)}
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default function AdminAuditPage() {
    const [logs, setLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const [accessChecked, setAccessChecked] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [timeRange, setTimeRange] = useState('all');
    const [selectedLog, setSelectedLog] = useState(null);
    const [pageSize, setPageSize] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);
    const [detailViewMode, setDetailViewMode] = useState('diff');
    const [copiedJson, setCopiedJson] = useState(false);
    const [selectedMetricFilter, setSelectedMetricFilter] = useState('ALL'); // 'ALL' | 'AUTH' | 'CONF' | 'UPDATES' | 'CRITICAL'

    const handleMetricCardClick = (filterKey) => {
        if (selectedMetricFilter === filterKey) {
            setSelectedMetricFilter('ALL');
        } else {
            setSelectedMetricFilter(filterKey);
        }
        setCurrentPage(1);
    };

    // Super admin access check
    useEffect(() => {
        async function checkAccess() {
            const supabase = getSupabaseBrowserClient();
            if (!supabase) {
                setIsSuperAdmin(true); // local preview mode
                setAccessChecked(true);
                return;
            }
            const { data: { user } } = await supabase.auth.getUser();
            if (user?.email?.toLowerCase() === 'tokolejo@gmail.com') {
                setIsSuperAdmin(true);
            } else if (user) {
                const { data: profile } = await supabase
                    .from('user_profiles')
                    .select('roles, role')
                    .eq('id', user.id)
                    .maybeSingle();
                const roles = profile?.roles || (profile?.role ? [profile.role] : []);
                setIsSuperAdmin(roles.includes('super_admin') || roles.includes('admin'));
            }
            setAccessChecked(true);
        }
        checkAccess();
    }, []);

    const loadAuditLogs = async () => {
        setIsLoading(true);
        try {
            const supabase = getSupabaseBrowserClient();
            let token = null;
            if (supabase) {
                try {
                    const { data: { session } } = await supabase.auth.getSession();
                    token = session?.access_token;
                } catch (e) {
                    console.warn('[AUDIT] Session read warning:', e);
                }
            }

            const headers = {};
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            // 1. Try internal API endpoint with user credentials
            let apiLoaded = false;
            try {
                const res = await fetch(`/api/audit?category=${selectedCategory}&limit=300`, {
                    headers,
                    cache: 'no-store'
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.logs && Array.isArray(data.logs) && data.logs.length > 0) {
                        setLogs(data.logs);
                        apiLoaded = true;
                        setIsLoading(false);
                        return;
                    }
                }
            } catch (apiErr) {
                console.warn('[AUDIT] API query failed, trying direct:', apiErr);
            }

            // 2. Direct browser query via authenticated client
            if (!apiLoaded && supabase) {
                let q = supabase
                    .from('audit_logs')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(300);

                if (selectedCategory === 'AUTH') {
                    q = q.or('action.ilike.AUTH_%,action.ilike.SIGN_%,action.ilike.LOGIN_%,action.ilike.LOGOUT_%');
                } else if (selectedCategory === 'CONFERENCE') {
                    q = q.or('action.ilike.CONFERENCE_%,table_name.ilike.%conference%');
                } else if (selectedCategory === 'STAFF') {
                    q = q.or('action.ilike.STAFF_%,table_name.ilike.%staff%');
                } else if (selectedCategory === 'NEWS') {
                    q = q.or('action.ilike.NEWS_%,action.ilike.CATEGORY_%,table_name.ilike.%news%');
                } else if (selectedCategory === 'DEPARTMENTS') {
                    q = q.or('action.ilike.DEPT_%,table_name.ilike.%department%');
                } else if (selectedCategory === 'USERS') {
                    q = q.or('action.ilike.USER_%,action.ilike.RBAC_%,table_name.ilike.%user%');
                } else if (selectedCategory === 'BACKUP') {
                    q = q.or('action.ilike.DB_%,action.ilike.BACKUP_%,table_name.ilike.%backup%');
                }

                const { data, error } = await q;
                if (!error && Array.isArray(data)) {
                    setLogs(data);
                    setIsLoading(false);
                    return;
                }
            }

            setLogs([]);
        } catch (err) {
            console.warn('Load audit logs error:', err);
            setLogs([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadAuditLogs();
        setSelectedMetricFilter('ALL');
        setCurrentPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategory]);

    // Time & Metric filtering
    const filteredLogs = useMemo(() => {
        const now = Date.now();
        return logs.filter((log) => {
            const a = (log.action || '').toUpperCase();
            const badge = getActionBadge(log.action);

            // Metric card filter
            if (selectedMetricFilter === 'AUTH') {
                const isAuth = a.includes('SIGN_IN') || a.includes('LOGIN') || a.includes('AUTH') || a.includes('LOGOUT') || a.includes('SIGN_OUT');
                if (!isAuth) return false;
            } else if (selectedMetricFilter === 'CONF') {
                const isConf = a.includes('CONFERENCE') || (log.table_name || '').toLowerCase().includes('conference');
                if (!isConf) return false;
            } else if (selectedMetricFilter === 'UPDATES') {
                const isUpdate = a.includes('UPDATE') || a.includes('CREATE') || a.includes('DELETE') || a.includes('EDIT') || a.includes('STATUS') || a.includes('NOTE') || a.includes('INSERT');
                if (!isUpdate) return false;
            } else if (selectedMetricFilter === 'CRITICAL') {
                if (!badge.isCritical) return false;
            }

            // Time range
            if (timeRange === 'today') {
                const logDate = new Date(log.created_at).toDateString();
                const today = new Date().toDateString();
                if (logDate !== today) return false;
            } else if (timeRange === '7days') {
                const diffDays = (now - new Date(log.created_at).getTime()) / (1000 * 3600 * 24);
                if (diffDays > 7) return false;
            } else if (timeRange === '30days') {
                const diffDays = (now - new Date(log.created_at).getTime()) / (1000 * 3600 * 24);
                if (diffDays > 30) return false;
            }

            // Search query
            if (searchQuery.trim()) {
                const q = searchQuery.toLowerCase();
                const str = `${log.action || ''} ${log.user_email || ''} ${log.table_name || ''} ${log.record_id || ''} ${JSON.stringify(log.details || {})}`.toLowerCase();
                if (!str.includes(q)) return false;
            }

            return true;
        });
    }, [logs, timeRange, searchQuery, selectedMetricFilter]);

    // Pagination
    const totalPages = Math.ceil(filteredLogs.length / pageSize) || 1;
    const paginatedLogs = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filteredLogs.slice(start, start + pageSize);
    }, [filteredLogs, currentPage, pageSize]);

    // Stats
    const stats = useMemo(() => {
        let authCount = 0;
        let confCount = 0;
        let updateCount = 0;
        let criticalCount = 0;
        logs.forEach(l => {
            const a = (l.action || '').toUpperCase();
            const badge = getActionBadge(l.action);
            if (badge.isCritical) criticalCount++;
            if (a.includes('SIGN_IN') || a.includes('LOGIN') || a.includes('AUTH') || a.includes('LOGOUT') || a.includes('SIGN_OUT')) authCount++;
            if (a.includes('CONFERENCE') || (l.table_name || '').toLowerCase().includes('conference')) confCount++;
            if (a.includes('UPDATE') || a.includes('CREATE') || a.includes('DELETE') || a.includes('EDIT') || a.includes('STATUS') || a.includes('NOTE') || a.includes('INSERT')) updateCount++;
        });
        return {
            total: logs.length,
            auth: authCount,
            conf: confCount,
            updates: updateCount,
            critical: criticalCount
        };
    }, [logs]);

    // CSV Export
    const handleExportCSV = () => {
        if (!filteredLogs.length) return;
        const headers = ['ID', 'თარიღი/დრო', 'მომხმარებელი', 'ქმედება', 'ცხრილი', 'ჩანაწერის ID', 'IP მისამართი', 'დეტალები'];
        const rows = filteredLogs.map(l => [
            l.id || '',
            new Date(l.created_at).toLocaleString('ka-GE'),
            l.user_email || '',
            l.action || '',
            l.table_name || '',
            l.record_id || '',
            l.details?.ip || 'N/A',
            `"${JSON.stringify(l.details || {}).replace(/"/g, '""')}"`
        ]);

        const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `iice_audit_logs_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Excel (.xls) Export
    const handleExportExcel = () => {
        if (!filteredLogs.length) return;
        const headers = ['ID', 'თარიღი/დრო', 'მომხმარებელი', 'ქმედება', 'კატეგორია / რისკი', 'ცხრილი', 'ჩანაწერის ID', 'IP მისამართი', 'დეტალები'];
        const rows = filteredLogs.map(l => {
            const badge = getActionBadge(l.action);
            return [
                l.id || '',
                new Date(l.created_at).toLocaleString('ka-GE'),
                l.user_email || 'anonymous',
                l.action || '',
                badge.isCritical ? '⚠️ კრიტიკული' : badge.label,
                l.table_name || '',
                l.record_id || '',
                l.details?.ip || 'N/A',
                JSON.stringify(l.details || {})
            ];
        });

        const timestamp = new Date().toISOString().slice(0, 10);
        let tableHtml = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">';
        tableHtml += '<head><meta charset="utf-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Audit Logs</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head>';
        tableHtml += '<body><table border="1">';
        tableHtml += '<tr style="background-color: #60318e; color: #ffffff; font-weight: bold;">';
        headers.forEach(h => { tableHtml += `<th>${h}</th>`; });
        tableHtml += '</tr>';

        rows.forEach(row => {
            tableHtml += '<tr>';
            row.forEach(cell => {
                const safe = String(cell || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                tableHtml += `<td>${safe}</td>`;
            });
            tableHtml += '</tr>';
        });

        tableHtml += '</table></body></html>';

        const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `iice_audit_logs_${timestamp}.xls`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    // ── Access Gate ──────────────────────────────────────────────────────────
    if (!accessChecked) {
        return (
            <div className="flex items-center justify-center min-h-64">
                <div className="w-8 h-8 border-2 border-[#60318e] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!isSuperAdmin) {
        return (
            <div className="flex flex-col items-center justify-center min-h-96 gap-4 text-center">
                <div className="w-16 h-16 rounded-3xl bg-red-100 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-red-500" />
                </div>
                <div>
                    <h2 className="text-xl font-black text-gray-900 mb-1">წვდომა შეზღუდულია</h2>
                    <p className="text-sm text-gray-500 max-w-sm">აუდიტის ჟურნალი ხელმისაწვდომია მხოლოდ სუპერ ადმინისტრატორისთვის.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-3">
                        <History className="w-7 h-7 text-[#60318e]" />
                        სრული აუდიტის ჟურნალი (System Audit Logs)
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                        ავტორიზაცია, გამოსვლა, კონფერენციის რეგისტრაციები, ცვლილებები და სისტემური ქმედებები დეტალური ლოგირებით
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={loadAuditLogs}
                        className="px-3.5 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 hover:border-purple-200 hover:bg-purple-50 text-xs font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                        title="განახლება"
                    >
                        <RefreshCw className={`w-3.5 h-3.5 text-[#60318e] ${isLoading ? 'animate-spin' : ''}`} />
                        <span>განახლება</span>
                    </button>

                    <button
                        onClick={handleExportCSV}
                        disabled={filteredLogs.length === 0}
                        className="px-3.5 py-2 rounded-xl border border-gray-200 bg-white hover:bg-purple-50 text-gray-700 text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                        title="CSV ექსპორტი"
                    >
                        <Download className="w-3.5 h-3.5 text-[#60318e]" />
                        <span>CSV</span>
                    </button>

                    <button
                        onClick={handleExportExcel}
                        disabled={filteredLogs.length === 0}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                        title="Excel ექსპორტი (.xls)"
                    >
                        <FileSpreadsheet className="w-3.5 h-3.5" />
                        <span>Excel</span>
                    </button>
                </div>
            </div>

            {/* Metrics Overview (Clickable Filters) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                {/* 1. All */}
                <button
                    type="button"
                    onClick={() => handleMetricCardClick('ALL')}
                    className={`rounded-2xl p-4 transition-all duration-200 text-left flex items-center justify-between cursor-pointer border hover:scale-[1.01] active:scale-[0.99] ${
                        selectedMetricFilter === 'ALL'
                            ? 'bg-purple-50/70 border-[#60318e] ring-2 ring-[#60318e]/30 shadow-sm'
                            : 'bg-white border-purple-100/80 shadow-xs hover:border-purple-300 hover:bg-purple-50/20'
                    }`}
                >
                    <div>
                        <div className="flex items-center gap-1.5">
                            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">სულ მოვლენა</p>
                            {selectedMetricFilter === 'ALL' && (
                                <span className="text-[9px] font-black text-[#60318e] bg-purple-100 px-1.5 py-0.5 rounded-full">
                                    ყველა
                                </span>
                            )}
                        </div>
                        <p className="text-xl sm:text-2xl font-black text-gray-900 mt-0.5">{stats.total}</p>
                    </div>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        selectedMetricFilter === 'ALL' ? 'bg-[#60318e] text-white' : 'bg-purple-50 text-[#60318e]'
                    }`}>
                        <History className="w-5 h-5" />
                    </div>
                </button>

                {/* 2. Auth */}
                <button
                    type="button"
                    onClick={() => handleMetricCardClick('AUTH')}
                    className={`rounded-2xl p-4 transition-all duration-200 text-left flex items-center justify-between cursor-pointer border hover:scale-[1.01] active:scale-[0.99] ${
                        selectedMetricFilter === 'AUTH'
                            ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/30 shadow-sm'
                            : 'bg-white border-emerald-100/80 shadow-xs hover:border-emerald-300 hover:bg-emerald-50/20'
                    }`}
                >
                    <div>
                        <div className="flex items-center gap-1.5">
                            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">ავტორიზაცია / სესია</p>
                            {selectedMetricFilter === 'AUTH' && (
                                <span className="text-[9px] font-black text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full">
                                    აქტიური
                                </span>
                            )}
                        </div>
                        <p className="text-xl sm:text-2xl font-black text-emerald-600 mt-0.5">{stats.auth}</p>
                    </div>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        selectedMetricFilter === 'AUTH' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-600'
                    }`}>
                        <LogIn className="w-5 h-5" />
                    </div>
                </button>

                {/* 3. Conference */}
                <button
                    type="button"
                    onClick={() => handleMetricCardClick('CONF')}
                    className={`rounded-2xl p-4 transition-all duration-200 text-left flex items-center justify-between cursor-pointer border hover:scale-[1.01] active:scale-[0.99] ${
                        selectedMetricFilter === 'CONF'
                            ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-500/30 shadow-sm'
                            : 'bg-white border-indigo-100/80 shadow-xs hover:border-indigo-300 hover:bg-indigo-50/20'
                    }`}
                >
                    <div>
                        <div className="flex items-center gap-1.5">
                            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">კონფერენციის განაცხადი</p>
                            {selectedMetricFilter === 'CONF' && (
                                <span className="text-[9px] font-black text-indigo-700 bg-indigo-100 px-1.5 py-0.5 rounded-full">
                                    აქტიური
                                </span>
                            )}
                        </div>
                        <p className="text-xl sm:text-2xl font-black text-indigo-600 mt-0.5">{stats.conf}</p>
                    </div>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        selectedMetricFilter === 'CONF' ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600'
                    }`}>
                        <GraduationCap className="w-5 h-5" />
                    </div>
                </button>

                {/* 4. CRUD */}
                <button
                    type="button"
                    onClick={() => handleMetricCardClick('UPDATES')}
                    className={`rounded-2xl p-4 transition-all duration-200 text-left flex items-center justify-between cursor-pointer border hover:scale-[1.01] active:scale-[0.99] ${
                        selectedMetricFilter === 'UPDATES'
                            ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/30 shadow-sm'
                            : 'bg-white border-blue-100/80 shadow-xs hover:border-blue-300 hover:bg-blue-50/20'
                    }`}
                >
                    <div>
                        <div className="flex items-center gap-1.5">
                            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">რედაქტირება / CRUD</p>
                            {selectedMetricFilter === 'UPDATES' && (
                                <span className="text-[9px] font-black text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded-full">
                                    აქტიური
                                </span>
                            )}
                        </div>
                        <p className="text-xl sm:text-2xl font-black text-blue-600 mt-0.5">{stats.updates}</p>
                    </div>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        selectedMetricFilter === 'UPDATES' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'
                    }`}>
                        <FileText className="w-5 h-5" />
                    </div>
                </button>

                {/* 5. Critical */}
                <button
                    type="button"
                    onClick={() => handleMetricCardClick('CRITICAL')}
                    className={`rounded-2xl p-4 transition-all duration-200 text-left flex items-center justify-between cursor-pointer border hover:scale-[1.01] active:scale-[0.99] col-span-2 sm:col-span-1 ${
                        selectedMetricFilter === 'CRITICAL'
                            ? 'bg-red-50 border-red-500 ring-2 ring-red-500/30 shadow-sm'
                            : 'bg-white border-red-100/80 shadow-xs hover:border-red-300 hover:bg-red-50/20'
                    }`}
                >
                    <div>
                        <div className="flex items-center gap-1.5">
                            <p className="text-[11px] font-bold uppercase tracking-wider text-red-500">კრიტიკული / რისკი</p>
                            {selectedMetricFilter === 'CRITICAL' && (
                                <span className="text-[9px] font-black text-red-700 bg-red-100 px-1.5 py-0.5 rounded-full">
                                    აქტიური
                                </span>
                            )}
                        </div>
                        <p className="text-xl sm:text-2xl font-black text-red-600 mt-0.5">{stats.critical}</p>
                    </div>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        selectedMetricFilter === 'CRITICAL' ? 'bg-red-600 text-white' : 'bg-red-50 text-red-600'
                    }`}>
                        <ShieldAlert className="w-5 h-5" />
                    </div>
                </button>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {CATEGORIES.map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    const Icon = cat.icon;
                    return (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                                isSelected
                                    ? 'bg-[#60318e] text-white shadow-sm'
                                    : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-purple-200'
                            }`}
                        >
                            <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-[#60318e]'}`} />
                            <span>{cat.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Search & Time Filters */}
            <div className="bg-white rounded-2xl p-4 border border-purple-100 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
                <div className="relative w-full md:max-w-md">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="ძიება: იმეილი, ქმედება, IP, ობიექტი, დეტალები..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#AD49E1] transition-all"
                    />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                    <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200 text-xs">
                        {TIME_RANGES.map((tr) => (
                            <button
                                key={tr.id}
                                onClick={() => setTimeRange(tr.id)}
                                className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                                    timeRange === tr.id
                                        ? 'bg-white text-gray-900 font-bold shadow-xs'
                                        : 'text-gray-500 hover:text-gray-800'
                                }`}
                            >
                                {tr.label}
                            </button>
                        ))}
                    </div>

                    <select
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                        className="text-xs font-bold border border-gray-200 bg-white rounded-xl px-2.5 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#AD49E1]"
                    >
                        <option value={25}>25 ჩანაწერი</option>
                        <option value={50}>50 ჩანაწერი</option>
                        <option value={100}>100 ჩანაწერი</option>
                    </select>
                </div>
            </div>

            {/* Active Metric Filter Banner */}
            {selectedMetricFilter !== 'ALL' && (
                <div className="flex items-center justify-between px-4 py-2.5 bg-purple-50/90 border border-purple-200 rounded-2xl text-xs animate-fade-in shadow-xs">
                    <div className="flex items-center gap-2">
                        <Filter className="w-3.5 h-3.5 text-[#60318e]" />
                        <span className="text-gray-700">
                            გაფილტრულია ბარათით: <strong className="text-[#60318e] font-bold">
                                {selectedMetricFilter === 'AUTH' && 'ავტორიზაცია / სესია'}
                                {selectedMetricFilter === 'CONF' && 'კონფერენციის განაცხადი'}
                                {selectedMetricFilter === 'UPDATES' && 'რედაქტირება / CRUD'}
                                {selectedMetricFilter === 'CRITICAL' && 'კრიტიკული / რისკი'}
                            </strong> (ნაპოვნია {filteredLogs.length} ჩანაწერი)
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={() => setSelectedMetricFilter('ALL')}
                        className="text-xs font-bold text-[#60318e] hover:text-[#431464] hover:underline cursor-pointer flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-purple-200 shadow-2xs"
                    >
                        <span>ფილტრის მოხსნა</span>
                        <X className="w-3.5 h-3.5" />
                    </button>
                </div>
            )}

            {/* Logs Table */}
            <div className="bg-white rounded-3xl border border-purple-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-gray-600 font-bold border-b border-slate-200 uppercase tracking-wider">
                            <tr>
                                <th className="py-3.5 px-4 whitespace-nowrap">დრო & თარიღი</th>
                                <th className="py-3.5 px-4 whitespace-nowrap">მომხმარებელი</th>
                                <th className="py-3.5 px-4 whitespace-nowrap">ქმედება (Action)</th>
                                <th className="py-3.5 px-4 whitespace-nowrap">მოდული / ცხრილი</th>
                                <th className="py-3.5 px-4 whitespace-nowrap">IP & ქსელი</th>
                                <th className="py-3.5 px-4 whitespace-nowrap">დეტალები</th>
                                <th className="py-3.5 px-4 whitespace-nowrap text-right">დათვალიერება</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={7} className="py-14 text-center text-gray-400">
                                        <div className="w-6 h-6 border-2 border-[#60318e] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                                        იტვირთება აუდიტის ლოგები...
                                    </td>
                                </tr>
                            ) : paginatedLogs.length > 0 ? (
                                paginatedLogs.map((log) => {
                                    const badge = getActionBadge(log.action);
                                    const ActionIcon = badge.icon;
                                    const logTime = new Date(log.created_at);
                                    const ip = log.details?.ip || 'ლოკალური / N/A';

                                    return (
                                        <tr
                                            key={log.id}
                                            onClick={() => setSelectedLog(log)}
                                            className="hover:bg-purple-50/40 transition-colors cursor-pointer group"
                                        >
                                            <td className="py-3 px-4 text-gray-600 whitespace-nowrap">
                                                <div className="flex items-center gap-1.5 font-medium">
                                                    <Clock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                                                    <span>{logTime.toLocaleString('ka-GE')}</span>
                                                </div>
                                            </td>

                                            <td className="py-3 px-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-purple-100 text-[#60318e] flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                                                        {(log.user_email?.[0] || 'U').toUpperCase()}
                                                    </div>
                                                    <span className="font-bold text-gray-900">{log.user_email || 'anonymous'}</span>
                                                </div>
                                            </td>

                                            <td className="py-3 px-4 whitespace-nowrap">
                                                <div className="flex items-center gap-1.5 flex-wrap">
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border text-[11px] font-bold ${badge.bg}`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}></span>
                                                        <span>{log.action}</span>
                                                    </span>
                                                    {badge.isCritical && (
                                                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-black bg-red-100 text-red-700 border border-red-200 shadow-2xs" title={badge.criticalLabel || 'კრიტიკული ოპერაცია'}>
                                                            <ShieldAlert className="w-3 h-3 text-red-600" />
                                                            <span>{badge.criticalLabel || 'კრიტიკული'}</span>
                                                        </span>
                                                    )}
                                                </div>
                                            </td>

                                            <td className="py-3 px-4 whitespace-nowrap font-mono text-[11px] text-gray-600">
                                                {log.table_name || '—'}
                                            </td>

                                            <td className="py-3 px-4 whitespace-nowrap text-gray-500 font-mono text-[11px]">
                                                <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                                                    {ip}
                                                </span>
                                            </td>

                                            <td className="py-3 px-4 text-gray-500 text-[11px] max-w-xs truncate">
                                                {log.details ? (
                                                    typeof log.details === 'object' ? (
                                                        log.details.name ||
                                                        log.details.title ||
                                                        log.details.target_name ||
                                                        log.details.target_email ||
                                                        log.details.recordTitle ||
                                                        log.details.applicant ||
                                                        log.details.email ||
                                                        log.details.name_ka ||
                                                        log.details.title_ka ||
                                                        log.details.abstract_number ||
                                                        JSON.stringify(log.details).slice(0, 50) + '...'
                                                    ) : (
                                                        String(log.details)
                                                    )
                                                ) : '—'}
                                            </td>

                                            <td className="py-3 px-4 whitespace-nowrap text-right">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedLog(log);
                                                    }}
                                                    className="p-1.5 rounded-lg text-gray-400 group-hover:text-[#60318e] group-hover:bg-purple-100 transition-colors"
                                                    title="სრული დეტალები"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={7} className="py-14 text-center text-gray-400">
                                        მოთხოვნილი პარამეტრებით აუდიტის ლოგები ვერ მოიძებნა.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="p-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
                        <span>
                            ნაჩვენებია <strong>{(currentPage - 1) * pageSize + 1}</strong>-დან <strong>{Math.min(currentPage * pageSize, filteredLogs.length)}</strong>-მდე (სულ {filteredLogs.length})
                        </span>
                        <div className="flex items-center gap-1.5">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                                className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white font-bold hover:bg-gray-50 disabled:opacity-40 cursor-pointer"
                            >
                                წინა
                            </button>
                            <span className="px-2 font-bold text-gray-800">
                                {currentPage} / {totalPages}
                            </span>
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                                className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white font-bold hover:bg-gray-50 disabled:opacity-40 cursor-pointer"
                            >
                                შემდეგი
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Log Detail Inspector Modal */}
            <AdminModal
                isOpen={!!selectedLog}
                onClose={() => setSelectedLog(null)}
                title="ლოგის დეტალური ინსპექტირება"
                subtitle={selectedLog ? `${selectedLog.action} • ${new Date(selectedLog.created_at).toLocaleString('ka-GE')}` : ''}
                icon={FileText}
                maxWidth="max-w-3xl"
                footer={
                    <div className="flex justify-end w-full">
                        <button
                            onClick={() => setSelectedLog(null)}
                            className="px-5 py-2 rounded-xl text-xs font-bold bg-[#60318e] hover:bg-[#4a2470] text-white shadow-xs transition-colors cursor-pointer"
                        >
                            დახურვა
                        </button>
                    </div>
                }
            >
                {selectedLog && (() => {
                    const badge = getActionBadge(selectedLog.action);
                    return (
                        <div className="space-y-4">
                            {/* High Risk / Critical Security Banner */}
                            {badge.isCritical && (
                                <div className="p-3.5 rounded-2xl bg-red-50/90 border border-red-200 flex items-start gap-3 shadow-xs">
                                    <ShieldAlert className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                    <div className="text-xs">
                                        <span className="font-bold text-red-900 block uppercase tracking-wider text-[11px]">
                                            უსაფრთხოების მაღალი პრიორიტეტის მოვლენა ({badge.criticalLabel || 'კრიტიკული მოქმედება'})
                                        </span>
                                        <p className="text-red-700 mt-0.5">
                                            აღნიშნული ოპერაცია ახორციელებს მონაცემთა წაშლას, ადმინისტრატორთა უფლებების/როლების ცვლილებას, ბექაფის ჩამოტვირთვას ან მასიურ სისტემურ მოდიფიკაციას.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Summary Card */}
                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-3 text-xs">
                                <div>
                                    <span className="text-gray-400 font-bold uppercase text-[10px] block">მომხმარებელი</span>
                                    <span className="font-bold text-gray-900 break-all">{selectedLog.user_email || 'anonymous'}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400 font-bold uppercase text-[10px] block">ქმედება</span>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-bold ${badge.bg}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}></span>
                                            <span>{selectedLog.action}</span>
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-gray-400 font-bold uppercase text-[10px] block">ცხრილი (Table)</span>
                                    <span className="font-mono text-gray-700">{selectedLog.table_name || '—'}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400 font-bold uppercase text-[10px] block">ჩანაწერის ID</span>
                                    <span className="font-mono text-gray-700">{selectedLog.record_id || '—'}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400 font-bold uppercase text-[10px] block">IP მისამართი</span>
                                    <span className="font-mono text-gray-700">{selectedLog.details?.ip || 'N/A'}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400 font-bold uppercase text-[10px] block">თარიღი & დრო</span>
                                    <span className="text-gray-700">{new Date(selectedLog.created_at).toLocaleString('ka-GE')}</span>
                                </div>
                            </div>

                            {/* Client Environment Info */}
                            {selectedLog.details?.userAgent && (
                                <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-100 text-xs">
                                    <span className="text-purple-900 font-bold text-[10px] uppercase flex items-center gap-1 mb-1">
                                        <Laptop className="w-3.5 h-3.5" />
                                        კლიენტის მოწყობილობა & ბრაუზერი (User-Agent):
                                    </span>
                                    <p className="font-mono text-[11px] text-gray-600 break-all">
                                        {selectedLog.details.userAgent}
                                    </p>
                                </div>
                            )}

                            {/* Visual Diff / Raw JSON Tabs & Inspector */}
                            <div className="space-y-2.5 pt-1">
                                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                                    <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                                        <button
                                            type="button"
                                            onClick={() => setDetailViewMode('diff')}
                                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                                                detailViewMode === 'diff' ? 'bg-white text-[#60318e] shadow-xs' : 'text-gray-500 hover:text-gray-800'
                                            }`}
                                        >
                                            ვიზუალური ხედი (Visual Diff)
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setDetailViewMode('raw')}
                                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                                                detailViewMode === 'raw' ? 'bg-white text-[#60318e] shadow-xs' : 'text-gray-500 hover:text-gray-800'
                                            }`}
                                        >
                                            ნედლი JSON (Raw JSON)
                                        </button>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            navigator.clipboard?.writeText(JSON.stringify(selectedLog.details || {}, null, 2));
                                            setCopiedJson(true);
                                            setTimeout(() => setCopiedJson(false), 2000);
                                        }}
                                        className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-purple-50 text-xs font-bold text-gray-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                                        title="JSON კოპირება"
                                    >
                                        {copiedJson ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#60318e]" />}
                                        <span>{copiedJson ? 'კოპირებულია!' : 'JSON კოპირება'}</span>
                                    </button>
                                </div>

                                {detailViewMode === 'diff' ? (
                                    <LogDiffViewer details={selectedLog.details} />
                                ) : (
                                    <div className="bg-slate-900 text-slate-100 rounded-2xl p-4 font-mono text-xs overflow-x-auto max-h-72 border border-slate-800 leading-relaxed">
                                        <pre>{JSON.stringify(selectedLog.details || {}, null, 2)}</pre>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })()}
            </AdminModal>
        </div>
    );
}
