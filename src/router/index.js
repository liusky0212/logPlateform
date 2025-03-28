import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/BasicLayout.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/views/LogDashboard.vue'),
        meta: { title: '仪表盘' }
      },
      {
        path: 'search',
        name: 'search',
        component: () => import('@/views/LogSearch.vue'),
        meta: { title: '日志查询' }
      },
      {
        path: 'analysis',
        name: 'analysis',
        component: () => import('@/views/LogAnalysis.vue'),
        meta: { title: '日志分析' }
      },
      {
        path: 'alert',
        name: 'alert',
        component: () => import('@/views/AlertManagement.vue'),
        meta: { title: '告警管理' }
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('@/views/SystemSettings.vue'),
        meta: { title: '系统设置' }
      }
    ]
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
}) 