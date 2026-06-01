// Web Vitals Performance Tracking
export function reportWebVitals(metric) {
  // Core Web Vitals
  const thresholds = {
    'LCP': 2500,      // Largest Contentful Paint
    'FID': 100,       // First Input Delay
    'CLS': 0.1,       // Cumulative Layout Shift
    'TTFB': 600,      // Time to First Byte
  };

  const isGood = metric.value <= thresholds[metric.name];

  // Send to analytics service
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    // Only track on production
    const data = {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
      isFinal: metric.isFinal,
    };

    // Send to analytics endpoint
    navigator.sendBeacon('/api/analytics', JSON.stringify(data));

    // Log to console in development
    console.log(`[WEB VITALS] ${metric.name}: ${metric.value.toFixed(2)}ms - ${isGood ? '✓ GOOD' : '✗ NEEDS IMPROVEMENT'}`);
  }
}
