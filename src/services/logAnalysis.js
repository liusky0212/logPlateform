import request from '@/utils/request'

export class LogAnalysisService {
  // 获取错误趋势数据
  static async getErrorTrends(params) {
    return request({
      url: '/analysis/error-trends',
      method: 'get',
      params
    })
  }

  // 获取性能指标数据
  static async getPerformanceMetrics(params) {
    return request({
      url: '/analysis/performance',
      method: 'get',
      params
    })
  }

  // 获取日志分布统计
  static async getLogDistribution(params) {
    return request({
      url: '/analysis/distribution',
      method: 'get',
      params
    })
  }

  // 获取异常聚类结果
  static async getErrorClusters(params) {
    return request({
      url: '/analysis/error-clusters',
      method: 'get',
      params
    })
  }
} 