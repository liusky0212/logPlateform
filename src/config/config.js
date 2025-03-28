export default {
  // API配置
  api: {
    baseURL: process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000/api',
    timeout: 10000
  },

  // 日志级别配置
  logLevels: {
    error: {
      value: 'error',
      label: '错误',
      color: 'red'
    },
    warn: {
      value: 'warn',
      label: '警告',
      color: 'orange'
    },
    info: {
      value: 'info',
      label: '信息',
      color: 'blue'
    },
    debug: {
      value: 'debug',
      label: '调试',
      color: 'green'
    }
  },

  // 图表主题配置
  chartTheme: {
    primaryColor: '#1890ff',
    errorColor: '#ff4d4f',
    warningColor: '#faad14',
    successColor: '#52c41a'
  },

  // 分页配置
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: ['10', '20', '50', '100']
  },

  // 告警配置
  alert: {
    levels: ['high', 'medium', 'low'],
    notificationTypes: ['email', 'sms', 'dingtalk']
  }
} 