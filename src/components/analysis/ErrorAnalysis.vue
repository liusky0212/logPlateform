<template>
  <div class="error-analysis">
    <a-row :gutter="16">
      <a-col :span="24">
        <chart-card
          title="错误趋势分析"
          tooltip="展示不同类型错误随时间的变化趋势"
          :loading="trendLoading"
          :options="trendOptions"
          @timeRangeChange="handleTimeRangeChange"
          @refresh="loadTrendData"
        />
      </a-col>
    </a-row>

    <a-row :gutter="16" class="mt-4">
      <a-col :span="12">
        <chart-card
          title="错误类型分布"
          :loading="distributionLoading"
          :options="distributionOptions"
          :showTimeRange="false"
          height="400"
          @refresh="loadDistributionData"
        />
      </a-col>
      <a-col :span="12">
        <a-card title="错误聚类分析" :loading="clusterLoading">
          <a-table
            :columns="clusterColumns"
            :data-source="clusterData"
            :pagination="false"
            size="small"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'count'">
                <a-tag :color="getCountColor(record.count)">
                  {{ record.count }}
                </a-tag>
              </template>
              <template v-if="column.key === 'action'">
                <a-button type="link" @click="showErrorDetail(record)">
                  详情
                </a-button>
              </template>
            </template>
          </a-table>
        </a-card>
      </a-col>
    </a-row>

    <!-- 错误详情弹窗 -->
    <a-modal
      v-model:visible="detailVisible"
      title="错误详情"
      width="800px"
      :footer="null"
    >
      <a-descriptions bordered :column="1">
        <a-descriptions-item label="错误类型">
          {{ selectedError.type }}
        </a-descriptions-item>
        <a-descriptions-item label="发生次数">
          {{ selectedError.count }}
        </a-descriptions-item>
        <a-descriptions-item label="首次出现">
          {{ selectedError.firstSeen }}
        </a-descriptions-item>
        <a-descriptions-item label="最近出现">
          {{ selectedError.lastSeen }}
        </a-descriptions-item>
        <a-descriptions-item label="错误示例">
          <log-viewer :content="selectedError.sample" />
        </a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { LogAnalysisService } from '@/services/logAnalysis'
import ChartCard from '@/components/ChartCard.vue'
import LogViewer from '@/components/LogViewer.vue'

const trendLoading = ref(false)
const distributionLoading = ref(false)
const clusterLoading = ref(false)
const detailVisible = ref(false)
const selectedError = ref({})

const trendOptions = ref({
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['错误', '警告', '异常']
  },
  xAxis: {
    type: 'time'
  },
  yAxis: {
    type: 'value'
  },
  series: []
})

const distributionOptions = ref({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      type: 'pie',
      radius: '50%',
      data: []
    }
  ]
})

const clusterColumns = [
  {
    title: '错误类型',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '出现次数',
    dataIndex: 'count',
    key: 'count',
    width: 100,
    sorter: (a, b) => a.count - b.count
  },
  {
    title: '操作',
    key: 'action',
    width: 80
  }
]

const clusterData = ref([])

const loadTrendData = async (timeRange) => {
  trendLoading.value = true
  try {
    const data = await LogAnalysisService.getErrorTrends({ timeRange })
    trendOptions.value.series = data.series
  } catch (error) {
    console.error('加载错误趋势数据失败:', error)
  } finally {
    trendLoading.value = false
  }
}

const loadDistributionData = async () => {
  distributionLoading.value = true
  try {
    const data = await LogAnalysisService.getLogDistribution()
    distributionOptions.value.series[0].data = data
  } catch (error) {
    console.error('加载分布数据失败:', error)
  } finally {
    distributionLoading.value = false
  }
}

const loadClusterData = async () => {
  clusterLoading.value = true
  try {
    const data = await LogAnalysisService.getErrorClusters()
    clusterData.value = data
  } catch (error) {
    console.error('加载聚类数据失败:', error)
  } finally {
    clusterLoading.value = false
  }
}

const handleTimeRangeChange = (range) => {
  loadTrendData(range)
}

const getCountColor = (count) => {
  if (count > 100) return 'red'
  if (count > 50) return 'orange'
  return 'blue'
}

const showErrorDetail = (record) => {
  selectedError.value = record
  detailVisible.value = true
}

onMounted(() => {
  loadTrendData('24h')
  loadDistributionData()
  loadClusterData()
})
</script>

<style scoped>
.mt-4 {
  margin-top: 16px;
}
</style> 