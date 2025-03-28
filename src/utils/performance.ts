import * as Sentry from '@sentry/vue'

export function setupPerformanceMonitoring() {
  if (process.env.VUE_APP_ENV === 'production') {
    // 监控页面加载性能
    window.addEventListener('load', () => {
      const timing = performance.getEntriesByType('navigation')[0]
      const metrics = {
        dns: timing.domainLookupEnd - timing.domainLookupStart,
        tcp: timing.connectEnd - timing.connectStart,
        ttfb: timing.responseStart - timing.requestStart,
        domReady: timing.domContentLoadedEventEnd - timing.navigationStart,
        load: timing.loadEventEnd - timing.navigationStart
      }
      
      Sentry.addBreadcrumb({
        category: 'performance',
        message: 'Page Load Metrics',
        data: metrics
      })
    })

    // 监控资源加载性能
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.duration > 1000) { // 加载时间超过1秒的资源
          Sentry.addBreadcrumb({
            category: 'performance',
            message: 'Slow Resource Load',
            data: {
              name: entry.name,
              duration: entry.duration,
              type: entry.initiatorType
            }
          })
        }
      })
    })

    observer.observe({ entryTypes: ['resource'] })
  }
} 