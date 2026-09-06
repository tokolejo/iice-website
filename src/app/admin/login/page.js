'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getSupabaseBrowserClient } from '../../../lib/supabase/client';
import { ShieldCheck, AlertCircle } from 'lucide-react';

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const next = searchParams.get('next') || '/admin';
    const errorParam = searchParams.get('error');

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (errorParam === 'auth_failed') {
            setErrorMessage('ავტორიზაცია ვერ მოხერხდა. გთხოვთ სცადოთ თავიდან.');
        }
    }, [errorParam]);

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        setErrorMessage('');

        try {
            const supabase = getSupabaseBrowserClient();

            if (!supabase) {
                setErrorMessage('Supabase გარემოს ცვლადები ჯერ არ არის კონფიგურირებული (.env.local).');
                setIsLoading(false);
                return;
            }

            const origin = window.location.origin;
            const redirectTo = `${origin}/auth/callback?next=${encodeURIComponent(next)}`;

            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo,
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent',
                    },
                },
            });

            if (error) {
                setErrorMessage(error.message);
                setIsLoading(false);
            }
        } catch (err) {
            setErrorMessage(err.message || 'დაფიქსირდა შეცდომა');
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border border-purple-100 text-center animate-fade-in-up">
            {/* Logo & Badge */}
            <div className="w-16 h-16 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center mx-auto mb-5 shadow-sm">
                <img src="/logo.png" alt="TSU IICE Logo" className="w-12 h-12 object-contain" />
            </div>

            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-extrabold bg-purple-100 text-[#60318e] uppercase tracking-wider mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                IICE Administration Portal
            </span>

            <h1 className="text-2xl font-black text-gray-900 mb-2">
                ადმინისტრატორის შესვლა
            </h1>
            <p className="text-xs text-gray-500 mb-8">
                თსუ რაფიელ აგლაძის ინსტიტუტის ვებ-გვერდის მართვის პანელი
            </p>

            {errorMessage && (
                <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 text-left">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                </div>
            )}

            {/* Google Sign-in Button */}
            <button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 font-bold px-5 py-3.5 rounded-2xl shadow-sm hover:shadow-md transition-all text-sm cursor-pointer disabled:opacity-50"
            >
                {isLoading ? (
                    <div className="w-5 h-5 border-2 border-[#60318e] border-t-transparent rounded-full animate-spin"></div>
                ) : (
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                    </svg>
                )}
                <span>შესვლა Google-ით</span>
            </button>

            <p className="mt-8 text-[11px] text-gray-400">
                შესვლა დაშვებულია მხოლოდ ავტორიზებული პერსონალისთვის.
                პირველი შესვლის შემდეგ თქვენი ანგარიში გადავა დამოწმების პროცესში.
            </p>
        </div>
    );
}

export default function AdminLoginPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#2e0d42] via-[#60318e] to-[#0f172a] flex items-center justify-center p-4">
            <Suspense fallback={
                <div className="w-10 h-10 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
            }>
                <LoginForm />
            </Suspense>
        </div>
    );
}
