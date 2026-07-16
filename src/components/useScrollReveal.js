'use client';

import { useEffect, useRef } from 'react';

/**
 * Custom hook that uses IntersectionObserver to add a 'revealed' class
 * to elements when they scroll into the viewport.
 * 
 * Usage:
 *   const ref = useScrollReveal();
 *   <div ref={ref} className="scroll-reveal">...</div>
 */
export default function useScrollReveal(options = {}) {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Find all children with .scroll-reveal class, or use element itself
        const targets = element.querySelectorAll('.scroll-reveal');
        if (targets.length === 0 && element.classList.contains('scroll-reveal')) {
            targets = [element];
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target); // Only animate once
                    }
                });
            },
            {
                threshold: options.threshold || 0.1,
                rootMargin: options.rootMargin || '0px 0px -40px 0px',
            }
        );

        targets.forEach((target) => observer.observe(target));

        return () => {
            targets.forEach((target) => observer.unobserve(target));
        };
    }, [options.threshold, options.rootMargin]);

    return ref;
}
