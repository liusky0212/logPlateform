<template>
  <div class="alert-management">
    <a-card>
      <a-tabs v-model:activeKey="activeTab">
        <a-tab-pane key="rules" tab="告警规则">
          <div class="table-operations">
            <a-button type="primary" @click="showAddRuleModal">
              <template #icon><PlusOutlined /></template>
              新建规则
            </a-button>
          </div>

          <a-table
            :columns="ruleColumns"
            :data-source="rules"
            :loading="loading"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'status'">
                <a-switch
                  v-model:checked="record.enabled"
                  @change="(checked) => handleStatusChange(record, checked)"
                />
              </template>
              <template v-if="column.key === 'action'">
                <a-space>
                  <a-button type="link" @click="editRule(record)">编辑</a-button>
                  <a-popconfirm
                    title="确定要删除这条规则吗？"
                    @confirm="deleteRule(record)"
                  >
                    <a-button type="link" danger>删除</a-button>
                  </a-popconfirm>
                </a-space>
              </template>
            </template>
          </a-table>
        </a-tab-pane>

        <a-tab-pane key="history" tab="告警历史">
          <a-table
            :columns="historyColumns"
            :data-source="alertHistory"
            :loading="historyLoading"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'level'">
                <a-tag :color="getAlertLevelColor(record.level)">
                  {{ record.level }}
                </a-tag>
              </template>
              <template v-if="column.key === 'status'">
                <a-tag :color="getAlertStatusColor(record.status)">
                  {{ record.status }}
                </a-tag>
              </template>
            </template>
          </a-table>
        </a-tab-pane>
      </a-tabs>
    </a-card>

    <!-- 规则编辑弹窗 -->
    <a-modal
      v-model:visible="ruleModalVisible"
      :title="ruleModalTitle"
      @ok="handleRuleModalOk"
      width="800px"
    >
      <a-form
        :model="ruleForm"
        :rules="rules"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 18 }"
      >
        <a-form-item label="规则名称" name="name">
          <a-input v-model:value="ruleForm.name" placeholder="请输入规则名称" />
        </a-form-item>
        
        <a-form-item label="触发条件" name="condition">
          <a-select v-model:value="ruleForm.condition.type" style="width: 200px">
            <a-select-option value="keyword">关键词匹配</a-select-option>
            <a-select-option value="frequency">出现频率</a-select-option>
            <a-select-option value="metric">指标阈值</a-select-option>
          </a-select>
          
          <div class="condition-content" v-if="ruleForm.condition.type">
            <template v-if="ruleForm.condition.type === 'keyword'">
              <a-input
                v-model:value="ruleForm.condition.keyword"
                placeholder="请输入关键词"
                style="width: 300px"
              />
            </template>
            
            <template v-if="ruleForm.condition.type === 'frequency'">
              <span>出现次数超过</span>
              <a-input-number
                v-model:value="ruleForm.condition.threshold"
                :min="1"
                style="width: 100px; margin: 0 8px"
              />
              <span>次/分钟</span>
            </template>
            
            <template v-if="ruleForm.condition.type === 'metric'">
              <a-input
                v-model:value="ruleForm.condition.metric"
                placeholder="指标名称"
                style="width: 200px; margin-right: 8px"
              />
              <a-select
                v-model:value="ruleForm.condition.operator"
                style="width: 100px; margin-right: 8px"
              >
                <a-select-option value=">">大于</a-select-option>
                <a-select-option value="<">小于</a-select-option>
                <a-select-option value=">=">大于等于</a-select-option>
                <a-select-option value="<=">小于等于</a-select-option>
              </a-select>
              <a-input-number
                v-model:value="ruleForm.condition.value"
                style="width: 100px"
              />
            </template>
          </div>
        </a-form-item>

        <a-form-item label="告警级别" name="level">
          <a-radio-group v-model:value="ruleForm.level">
            <a-radio value="high">高</a-radio>
            <a-radio value="medium">中</a-radio>
            <a-radio value="low">低</a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item label="通知方式" name="notifications">
          <a-checkbox-group v-model:value="ruleForm.notifications">
            <a-checkbox value="email">邮件</a-checkbox>
            <a-checkbox value="sms">短信</a-checkbox>
            <a-checkbox value="dingtalk">钉钉</a-checkbox>
          </a-checkbox-group>
        </a-form-item>

        <a-form-item label="描述" name="description">
          <a-textarea
            v-model:value="ruleForm.description"
            :rows="4"
            placeholder="请输入规则描述"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

const activeTab = ref('rules')
const loading = ref(false)
const historyLoading = ref(false)

// 规则列表相关
const ruleColumns = [
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
    title: '告警级别',
    dataIndex: 'level',
    key: 'level'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '操作',
    key: 'action',
    width: 150
  }
]

const rules = ref([
  {
    name: 'CPU使用率告警',
    condition: 'CPU使用率 > 90%',
    level: '高',
    enabled: true
  }
])

// 告警历史相关
const historyColumns = [
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time'
  },
  {
    title: '规则名称',
    dataIndex: 'ruleName',
    key: 'ruleName'
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

const alertHistory = ref([
  {
    time: '2024-01-20 10:00:00',
    ruleName: 'CPU使用率告警',
    content: 'CPU使用率超过90%',
    level: 'high',
    status: 'unresolved'
  }
])

// 规则表单相关
const ruleModalVisible = ref(false)
const ruleModalTitle = ref('新建规则')
const ruleForm = reactive({
  name: '',
  condition: {
    type: '',
    keyword: '',
    threshold: 1,
    metric: '',
    operator: '>',
    value: 0
  },
  level: 'medium',
  notifications: ['email'],
  description: ''
})

const showAddRuleModal = () => {
  ruleModalTitle.value = '新建规则'
  ruleModalVisible.value = true
}

const handleRuleModalOk = () => {
  message.success('保存成功')
  ruleModalVisible.value = false
}

const editRule = (record) => {
  ruleModalTitle.value = '编辑规则'
  // TODO: 填充表单数据
  ruleModalVisible.value = true
}

const deleteRule = (record) => {
  message.success('删除成功')
}

const handleStatusChange = (record, checked) => {
  message.success(`规则状态已${checked ? '启用' : '禁用'}`)
}

const getAlertLevelColor = (level) => {
  const colors = {
    high: 'red',
    medium: 'orange',
    low: 'blue'
  }
  return colors[level] || 'blue'
}

const getAlertStatusColor = (status) => {
  const colors = {
    unresolved: 'red',
    processing: 'orange',
    resolved: 'green'
  }
  return colors[status] || 'blue'
}
</script>

<style scoped>
.alert-management {
  padding: 24px;
}
.table-operations {
  margin-bottom: 16px;
}
.condition-content {
  margin-top: 8px;
}
</style> 