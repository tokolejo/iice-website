'use client';

import { useState, useEffect } from 'react';
import { getSupabaseBrowserClient } from '../../../lib/supabase/client';
import { logAudit } from '../../../lib/supabase/admin';
import { departmentsData } from '../../../data';
import {
    ShieldCheck,
    Search,
    UserCheck,
    UserX,
    CheckCircle2,
    ShieldAlert,
    Edit3,
    Building2,
    X,
    Check,
    AlertCircle,
    User,
    Key,
    Crown,
    Shield,
    Newspaper,
    GraduationCap,
    Clock
} from 'lucide-react';

const AVAILABLE_ROLES = [
    {
        id: 'super_admin',
        name: 'სუპერ ადმინისტრატორი (Super Admin)',
        desc: 'სრული შეუზღუდავი წვდომა სისტემის ყველა მოდულზე და როლების მართვაზე',
        badgeClass: 'bg-amber-100 text-amber-900 border border-amber-300',
        icon: Crown,
    },
    {
        id: 'admin',
        name: 'ზოგადი ადმინისტრატორი (Admin)',
        desc: 'სრული წვდომა საიტის მართვაზე (სიახლეები, თანამშრომლები, განყოფილებები, კონფერენცია)',
        badgeClass: 'bg-purple-100 text-purple-900 border border-purple-300',
        icon: Shield,
    },
    {
        id: 'editor',
        name: 'სიახლეების რედაქტორი (News Editor)',
        desc: 'სიახლეებისა და მედია მასალების შექმნა, რედაქტირება და გამოქვეყნება (/admin/news)',
        badgeClass: 'bg-blue-100 text-blue-900 border border-blue-300',
        icon: Newspaper,
    },
    {
        id: 'department_head',
        name: 'განყოფილების ხელმძღვანელი (Department Head)',
        desc: 'მხოლოდ საკუთარი განყოფილების თანამშრომლების მართვა, პროფილების დამატება/შეცვლა (/admin/staff)',
        badgeClass: 'bg-emerald-100 text-emerald-900 border border-emerald-300',
        icon: Building2,
    },
    {
        id: 'conference_manager',
        name: 'კონფერენციის მენეჯერი (Conference Manager)',
        desc: 'კონფერენცია 2026-ის რეგისტრირებული მონაწილეებისა და თეზისების მართვა (/admin/conference)',
        badgeClass: 'bg-indigo-100 text-indigo-900 border border-indigo-300',
        icon: GraduationCap,
    },
];

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [actionMessage, setActionMessage] = useState('');

    // Modal state for role management
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalRoles, setModalRoles] = useState([]);
    const [modalDeptId, setModalDeptId] = useState('');
    const [modalIsActive, setModalIsActive] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [modalError, setModalError] = useState('');

    // Close modal on ESC key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setIsRoleModalOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const loadData = async () => {
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
                        roles: ['super_admin'],
                        department_id: null,
                        is_active: true,
                        created_at: new Date().toISOString(),
                    },
                    {
                        id: 'usr-2',
                        email: 'researcher@tsu.ge',
                        full_name: 'TSU Researcher',
                        role: 'editor',
                        roles: ['editor', 'conference_manager'],
                        department_id: null,
                        is_active: true,
                        created_at: new Date(Date.now() - 86400000).toISOString(),
                    }
                ]);
                setDepartments(departmentsData);
                setIsLoading(false);
                return;
            }

            const [usersRes, deptsRes] = await Promise.all([
                supabase
                    .from('user_profiles')
                    .select('*, departments(name_ka)')
                    .order('created_at', { ascending: false }),
                supabase
                    .from('departments')
                    .select('id, name_ka, name_en')
                    .order('order_index', { ascending: true })
            ]);

            if (deptsRes.data && deptsRes.data.length > 0) {
                setDepartments(deptsRes.data);
            } else {
                setDepartments(departmentsData);
            }

            if (usersRes.data) {
                setUsers(usersRes.data);
            }
        } catch (err) {
            console.warn('Load users error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const filteredUsers = users.filter(u => {
        const full = `${u.full_name || ''} ${u.email || ''}`.toLowerCase();
        return full.includes(searchQuery.toLowerCase());
    });

    const openRoleModal = (user) => {
        if (user.email?.toLowerCase() === 'tokolejo@gmail.com') {
            alert('tokolejo@gmail.com არის პირველადი Super Admin და მისი როლები დაცულია!');
            return;
        }

        setSelectedUser(user);
        let currentRoles = [];
        if (Array.isArray(user.roles) && user.roles.length > 0) {
            currentRoles = [...user.roles];
        } else if (user.role) {
            currentRoles = [user.role];
        } else {
            currentRoles = ['pending'];
        }

        setModalRoles(currentRoles.filter(r => r !== 'pending'));
        setModalDeptId(user.department_id || '');
        setModalIsActive(user.is_active !== false);
        setModalError('');
        setIsRoleModalOpen(true);
    };

    const toggleRole = (roleId) => {
        setModalRoles(prev => {
            if (prev.includes(roleId)) {
                return prev.filter(r => r !== roleId);
            } else {
                return [...prev, roleId];
            }
        });
    };

    const handleSaveRoles = async () => {
        if (!selectedUser) return;
        setModalError('');

        if (modalRoles.includes('department_head') && !modalDeptId) {
            setModalError('განყოფილების ხელმძღვანელის როლისთვის სავალდებულოა მიუთითოთ კონკრეტული განყოფილება!');
            return;
        }

        setIsSaving(true);
        try {
            const finalRoles = modalRoles.length > 0 ? modalRoles : ['pending'];
            const primaryRole = finalRoles.includes('super_admin')
                ? 'super_admin'
                : finalRoles.includes('admin')
                ? 'admin'
                : finalRoles.includes('department_head')
                ? 'department_head'
                : finalRoles.includes('editor')
                ? 'editor'
                : finalRoles.includes('conference_manager')
                ? 'conference_manager'
                : 'pending';

            const deptToSave = finalRoles.includes('department_head') ? modalDeptId : null;

            const supabase = getSupabaseBrowserClient();
            if (supabase) {
                const { error } = await supabase
                    .from('user_profiles')
                    .update({
                        roles: finalRoles,
                        role: primaryRole,
                        department_id: deptToSave,
                        is_active: modalIsActive,
                    })
                    .eq('id', selectedUser.id);

                if (error) throw error;

                await logAudit({
                    action: 'UPDATE_USER_ROLES',
                    tableName: 'user_profiles',
                    recordId: selectedUser.id,
                    details: {
                        email: selectedUser.email,
                        roles: finalRoles,
                        primary_role: primaryRole,
                        department_id: deptToSave,
                        is_active: modalIsActive
                    },
                });
            }

            // Update local state
            setUsers(prev => prev.map(u => {
                if (u.id === selectedUser.id) {
                    const matchedDept = departments.find(d => d.id === deptToSave);
                    return {
                        ...u,
                        roles: finalRoles,
                        role: primaryRole,
                        department_id: deptToSave,
                        departments: matchedDept ? { name_ka: matchedDept.name_ka || matchedDept.name } : null,
                        is_active: modalIsActive,
                    };
                }
                return u;
            }));

            setActionMessage(`მომხმარებელ ${selectedUser.email}-ს წარმატებით განუახლდა როლები და წვდომები!`);
            setTimeout(() => setActionMessage(''), 4000);
            setIsRoleModalOpen(false);
        } catch (err) {
            console.error('Save roles error:', err);
            setModalError(err.message || 'შეცდომა როლების განახლებისას');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div>
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-3">
                    <ShieldCheck className="w-7 h-7 text-[#60318e]" />
                    მომხმარებლებისა და როლების მართვა (Multi-Role RBAC)
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                    Google OAuth-ით ავტორიზებული მომხმარებლებისთვის მრავალროლიანი წვდომების მინიჭება (Super Admin Only)
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
                                <th className="py-3.5 px-4">მომხმარებელი</th>
                                <th className="py-3.5 px-4">მინიჭებული როლები</th>
                                <th className="py-3.5 px-4">სტატუსი</th>
                                <th className="py-3.5 px-4">რეგისტრაცია</th>
                                <th className="py-3.5 px-4 text-right">მოქმედება</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-gray-400">
                                        <div className="w-6 h-6 border-2 border-[#60318e] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                                        იტვირთება მომხმარებლები...
                                    </td>
                                </tr>
                            ) : filteredUsers.length > 0 ? (
                                filteredUsers.map((u) => {
                                    const isSuperAdminUser = u.email?.toLowerCase() === 'tokolejo@gmail.com';
                                    const userRoles = Array.isArray(u.roles) && u.roles.length > 0
                                        ? u.roles
                                        : (u.role ? [u.role] : ['pending']);

                                    return (
                                        <tr key={u.id} className="hover:bg-purple-50/40 transition-colors">
                                            <td className="py-3.5 px-4">
                                                <div className="font-bold text-gray-900">
                                                    {u.full_name || u.email}
                                                </div>
                                                <div className="text-[11px] text-gray-400">{u.email}</div>
                                            </td>
                                            <td className="py-3.5 px-4">
                                                <div className="flex flex-wrap gap-1.5 items-center">
                                                    {isSuperAdminUser ? (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300">
                                                            <Crown className="w-3 h-3 text-amber-600" />
                                                            <span>Super Admin</span>
                                                        </span>
                                                    ) : userRoles.length === 0 || (userRoles.length === 1 && userRoles[0] === 'pending') ? (
                                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                                                            <Clock className="w-3 h-3 text-slate-400" />
                                                            <span>მოლოდინში (უფლებების გარეშე)</span>
                                                        </span>
                                                    ) : (
                                                        userRoles.map(r => {
                                                            const roleInfo = AVAILABLE_ROLES.find(ar => ar.id === r);
                                                            if (!roleInfo) {
                                                                return (
                                                                    <span key={r} className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-700">
                                                                        {r}
                                                                    </span>
                                                                );
                                                            }
                                                            const RoleIcon = roleInfo.icon;
                                                            return (
                                                                <span
                                                                    key={r}
                                                                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${roleInfo.badgeClass}`}
                                                                >
                                                                    <RoleIcon className="w-3 h-3" />
                                                                    <span>{roleInfo.name.split(' ')[0]}</span>
                                                                    {r === 'department_head' && (u.departments?.name_ka || u.department_id) && (
                                                                        <span className="ml-1 text-[9px] font-normal opacity-80">
                                                                            ({u.departments?.name_ka || 'მიმაგრებული'})
                                                                        </span>
                                                                    )}
                                                                </span>
                                                            );
                                                        })
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-3.5 px-4 whitespace-nowrap">
                                                {u.is_active !== false ? (
                                                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                        აქტიური
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                                        დაბლოკილი
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-3.5 px-4 text-gray-500 whitespace-nowrap">
                                                {u.created_at ? new Date(u.created_at).toLocaleDateString('ka-GE') : '—'}
                                            </td>
                                            <td className="py-3.5 px-4 text-right whitespace-nowrap">
                                                {isSuperAdminUser ? (
                                                    <span className="text-[11px] text-amber-700 font-bold italic bg-amber-50 px-2 py-1 rounded-lg">
                                                        დაცული Super Admin
                                                    </span>
                                                ) : (
                                                    <button
                                                        onClick={() => openRoleModal(u)}
                                                        className="inline-flex items-center gap-1.5 bg-[#60318e] hover:bg-[#4a2470] text-white font-bold px-3 py-1.5 rounded-xl text-[11px] shadow-sm transition-all cursor-pointer"
                                                    >
                                                        <Key className="w-3.5 h-3.5 text-[#EBD3F8]" />
                                                        <span>როლების მართვა</span>
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-gray-400">
                                        მომხმარებლები ვერ მოიძებნა.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Multi-Role Assignment Modal */}
            {isRoleModalOpen && selectedUser && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/45 backdrop-blur-md animate-fade-in transition-all"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setIsRoleModalOpen(false);
                    }}
                >
                    <div
                        className="bg-white rounded-3xl max-w-xl w-full p-5 sm:p-7 shadow-2xl border border-purple-100 overflow-y-auto max-h-[90vh] animate-scale-in"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                            <div>
                                <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                                    <Key className="w-5 h-5 text-[#60318e]" />
                                    როლებისა და წვდომების მინიჭება
                                </h3>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    მომხმარებელი: <strong className="text-gray-800">{selectedUser.full_name || selectedUser.email}</strong> ({selectedUser.email})
                                </p>
                            </div>
                            <button
                                onClick={() => setIsRoleModalOpen(false)}
                                className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {modalError && (
                            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                <span>{modalError}</span>
                            </div>
                        )}

                        {/* Roles Selection (Checkboxes) */}
                        <div className="space-y-3 mb-5">
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                                მონიშნეთ უფლებამოსილებები (შესაძლებელია რამდენიმეს არჩევა):
                            </label>

                            {AVAILABLE_ROLES.map((roleItem) => {
                                const isChecked = modalRoles.includes(roleItem.id);
                                return (
                                    <div
                                        key={roleItem.id}
                                        onClick={() => toggleRole(roleItem.id)}
                                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                                            isChecked
                                                ? 'bg-purple-50/70 border-[#AD49E1] shadow-xs'
                                                : 'bg-white border-gray-200 hover:border-purple-200 hover:bg-slate-50'
                                        }`}
                                    >
                                        <div className={`w-5 h-5 rounded-lg border mt-0.5 flex items-center justify-center transition-colors ${
                                            isChecked ? 'bg-[#60318e] border-[#60318e] text-white' : 'border-gray-300 bg-white'
                                        }`}>
                                            {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <roleItem.icon className="w-4 h-4 text-[#60318e]" />
                                                <span className="text-xs font-extrabold text-gray-900">{roleItem.name}</span>
                                            </div>
                                            <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">{roleItem.desc}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Department Selection (Shown only when Department Head is checked) */}
                        {modalRoles.includes('department_head') && (
                            <div className="mb-5 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 animate-fade-in">
                                <label className="block text-xs font-bold text-emerald-900 mb-1 flex items-center gap-1.5">
                                    <Building2 className="w-4 h-4 text-emerald-700" />
                                    განყოფილების არჩევა (ხელმძღვანელისთვის):
                                </label>
                                <p className="text-[11px] text-emerald-700 mb-2">
                                    მომხმარებელი შეძლებს მხოლოდ ამ განყოფილების თანამშრომლების დამატებასა და რედაქტირებას.
                                </p>
                                <select
                                    value={modalDeptId}
                                    onChange={(e) => setModalDeptId(e.target.value)}
                                    className="w-full text-xs font-bold p-2.5 rounded-xl border border-emerald-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                >
                                    <option value="">-- აირჩიეთ განყოფილება --</option>
                                    {departments.map((dept) => (
                                        <option key={dept.id} value={dept.id}>
                                            {dept.name_ka || dept.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Active Status Checkbox */}
                        <div className="mb-6 p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                            <div>
                                <span className="text-xs font-bold text-gray-800">ანგარიშის სტატუსი</span>
                                <p className="text-[11px] text-gray-500">მონიშნეთ ანგარიშის აქტიურობისთვის (გამორთვა დაბლოკავს წვდომას)</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={modalIsActive}
                                onChange={(e) => setModalIsActive(e.target.checked)}
                                className="w-4 h-4 accent-[#60318e] cursor-pointer"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={() => setModalRoles([])}
                                className="text-[11px] font-bold text-red-600 hover:text-red-700 hover:underline cursor-pointer"
                            >
                                ყველა როლის ჩამორთმევა (Pending)
                            </button>

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsRoleModalOpen(false)}
                                    className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                                >
                                    გაუქმება
                                </button>
                                <button
                                    type="button"
                                    disabled={isSaving}
                                    onClick={handleSaveRoles}
                                    className="px-5 py-2 rounded-xl text-xs font-bold bg-[#60318e] hover:bg-[#4a2470] text-white shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                                >
                                    {isSaving ? (
                                        <>
                                            <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>ინახება...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Check className="w-4 h-4" />
                                            <span>შენახვა</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
