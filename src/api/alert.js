import api from './index'

export const alertApi = {
  // 获取告警规则列表
  getRules: () => api.get('/alerts/rules'),
  
  // 创建告警规则
  createRule: data => api.post('/alerts/rules', data),
  
  // 更新告警规则
  updateRule: (id, data) => api.put(`/alerts/rules/${id}`, data),
  
  // 删除告警规则
  deleteRule: id => api.delete(`/alerts/rules/${id}`),
  
  // 获取告警历史
  getHistory: params => api.get('/alerts/history', { params })
} 