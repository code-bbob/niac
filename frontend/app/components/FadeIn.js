"use client";

import { useEffect, useRef, useState } from 'react';

/**
 * FadeIn component - Adds dramatic fade-in animation with scale and slide
 * Optimized for 2026 modern design with impressive effects
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to animate
 * @param {number} props.delay - Delay in milliseconds before animation starts (default: 0)
 * @param {number} props.duration - Animation duration in milliseconds (default: 900)
 * @param {boolean} props.slideUp - Enable slide-up effect (default: true)
 * @param {number} props.slideDistance - Distance to slide in pixels (default: 50)
 * @param {boolean} props.scale - Enable scale effect (default: true)
 * @param {number} props.scaleFrom - Starting scale value (default: 0.9)
 * @param {string} props.className - Additional CSS classes
 */
export default function FadeIn({ 
  children, 
  delay = 0, 
  duration = 900,
  slideUp = true,
  slideDistance = 50,
  scale = true,
  scaleFrom = 0.9,
  className = '',
  ...props 
}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      ref={elementRef}
      className={`animate-fade-in ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible 
          ? 'translateY(0) scale(1)' 
          : `translateY(${slideDistance}px) scale(${scale ? scaleFrom : 1})`,
        transition: `opacity ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1), transform ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`,
        transitionDelay: `${delay}ms`,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
