'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export default function AdminModal({
    isOpen,
    onClose,
    title,
    subtitle,
    children,
    footer,
    maxWidth = 'max-w-2xl',
    icon: Icon
}) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Close on Escape key
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen || !mounted) return null;

    const modalContent = (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-slate-950/50 backdrop-blur-sm animate-fade-in transition-all"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
            role="dialog"
            aria-modal="true"
        >
            <div
                className={`bg-white text-slate-900 rounded-3xl shadow-2xl w-full ${maxWidth} flex flex-col relative border border-purple-100 max-h-[90vh] animate-scale-in overflow-hidden`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Fixed Header */}
                <div className="px-6 py-4 sm:py-5 border-b border-slate-100 flex items-center justify-between flex-shrink-0 bg-slate-50/70">
                    <div className="flex items-center gap-3">
                        {Icon && (
                            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#60318e] flex items-center justify-center flex-shrink-0">
                                <Icon className="w-5 h-5" />
                            </div>
                        )}
                        <div>
                            <h2 className="text-lg sm:text-xl font-black text-gray-900 leading-tight">
                                {title}
                            </h2>
                            {subtitle && (
                                <p className="text-xs text-gray-500 font-medium mt-0.5">
                                    {subtitle}
                                </p>
                            )}
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-slate-200/60 transition-colors cursor-pointer"
                        title="დახურვა (Esc)"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Scrollable Body */}
                <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-4">
                    {children}
                </div>

                {/* Fixed Footer (Optional) */}
                {footer && (
                    <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3 flex-shrink-0 bg-slate-50/70">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
