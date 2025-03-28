import * as Sentry from '@sentry/vue'
import { message } from 'ant-design-vue'

export function setupErrorHandler(app) {
  if (process.env.VUE_APP_ENV === 'production') {
    Sentry.init({
      app,
      dsn: process.env.VUE_APP_SENTRY_DSN,
      environment: process.env.VUE_APP_ENV,
      integrations: [
        new Sentry.BrowserTracing({
          routingInstrumentation: Sentry.vueRouterInstrumentation(router)
        })
      ],
      tracesSampleRate: 1.0
    })
  }

  app.config.errorHandler = (err, vm, info) => {
    console.error('Vue Error:', err, info)
    message.error('系统错误，请稍后重试')
    
    if (process.env.VUE_APP_ENV === 'production') {
      Sentry.captureException(err)
    }
  }

  window.onerror = function(msg, url, line, col, error) {
    console.error('Global Error:', error)
    if (process.env.VUE_APP_ENV === 'production') {
      Sentry.captureException(error)
    }
  }
} 