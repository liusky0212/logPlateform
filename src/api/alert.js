import request from '@/utils/request'

export function getAlertRules() {
  return request({
    url: '/alert/rules',
    method: 'get'
  })
}

export function createAlertRule(data) {
  return request({
    url: '/alert/rules',
    method: 'post',
    data
  })
}

export function updateAlertRule(id, data) {
  return request({
    url: `/alert/rules/${id}`,
    method: 'put',
    data
  })
}

export function deleteAlertRule(id) {
  return request({
    url: `/alert/rules/${id}`,
    method: 'delete'
  })
}

export function getAlertHistory(params) {
  return request({
    url: '/alert/history',
    method: 'get',
    params
  })
} 