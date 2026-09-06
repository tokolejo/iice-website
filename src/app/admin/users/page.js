'use client';

import { useState, useEffect } from 'react';
import { getSupabaseBrowserClient } from '../../../lib/supabase/client';
import { logAudit } from '../../../lib/supabase/admin';
import {
    ShieldCheck,
    Search,
    UserCheck,
    UserX,
    Clock,
    AlertCircle,
    CheckCircle2,
    ShieldAlert
} from 'lucide-react';

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [actionMessage, setActionMessage] = useState('');

    const loadUsers = async () => {
        setIsLoading(true);
        try {
            const supabase = getSupabaseBrowserClient();
            if (!supabase) {
                // Mock preview
                setUsers([
                    {
                        id: 'usr-1',
                        email: 'tokolejo@gmail.com',
                        full_name: 'Tokolejo (Super Admin)',
                        role: 'super_admin',
                        is_active: true,
                        created_at: new Date().toISOString(),
                    },
                    {
                        id: 'usr-2',
                        email: 'researcher@tsu.ge',
                        full_name: 'TSU Researcher',
                        role: 'pending',
                        is_active: true,
                        created_at: new Date(Date.now() - 86400000).toISOString(),
                    }
                ]);
                setIsLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from('user_profiles')
                .select('*')
                .order('created_at', { ascending: false });

            if (data) {
                setUsers(data);
            }
        } catch (err) {
            console.warn('Load users error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const filteredUsers = users.filter(u => {
        const full = `${u.full_name || ''} ${u.email || ''}`.toLowerCase();
        return full.includes(searchQuery.toLowerCase());
    });

    const updateRole = async (userId, userEmail, newRole) => {
        if (userEmail?.toLowerCase() === 'tokolejo@gmail.com') {
            alert('Super Admin როლის შეცვლა დაუშვებელია!');
            return;
        }

        try {
            const supabase = getSupabaseBrowserClient();
            if (supabase) {
                const { error } = await supabase
                    .from('user_profiles')
                    .update({ role: newRole })
                    .eq('id', userId);

                if (error) throw error;

                await logAudit({
                    action: newRole === 'admin' ? 'PROMOTE_TO_ADMIN' : 'CHANGE_USER_ROLE',
                    tableName: 'user_profiles',
                    recordId: userId,
                    details: { email: userEmail, new_role: newRole },
                });
            }

            setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
            setActionMessage(`მომხმარებელ ${userEmail}-ს წარმატებით მიენიჭა როლი: ${newRole}`);
            setTimeout(() => setActionMessage(''), 3000);
        } catch (err) {
            console.error('Update role error:', err);
            alert(err.message || 'შეცდომა როლის განახლებისას');
        }
    };

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div>
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-3">
                    <ShieldCheck className="w-7 h-7 text-[#60318e]" />
                    მომხმარებლებისა და უფლებების მართვა (RBAC)
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                    Google Auth-ით დარეგისტრირებული ადმინისტრატორები და უფლებები (Super Admin Only)
                </p>
            </div>

            {actionMessage && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>{actionMessage}</span>
                </div>
            )}

            {/* Search */}
            <div className="bg-white rounded-2xl p-4 border border-purple-100 shadow-sm">
                <div className="relative w-full">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="ძიება: სახელი, იმეილი..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#AD49E1]"
                    />
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-3xl border border-purple-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-gray-600 font-bold border-b border-slate-200 uppercase tracking-wider">
                            <tr>
                                <th className="py-3.5 px-4">სახელი / იმეილი</th>
                                <th className="py-3.5 px-4">როლი (Role)</th>
                                <th className="py-3.5 px-4">რეგისტრაციის თარიღი</th>
                                <th className="py-3.5 px-4 text-right">მოქმედება</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={4} className="py-12 text-center text-gray-400">
                                        <div className="w-6 h-6 border-2 border-[#60318e] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                                        იტვირთება მომხმარებლები...
                                    </td>
                                </tr>
                            ) : filteredUsers.length > 0 ? (
                                filteredUsers.map((u) => {
                                    const isSuperAdminUser = u.email?.toLowerCase() === 'tokolejo@gmail.com';
                                    return (
                                        <tr key={u.id} className="hover:bg-purple-50/40 transition-colors">
                                            <td className="py-3.5 px-4">
                                                <div className="font-bold text-gray-900">
                                                    {u.full_name || u.email}
                                                </div>
                                                <div className="text-[11px] text-gray-400">{u.email}</div>
                                            </td>
                                            <td className="py-3.5 px-4 whitespace-nowrap">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                                    isSuperAdminUser || u.role === 'super_admin'
                                                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                                        : u.role === 'admin'
                                                        ? 'bg-purple-100 text-[#60318e] border border-purple-200'
                                                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                                                }`}>
                                                    {isSuperAdminUser || u.role === 'super_admin'
                                                        ? 'Super Admin'
                                                        : u.role === 'admin'
                                                        ? 'Admin'
                                                        : 'Pending (მოლოდინში)'}
                                                </span>
                                            </td>
                                            <td className="py-3.5 px-4 text-gray-500 whitespace-nowrap">
                                                {u.created_at ? new Date(u.created_at).toLocaleDateString('ka-GE') : '—'}
                                            </td>
                                            <td className="py-3.5 px-4 text-right whitespace-nowrap">
                                                {isSuperAdminUser ? (
                                                    <span className="text-[11px] text-gray-400 italic">დაცულია</span>
                                                ) : (
                                                    <div className="flex items-center justify-end gap-2">
                                                        {u.role !== 'admin' ? (
                                                            <button
                                                                onClick={() => updateRole(u.id, u.email, 'admin')}
                                                                className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-xl text-[11px] transition-colors cursor-pointer"
                                                            >
                                                                <UserCheck className="w-3.5 h-3.5" />
                                                                <span>დადასტურება (Admin)</span>
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => updateRole(u.id, u.email, 'pending')}
                                                                className="inline-flex items-center gap-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-3 py-1.5 rounded-xl text-[11px] transition-colors cursor-pointer"
                                                            >
                                                                <UserX className="w-3.5 h-3.5" />
                                                                <span>როლის ჩამორთმევა</span>
                                                            </button>
                                                        )}
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={4} className="py-12 text-center text-gray-400">
                                        მომხმარებლები ვერ მოიძებნა.
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
