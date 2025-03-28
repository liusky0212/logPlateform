import api from './index'

export const logApi = {
  // 日志查询
  search: params => api.get('/logs/search', { params }),
  
  // 日志分析
  analyze: params => api.post('/logs/analyze', params),
  
  // 获取趋势数据
  getTrend: params => api.get('/logs/trend', { params }),
  
  // 获取分布数据
  getDistribution: params => api.get('/logs/distribution', { params }),
  
  // 获取TOP错误
  getTopErrors: params => api.get('/logs/top-errors', { params })
} 