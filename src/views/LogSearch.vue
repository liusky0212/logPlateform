<template>
  <div class="log-search">
    <a-card class="search-card">
      <a-form layout="inline" :model="searchForm">
        <a-row :gutter="16">
          <a-col :span="6">
            <a-form-item label="日志级别">
              <a-select v-model:value="searchForm.level" mode="multiple" placeholder="选择日志级别">
                <a-select-option value="error">错误</a-select-option>
                <a-select-option value="warn">警告</a-select-option>
                <a-select-option value="info">信息</a-select-option>
                <a-select-option value="debug">调试</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="时间范围">
              <a-range-picker 
                v-model:value="searchForm.timeRange"
                :show-time="true"
                format="YYYY-MM-DD HH:mm:ss"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="关键词">
              <a-input-search
                v-model:value="searchForm.keyword"
                placeholder="请输入关键词"
                @search="handleSearch"
              />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-space>
              <a-button type="primary" @click="handleSearch">
                <template #icon><SearchOutlined /></template>
                搜索
              </a-button>
              <a-button @click="resetSearch">
                <template #icon><ReloadOutlined /></template>
                重置
              </a-button>
            </a-space>
          </a-col>
        </a-row>
      </a-form>
    </a-card>

    <a-card class="log-content">
      <template #extra>
        <a-space>
          <a-button type="primary" @click="exportLogs">
            <template #icon><DownloadOutlined /></template>
            导出
          </a-button>
          <a-button @click="refreshLogs">
            <template #icon><SyncOutlined /></template>
            刷新
          </a-button>
        </a-space>
      </template>

      <a-table
        :columns="columns"
        :data-source="logData"
        :loading="loading"
        :pagination="pagination"
        @change="handleTableChange"
        size="middle"
        :scroll="{ x: 1300 }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'level'">
            <a-tag :color="getLevelColor(record.level)">
              {{ record.level }}
            </a-tag>
          </template>
          <template v-if="column.key === 'action'">
            <a-button type="link" @click="showLogDetail(record)">
              详情
            </a-button>
          </template>
        </template>
      </a-table>
    </a-card>

    <!-- 日志详情弹窗 -->
    <a-modal
      v-model:visible="detailVisible"
      title="日志详情"
      width="800px"
      :footer="null"
    >
      <a-descriptions bordered :column="1">
        <a-descriptions-item label="时间">
          {{ selectedLog.timestamp }}
        </a-descriptions-item>
        <a-descriptions-item label="级别">
          <a-tag :color="getLevelColor(selectedLog.level)">
            {{ selectedLog.level }}
          </a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="来源">
          {{ selectedLog.source }}
        </a-descriptions-item>
        <a-descriptions-item label="内容">
          <pre class="log-content-pre">{{ selectedLog.content }}</pre>
        </a-descriptions-item>
        <a-descriptions-item label="堆栈信息" v-if="selectedLog.stack">
          <pre class="log-stack-pre">{{ selectedLog.stack }}</pre>
        </a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { 
  SearchOutlined, 
  ReloadOutlined, 
  DownloadOutlined, 
  SyncOutlined 
} from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

const searchForm = reactive({
  level: [],
  timeRange: [],
  keyword: ''
})

const columns = [
  {
    title: '时间',
    dataIndex: 'timestamp',
    key: 'timestamp',
    width: 180,
    sorter: true
  },
  {
    title: '级别',
    dataIndex: 'level',
    key: 'level',
    width: 100,
    filters: [
      { text: '错误', value: 'error' },
      { text: '警告', value: 'warn' },
      { text: '信息', value: 'info' },
      { text: '调试', value: 'debug' }
    ]
  },
  {
    title: '来源',
    dataIndex: 'source',
    key: 'source',
    width: 150
  },
  {
    title: '内容',
    dataIndex: 'content',
    key: 'content',
    ellipsis: true
  },
  {
    title: '操作',
    key: 'action',
    width: 100,
    fixed: 'right'
  }
]

const loading = ref(false)
const logData = ref([])
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  showSizeChanger: true,
  showQuickJumper: true
})

const detailVisible = ref(false)
const selectedLog = ref({})

const getLevelColor = (level) => {
  const colors = {
    error: 'red',
    warn: 'orange',
    info: 'blue',
    debug: 'green'
  }
  return colors[level] || 'blue'
}

const handleSearch = () => {
  loading.value = true
  // TODO: 实现实际的搜索逻辑
  setTimeout(() => {
    logData.value = [
      {
        timestamp: '2024-01-20 10:00:00',
        level: 'error',
        source: 'user-service',
        content: '数据库连接失败',
        stack: 'Error: Connection refused...'
      },
      // ... 更多测试数据
    ]
    loading.value = false
  }, 1000)
}

const resetSearch = () => {
  searchForm.level = []
  searchForm.timeRange = []
  searchForm.keyword = ''
  handleSearch()
}

const handleTableChange = (pag, filters, sorter) => {
  pagination.current = pag.current
  pagination.pageSize = pag.pageSize
  // TODO: 处理排序和筛选
  handleSearch()
}

const showLogDetail = (record) => {
  selectedLog.value = record
  detailVisible.value = true
}

const exportLogs = () => {
  message.success('开始导出日志')
  // TODO: 实现导出逻辑
}

const refreshLogs = () => {
  handleSearch()
}
</script>

<style scoped>
.log-search {
  padding: 24px;
}
.search-card {
  margin-bottom: 24px;
}
.log-content {
  min-height: 500px;
}
.log-content-pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  background: #f5f5f5;
  padding: 8px;
  margin: 0;
}
.log-stack-pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  background: #fff2f0;
  padding: 8px;
  margin: 0;
  border: 1px solid #ffccc7;
}
</style> 