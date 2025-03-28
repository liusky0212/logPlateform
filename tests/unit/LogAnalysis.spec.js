import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import LogAnalysis from '@/views/LogAnalysis.vue'
import { log } from '@/store/modules/log'

describe('LogAnalysis.vue', () => {
  let store
  let wrapper

  beforeEach(() => {
    store = createStore({
      modules: {
        log: {
          ...log,
          state: {
            ...log.state
          }
        }
      }
    })

    wrapper = mount(LogAnalysis, {
      global: {
        plugins: [store],
        stubs: {
          'a-card': true,
          'a-form': true,
          'a-form-item': true,
          'a-range-picker': true,
          'a-select': true,
          'a-button': true,
          'v-chart': true
        }
      }
    })
  })

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('initializes with default dimension value', () => {
    expect(wrapper.vm.dimension).toBe('level')
  })

  it('calls analyze method on mount', () => {
    const analyzeSpy = jest.spyOn(wrapper.vm, 'analyze')
    wrapper.vm.$nextTick(() => {
      expect(analyzeSpy).toHaveBeenCalled()
    })
  })

  it('updates chart data after successful analysis', async () => {
    const mockData = {
      trend: { data: [1, 2, 3] },
      distribution: { data: [{ name: 'Error', value: 10 }] },
      topErrors: [{ message: 'Test Error' }]
    }

    jest.spyOn(store, 'dispatch').mockResolvedValue(mockData)

    await wrapper.vm.analyze()

    expect(wrapper.vm.trendOption.series[0].data).toEqual(mockData.trend.data)
    expect(wrapper.vm.distributionOption.series[0].data).toEqual(mockData.distribution.data)
  })
}) 