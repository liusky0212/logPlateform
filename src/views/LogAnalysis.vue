<template>
  <div class="log-analysis">
    <a-row :gutter="16">
      <a-col :span="24">
        <a-card title="分析条件">
          <a-form layout="inline">
            <a-form-item label="时间范围">
              <a-range-picker showTime />
            </a-form-item>
            <a-form-item label="分析维度">
              <a-select style="width: 120px" v-model:value="dimension">
                <a-select-option value="level">日志级别</a-select-option>
                <a-select-option value="source">来源服务</a-select-option>
                <a-select-option value="ip">IP地址</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" @click="analyze">
                <template #icon><line-chart-outlined /></template>
                开始分析
              </a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="16" style="margin-top: 16px">
      <a-col :span="12">
        <a-card title="趋势分析">
          <v-chart :option="trendOption" style="height: 400px" />
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card title="分布分析">
          <v-chart :option="distributionOption" style="height: 400px" />
        </a-card>
      </a-col>
    </a-row>

    <a-row style="margin-top: 16px">
      <a-col :span="24">
        <a-card title="TOP异常分析">
          <a-table :columns="columns" :data-source="topErrors">
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'trend'">
                <mini-chart :data="record.trendData" />
              </template>
            </template>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import { message } from 'ant-design-vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, PieChart } from 'echarts/charts'

export default defineComponent({
  name: 'LogAnalysis',
  setup() {
    const store = useStore()
    const loading = ref(false)
    const dimension = ref('level')
    
    const trendOption = reactive({
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'time' },
      yAxis: { type: 'value' },
      series: [{
        type: 'line',
        smooth: true,
        data: []
      }]
    })

    const distributionOption = reactive({
      tooltip: { trigger: 'item' },
      series: [{
        type: 'pie',
        radius: '50%',
        data: []
      }]
    })

    const columns = [
      { title: '错误信息', dataIndex: 'message', key: 'message' },
      { title: '出现次数', dataIndex: 'count', key: 'count' },
      { title: '首次出现', dataIndex: 'firstSeen', key: 'firstSeen' },
      { title: '最后出现', dataIndex: 'lastSeen', key: 'lastSeen' },
      { title: '趋势', dataIndex: 'trend', key: 'trend' }
    ]

    const analyze = async () => {
      try {
        loading.value = true
        const params = {
          dimension: dimension.value,
          timeRange: timeRange.value
        }
        
        await store.dispatch('log/analyzeLogs', params)
        
        // 更新图表数据
        trendOption.series[0].data = store.state.log.trendData
        distributionOption.series[0].data = store.state.log.distributionData
        topErrors.value = store.state.log.topErrors
        
        message.success('分析完成')
      } catch (error) {
        message.error('分析失败：' + error.message)
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      analyze()
    })

    return {
      dimension,
      trendOption,
      distributionOption,
      columns,
      topErrors,
      loading,
      analyze
    }
  }
})
</script> 