<template>
  <a-card :loading="loading" :bordered="false">
    <template #title>
      <div class="chart-title">
        {{ title }}
        <a-tooltip v-if="tooltip" :title="tooltip">
          <InfoCircleOutlined style="margin-left: 8px" />
        </a-tooltip>
      </div>
    </template>
    <template #extra>
      <a-space>
        <a-radio-group 
          v-if="showTimeRange"
          v-model:value="timeRange" 
          size="small"
          @change="handleTimeRangeChange"
        >
          <a-radio-button value="1h">1小时</a-radio-button>
          <a-radio-button value="6h">6小时</a-radio-button>
          <a-radio-button value="24h">24小时</a-radio-button>
          <a-radio-button value="7d">7天</a-radio-button>
        </a-radio-group>
        <a-button 
          size="small"
          @click="refreshData"
        >
          <template #icon><ReloadOutlined /></template>
        </a-button>
      </a-space>
    </template>
    <div ref="chartRef" :style="{ height: height + 'px' }"></div>
  </a-card>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { InfoCircleOutlined, ReloadOutlined } from '@ant-design/icons-vue'
import * as echarts from 'echarts'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  tooltip: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  },
  height: {
    type: Number,
    default: 300
  },
  showTimeRange: {
    type: Boolean,
    default: true
  },
  options: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['refresh', 'timeRangeChange'])

const chartRef = ref(null)
let chart = null
const timeRange = ref('24h')

onMounted(() => {
  chart = echarts.init(chartRef.value)
  chart.setOption(props.options)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (chart) {
    chart.dispose()
  }
  window.removeEventListener('resize', handleResize)
})

watch(
  () => props.options,
  (newOptions) => {
    if (chart) {
      chart.setOption(newOptions)
    }
  },
  { deep: true }
)

const handleResize = () => {
  if (chart) {
    chart.resize()
  }
}

const handleTimeRangeChange = () => {
  emit('timeRangeChange', timeRange.value)
}

const refreshData = () => {
  emit('refresh')
}
</script>

<style scoped>
.chart-title {
  display: flex;
  align-items: center;
}
</style> 