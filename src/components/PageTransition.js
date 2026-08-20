'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PageTransition({ children }) {
    const pathname = usePathname();
    const [animating, setAnimating] = useState(false);

    useEffect(() => {
        setAnimating(true);
        const timer = setTimeout(() => setAnimating(false), 200);
        return () => clearTimeout(timer);
    }, [pathname]);

    return (
        <div className={`transition-all duration-300 ease-out ${animating ? 'opacity-0 translate-y-1.5' : 'opacity-100 translate-y-0'}`}>
            {children}
        </div>
    );
}
