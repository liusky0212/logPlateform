<template>
  <div class="log-analysis">
    <a-tabs v-model:activeKey="activeTab">
      <a-tab-pane key="error" tab="错误分析">
        <error-analysis />
      </a-tab-pane>
      <a-tab-pane key="performance" tab="性能分析">
        <performance-analysis />
      </a-tab-pane>
      <a-tab-pane key="custom" tab="自定义分析">
        <div class="custom-analysis">
          <a-form
            :model="customForm"
            layout="vertical"
          >
            <a-form-item label="分析维度">
              <a-select
                v-model:value="customForm.dimensions"
                mode="multiple"
                placeholder="请选择分析维度"
              >
                <a-select-option value="time">时间维度</a-select-option>
                <a-select-option value="level">日志级别</a-select-option>
                <a-select-option value="source">日志来源</a-select-option>
                <a-select-option value="type">错误类型</a-select-option>
              </a-select>
            </a-form-item>
            
            <a-form-item label="时间范围">
              <a-range-picker
                v-model:value="customForm.timeRange"
                :show-time="true"
                format="YYYY-MM-DD HH:mm:ss"
              />
            </a-form-item>

            <a-form-item label="聚合方式">
              <a-radio-group v-model:value="customForm.aggregation">
                <a-radio value="count">计数</a-radio>
                <a-radio value="avg">平均值</a-radio>
                <a-radio value="sum">求和</a-radio>
              </a-radio-group>
            </a-form-item>

            <a-form-item>
              <a-button type="primary" @click="generateReport">
                生成报表
              </a-button>
            </a-form-item>
          </a-form>

          <div v-if="showCustomChart" class="mt-4">
            <chart-card
              title="自定义分析结果"
              :loading="customLoading"
              :options="customChartOptions"
              :showTimeRange="false"
            />
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import ErrorAnalysis from '@/components/analysis/ErrorAnalysis.vue'
import PerformanceAnalysis from '@/components/analysis/PerformanceAnalysis.vue'
import ChartCard from '@/components/ChartCard.vue'
import { LogAnalysisService } from '@/services/logAnalysis'

const activeTab = ref('error')
const customLoading = ref(false)
const showCustomChart = ref(false)

const customForm = reactive({
  dimensions: [],
  timeRange: [],
  aggregation: 'count'
})

const customChartOptions = ref({
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: []
  },
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {
    type: 'value'
  },
  series: []
})

const generateReport = async () => {
  customLoading.value = true
  try {
    // 实现自定义报表生成逻辑
    showCustomChart.value = true
  } catch (error) {
    console.error('生成报表失败:', error)
  } finally {
    customLoading.value = false
  }
}
</script>

<style scoped>
.log-analysis {
  padding: 24px;
}
.custom-analysis {
  max-width: 800px;
  margin: 0 auto;
}
.mt-4 {
  margin-top: 16px;
}
</style> 