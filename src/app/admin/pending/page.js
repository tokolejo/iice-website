'use client';

import { useRouter } from 'next/navigation';
import { getSupabaseBrowserClient } from '../../../lib/supabase/client';
import { Clock, LogOut, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminPendingPage() {
    const router = useRouter();

    const handleSignOut = async () => {
        const supabase = getSupabaseBrowserClient();
        if (supabase) {
            await supabase.auth.signOut();
        }
        router.push('/admin/login');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 sm:p-10 border border-purple-100 text-center animate-fade-in-up">
                <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-5">
                    <Clock className="w-8 h-8" />
                </div>

                <h1 className="text-xl sm:text-2xl font-black text-gray-900 mb-2">
                    მოთხოვნა განხილვის პროცესშია
                </h1>

                <p className="text-xs sm:text-sm text-gray-600 mb-6 leading-relaxed">
                    თქვენ წარმატებით გაიარეთ Google ავტორიზაცია. ადმინისტრატორის პანელზე წვდომისთვის საჭიროა
                    მთავარი ადმინისტრატორის (Super Admin) მიერ თქვენი პროფილის დადასტურება.
                </p>

                <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 text-xs text-[#60318e] font-semibold mb-6">
                    დადასტურების შემდეგ თქვენ შეძლებთ საიტის მონაცემების მართვას.
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={handleSignOut}
                        className="inline-flex items-center justify-center gap-2 w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-2xl text-xs sm:text-sm transition-colors cursor-pointer"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>გამოსვლა (Sign Out)</span>
                    </button>

                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 text-xs font-bold text-gray-500 hover:text-[#60318e] transition-colors py-2"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>მთავარ გვერდზე დაბრუნება</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
