<template>
  <div class="dashboard">
    <a-row :gutter="16">
      <a-col :span="6">
        <a-card>
          <Statistic
            title="今日日志总量"
            :value="statistics.totalLogs"
            :precision="0"
          >
            <template #prefix>
              <FileTextOutlined />
            </template>
          </Statistic>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <Statistic
            title="错误日志数"
            :value="statistics.errorLogs"
            :precision="0"
            class="error-stats"
          >
            <template #prefix>
              <WarningOutlined />
            </template>
          </Statistic>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <Statistic
            title="告警规则数"
            :value="statistics.alertRules"
            :precision="0"
          >
            <template #prefix>
              <BellOutlined />
            </template>
          </Statistic>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <Statistic
            title="活跃用户数"
            :value="statistics.activeUsers"
            :precision="0"
          >
            <template #prefix>
              <UserOutlined />
            </template>
          </Statistic>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="16" class="chart-row">
      <a-col :span="12">
        <a-card title="日志趋势">
          <div ref="logTrendChart" class="chart"></div>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card title="日志类型分布">
          <div ref="logTypeChart" class="chart"></div>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="16" class="chart-row">
      <a-col :span="24">
        <a-card title="最近告警">
          <a-table
            :columns="alertColumns"
            :data-source="recentAlerts"
            :pagination="{ pageSize: 5 }"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'status'">
                <a-tag :color="getAlertStatusColor(record.status)">
                  {{ record.status }}
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
import { ref, onMounted, reactive } from 'vue'
import { Statistic } from 'ant-design-vue'
import { FileTextOutlined, WarningOutlined, BellOutlined, UserOutlined } from '@ant-design/icons-vue'
import * as echarts from 'echarts'

const statistics = reactive({
  totalLogs: 12345,
  errorLogs: 123,
  alertRules: 15,
  activeUsers: 56
})

const logTrendChart = ref(null)
const logTypeChart = ref(null)

const alertColumns = [
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time'
  },
  {
    title: '告警内容',
    dataIndex: 'content',
    key: 'content'
  },
  {
    title: '级别',
    dataIndex: 'level',
    key: 'level'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status'
  }
]

const recentAlerts = ref([
  {
    time: '2024-01-20 10:00:00',
    content: '服务器CPU使用率超过90%',
    level: '高',
    status: '已处理'
  },
  // ... 更多数据
])

const getAlertStatusColor = (status) => {
  const colors = {
    '已处理': 'green',
    '处理中': 'orange',
    '未处理': 'red'
  }
  return colors[status] || 'blue'
}

const initCharts = () => {
  // 初始化日志趋势图表
  const trendChart = echarts.init(logTrendChart.value)
  trendChart.setOption({
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320, 1000],
      type: 'line',
      smooth: true
    }]
  })

  // 初始化日志类型分布图表
  const typeChart = echarts.init(logTypeChart.value)
  typeChart.setOption({
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
        data: [
          { value: 1048, name: '错误' },
          { value: 735, name: '警告' },
          { value: 580, name: '信息' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  })
}

onMounted(() => {
  initCharts()
})
</script>

<style scoped>
.dashboard {
  padding: 24px;
}
.chart-row {
  margin-top: 24px;
}
.chart {
  height: 300px;
}
.error-stats :deep(.ant-statistic-content) {
  color: #ff4d4f;
}
</style> 