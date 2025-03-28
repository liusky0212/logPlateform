import { createRouter, createWebHistory } from 'vue-router'
import BasicLayout from '@/layouts/BasicLayout.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/views/LogDashboard.vue'),
        meta: { title: '仪表盘', requiresAuth: true }
      },
      {
        path: 'search',
        name: 'search',
        component: () => import('@/views/LogSearch.vue'),
        meta: { title: '日志查询', requiresAuth: true }
      },
      {
        path: 'analysis',
        name: 'analysis',
        component: () => import('@/views/LogAnalysis.vue'),
        meta: { title: '日志分析', requiresAuth: true }
      },
      {
        path: 'alert',
        name: 'alert',
        component: () => import('@/views/AlertManagement.vue'),
        meta: { title: '告警管理', requiresAuth: true }
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('@/views/SystemSettings.vue'),
        meta: { title: '系统设置', requiresAuth: true }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router 