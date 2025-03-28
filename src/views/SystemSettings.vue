<template>
  <div class="system-settings">
    <a-card>
      <a-tabs v-model:activeKey="activeTab">
        <a-tab-pane key="logSource" tab="日志源管理">
          <a-button type="primary" class="mb-20" @click="showAddSourceModal">
            <template #icon><PlusOutlined /></template>
            添加日志源
          </a-button>
          
          <a-table
            :columns="sourceColumns"
            :data-source="logSources"
            :pagination="{ pageSize: 10 }"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'status'">
                <a-badge :status="record.status === 'active' ? 'success' : 'error'"
                  :text="record.status === 'active' ? '正常' : '异常'" />
              </template>
              <template v-if="column.key === 'action'">
                <a-space>
                  <a-button type="link" @click="editSource(record)">编辑</a-button>
                  <a-button type="link" danger @click="deleteSource(record)">删除</a-button>
                </a-space>
              </template>
            </template>
          </a-table>
        </a-tab-pane>

        <a-tab-pane key="storage" tab="存储策略">
          <a-form :model="storageForm" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
            <a-form-item label="存储类型">
              <a-radio-group v-model:value="storageForm.type">
                <a-radio value="local">本地存储</a-radio>
                <a-radio value="elastic">Elasticsearch</a-radio>
                <a-radio value="s3">对象存储</a-radio>
              </a-radio-group>
            </a-form-item>

            <template v-if="storageForm.type === 'elastic'">
              <a-form-item label="ES地址">
                <a-input v-model:value="storageForm.esHost" />
              </a-form-item>
              <a-form-item label="索引前缀">
                <a-input v-model:value="storageForm.indexPrefix" />
              </a-form-item>
            </template>

            <template v-if="storageForm.type === 's3'">
              <a-form-item label="Bucket">
                <a-input v-model:value="storageForm.bucket" />
              </a-form-item>
              <a-form-item label="访问密钥">
                <a-input-password v-model:value="storageForm.accessKey" />
              </a-form-item>
            </template>

            <a-form-item label="保留策略">
              <a-input-number v-model:value="storageForm.retention" addon-after="天" />
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 4 }">
              <a-button type="primary" @click="saveStorageSettings">
                保存设置
              </a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>

        <a-tab-pane key="notification" tab="通知设置">
          <a-form :model="notificationForm" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
            <a-form-item label="邮件通知">
              <a-switch v-model:checked="notificationForm.emailEnabled" />
            </a-form-item>
            
            <template v-if="notificationForm.emailEnabled">
              <a-form-item label="SMTP服务器">
                <a-input v-model:value="notificationForm.smtpServer" />
              </a-form-item>
              <a-form-item label="发件人">
                <a-input v-model:value="notificationForm.sender" />
              </a-form-item>
            </template>

            <a-form-item label="钉钉通知">
              <a-switch v-model:checked="notificationForm.dingTalkEnabled" />
            </a-form-item>

            <template v-if="notificationForm.dingTalkEnabled">
              <a-form-item label="Webhook">
                <a-input v-model:value="notificationForm.dingTalkWebhook" />
              </a-form-item>
            </template>

            <a-form-item :wrapper-col="{ offset: 4 }">
              <a-button type="primary" @click="saveNotificationSettings">
                保存设置
              </a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>
      </a-tabs>
    </a-card>

    <!-- 添加日志源模态框 -->
    <a-modal
      v-model:visible="sourceModalVisible"
      :title="sourceModalTitle"
      @ok="handleSourceModalOk"
    >
      <a-form :model="sourceForm">
        <a-form-item label="名称">
          <a-input v-model:value="sourceForm.name" />
        </a-form-item>
        <a-form-item label="类型">
          <a-select v-model:value="sourceForm.type">
            <a-select-option value="file">文件</a-select-option>
            <a-select-option value="syslog">Syslog</a-select-option>
            <a-select-option value="api">API</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="路径">
          <a-input v-model:value="sourceForm.path" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'

const activeTab = ref('logSource')

// 日志源管理
const sourceColumns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '路径',
    dataIndex: 'path',
    key: 'path'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '操作',
    key: 'action'
  }
]

const logSources = ref([
  {
    name: 'App Server',
    type: 'file',
    path: '/var/log/app.log',
    status: 'active'
  }
])

const sourceModalVisible = ref(false)
const sourceModalTitle = ref('添加日志源')
const sourceForm = reactive({
  name: '',
  type: 'file',
  path: ''
})

// 存储策略
const storageForm = reactive({
  type: 'local',
  esHost: '',
  indexPrefix: '',
  bucket: '',
  accessKey: '',
  retention: 30
})

// 通知设置
const notificationForm = reactive({
  emailEnabled: false,
  smtpServer: '',
  sender: '',
  dingTalkEnabled: false,
  dingTalkWebhook: ''
})

const showAddSourceModal = () => {
  sourceModalTitle.value = '添加日志源'
  sourceModalVisible.value = true
}

const handleSourceModalOk = () => {
  // 实现保存日志源逻辑
  sourceModalVisible.value = false
}

const editSource = (record) => {
  // 实现编辑逻辑
}

const deleteSource = (record) => {
  // 实现删除逻辑
}

const saveStorageSettings = () => {
  // 实现存储设置保存逻辑
}

const saveNotificationSettings = () => {
  // 实现通知设置保存逻辑
}
</script>

<style scoped>
.system-settings {
  padding: 24px;
}
.mb-20 {
  margin-bottom: 20px;
}
</style> 