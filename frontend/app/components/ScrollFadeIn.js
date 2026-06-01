"use client";

import { useEffect, useRef, useState } from 'react';

/**
 * ScrollFadeIn - Animates content when it enters viewport with dramatic effects
 * Uses Intersection Observer for performance
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to animate
 * @param {number} props.duration - Animation duration in ms (default: 1000)
 * @param {number} props.slideDistance - Distance to slide in pixels (default: 60)
 * @param {number} props.threshold - Intersection threshold 0-1 (default: 0.1)
 * @param {boolean} props.scale - Enable scale effect (default: true)
 * @param {string} props.className - Additional CSS classes
 */
export default function ScrollFadeIn({ 
  children, 
  duration = 1000,
  slideDistance = 60,
  threshold = 0.1,
  scale = true,
  className = '',
  ...props 
}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '50px' }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold]);

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible 
          ? 'translateY(0) scale(1)' 
          : `translateY(${slideDistance}px) scale(${scale ? 0.92 : 1})`,
        transition: `opacity ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1), transform ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
