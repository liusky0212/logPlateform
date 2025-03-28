<template>
  <div class="log-search">
    <a-card class="search-card">
      <a-form layout="inline" :model="searchForm">
        <a-row :gutter="16">
          <a-col :span="6">
            <a-form-item label="日志级别">
              <a-select v-model="searchForm.level">
                <a-select-option value="error">错误</a-select-option>
                <a-select-option value="warn">警告</a-select-option>
                <a-select-option value="info">信息</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="时间范围">
              <a-range-picker v-model="searchForm.timeRange" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="关键词">
              <a-input v-model="searchForm.keyword" placeholder="请输入关键词" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-button type="primary" @click="handleSearch">
              <template #icon><SearchOutlined /></template>
              搜索
            </a-button>
          </a-col>
        </a-row>
      </a-form>
    </a-card>

    <a-card class="log-table">
      <a-table
        :columns="columns"
        :data-source="logData"
        :loading="loading"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'level'">
            <a-tag :color="getLevelColor(record.level)">
              {{ record.level }}
            </a-tag>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { SearchOutlined } from '@ant-design/icons-vue'

const searchForm = reactive({
  level: '',
  timeRange: [],
  keyword: ''
})

const columns = [
  {
    title: '时间',
    dataIndex: 'timestamp',
    key: 'timestamp',
    width: '200px'
  },
  {
    title: '级别',
    dataIndex: 'level',
    key: 'level',
    width: '100px'
  },
  {
    title: '内容',
    dataIndex: 'content',
    key: 'content'
  }
]

const loading = ref(false)
const logData = ref([])
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0
})

const getLevelColor = (level) => {
  const colors = {
    error: 'red',
    warn: 'orange',
    info: 'blue'
  }
  return colors[level] || 'blue'
}

const handleSearch = () => {
  loading.value = true
  // 实现搜索逻辑
  setTimeout(() => {
    loading.value = false
  }, 1000)
}

const handleTableChange = (pag) => {
  pagination.current = pag.current
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
.log-table {
  min-height: 500px;
}
</style> 