import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import { setupAntd } from './plugins/antd'
import { setupErrorHandler } from './utils/error-handler'
import { setupPerformanceMonitoring } from './utils/performance'
import './router/permission'

const app = createApp(App)

setupAntd(app)
setupErrorHandler(app)
setupPerformanceMonitoring()

app.use(store)
   .use(router)
   .use(i18n)
   .mount('#app') 