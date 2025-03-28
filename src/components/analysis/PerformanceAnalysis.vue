<template>
  <div class="performance-analysis">
    <a-row :gutter="16">
      <a-col :span="24">
        <chart-card
          title="系统性能指标"
          :loading="metricsLoading"
          :options="metricsOptions"
          @timeRangeChange="handleTimeRangeChange"
          @refresh="loadMetricsData"
        />
      </a-col>
    </a-row>

    <a-row :gutter="16" class="mt-4">
      <a-col :span="8" v-for="metric in performanceMetrics" :key="metric.name">
        <a-card>
          <statistic
            :title="metric.label"
            :value="metric.value"
            :precision="2"
            :valueStyle="getValueStyle(metric)"
          >
            <template #suffix>
              <span>{{ metric.unit }}</span>
            </template>
            <template #prefix>
              <Trend 
                :type="metric.trend" 
                :value="`${metric.percentage}%`"
                :reverse="metric.name === 'errorRate'"
              />
            </template>
          </statistic>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="16" class="mt-4">
      <a-col :span="24">
        <a-card title="性能异常检测">
          <a-table
            :columns="anomalyColumns"
            :data-source="anomalyData"
            :pagination="{ pageSize: 5 }"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'severity'">
                <a-tag :color="getSeverityColor(record.severity)">
                  {{ record.severity }}
                </a-tag>
              </template>
            </template>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Statistic } from 'ant-design-vue'
import { LogAnalysisService } from '@/services/logAnalysis'
import ChartCard from '@/components/ChartCard.vue'
import Trend from '@/components/Trend.vue'

const metricsLoading = ref(false)
const performanceMetrics = ref([
  {
    name: 'responseTime',
    label: '平均响应时间',
    value: 0,
    unit: 'ms',
    trend: 'up',
    percentage: 0
  },
  {
    name: 'throughput',
    label: '系统吞吐量',
    value: 0,
    unit: 'req/s',
    trend: 'down',
    percentage: 0
  },
  {
    name: 'errorRate',
    label: '错误率',
    value: 0,
    unit: '%',
    trend: 'up',
    percentage: 0
  }
])

const metricsOptions = ref({
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['响应时间', '吞吐量', '错误率']
  },
  xAxis: {
    type: 'time'
  },
  yAxis: [
    {
      type: 'value',
      name: '响应时间(ms)'
    },
    {
      type: 'value',
      name: '吞吐量(req/s)'
    }
  ],
  series: []
})

const anomalyColumns = [
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time'
  },
  {
    title: '指标',
    dataIndex: 'metric',
    key: 'metric'
  },
  {
    title: '异常值',
    dataIndex: 'value',
    key: 'value'
  },
  {
    title: '严重程度',
    dataIndex: 'severity',
    key: 'severity'
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description'
  }
]

const anomalyData = ref([])

const loadMetricsData = async (timeRange) => {
  metricsLoading.value = true
  try {
    const data = await LogAnalysisService.getPerformanceMetrics({ timeRange })
    metricsOptions.value.series = data.series
    performanceMetrics.value = data.metrics
  } catch (error) {
    console.error('加载性能指标数据失败:', error)
  } finally {
    metricsLoading.value = false
  }
}

const handleTimeRangeChange = (range) => {
  loadMetricsData(range)
}

const getValueStyle = (metric) => {
  if (metric.name === 'errorRate') {
    return { color: metric.value > 5 ? '#ff4d4f' : '#52c41a' }
  }
  return {}
}

const getSeverityColor = (severity) => {
  const colors = {
    high: 'red',
    medium: 'orange',
    low: 'blue'
  }
  return colors[severity] || 'blue'
}

const getTrendIcon = (trend) => {
  return trend === 'up' ? 'rise' : 'fall'
}

const getTrendColor = (trend, value) => {
  if (trend === 'up') {
    return value > 0 ? '#f5222d' : '#52c41a'
  }
  return value > 0 ? '#52c41a' : '#f5222d'
}

onMounted(() => {
  loadMetricsData('24h')
})
</script>

<style scoped>
.mt-4 {
  margin-top: 16px;
}

.trend-icon {
  margin-right: 4px;
}

.trend-value {
  font-size: 14px;
}
</style> 