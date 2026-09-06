'use client';

import { useState, useEffect } from 'react';
import { getSupabaseBrowserClient } from '../../../lib/supabase/client';
import {
    History,
    Search,
    Shield,
    Calendar,
    User,
    FileText
} from 'lucide-react';

export default function AdminAuditPage() {
    const [logs, setLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const loadAuditLogs = async () => {
        setIsLoading(true);
        try {
            const supabase = getSupabaseBrowserClient();
            if (!supabase) {
                // Mock preview
                setLogs([
                    {
                        id: 'log-1',
                        user_email: 'tokolejo@gmail.com',
                        action: 'PROMOTE_TO_ADMIN',
                        table_name: 'user_profiles',
                        record_id: 'usr-2',
                        details: { email: 'researcher@tsu.ge', new_role: 'admin' },
                        created_at: new Date().toISOString(),
                    },
                    {
                        id: 'log-2',
                        user_email: 'tokolejo@gmail.com',
                        action: 'UPDATE_STAFF',
                        table_name: 'staff_members',
                        record_id: 'staff-1',
                        details: { name: 'ნიკოლოზ ნიორაძე' },
                        created_at: new Date(Date.now() - 3600000).toISOString(),
                    }
                ]);
                setIsLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from('audit_logs')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(100);

            if (data) {
                setLogs(data);
            }
        } catch (err) {
            console.warn('Load audit logs error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadAuditLogs();
    }, []);

    const filteredLogs = logs.filter(l => {
        const full = `${l.action || ''} ${l.user_email || ''} ${l.table_name || ''}`.toLowerCase();
        return full.includes(searchQuery.toLowerCase());
    });

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div>
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-3">
                    <History className="w-7 h-7 text-[#60318e]" />
                    აუდიტის ჟურნალი (Audit Logs)
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                    ადმინისტრატორების მიერ განხორციელებული ცვლილებებისა და ქმედებების ისტორია
                </p>
            </div>

            {/* Search */}
            <div className="bg-white rounded-2xl p-4 border border-purple-100 shadow-sm">
                <div className="relative w-full">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="ძიება: ქმედება, მომხმარებელი, ცხრილი..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#AD49E1]"
                    />
                </div>
            </div>

            {/* Logs Table */}
            <div className="bg-white rounded-3xl border border-purple-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-gray-600 font-bold border-b border-slate-200 uppercase tracking-wider">
                            <tr>
                                <th className="py-3.5 px-4">თარიღი და დრო</th>
                                <th className="py-3.5 px-4">მომხმარებელი</th>
                                <th className="py-3.5 px-4">ქმედება (Action)</th>
                                <th className="py-3.5 px-4">ცხრილი</th>
                                <th className="py-3.5 px-4">დეტალები</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-gray-400">
                                        <div className="w-6 h-6 border-2 border-[#60318e] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                                        იტვირთება ლოგები...
                                    </td>
                                </tr>
                            ) : filteredLogs.length > 0 ? (
                                filteredLogs.map((log) => (
                                    <tr key={log.id} className="hover:bg-purple-50/40 transition-colors">
                                        <td className="py-3 px-4 text-gray-500 whitespace-nowrap">
                                            {new Date(log.created_at).toLocaleString('ka-GE')}
                                        </td>
                                        <td className="py-3 px-4 font-bold text-gray-900 whitespace-nowrap">
                                            {log.user_email}
                                        </td>
                                        <td className="py-3 px-4 whitespace-nowrap">
                                            <span className="font-mono text-[10px] font-bold bg-purple-100 text-[#60318e] px-2 py-0.5 rounded-md">
                                                {log.action}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-gray-600 font-mono text-[11px]">
                                            {log.table_name}
                                        </td>
                                        <td className="py-3 px-4 text-gray-500 text-[11px] max-w-xs truncate">
                                            {log.details ? JSON.stringify(log.details) : '—'}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-gray-400">
                                        ლოგები არ მოიძებნა.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
