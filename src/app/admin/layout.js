'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getSupabaseBrowserClient } from '../../lib/supabase/client';
import { recordAuditLog } from '../../lib/auditLogger';
import {
    LayoutDashboard,
    Calendar,
    Users,
    Building2,
    Newspaper,
    ShieldCheck,
    History,
    LogOut,
    ExternalLink,
    Menu,
    X,
    ChevronRight,
    Sparkles,
    UserCircle,
    Crown,
    Shield,
    GraduationCap
} from 'lucide-react';

export default function AdminLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [roles, setRoles] = useState(['admin']);
    const [deptName, setDeptName] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const cleanPath = pathname?.replace(/\/+$/, '') || '';
    const isAuthPage = cleanPath === '/admin/login' || cleanPath === '/admin/pending';

    useEffect(() => {
        if (isAuthPage) {
            setIsLoading(false);
            return;
        }

        async function checkUser() {
            try {
                const supabase = getSupabaseBrowserClient();
                if (!supabase) {
                    // Fallback for local preview without Supabase env
                    setUser({ email: 'tokolejo@gmail.com', name: 'Super Admin' });
                    setRoles(['super_admin']);
                    setIsLoading(false);
                    return;
                }

                const { data: { user: currentUser } } = await supabase.auth.getUser();

                if (!currentUser) {
                    setUser(null);
                    setIsLoading(false);
                    router.push('/admin/login');
                    return;
                }

                setUser(currentUser);

                if (currentUser.email?.toLowerCase() === 'tokolejo@gmail.com') {
                    setRoles(['super_admin']);
                } else {
                    const { data: profile } = await supabase
                        .from('user_profiles')
                        .select('role, roles, department_id, departments(name_ka)')
                        .eq('id', currentUser.id)
                        .maybeSingle();

                    let userRoles = [];
                    if (Array.isArray(profile?.roles) && profile.roles.length > 0) {
                        userRoles = profile.roles;
                    } else if (profile?.role) {
                        userRoles = [profile.role];
                    } else {
                        userRoles = ['pending'];
                    }
                    setRoles(userRoles);

                    if (profile?.departments?.name_ka) {
                        setDeptName(profile.departments.name_ka);
                    }
                }
            } catch (err) {
                console.warn('Admin layout auth check error:', err);
            } finally {
                setIsLoading(false);
            }
        }

        checkUser();
    }, [pathname, isAuthPage, router]);

    const handleSignOut = async () => {
        try {
            if (user?.email) {
                await recordAuditLog({
                    userEmail: user.email,
                    action: 'AUTH_SIGN_OUT',
                    tableName: 'auth.users',
                    recordId: user.id || null,
                    details: { email: user.email, timestamp: new Date().toISOString() }
                });
            }
        } catch (e) {
            console.warn('Sign out audit log notice:', e);
        }

        const supabase = getSupabaseBrowserClient();
        if (supabase) {
            await supabase.auth.signOut();
        }
        setUser(null);
        router.push('/admin/login');
    };

    // If on login or pending page, don't show the dashboard sidebar and top header
    if (isAuthPage) {
        return <>{children}</>;
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-3 border-[#60318e] border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-xs font-bold text-[#60318e] tracking-wider">იტვირთება ადმინ პანელი...</span>
                </div>
            </div>
        );
    }

    // If not authenticated, do not show sidebar
    if (!user) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-3 border-[#60318e] border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-xs font-bold text-[#60318e] tracking-wider">გადამისამართება შესვლის გვერდზე...</span>
                </div>
            </div>
        );
    }

    const isSuperAdmin = roles.includes('super_admin');
    const isAdmin = isSuperAdmin || roles.includes('admin');
    const isEditor = isAdmin || roles.includes('editor');
    const isDeptHead = isAdmin || roles.includes('department_head');
    const isConfManager = isAdmin || roles.includes('conference_manager');

    const navItems = [
        { href: '/admin', label: 'მთავარი', icon: LayoutDashboard },
        ...(isConfManager ? [{ href: '/admin/conference', label: 'კონფერენცია 2026', icon: Calendar, badge: 'Registrations' }] : []),
        ...(isDeptHead ? [{ href: '/admin/staff', label: 'თანამშრომლები', icon: Users }] : []),
        ...(isAdmin ? [{ href: '/admin/departments', label: 'განყოფილებები', icon: Building2 }] : []),
        ...(isEditor ? [{ href: '/admin/news', label: 'სიახლეები', icon: Newspaper }] : []),
        ...(isSuperAdmin ? [{ href: '/admin/users', label: 'მომხმარებლები (RBAC)', icon: ShieldCheck }] : []),
        ...(isSuperAdmin ? [{ href: '/admin/audit', label: 'აუდიტის ჟურნალი', icon: History }] : []),
    ];

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
            {/* Sidebar Desktop */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#2e0d42] text-white flex flex-col transition-transform duration-300 transform md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:inset-auto md:min-h-screen shadow-xl`}>
                {/* Brand Header */}
                <div className="p-5 border-b border-white/10 flex items-center justify-between">
                    <Link href="/admin" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-white/10 p-1 flex items-center justify-center">
                            <img src="/logo.png" alt="IICE" className="w-full h-full object-contain" />
                        </div>
                        <div>
                            <h2 className="font-black text-sm text-white tracking-wide">TSU IICE</h2>
                            <p className="text-[10px] text-[#EBD3F8]/80 font-bold uppercase tracking-wider">მართვის პორტალი</p>
                        </div>
                    </Link>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="md:hidden text-white/70 hover:text-white p-1"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* User Info Card */}
                <div className="p-4 mx-3 my-3 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 rounded-full bg-[#AD49E1]/30 border border-[#AD49E1]/50 flex items-center justify-center text-white flex-shrink-0">
                            <UserCircle className="w-5 h-5" />
                        </div>
                        <div className="overflow-hidden flex-1">
                            <p className="text-xs font-bold text-white truncate">{user?.email}</p>
                            {deptName && (
                                <p className="text-[10px] text-[#EBD3F8]/70 truncate font-medium">{deptName}</p>
                            )}
                        </div>
                    </div>
                    {/* Role Badges */}
                    <div className="flex flex-wrap gap-1.5">
                        {isSuperAdmin ? (
                            <span className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/40">
                                <Crown className="w-2.5 h-2.5 text-amber-300" />
                                <span>Super Admin</span>
                            </span>
                        ) : (
                            roles.map((r) => {
                                if (r === 'admin') {
                                    return (
                                        <span key={r} className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-purple-400/20 text-[#EBD3F8] border border-purple-400/40">
                                            <Shield className="w-2.5 h-2.5 text-[#EBD3F8]" />
                                            <span>Admin</span>
                                        </span>
                                    );
                                }
                                if (r === 'editor') {
                                    return (
                                        <span key={r} className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-blue-400/20 text-blue-200 border border-blue-400/40">
                                            <Newspaper className="w-2.5 h-2.5 text-blue-200" />
                                            <span>Editor</span>
                                        </span>
                                    );
                                }
                                if (r === 'department_head') {
                                    return (
                                        <span key={r} className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-emerald-400/20 text-emerald-200 border border-emerald-400/40">
                                            <Building2 className="w-2.5 h-2.5 text-emerald-200" />
                                            <span>Dept Head</span>
                                        </span>
                                    );
                                }
                                if (r === 'conference_manager') {
                                    return (
                                        <span key={r} className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-indigo-400/20 text-indigo-200 border border-indigo-400/40">
                                            <GraduationCap className="w-2.5 h-2.5 text-indigo-200" />
                                            <span>Conf Mgr</span>
                                        </span>
                                    );
                                }
                                return (
                                    <span key={r} className="inline-block text-[9px] font-bold uppercase px-2 py-0.5 rounded-md bg-white/10 text-white/70">
                                        {r}
                                    </span>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                                    isActive
                                        ? 'bg-[#60318e] text-white shadow-md'
                                        : 'text-white/70 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#EBD3F8]' : 'text-white/60'}`} />
                                    <span>{item.label}</span>
                                </div>
                                {item.badge && (
                                    <span className="text-[9px] bg-[#AD49E1] text-white px-2 py-0.5 rounded-full font-bold">
                                        {item.badge}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-white/10 space-y-2">
                    <Link
                        href="/"
                        target="_blank"
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                    >
                        <div className="flex items-center gap-2">
                            <ExternalLink className="w-4 h-4" />
                            <span>საიტის ნახვა (Public)</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                    </Link>

                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-300 hover:text-red-200 hover:bg-red-500/10 transition-colors cursor-pointer"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>გამოსვლა (Sign Out)</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile Top Navbar */}
                <header className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm sticky top-0 z-40">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="text-slate-700 p-1.5 rounded-lg hover:bg-slate-100"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <span className="text-xs font-black text-[#60318e] uppercase tracking-wider">IICE პორტალი</span>
                    <button
                        onClick={handleSignOut}
                        className="text-red-500 p-1.5 hover:bg-red-50 rounded-lg text-xs font-bold"
                    >
                        <LogOut className="w-4 h-4" />
                    </button>
                </header>

                {/* Main Page Body */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
