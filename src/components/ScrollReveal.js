'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal wrapper component.
 * Wraps children and reveals them with animation when they enter the viewport.
 * 
 * Props:
 *   - delay: animation delay in ms (default: 0)
 *   - direction: 'up' | 'down' | 'left' | 'right' (default: 'up')
 *   - distance: distance in px (default: 30)
 *   - duration: animation duration in ms (default: 600)
 *   - className: additional CSS classes
 *   - as: HTML element type (default: 'div')
 */
export default function ScrollReveal({
    children,
    delay = 0,
    direction = 'up',
    distance = 30,
    duration = 600,
    className = '',
    as: Component = 'div',
    ...props
}) {
    const ref = useRef(null);
    const [isRevealed, setIsRevealed] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsRevealed(true);
                    observer.unobserve(element);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -30px 0px',
            }
        );

        observer.observe(element);

        return () => observer.unobserve(element);
    }, []);

    const getTransform = () => {
        if (isRevealed) return 'translate3d(0, 0, 0)';
        switch (direction) {
            case 'up': return `translate3d(0, ${distance}px, 0)`;
            case 'down': return `translate3d(0, -${distance}px, 0)`;
            case 'left': return `translate3d(${distance}px, 0, 0)`;
            case 'right': return `translate3d(-${distance}px, 0, 0)`;
            default: return `translate3d(0, ${distance}px, 0)`;
        }
    };

    const style = {
        opacity: isRevealed ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: 'opacity, transform',
    };

    return (
        <Component
            ref={ref}
            className={className}
            style={style}
            {...props}
        >
            {children}
        </Component>
    );
}
