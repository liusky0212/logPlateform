<template>
  <div class="system-settings">
    <a-card>
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="storage" tab="存储配置">
          <a-form :model="storageForm" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
            <a-form-item label="存储类型">
              <a-radio-group v-model:value="storageForm.type">
                <a-radio value="local">本地存储</a-radio>
                <a-radio value="s3">S3兼容存储</a-radio>
                <a-radio value="elasticsearch">Elasticsearch</a-radio>
              </a-radio-group>
            </a-form-item>

            <template v-if="storageForm.type === 's3'">
              <a-form-item label="Endpoint">
                <a-input v-model:value="storageForm.s3.endpoint" />
              </a-form-item>
              <a-form-item label="Access Key">
                <a-input v-model:value="storageForm.s3.accessKey" />
              </a-form-item>
              <a-form-item label="Secret Key">
                <a-input-password v-model:value="storageForm.s3.secretKey" />
              </a-form-item>
              <a-form-item label="Bucket">
                <a-input v-model:value="storageForm.s3.bucket" />
              </a-form-item>
            </template>

            <template v-if="storageForm.type === 'elasticsearch'">
              <a-form-item label="集群地址">
                <a-input v-model:value="storageForm.es.hosts" />
              </a-form-item>
              <a-form-item label="索引前缀">
                <a-input v-model:value="storageForm.es.indexPrefix" />
              </a-form-item>
            </template>

            <a-form-item label="保留策略">
              <a-input-number
                v-model:value="storageForm.retention"
                :min="1"
                :max="365"
                addon-after="天"
              />
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 4 }">
              <a-button type="primary" @click="saveStorageSettings">
                保存配置
              </a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>

        <a-tab-pane key="notification" tab="通知配置">
          <a-form :model="notificationForm" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
            <a-form-item label="邮件服务器">
              <a-input v-model:value="notificationForm.email.server" />
            </a-form-item>
            <a-form-item label="发件人">
              <a-input v-model:value="notificationForm.email.sender" />
            </a-form-item>
            <a-form-item label="SMTP密码">
              <a-input-password v-model:value="notificationForm.email.password" />
            </a-form-item>

            <a-divider />

            <a-form-item label="Webhook">
              <a-input v-model:value="notificationForm.webhook.url" />
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 4 }">
              <a-space>
                <a-button type="primary" @click="saveNotificationSettings">
                  保存配置
                </a-button>
                <a-button @click="testNotification">
                  测试通知
                </a-button>
              </a-space>
            </a-form-item>
          </a-form>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
  name: 'SystemSettings',
  setup() {
    const activeKey = ref('storage')

    const storageForm = reactive({
      type: 'local',
      retention: 30,
      s3: {
        endpoint: '',
        accessKey: '',
        secretKey: '',
        bucket: ''
      },
      es: {
        hosts: '',
        indexPrefix: 'logs-'
      }
    })

    const notificationForm = reactive({
      email: {
        server: '',
        sender: '',
        password: ''
      },
      webhook: {
        url: ''
      }
    })

    const saveStorageSettings = () => {
      // 实现存储配置保存逻辑
    }

    const saveNotificationSettings = () => {
      // 实现通知配置保存逻辑
    }

    const testNotification = () => {
      // 实现测试通知逻辑
    }

    return {
      activeKey,
      storageForm,
      notificationForm,
      saveStorageSettings,
      saveNotificationSettings,
      testNotification
    }
  }
})
</script> 