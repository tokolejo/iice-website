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
    AlertCircle
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
    const act = action.toUpperCase();
    if (act.includes('SIGN_IN') || act.includes('LOGIN')) {
        return {
            bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            dot: 'bg-emerald-500',
            label: 'ავტორიზაცია',
            icon: LogIn
        };
    }
    if (act.includes('SIGN_OUT') || act.includes('LOGOUT')) {
        return {
            bg: 'bg-slate-100 text-slate-700 border-slate-300',
            dot: 'bg-slate-400',
            label: 'გამოსვლა',
            icon: LogOut
        };
    }
    if (act.includes('REGISTER') || act.includes('CREATE') || act.includes('INSERT')) {
        return {
            bg: 'bg-blue-50 text-blue-700 border-blue-200',
            dot: 'bg-blue-500',
            label: 'შექმნა / დამატება',
            icon: UserPlus
        };
    }
    if (act.includes('DELETE') || act.includes('REMOVE')) {
        return {
            bg: 'bg-rose-50 text-rose-700 border-rose-200',
            dot: 'bg-rose-500',
            label: 'წაშლა',
            icon: AlertCircle
        };
    }
    if (act.includes('UPDATE') || act.includes('EDIT') || act.includes('STATUS')) {
        return {
            bg: 'bg-purple-50 text-[#60318e] border-purple-200',
            dot: 'bg-[#60318e]',
            label: 'ცვლილება',
            icon: RefreshCw
        };
    }
    if (act.includes('BACKUP') || act.includes('EXPORT') || act.includes('ZIP')) {
        return {
            bg: 'bg-amber-50 text-amber-700 border-amber-200',
            dot: 'bg-amber-500',
            label: 'ექსპორტი / ბექაფი',
            icon: Download
        };
    }
    return {
        bg: 'bg-gray-50 text-gray-700 border-gray-200',
        dot: 'bg-gray-500',
        label: act,
        icon: FileText
    };
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
        setCurrentPage(1);
    }, [selectedCategory]);

    // Time filtering
    const filteredLogs = useMemo(() => {
        const now = Date.now();
        return logs.filter((log) => {
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
    }, [logs, timeRange, searchQuery]);

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
        logs.forEach(l => {
            const a = (l.action || '').toUpperCase();
            if (a.includes('SIGN_IN') || a.includes('LOGIN') || a.includes('AUTH')) authCount++;
            if (a.includes('CONFERENCE')) confCount++;
            if (a.includes('UPDATE') || a.includes('CREATE') || a.includes('DELETE')) updateCount++;
        });
        return {
            total: logs.length,
            auth: authCount,
            conf: confCount,
            updates: updateCount,
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
                        className="px-4 py-2 rounded-xl bg-[#60318e] hover:bg-[#4a2470] text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                        <Download className="w-3.5 h-3.5" />
                        <span>ექსპორტი (CSV)</span>
                    </button>
                </div>
            </div>

            {/* Metrics Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-white rounded-2xl p-4 border border-purple-100 shadow-xs flex items-center justify-between">
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">სულ მოვლენა</p>
                        <p className="text-xl sm:text-2xl font-black text-gray-900 mt-0.5">{stats.total}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-[#60318e]">
                        <History className="w-5 h-5" />
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-xs flex items-center justify-between">
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">ავტორიზაცია / სესია</p>
                        <p className="text-xl sm:text-2xl font-black text-emerald-600 mt-0.5">{stats.auth}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <LogIn className="w-5 h-5" />
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-indigo-100 shadow-xs flex items-center justify-between">
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">კონფერენციის განაცხადი</p>
                        <p className="text-xl sm:text-2xl font-black text-indigo-600 mt-0.5">{stats.conf}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <GraduationCap className="w-5 h-5" />
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-blue-100 shadow-xs flex items-center justify-between">
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">რედაქტირება / CRUD</p>
                        <p className="text-xl sm:text-2xl font-black text-blue-600 mt-0.5">{stats.updates}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                        <FileText className="w-5 h-5" />
                    </div>
                </div>
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
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border text-[11px] font-bold ${badge.bg}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}></span>
                                                    <span>{log.action}</span>
                                                </span>
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
                maxWidth="max-w-2xl"
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
                {selectedLog && (
                    <div className="space-y-4">
                        {/* Summary Card */}
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-3 text-xs">
                            <div>
                                <span className="text-gray-400 font-bold uppercase text-[10px] block">მომხმარებელი</span>
                                <span className="font-bold text-gray-900 break-all">{selectedLog.user_email || 'anonymous'}</span>
                            </div>
                            <div>
                                <span className="text-gray-400 font-bold uppercase text-[10px] block">ქმედება</span>
                                <span className="font-mono font-bold text-[#60318e]">{selectedLog.action}</span>
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

                        {/* Full JSON Payload */}
                        <div>
                            <span className="text-gray-700 font-bold text-xs uppercase tracking-wider block mb-1.5">
                                მონაცემთა სრული პაკეტი (Payload JSON):
                            </span>
                            <div className="bg-slate-900 text-slate-100 rounded-2xl p-4 font-mono text-xs overflow-x-auto max-h-72 border border-slate-800 leading-relaxed">
                                <pre>{JSON.stringify(selectedLog.details || {}, null, 2)}</pre>
                            </div>
                        </div>
                    </div>
                )}
            </AdminModal>
        </div>
    );
}
