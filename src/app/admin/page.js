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
    ShieldAlert
} from 'lucide-react';

export default function AdminDashboardPage() {
    const [stats, setStats] = useState({
        conferenceCount: 0,
        staffCount: staffData.length,
        departmentsCount: departmentsData.length,
        newsCount: 42,
    });
    const [recentRegistrations, setRecentRegistrations] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadDashboard() {
            try {
                const supabase = getSupabaseBrowserClient();

                if (!supabase) {
                    setIsConnected(false);
                    setIsLoading(false);
                    return;
                }

                setIsConnected(true);

                // Fetch Conference Registrations count and recent
                const { data: confData, count: confCount } = await supabase
                    .from('conference_registrations_2026')
                    .select('id, abstract_number, first_name, last_name, presentation_title, thematic_topic, created_at', { count: 'exact' })
                    .order('created_at', { ascending: false })
                    .limit(5);

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

                setStats({
                    conferenceCount: confCount || 0,
                    staffCount: sCount || staffData.length,
                    departmentsCount: dCount || departmentsData.length,
                    newsCount: nCount || 42,
                });

                if (confData) {
                    setRecentRegistrations(confData);
                }
            } catch (err) {
                console.warn('Dashboard stats fetch notice:', err);
            } finally {
                setIsLoading(false);
            }
        }

        loadDashboard();
    }, []);

    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* Header & Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
                        მართვის პანელი (Overview)
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                        თსუ რაფიელ აგლაძის ინსტიტუტის მონაცემთა მართვის ცენტრი
                    </p>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-white border border-slate-200 shadow-sm w-fit">
                    <div className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`}></div>
                    <span className="text-slate-600">
                        {isConnected ? 'Supabase: დაკავშირებულია' : 'რეჟიმი: Local Fallback'}
                    </span>
                </div>
            </div>

            {/* KPI Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">კონფერენცია 2026</span>
                        <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#60318e] flex items-center justify-center">
                            <Calendar className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="flex items-baseline justify-between">
                        <span className="text-3xl font-black text-[#60318e]">{stats.conferenceCount}</span>
                        <Link href="/admin/conference" className="text-xs font-bold text-[#AD49E1] hover:underline flex items-center gap-0.5">
                            ნახვა <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-2">რეგისტრირებული თეზისი</p>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">თანამშრომლები</span>
                        <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#60318e] flex items-center justify-center">
                            <Users className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="flex items-baseline justify-between">
                        <span className="text-3xl font-black text-[#60318e]">{stats.staffCount}</span>
                        <Link href="/admin/staff" className="text-xs font-bold text-[#AD49E1] hover:underline flex items-center gap-0.5">
                            მართვა <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-2">აქტიური მეცნიერი და პერსონალი</p>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">განყოფილებები</span>
                        <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#60318e] flex items-center justify-center">
                            <Building2 className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="flex items-baseline justify-between">
                        <span className="text-3xl font-black text-[#60318e]">{stats.departmentsCount}</span>
                        <Link href="/admin/departments" className="text-xs font-bold text-[#AD49E1] hover:underline flex items-center gap-0.5">
                            ნახვა <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-2">სამეცნიერო მიმართულება</p>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">სიახლეები</span>
                        <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#60318e] flex items-center justify-center">
                            <Newspaper className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="flex items-baseline justify-between">
                        <span className="text-3xl font-black text-[#60318e]">{stats.newsCount}</span>
                        <Link href="/admin/news" className="text-xs font-bold text-[#AD49E1] hover:underline flex items-center gap-0.5">
                            სიახლეები <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-2">გამოქვეყნებული პოსტი</p>
                </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="bg-gradient-to-r from-[#2e0d42] to-[#60318e] rounded-3xl p-6 sm:p-8 text-white shadow-lg">
                <h3 className="text-lg font-black mb-2">სწრაფი ქმედებები</h3>
                <p className="text-xs text-purple-100/80 mb-6">მართეთ ინსტიტუტის მონაცემები და რეგისტრაციები ერთი ადგილიდან</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    <Link
                        href="/admin/staff?action=new"
                        className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-2xl border border-white/10 text-xs font-bold transition-all backdrop-blur-sm"
                    >
                        <UserPlus className="w-4 h-4 text-[#EBD3F8]" />
                        <span>თანამშრომლის დამატება</span>
                    </Link>

                    <Link
                        href="/admin/conference"
                        className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-2xl border border-white/10 text-xs font-bold transition-all backdrop-blur-sm"
                    >
                        <Calendar className="w-4 h-4 text-[#EBD3F8]" />
                        <span>2026-ის თეზისების სია</span>
                    </Link>

                    <Link
                        href="/admin/news"
                        className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-2xl border border-white/10 text-xs font-bold transition-all backdrop-blur-sm"
                    >
                        <FileText className="w-4 h-4 text-[#EBD3F8]" />
                        <span>სიახლის გამოქვეყნება</span>
                    </Link>

                    <Link
                        href="/admin/users"
                        className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-2xl border border-white/10 text-xs font-bold transition-all backdrop-blur-sm"
                    >
                        <ShieldAlert className="w-4 h-4 text-[#EBD3F8]" />
                        <span>უფლებების მართვა (RBAC)</span>
                    </Link>
                </div>
            </div>

            {/* Recent Registrations Table */}
            <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h3 className="text-base font-bold text-gray-900">ბოლოს რეგისტრირებული თეზისები (2026)</h3>
                        <p className="text-xs text-gray-500">უახლესი საკონფერენციო განაცხადები</p>
                    </div>
                    <Link
                        href="/admin/conference"
                        className="text-xs font-bold text-[#60318e] hover:text-[#7A1CAC] bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-100 transition-colors"
                    >
                        ყველას ნახვა →
                    </Link>
                </div>

                {recentRegistrations.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-slate-50 text-gray-600 font-bold border-b border-slate-200 uppercase tracking-wider">
                                <tr>
                                    <th className="py-3 px-4">თეზისის #</th>
                                    <th className="py-3 px-4">მომხსენებელი</th>
                                    <th className="py-3 px-4">მოხსენების სათაური</th>
                                    <th className="py-3 px-4">მიმართულება</th>
                                    <th className="py-3 px-4 text-right">თარიღი</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {recentRegistrations.map((reg) => (
                                    <tr key={reg.id} className="hover:bg-purple-50/30 transition-colors">
                                        <td className="py-3 px-4 font-mono font-bold text-[#60318e]">
                                            {reg.abstract_number}
                                        </td>
                                        <td className="py-3 px-4 font-semibold text-gray-900">
                                            {reg.first_name} {reg.last_name}
                                        </td>
                                        <td className="py-3 px-4 text-gray-700 max-w-xs truncate">
                                            {reg.presentation_title}
                                        </td>
                                        <td className="py-3 px-4 text-gray-500">
                                            {reg.thematic_topic}
                                        </td>
                                        <td className="py-3 px-4 text-gray-400 text-right">
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
        </div>
    );
}
