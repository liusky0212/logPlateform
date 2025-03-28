import { logApi } from '@/api/log'

export const log = {
  namespaced: true,
  
  state: {
    searchParams: {
      timeRange: [],
      level: null,
      keyword: ''
    },
    logList: [],
    trendData: [],
    distributionData: [],
    topErrors: []
  },
  
  mutations: {
    SET_SEARCH_PARAMS(state, params) {
      state.searchParams = params
    },
    SET_LOG_LIST(state, list) {
      state.logList = list
    },
    SET_TREND_DATA(state, data) {
      state.trendData = data
    },
    SET_DISTRIBUTION_DATA(state, data) {
      state.distributionData = data
    },
    SET_TOP_ERRORS(state, data) {
      state.topErrors = data
    }
  },
  
  actions: {
    async searchLogs({ commit }, params) {
      try {
        const result = await logApi.search(params)
        commit('SET_LOG_LIST', result.data)
        return result
      } catch (error) {
        throw error
      }
    },
    
    async analyzeLogs({ commit }, params) {
      try {
        const [trend, distribution, topErrors] = await Promise.all([
          logApi.getTrend(params),
          logApi.getDistribution(params),
          logApi.getTopErrors(params)
        ])
        
        commit('SET_TREND_DATA', trend.data)
        commit('SET_DISTRIBUTION_DATA', distribution.data)
        commit('SET_TOP_ERRORS', topErrors.data)
        
        return { trend, distribution, topErrors }
      } catch (error) {
        throw error
      }
    }
  }
} 