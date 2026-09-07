'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getSupabaseBrowserClient } from '../../lib/supabase/client';
import { staffData, departmentsData } from '../../data';
import {
    Calendar,
    Users,
    Building2,
    Newspaper,
    TrendingUp,
    ArrowUpRight,
    CheckCircle2,
    AlertCircle,
    UserPlus,
    FileText,
    ShieldAlert,
    History,
    LogIn,
    LogOut,
    GraduationCap,
    Clock,
    Activity,
    ExternalLink,
    Database,
    FileCode,
    BarChart3,
    PieChart,
    Sparkles,
    Loader2,
    ShieldCheck
} from 'lucide-react';
import { exportDatabaseBackup } from '../../lib/backupService';
import { toast } from '../../components/admin/AdminToast';

export default function AdminDashboardPage() {
    const [roles, setRoles] = useState(['admin']);
    const [userEmail, setUserEmail] = useState('');
    const [stats, setStats] = useState({
        conferenceCount: 0,
        staffCount: 0,
        departmentsCount: 0,
        newsCount: 0,
        usersCount: 0,
    });
    const [confAnalytics, setConfAnalytics] = useState({
        trend: [],
        topTopics: [],
        formats: { oral: 0, poster: 0, inPerson: 0, online: 0 },
        statuses: { pending: 0, accepted: 0, revision: 0, rejected: 0 }
    });
    const [recentRegistrations, setRecentRegistrations] = useState([]);
    const [recentActivity, setRecentActivity] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isExportingBackup, setIsExportingBackup] = useState(false);

    useEffect(() => {
        async function loadDashboard() {
            try {
                const supabase = getSupabaseBrowserClient();

                if (!supabase) {
                    setIsConnected(false);
                    setIsLoading(false);
                    // Mock recent activity & analytics for local preview
                    setStats({
                        conferenceCount: 14,
                        staffCount: staffData.length,
                        departmentsCount: departmentsData.length,
                        newsCount: 0,
                        usersCount: 2,
                    });
                    setRecentActivity([
                        { id: '1', action: 'AUTH_SIGN_IN', user_email: 'tokolejo@gmail.com', created_at: new Date().toISOString() },
                        { id: '2', action: 'CONFERENCE_REGISTER', user_email: 'anonymous', details: { applicant: 'გიორგი მაისურაძე' }, created_at: new Date(Date.now() - 1800000).toISOString() },
                        { id: '3', action: 'STAFF_UPDATE', user_email: 'tokolejo@gmail.com', details: { name_ka: 'ნიკოლოზ ნიორაძე' }, created_at: new Date(Date.now() - 7200000).toISOString() },
                    ]);
                    // Mock trend
                    const mockTrend = [];
                    for (let i = 13; i >= 0; i--) {
                        const d = new Date();
                        d.setDate(d.getDate() - i);
                        mockTrend.push({
                            day: d.toISOString().slice(5, 10),
                            count: Math.floor(Math.sin(i) * 2 + 3)
                        });
                    }
                    setConfAnalytics({
                        trend: mockTrend,
                        topTopics: [
                            { topic: 'ნანოპროცესები და ნანოტექნოლოგიები', count: 6, percentage: 43 },
                            { topic: 'მწვანე ქიმია', count: 4, percentage: 29 },
                            { topic: 'სურსათის ქიმია და ხარისხი', count: 3, percentage: 21 },
                            { topic: 'STEM+P', count: 1, percentage: 7 },
                        ],
                        formats: { oral: 9, poster: 5, inPerson: 10, online: 4 },
                        statuses: { pending: 6, accepted: 6, revision: 1, rejected: 1 }
                    });
                    return;
                }

                setIsConnected(true);

                // Fetch current user & roles
                let currentRoles = ['admin'];
                try {
                    const { data: { user: currentUser } } = await supabase.auth.getUser();
                    if (currentUser) {
                        const email = currentUser.email || '';
                        setUserEmail(email);
                        if (email.toLowerCase() === 'tokolejo@gmail.com') {
                            currentRoles = ['super_admin'];
                        } else {
                            const { data: profile } = await supabase
                                .from('user_profiles')
                                .select('role, roles')
                                .eq('id', currentUser.id)
                                .maybeSingle();

                            if (Array.isArray(profile?.roles) && profile.roles.length > 0) {
                                currentRoles = profile.roles;
                            } else if (profile?.role) {
                                currentRoles = [profile.role];
                            } else {
                                currentRoles = ['pending'];
                            }
                        }
                        setRoles(currentRoles);
                    }
                } catch (userErr) {
                    console.warn('Dashboard user profile read notice:', userErr);
                }

                // Fetch Conference Registrations count, recent, and analytics rows
                const { data: confData, count: confCount } = await supabase
                    .from('conference_registrations_2026')
                    .select('id, abstract_number, first_name, last_name, presentation_title, thematic_topic, created_at, presentation_type, is_attending_in_person, status', { count: 'exact' })
                    .order('created_at', { ascending: false });

                // Fetch Staff count
                const { count: sCount } = await supabase
                    .from('staff_members')
                    .select('id', { count: 'exact', head: true });

                // Fetch Departments count
                const { count: dCount } = await supabase
                    .from('departments')
                    .select('id', { count: 'exact', head: true });

                // Fetch News count
                const { count: nCount } = await supabase
                    .from('news')
                    .select('id', { count: 'exact', head: true });

                // Fetch Users count
                const { count: uCount } = await supabase
                    .from('user_profiles')
                    .select('id', { count: 'exact', head: true });

                // Fetch Recent Audit Activity
                const { data: auditData } = await supabase
                    .from('audit_logs')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(6);

                setStats({
                    conferenceCount: typeof confCount === 'number' ? confCount : 0,
                    staffCount: typeof sCount === 'number' ? sCount : staffData.length,
                    departmentsCount: typeof dCount === 'number' ? dCount : departmentsData.length,
                    newsCount: typeof nCount === 'number' ? nCount : 0,
                    usersCount: typeof uCount === 'number' ? uCount : 0,
                });

                if (confData) {
                    setRecentRegistrations(confData.slice(0, 5));

                    // Compute 14-day trend
                    const daysMap = {};
                    for (let i = 13; i >= 0; i--) {
                        const d = new Date();
                        d.setDate(d.getDate() - i);
                        const key = d.toISOString().slice(5, 10);
                        daysMap[key] = 0;
                    }
                    confData.forEach(r => {
                        if (r.created_at) {
                            const key = new Date(r.created_at).toISOString().slice(5, 10);
                            if (daysMap[key] !== undefined) daysMap[key]++;
                        }
                    });
                    const trendList = Object.entries(daysMap).map(([day, count]) => ({ day, count }));

                    // Topic distribution
                    const topicCounts = {};
                    let totalTopics = 0;
                    let oral = 0, poster = 0, inPerson = 0, online = 0;
                    let pending = 0, accepted = 0, revision = 0, rejected = 0;

                    confData.forEach(r => {
                        const t = r.thematic_topic || 'სხვა';
                        topicCounts[t] = (topicCounts[t] || 0) + 1;
                        totalTopics++;

                        if (r.presentation_type === 'oral') oral++;
                        else poster++;

                        if (r.is_attending_in_person) inPerson++;
                        else online++;

                        const st = r.status || 'pending';
                        if (st.includes('accepted')) accepted++;
                        else if (st === 'revision_needed') revision++;
                        else if (st === 'rejected') rejected++;
                        else pending++;
                    });

                    const topTopics = Object.entries(topicCounts)
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 4)
                        .map(([topic, count]) => ({
                            topic,
                            count,
                            percentage: totalTopics > 0 ? Math.round((count / totalTopics) * 100) : 0
                        }));

                    setConfAnalytics({
                        trend: trendList,
                        topTopics,
                        formats: { oral, poster, inPerson, online },
                        statuses: { pending, accepted, revision, rejected }
                    });
                }

                if (auditData) setRecentActivity(auditData);
            } catch (err) {
                console.warn('Dashboard stats fetch notice:', err);
            } finally {
                setIsLoading(false);
            }
        }

        loadDashboard();
    }, []);

    const handleQuickBackup = async (format = 'json') => {
        setIsExportingBackup(true);
        toast('ბაზის ექსპორტი დაიწყო...', 'info');
        try {
            await exportDatabaseBackup({ format });
            toast(`მონაცემთა ბაზის ${format.toUpperCase()} ექსპორტი წარმატებით დასრულდა!`, 'success');
        } catch (e) {
            toast('ბექაფის შეცდომა: ' + e.message, 'error');
        } finally {
            setIsExportingBackup(false);
        }
    };

    const getActivityBadge = (action = '') => {
        const act = action.toUpperCase();
        if (act.includes('SIGN_IN') || act.includes('LOGIN')) {
            return { color: 'bg-emerald-50 text-emerald-700 border-emerald-200', label: 'ავტორიზაცია' };
        }
        if (act.includes('SIGN_OUT') || act.includes('LOGOUT')) {
            return { color: 'bg-slate-100 text-slate-700 border-slate-200', label: 'გამოსვლა' };
        }
        if (act.includes('CONFERENCE')) {
            return { color: 'bg-indigo-50 text-indigo-700 border-indigo-200', label: 'კონფერენცია' };
        }
        if (act.includes('STAFF')) {
            return { color: 'bg-blue-50 text-blue-700 border-blue-200', label: 'თანამშრომელი' };
        }
        if (act.includes('NEWS')) {
            return { color: 'bg-amber-50 text-amber-700 border-amber-200', label: 'სიახლეები' };
        }
        return { color: 'bg-purple-50 text-[#60318e] border-purple-200', label: act };
    };

    const isSuperAdmin = roles.includes('super_admin') || userEmail.toLowerCase() === 'tokolejo@gmail.com';
    const isAdmin = isSuperAdmin || roles.includes('admin');
    const isConfManager = isAdmin || roles.includes('conference_manager');
    const isDeptHead = isAdmin || roles.includes('department_head');
    const isEditor = isAdmin || roles.includes('editor');

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header & Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-3">
                        <Activity className="w-7 h-7 text-[#60318e]" />
                        მართვის პორტალი
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                        თსუ რაფიელ აგლაძის ინსტიტუტის მონაცემთა და უსაფრთხოების მართვის ცენტრი
                    </p>
                </div>

                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white border border-slate-200 shadow-xs w-fit">
                    <div className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`}></div>
                    <span className="text-slate-600">
                        {isConnected ? 'Supabase: დაკავშირებულია' : 'რეჟიმი: Local Fallback'}
                    </span>
                </div>
            </div>

            {/* Compact KPI Metric Cards (Role-Filtered) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {isConfManager && (
                    <Link
                        href="/admin/conference"
                        className="group bg-white rounded-2xl p-3.5 sm:p-4 border border-purple-100/80 hover:border-[#AD49E1] shadow-xs hover:shadow-md transition-all flex items-center justify-between cursor-pointer"
                    >
                        <div className="min-w-0">
                            <span className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-wider block truncate">
                                კონფერენცია 2026
                            </span>
                            <div className="flex items-baseline gap-1.5 mt-0.5">
                                <span className="text-xl sm:text-2xl font-black text-[#60318e] group-hover:text-[#AD49E1] transition-colors">
                                    {stats.conferenceCount}
                                </span>
                                <span className="text-[10px] text-gray-400 font-medium truncate">თეზისი</span>
                            </div>
                        </div>
                        <div className="w-9 h-9 rounded-xl bg-purple-50 group-hover:bg-[#60318e] text-[#60318e] group-hover:text-white flex items-center justify-center transition-all flex-shrink-0 shadow-xs ml-2">
                            <Calendar className="w-4 h-4" />
                        </div>
                    </Link>
                )}

                {isDeptHead && (
                    <Link
                        href="/admin/staff"
                        className="group bg-white rounded-2xl p-3.5 sm:p-4 border border-purple-100/80 hover:border-[#AD49E1] shadow-xs hover:shadow-md transition-all flex items-center justify-between cursor-pointer"
                    >
                        <div className="min-w-0">
                            <span className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-wider block truncate">
                                თანამშრომლები
                            </span>
                            <div className="flex items-baseline gap-1.5 mt-0.5">
                                <span className="text-xl sm:text-2xl font-black text-[#60318e] group-hover:text-[#AD49E1] transition-colors">
                                    {stats.staffCount}
                                </span>
                                <span className="text-[10px] text-gray-400 font-medium truncate">მეცნიერი</span>
                            </div>
                        </div>
                        <div className="w-9 h-9 rounded-xl bg-purple-50 group-hover:bg-[#60318e] text-[#60318e] group-hover:text-white flex items-center justify-center transition-all flex-shrink-0 shadow-xs ml-2">
                            <Users className="w-4 h-4" />
                        </div>
                    </Link>
                )}

                {isAdmin && (
                    <Link
                        href="/admin/departments"
                        className="group bg-white rounded-2xl p-3.5 sm:p-4 border border-purple-100/80 hover:border-[#AD49E1] shadow-xs hover:shadow-md transition-all flex items-center justify-between cursor-pointer"
                    >
                        <div className="min-w-0">
                            <span className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-wider block truncate">
                                განყოფილებები
                            </span>
                            <div className="flex items-baseline gap-1.5 mt-0.5">
                                <span className="text-xl sm:text-2xl font-black text-[#60318e] group-hover:text-[#AD49E1] transition-colors">
                                    {stats.departmentsCount}
                                </span>
                                <span className="text-[10px] text-gray-400 font-medium truncate">მიმართულება</span>
                            </div>
                        </div>
                        <div className="w-9 h-9 rounded-xl bg-purple-50 group-hover:bg-[#60318e] text-[#60318e] group-hover:text-white flex items-center justify-center transition-all flex-shrink-0 shadow-xs ml-2">
                            <Building2 className="w-4 h-4" />
                        </div>
                    </Link>
                )}

                {isEditor && (
                    <Link
                        href="/admin/news"
                        className="group bg-white rounded-2xl p-3.5 sm:p-4 border border-purple-100/80 hover:border-[#AD49E1] shadow-xs hover:shadow-md transition-all flex items-center justify-between cursor-pointer"
                    >
                        <div className="min-w-0">
                            <span className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-wider block truncate">
                                სიახლეები
                            </span>
                            <div className="flex items-baseline gap-1.5 mt-0.5">
                                <span className="text-xl sm:text-2xl font-black text-[#60318e] group-hover:text-[#AD49E1] transition-colors">
                                    {stats.newsCount}
                                </span>
                                <span className="text-[10px] text-gray-400 font-medium truncate">სტატია</span>
                            </div>
                        </div>
                        <div className="w-9 h-9 rounded-xl bg-purple-50 group-hover:bg-[#60318e] text-[#60318e] group-hover:text-white flex items-center justify-center transition-all flex-shrink-0 shadow-xs ml-2">
                            <Newspaper className="w-4 h-4" />
                        </div>
                    </Link>
                )}

                {isSuperAdmin && (
                    <Link
                        href="/admin/users"
                        className="group bg-white rounded-2xl p-3.5 sm:p-4 border border-purple-100/80 hover:border-[#AD49E1] shadow-xs hover:shadow-md transition-all flex items-center justify-between cursor-pointer"
                    >
                        <div className="min-w-0">
                            <span className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-wider block truncate">
                                მომხმარებლები
                            </span>
                            <div className="flex items-baseline gap-1.5 mt-0.5">
                                <span className="text-xl sm:text-2xl font-black text-[#60318e] group-hover:text-[#AD49E1] transition-colors">
                                    {stats.usersCount}
                                </span>
                                <span className="text-[10px] text-gray-400 font-medium truncate">პროფილი</span>
                            </div>
                        </div>
                        <div className="w-9 h-9 rounded-xl bg-purple-50 group-hover:bg-[#60318e] text-[#60318e] group-hover:text-white flex items-center justify-center transition-all flex-shrink-0 shadow-xs ml-2">
                            <ShieldCheck className="w-4 h-4" />
                        </div>
                    </Link>
                )}
            </div>

            {/* Analytics & Visual Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Registration Trend SVG Chart (7 cols) */}
                <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-purple-100 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-[#60318e]" />
                                    რეგისტრაციების დინამიკა (ბოლო 14 დღე)
                                </h3>
                                <p className="text-xs text-gray-500 mt-0.5">ყოველდღიური შემოსული თეზისების ნაკადი</p>
                            </div>
                            <span className="text-xs font-extrabold text-[#60318e] bg-purple-50 px-2.5 py-1 rounded-xl border border-purple-200">
                                სულ: {stats.conferenceCount}
                            </span>
                        </div>

                        {/* SVG Area Chart */}
                        <div className="relative h-40 w-full pt-2">
                            {(() => {
                                const trend = confAnalytics.trend;
                                if (!trend || trend.length === 0) return null;
                                const maxVal = Math.max(...trend.map(t => t.count), 1);
                                const width = 500;
                                const height = 110;
                                const step = width / (trend.length - 1 || 1);
                                const points = trend.map((t, i) => ({
                                    x: i * step,
                                    y: height - (t.count / maxVal) * (height - 20) - 10,
                                    count: t.count,
                                    day: t.day
                                }));

                                return (
                                    <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${width} ${height + 20}`}>
                                        <defs>
                                            <linearGradient id="dashTrendGrad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#AD49E1" stopOpacity="0.35" />
                                                <stop offset="100%" stopColor="#60318e" stopOpacity="0.0" />
                                            </linearGradient>
                                        </defs>

                                        {/* Area */}
                                        <polygon
                                            points={`0,${height + 10} ${points.map(p => `${p.x},${p.y}`).join(' ')} ${width},${height + 10}`}
                                            fill="url(#dashTrendGrad)"
                                        />

                                        {/* Line */}
                                        <polyline
                                            points={points.map(p => `${p.x},${p.y}`).join(' ')}
                                            fill="none"
                                            stroke="#60318e"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />

                                        {/* Points */}
                                        {points.map((p, idx) => (
                                            <g key={idx} className="group cursor-pointer">
                                                <circle
                                                    cx={p.x}
                                                    cy={p.y}
                                                    r="4"
                                                    className="fill-white stroke-[#60318e] stroke-2 hover:stroke-[#AD49E1] transition-all"
                                                />
                                                {p.count > 0 && (
                                                    <text
                                                        x={p.x}
                                                        y={p.y - 8}
                                                        textAnchor="middle"
                                                        className="text-[9px] font-bold fill-[#60318e]"
                                                    >
                                                        {p.count}
                                                    </text>
                                                )}
                                            </g>
                                        ))}
                                    </svg>
                                );
                            })()}
                        </div>

                        {/* Day Labels */}
                        <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mt-2 px-1 border-t border-slate-100 pt-2">
                            {confAnalytics.trend.length > 0 ? (
                                <>
                                    <span>{confAnalytics.trend[0]?.day}</span>
                                    <span>{confAnalytics.trend[Math.floor(confAnalytics.trend.length / 2)]?.day}</span>
                                    <span>დღეს ({confAnalytics.trend[confAnalytics.trend.length - 1]?.day})</span>
                                </>
                            ) : null}
                        </div>
                    </div>

                    {/* Quick Metrics Bar */}
                    <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 text-center">
                        <div className="p-2 rounded-xl bg-purple-50/50">
                            <span className="text-[10px] text-slate-500 font-bold block">ზეპირი / სასტენდო</span>
                            <span className="text-xs font-black text-[#60318e]">
                                {confAnalytics.formats.oral} / {confAnalytics.formats.poster}
                            </span>
                        </div>
                        <div className="p-2 rounded-xl bg-purple-50/50">
                            <span className="text-[10px] text-slate-500 font-bold block">პირისპირ / ონლაინ</span>
                            <span className="text-xs font-black text-slate-800">
                                {confAnalytics.formats.inPerson} / {confAnalytics.formats.online}
                            </span>
                        </div>
                        <div className="p-2 rounded-xl bg-purple-50/50">
                            <span className="text-[10px] text-slate-500 font-bold block">მიღებული / განსახილველი</span>
                            <span className="text-xs font-black text-emerald-700">
                                {confAnalytics.statuses.accepted} / {confAnalytics.statuses.pending}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right: Thematic Breakdown (5 cols) */}
                <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-purple-100 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                                    <PieChart className="w-5 h-5 text-[#60318e]" />
                                    თემატიკების გადანაწილება
                                </h3>
                                <p className="text-xs text-gray-500 mt-0.5">პოპულარული სამეცნიერო სექციები</p>
                            </div>
                        </div>

                        <div className="space-y-3.5">
                            {confAnalytics.topTopics.length > 0 ? (
                                confAnalytics.topTopics.map((item, idx) => (
                                    <div key={idx} className="space-y-1">
                                        <div className="flex items-center justify-between text-xs font-semibold">
                                            <span className="text-slate-800 truncate max-w-[220px]" title={item.topic}>
                                                {item.topic}
                                            </span>
                                            <span className="text-slate-500 font-mono text-[11px] flex-shrink-0">
                                                <strong className="text-slate-900">{item.count}</strong> ({item.percentage}%)
                                            </span>
                                        </div>
                                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                            <div
                                                className="bg-gradient-to-r from-[#60318e] to-[#AD49E1] h-full rounded-full transition-all duration-500"
                                                style={{ width: `${item.percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center text-xs text-slate-400">
                                    მონაცემები არ არის ხელმისაწვდომი
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <Link
                            href="/admin/conference"
                            className="text-xs font-bold text-[#60318e] hover:underline flex items-center gap-1"
                        >
                            <span>სრული რეესტრის ნახვა</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Quick Actions Bar (Role-Filtered) */}
            <div className="bg-gradient-to-r from-[#2e0d42] to-[#60318e] rounded-3xl p-6 sm:p-8 text-white shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
                    <div>
                        <h3 className="text-lg font-black mb-0.5">სწრაფი მოქმედებები</h3>
                        <p className="text-xs text-purple-100/80">
                            თქვენი უფლებებისა და როლის შესაბამისი სამუშაო ხელსაწყოები
                        </p>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[11px] font-bold text-purple-200 border border-white/10 w-fit">
                        <span>როლი:</span>
                        <span className="text-white uppercase">{roles.join(', ')}</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3">
                    {isConfManager && (
                        <Link
                            href="/admin/conference"
                            className="flex items-center gap-2.5 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-2xl border border-white/10 text-xs font-bold transition-all backdrop-blur-sm shadow-xs"
                        >
                            <Calendar className="w-4 h-4 text-[#EBD3F8]" />
                            <span>2026-ის თეზისები</span>
                        </Link>
                    )}

                    {isDeptHead && (
                        <Link
                            href="/admin/staff?action=new"
                            className="flex items-center gap-2.5 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-2xl border border-white/10 text-xs font-bold transition-all backdrop-blur-sm shadow-xs"
                        >
                            <UserPlus className="w-4 h-4 text-[#EBD3F8]" />
                            <span>თანამშრომელი</span>
                        </Link>
                    )}

                    {isEditor && (
                        <Link
                            href="/admin/news"
                            className="flex items-center gap-2.5 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-2xl border border-white/10 text-xs font-bold transition-all backdrop-blur-sm shadow-xs"
                        >
                            <FileText className="w-4 h-4 text-[#EBD3F8]" />
                            <span>სიახლის დამატება</span>
                        </Link>
                    )}

                    {isAdmin && (
                        <Link
                            href="/admin/departments"
                            className="flex items-center gap-2.5 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-2xl border border-white/10 text-xs font-bold transition-all backdrop-blur-sm shadow-xs"
                        >
                            <Building2 className="w-4 h-4 text-[#EBD3F8]" />
                            <span>განყოფილებები</span>
                        </Link>
                    )}

                    {isSuperAdmin && (
                        <Link
                            href="/admin/users"
                            className="flex items-center gap-2.5 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-2xl border border-white/10 text-xs font-bold transition-all backdrop-blur-sm shadow-xs"
                        >
                            <ShieldCheck className="w-4 h-4 text-[#EBD3F8]" />
                            <span>მომხმარებლები (RBAC)</span>
                        </Link>
                    )}

                    {isSuperAdmin && (
                        <Link
                            href="/admin/audit"
                            className="flex items-center gap-2.5 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-2xl border border-white/10 text-xs font-bold transition-all backdrop-blur-sm shadow-xs"
                        >
                            <History className="w-4 h-4 text-[#EBD3F8]" />
                            <span>აუდიტის ჟურნალი</span>
                        </Link>
                    )}

                    {isAdmin && (
                        <>
                            <button
                                onClick={() => handleQuickBackup('json')}
                                disabled={isExportingBackup}
                                className="flex items-center gap-2.5 bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 border border-amber-400/30 px-4 py-3 rounded-2xl text-xs font-bold transition-all backdrop-blur-sm cursor-pointer disabled:opacity-50 shadow-xs"
                                title="ბაზის სრული JSON Snapshot"
                            >
                                {isExportingBackup ? <Loader2 className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
                                <span>ბაზის JSON</span>
                            </button>

                            <button
                                onClick={() => handleQuickBackup('sql')}
                                disabled={isExportingBackup}
                                className="flex items-center gap-2.5 bg-emerald-400/20 hover:bg-emerald-400/30 text-emerald-200 border border-emerald-400/30 px-4 py-3 rounded-2xl text-xs font-bold transition-all backdrop-blur-sm cursor-pointer disabled:opacity-50 shadow-xs"
                                title="ბაზის SQL DUMP Script"
                            >
                                {isExportingBackup ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileCode className="w-4 h-4" />}
                                <span>ბაზის SQL</span>
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Two Column Layout: Recent Registrations & Live Audit Stream based on permissions */}
            {(isConfManager || isSuperAdmin) && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Recent Registrations */}
                    {isConfManager && (
                        <div className={`${isSuperAdmin ? 'lg:col-span-7' : 'lg:col-span-12'} bg-white rounded-3xl p-6 border border-purple-100 shadow-sm`}>
                            <div className="flex items-center justify-between mb-5">
                                <div>
                                    <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                                        <GraduationCap className="w-5 h-5 text-[#60318e]" />
                                        ბოლოს რეგისტრირებული თეზისები (2026)
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-0.5">უახლესი საკონფერენციო განაცხადები</p>
                                </div>
                                <Link
                                    href="/admin/conference"
                                    className="text-xs font-bold text-[#60318e] hover:text-[#7A1CAC] bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-100 transition-colors"
                                >
                                    ყველა →
                                </Link>
                            </div>

                            {recentRegistrations.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs">
                                        <thead className="bg-slate-50 text-gray-600 font-bold border-b border-slate-200 uppercase tracking-wider">
                                            <tr>
                                                <th className="py-2.5 px-3">#</th>
                                                <th className="py-2.5 px-3">ავტორი</th>
                                                <th className="py-2.5 px-3">მოხსენების სათაური</th>
                                                <th className="py-2.5 px-3 text-right">თარიღი</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {recentRegistrations.map((reg) => (
                                                <tr key={reg.id} className="hover:bg-purple-50/30 transition-colors">
                                                    <td className="py-2.5 px-3 font-mono font-bold text-[#60318e]">
                                                        {reg.abstract_number}
                                                    </td>
                                                    <td className="py-2.5 px-3 font-semibold text-gray-900">
                                                        {reg.first_name} {reg.last_name}
                                                    </td>
                                                    <td className="py-2.5 px-3 text-gray-600 max-w-[200px] truncate" title={reg.presentation_title}>
                                                        {reg.presentation_title}
                                                    </td>
                                                    <td className="py-2.5 px-3 text-gray-400 text-right whitespace-nowrap">
                                                        {new Date(reg.created_at).toLocaleDateString('ka-GE')}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="p-8 text-center text-gray-400 text-xs bg-slate-50 rounded-2xl">
                                    ჯერჯერობით რეგისტრაციები არ არის დაფიქსირებული.
                                </div>
                            )}
                        </div>
                    )}

                    {/* Live Activity Stream (5 cols) */}
                    {isSuperAdmin && (
                        <div className={`${isConfManager ? 'lg:col-span-5' : 'lg:col-span-12'} bg-white rounded-3xl p-6 border border-purple-100 shadow-sm`}>
                            <div className="flex items-center justify-between mb-5">
                                <div>
                                    <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                                        <History className="w-5 h-5 text-[#60318e]" />
                                        უახლესი აქტივობა (Audit Feed)
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-0.5">ავტორიზაცია და სისტემური ცვლილებები</p>
                                </div>
                                <Link
                                    href="/admin/audit"
                                    className="text-xs font-bold text-[#60318e] hover:text-[#7A1CAC] bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-100 transition-colors"
                                >
                                    ჟურნალი →
                                </Link>
                            </div>

                            {recentActivity.length > 0 ? (
                                <div className="space-y-3">
                                    {recentActivity.map((act) => {
                                        const badge = getActivityBadge(act.action);
                                        return (
                                            <div
                                                key={act.id}
                                                className="p-3 rounded-2xl bg-slate-50 hover:bg-purple-50/50 border border-slate-100 hover:border-purple-100 transition-colors flex items-start justify-between gap-3 text-xs"
                                            >
                                                <div className="space-y-1 min-w-0">
                                                    <div className="flex items-center gap-1.5 flex-wrap">
                                                        <span className={`px-2 py-0.5 rounded-md border text-[10px] font-bold ${badge.color}`}>
                                                            {badge.label}
                                                        </span>
                                                        <span className="font-bold text-gray-900 truncate">
                                                            {act.user_email || 'anonymous'}
                                                        </span>
                                                    </div>
                                                    <p className="text-[11px] text-gray-500 truncate">
                                                        {act.details?.applicant || act.details?.name_ka || act.details?.title_ka || act.action}
                                                    </p>
                                                </div>
                                                <span className="text-[10px] font-medium text-gray-400 whitespace-nowrap mt-0.5">
                                                    {new Date(act.created_at).toLocaleTimeString('ka-GE', { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="p-8 text-center text-gray-400 text-xs bg-slate-50 rounded-2xl">
                                    აქტივობა ჯერ არ არის დაფიქსირებული.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
