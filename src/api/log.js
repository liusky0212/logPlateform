import request from '@/utils/request'

export function searchLogs(params) {
  return request({
    url: '/logs/search',
    method: 'get',
    params
  })
}

export function getLogDetail(id) {
  return request({
    url: `/logs/${id}`,
    method: 'get'
  })
}

export function exportLogs(params) {
  return request({
    url: '/logs/export',
    method: 'get',
    params,
    responseType: 'blob'
  })
} 