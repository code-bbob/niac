"use client";

import FadeIn from './FadeIn';

/**
 * StaggeredFadeIn - Animates children with staggered delays
 * Perfect for lists, grids, and sequential content
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Elements to animate
 * @param {number} props.staggerDelay - Delay between each child in ms (default: 100)
 * @param {number} props.initialDelay - Initial delay before first animation in ms (default: 0)
 * @param {number} props.duration - Animation duration in ms (default: 600)
 * @param {string} props.className - Additional CSS classes for container
 */
export default function StaggeredFadeIn({ 
  children, 
  staggerDelay = 100,
  initialDelay = 0,
  duration = 600,
  className = '',
  ...props 
}) {
  const childArray = Array.isArray(children) ? children : [children];

  return (
    <div className={className} {...props}>
      {childArray.map((child, index) => (
        <FadeIn
          key={index}
          delay={initialDelay + (index * staggerDelay)}
          duration={duration}
        >
          {child}
        </FadeIn>
      ))}
    </div>
  );
}
