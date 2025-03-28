<template>
  <div class="alert-management">
    <a-card class="alert-card">
      <template #title>
        <div class="card-title">
          <span>告警规则</span>
          <a-button type="primary" @click="showAddModal">
            <template #icon><PlusOutlined /></template>
            添加规则
          </a-button>
        </div>
      </template>

      <a-table
        :columns="columns"
        :data-source="alertRules"
        :loading="loading"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <a-switch
              v-model:checked="record.status"
              @change="(checked) => handleStatusChange(record, checked)"
            />
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a-button type="link" @click="editRule(record)">编辑</a-button>
              <a-button type="link" danger @click="deleteRule(record)">删除</a-button>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-card>

    <a-modal
      v-model:visible="modalVisible"
      :title="modalTitle"
      @ok="handleModalOk"
    >
      <a-form :model="formState" :rules="rules">
        <a-form-item label="规则名称" name="name">
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item label="触发条件" name="condition">
          <a-input v-model:value="formState.condition" />
        </a-form-item>
        <a-form-item label="通知方式" name="notifyType">
          <a-checkbox-group v-model:value="formState.notifyType">
            <a-checkbox value="email">邮件</a-checkbox>
            <a-checkbox value="sms">短信</a-checkbox>
            <a-checkbox value="webhook">Webhook</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'

const columns = [
  {
    title: '规则名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '触发条件',
    dataIndex: 'condition',
    key: 'condition'
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

const loading = ref(false)
const modalVisible = ref(false)
const modalTitle = ref('添加规则')
const alertRules = ref([])

const formState = reactive({
  name: '',
  condition: '',
  notifyType: []
})

const rules = {
  name: [{ required: true, message: '请输入规则名称' }],
  condition: [{ required: true, message: '请输入触发条件' }],
  notifyType: [{ required: true, message: '请选择通知方式' }]
}

const showAddModal = () => {
  modalTitle.value = '添加规则'
  modalVisible.value = true
}

const handleModalOk = () => {
  // 实现保存逻辑
  modalVisible.value = false
}

const editRule = (record) => {
  // 实现编辑逻辑
}

const deleteRule = (record) => {
  // 实现删除逻辑
}

const handleStatusChange = (record, checked) => {
  // 实现状态更新逻辑
}
</script>

<style scoped>
.alert-management {
  padding: 24px;
}
.alert-card {
  min-height: 500px;
}
.card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style> 