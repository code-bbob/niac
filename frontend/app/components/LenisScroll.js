'use client';

import { useEffect } from 'react';

export default function LenisScroll() {
  useEffect(() => {
    // Dynamically import Lenis only on client side
    const initLenis = async () => {
      try {
        const Lenis = (await import('lenis')).default;

        const lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: 'vertical',
          gestureDirection: 'vertical',
          smooth: true,
          smoothTouch: false,
          touchMultiplier: 2,
        });

        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
          lenis.destroy();
        };
      } catch (error) {
        console.log('Lenis not available, smooth scroll disabled');
      }
    };

    initLenis();
  }, []);

  return null;
}
