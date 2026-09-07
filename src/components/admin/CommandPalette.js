'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseBrowserClient } from '../../lib/supabase/client';
import { exportDatabaseBackup } from '../../lib/backupService';
import { toast } from './AdminToast';
import {
    Search,
    LayoutDashboard,
    Calendar,
    Users,
    Building2,
    Newspaper,
    ShieldCheck,
    History,
    Database,
    FileCode,
    ExternalLink,
    PlusCircle,
    UserPlus,
    X,
    ArrowRight,
    CornerDownLeft,
    Sparkles,
    Loader2
} from 'lucide-react';

export default function CommandPalette({ isOpen, onClose, userEmail = 'admin', roles = ['admin'] }) {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const inputRef = useRef(null);

    const isSuperAdmin = roles.includes('super_admin') || userEmail.toLowerCase() === 'tokolejo@gmail.com';
    const isAdmin = isSuperAdmin || roles.includes('admin');
    const isConfManager = isAdmin || roles.includes('conference_manager');
    const isDeptHead = isAdmin || roles.includes('department_head');
    const isEditor = isAdmin || roles.includes('editor');

    // Static Navigation & Actions based on roles
    const staticActions = [
        // Navigation
        { id: 'nav-dash', title: 'მთავარი პანელი (Dashboard)', category: 'ნავიგაცია', icon: LayoutDashboard, action: () => router.push('/admin') },
        ...(isConfManager ? [{ id: 'nav-conf', title: 'კონფერენცია 2026 (რეგისტრაციები & აბსტრაქტები)', category: 'ნავიგაცია', icon: Calendar, action: () => router.push('/admin/conference') }] : []),
        ...(isDeptHead ? [{ id: 'nav-staff', title: 'თანამშრომელთა სია (Staff Directory)', category: 'ნავიგაცია', icon: Users, action: () => router.push('/admin/staff') }] : []),
        ...(isAdmin ? [{ id: 'nav-dept', title: 'განყოფილებები (Departments)', category: 'ნავიგაცია', icon: Building2, action: () => router.push('/admin/departments') }] : []),
        ...(isEditor ? [{ id: 'nav-news', title: 'სიახლეების მართვა (News)', category: 'ნავიგაცია', icon: Newspaper, action: () => router.push('/admin/news') }] : []),
        ...(isSuperAdmin ? [{ id: 'nav-users', title: 'მომხმარებლები & როლები (RBAC)', category: 'ნავიგაცია', icon: ShieldCheck, action: () => router.push('/admin/users') }] : []),
        ...(isSuperAdmin ? [{ id: 'nav-audit', title: 'უსაფრთხოების აუდიტის ჟურნალი (Audit Logs)', category: 'ნავიგაცია', icon: History, action: () => router.push('/admin/audit') }] : []),
        { id: 'nav-public', title: 'საჯარო ვებსაიტის გახსნა (Public Site)', category: 'ნავიგაცია', icon: ExternalLink, action: () => window.open('/', '_blank') },
        
        // Fast Commands
        ...(isAdmin ? [
            {
                id: 'act-backup-json',
                title: 'მონაცემთა ბაზის სრული ბექაფი (JSON Snapshot)',
                category: 'სწრაფი მოქმედება',
                icon: Database,
                action: async () => {
                    toast('ბექაფის მომზადება დაიწყო...', 'info');
                    try {
                        await exportDatabaseBackup({ format: 'json', userEmail });
                        toast('მონაცემთა ბაზის JSON Snapshot წარმატებით ჩამოიტვირთა!', 'success');
                    } catch (e) {
                        toast('ბექაფის ექსპორტი ვერ მოხერხდა: ' + e.message, 'error');
                    }
                }
            },
            {
                id: 'act-backup-sql',
                title: 'მონაცემთა ბაზის SQL DUMP Script (აღსადგენად)',
                category: 'სწრაფი მოქმედება',
                icon: FileCode,
                action: async () => {
                    toast('SQL სკრიპტის მომზადება დაიწყო...', 'info');
                    try {
                        await exportDatabaseBackup({ format: 'sql', userEmail });
                        toast('მონაცემთა ბაზის SQL DUMP წარმატებით ჩამოიტვირთა!', 'success');
                    } catch (e) {
                        toast('SQL ექსპორტი ვერ მოხერხდა: ' + e.message, 'error');
                    }
                }
            }
        ] : []),
        ...(isEditor ? [{ id: 'act-add-news', title: 'ახალი სიახლის დამატება', category: 'სწრაფი მოქმედება', icon: PlusCircle, action: () => router.push('/admin/news') }] : []),
        ...(isDeptHead ? [{ id: 'act-add-staff', title: 'ახალი თანამშრომლის დამატება', category: 'სწრაფი მოქმედება', icon: UserPlus, action: () => router.push('/admin/staff') }] : []),
    ];

    // Focus input on open
    useEffect(() => {
        if (isOpen) {
            setQuery('');
            setSelectedIndex(0);
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [isOpen]);

    // Live search in database when query >= 2 chars
    useEffect(() => {
        if (!isOpen || !query.trim() || query.trim().length < 2) {
            setSearchResults([]);
            setIsSearching(false);
            return;
        }

        const term = query.trim().toLowerCase();
        let isCancelled = false;

        async function performLiveSearch() {
            setIsSearching(true);
            try {
                const supabase = getSupabaseBrowserClient();
                if (!supabase) return;

                const [confRes, staffRes] = await Promise.all([
                    supabase
                        .from('conference_registrations_2026')
                        .select('id, abstract_number, first_name, last_name, email, presentation_title')
                        .or(`first_name.ilike.%${term}%,last_name.ilike.%${term}%,email.ilike.%${term}%,abstract_number.ilike.%${term}%,presentation_title.ilike.%${term}%`)
                        .limit(5),
                    supabase
                        .from('staff_members')
                        .select('id, first_name_ka, last_name_ka, position_ka, email')
                        .or(`first_name_ka.ilike.%${term}%,last_name_ka.ilike.%${term}%,email.ilike.%${term}%`)
                        .limit(5)
                ]);

                if (isCancelled) return;

                const results = [];

                if (confRes.data?.length) {
                    confRes.data.forEach((item) => {
                        results.push({
                            id: `conf-${item.id}`,
                            title: `[${item.abstract_number || 'IICE'}] ${item.first_name} ${item.last_name}`,
                            subtitle: item.presentation_title || item.email,
                            category: 'კონფერენცია 2026',
                            icon: Calendar,
                            action: () => {
                                router.push('/admin/conference');
                            }
                        });
                    });
                }

                if (staffRes.data?.length) {
                    staffRes.data.forEach((item) => {
                        results.push({
                            id: `staff-${item.id}`,
                            title: `${item.first_name_ka} ${item.last_name_ka}`,
                            subtitle: item.position_ka || item.email,
                            category: 'თანამშრომელი',
                            icon: Users,
                            action: () => {
                                router.push('/admin/staff');
                            }
                        });
                    });
                }

                setSearchResults(results);
            } catch (err) {
                console.warn('Command palette live search error:', err);
            } finally {
                if (!isCancelled) setIsSearching(false);
            }
        }

        const timer = setTimeout(performLiveSearch, 250);
        return () => {
            isCancelled = true;
            clearTimeout(timer);
        };
    }, [query, isOpen, router]);

    // Filter static items by query
    const filteredStatic = query.trim()
        ? staticActions.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase())
        )
        : staticActions;

    const allItems = [...searchResults, ...filteredStatic];

    // Keyboard navigation (Up, Down, Enter, Esc)
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            onClose();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex((prev) => (prev + 1) % (allItems.length || 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex((prev) => (prev - 1 + (allItems.length || 1)) % (allItems.length || 1));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (allItems[selectedIndex]) {
                allItems[selectedIndex].action();
                onClose();
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div
                className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh] transition-all"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Search Bar Header */}
                <div className="relative p-4 sm:p-5 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
                    <Search className="w-5 h-5 text-[#60318e] flex-shrink-0" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setSelectedIndex(0);
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder="მოძებნეთ გვერდი, რეგისტრაცია, თანამშრომელი ან ბრძანება..."
                        className="w-full bg-transparent border-none outline-none text-sm sm:text-base font-semibold text-slate-800 placeholder-slate-400"
                    />
                    {isSearching ? (
                        <Loader2 className="w-4 h-4 text-[#60318e] animate-spin flex-shrink-0" />
                    ) : (
                        <div className="hidden sm:flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-200/60 px-2 py-0.5 rounded-md flex-shrink-0">
                            <span>ESC</span>
                        </div>
                    )}
                    <button
                        onClick={onClose}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-600 sm:hidden"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Results List */}
                <div className="flex-1 overflow-y-auto p-2 divide-y divide-slate-50">
                    {allItems.length === 0 ? (
                        <div className="p-8 text-center">
                            <Sparkles className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                            <p className="text-xs font-bold text-slate-500">შედეგი არ მოიძებნა</p>
                            <p className="text-[11px] text-slate-400 mt-1">სცადეთ სხვა საძიებო სიტყვა</p>
                        </div>
                    ) : (
                        allItems.map((item, idx) => {
                            const Icon = item.icon;
                            const isSelected = idx === selectedIndex;

                            return (
                                <div
                                    key={item.id}
                                    onClick={() => {
                                        item.action();
                                        onClose();
                                    }}
                                    onMouseEnter={() => setSelectedIndex(idx)}
                                    className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all ${
                                        isSelected
                                            ? 'bg-[#60318e] text-white shadow-md'
                                            : 'text-slate-700 hover:bg-slate-100/80'
                                    }`}
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                            isSelected ? 'bg-white/20 text-white' : 'bg-purple-50 text-[#60318e]'
                                        }`}>
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className={`text-xs sm:text-sm font-bold truncate ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                                                {item.title}
                                            </p>
                                            {item.subtitle && (
                                                <p className={`text-[11px] truncate ${isSelected ? 'text-[#EBD3F8]' : 'text-slate-400'}`}>
                                                    {item.subtitle}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg ${
                                            isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                                        }`}>
                                            {item.category}
                                        </span>
                                        {isSelected && (
                                            <CornerDownLeft className="w-3.5 h-3.5 text-white/80" />
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Footer hints */}
                <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                            <kbd className="bg-white border border-slate-200 rounded px-1 text-[10px] font-mono">↑</kbd>
                            <kbd className="bg-white border border-slate-200 rounded px-1 text-[10px] font-mono">↓</kbd> ნავიგაცია
                        </span>
                        <span className="flex items-center gap-1">
                            <kbd className="bg-white border border-slate-200 rounded px-1 text-[10px] font-mono">↵</kbd> არჩევა
                        </span>
                    </div>
                    <span className="text-[10px] text-slate-400">
                        Ctrl+K / ⌘K
                    </span>
                </div>
            </div>
        </div>
    );
}
