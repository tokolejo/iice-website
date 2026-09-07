'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

/**
 * Dispatch a toast notification from anywhere in client code:
 * toast('შენახულია წარმატებით!', 'success')
 * toast('შეცდომა!', 'error')
 */
export function toast(message, type = 'success', duration = 4000) {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('admin-toast', {
            detail: { id: Date.now() + Math.random(), message, type, duration }
        }));
    }
}

export default function AdminToastContainer() {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        const handleToast = (e) => {
            const newToast = e.detail;
            setToasts((prev) => [...prev, newToast]);

            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
            }, newToast.duration || 4000);
        };

        window.addEventListener('admin-toast', handleToast);
        return () => window.removeEventListener('admin-toast', handleToast);
    }, []);

    if (toasts.length === 0) return null;

    return (
        <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
            {toasts.map((t) => {
                const isSuccess = t.type === 'success';
                const isError = t.type === 'error';
                const isInfo = t.type === 'info';

                return (
                    <div
                        key={t.id}
                        className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl shadow-xl border backdrop-blur-md transition-all duration-300 transform translate-y-0 animate-fade-in-up ${
                            isSuccess
                                ? 'bg-white/95 border-emerald-200 text-slate-800 shadow-emerald-500/10'
                                : isError
                                ? 'bg-white/95 border-red-200 text-slate-800 shadow-red-500/10'
                                : 'bg-white/95 border-purple-200 text-slate-800 shadow-purple-500/10'
                        }`}
                    >
                        <div className="flex-shrink-0 mt-0.5">
                            {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                            {isError && <AlertCircle className="w-5 h-5 text-red-500" />}
                            {isInfo && <Info className="w-5 h-5 text-[#AD49E1]" />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-900 leading-snug break-words">{t.message}</p>
                        </div>
                        <button
                            onClick={() => setToasts((prev) => prev.filter((item) => item.id !== t.id))}
                            className="text-slate-400 hover:text-slate-600 p-0.5 rounded-lg transition-colors cursor-pointer"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
