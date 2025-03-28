<template>
  <div class="alert-center">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="rules" tab="告警规则">
        <a-card>
          <template #extra>
            <a-button type="primary" @click="showCreateRule">
              <plus-outlined /> 新建规则
            </a-button>
          </template>
          
          <a-table :columns="ruleColumns" :data-source="rules">
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'status'">
                <a-switch
                  v-model:checked="record.status"
                  :checkedChildren="'启用'"
                  :unCheckedChildren="'停用'"
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
      </a-tab-pane>

      <a-tab-pane key="history" tab="告警历史">
        <a-card>
          <a-form layout="inline">
            <a-form-item label="时间范围">
              <a-range-picker showTime />
            </a-form-item>
            <a-form-item label="告警级别">
              <a-select style="width: 120px">
                <a-select-option value="critical">严重</a-select-option>
                <a-select-option value="warning">警告</a-select-option>
                <a-select-option value="info">提示</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="处理状态">
              <a-select style="width: 120px">
                <a-select-option value="pending">待处理</a-select-option>
                <a-select-option value="processing">处理中</a-select-option>
                <a-select-option value="resolved">已解决</a-select-option>
              </a-select>
            </a-form-item>
          </a-form>

          <a-table
            :columns="historyColumns"
            :data-source="alertHistory"
            style="margin-top: 16px"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'level'">
                <a-tag :color="getAlertLevelColor(record.level)">
                  {{ record.level }}
                </a-tag>
              </template>
            </template>
          </a-table>
        </a-card>
      </a-tab-pane>
    </a-tabs>

    <!-- 创建/编辑规则弹窗 -->
    <a-modal
      v-model:visible="ruleModalVisible"
      :title="ruleModalTitle"
      @ok="handleRuleModalOk"
    >
      <a-form :model="ruleForm" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
        <a-form-item label="规则名称">
          <a-input v-model:value="ruleForm.name" />
        </a-form-item>
        <a-form-item label="触发条件">
          <a-select v-model:value="ruleForm.condition">
            <a-select-option value="keyword">关键词匹配</a-select-option>
            <a-select-option value="threshold">阈值触发</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="告警级别">
          <a-select v-model:value="ruleForm.level">
            <a-select-option value="critical">严重</a-select-option>
            <a-select-option value="warning">警告</a-select-option>
            <a-select-option value="info">提示</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="通知方式">
          <a-checkbox-group v-model:value="ruleForm.notifyMethods">
            <a-checkbox value="email">邮件</a-checkbox>
            <a-checkbox value="sms">短信</a-checkbox>
            <a-checkbox value="webhook">Webhook</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
  name: 'AlertCenter',
  setup() {
    const activeKey = ref('rules')
    const ruleModalVisible = ref(false)
    const ruleModalTitle = ref('新建告警规则')

    const ruleColumns = [
      { title: '规则名称', dataIndex: 'name', key: 'name' },
      { title: '触发条件', dataIndex: 'condition', key: 'condition' },
      { title: '告警级别', dataIndex: 'level', key: 'level' },
      { title: '状态', dataIndex: 'status', key: 'status' },
      { title: '操作', key: 'action' }
    ]

    const historyColumns = [
      { title: '时间', dataIndex: 'timestamp', key: 'timestamp' },
      { title: '告警级别', dataIndex: 'level', key: 'level' },
      { title: '告警内容', dataIndex: 'content', key: 'content' },
      { title: '处理状态', dataIndex: 'status', key: 'status' }
    ]

    const ruleForm = reactive({
      name: '',
      condition: 'keyword',
      level: 'warning',
      notifyMethods: ['email']
    })

    const getAlertLevelColor = (level) => {
      const colors = {
        critical: 'red',
        warning: 'orange',
        info: 'blue'
      }
      return colors[level] || 'blue'
    }

    return {
      activeKey,
      ruleModalVisible,
      ruleModalTitle,
      ruleColumns,
      historyColumns,
      ruleForm,
      rules: [],
      alertHistory: [],
      getAlertLevelColor
    }
  }
})
</script> 