'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SeminarsRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/news?category=seminars');
    }, [router]);

    return (
        <div className="min-h-screen bg-[#FAF9FF] flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#AD49E1]"></div>
        </div>
    );
}
