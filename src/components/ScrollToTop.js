'use client';

import { useState, useEffect } from 'react';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set the top scroll behavior
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    aria-label="Scroll to top"
                    className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-[#663191] text-white shadow-2xl hover:bg-[#AD49E1] transition-all duration-300 transform hover:scale-110 active:scale-95 animate-fade-in group border-2 border-white/20 backdrop-blur-sm"
                >
                    <svg
                        className="w-6 h-6 transform transition-transform duration-300 group-hover:-translate-y-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                    </svg>

                    {/* Subtle pulse effect */}
                    <span className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-0 group-hover:opacity-100"></span>
                </button>
            )}

            <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px) scale(0.8); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
        </>
    );
}
