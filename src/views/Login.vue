<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="login-title">日志分析平台</h2>
      <a-form
        :model="formState"
        :rules="rules"
        @finish="handleFinish"
        class="login-form"
      >
        <a-form-item name="username">
          <a-input
            v-model:value="formState.username"
            placeholder="用户名"
            size="large"
          >
            <template #prefix>
              <UserOutlined />
            </template>
          </a-input>
        </a-form-item>
        
        <a-form-item name="password">
          <a-input-password
            v-model:value="formState.password"
            placeholder="密码"
            size="large"
          >
            <template #prefix>
              <LockOutlined />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-checkbox v-model:checked="formState.remember">
            记住我
          </a-checkbox>
          <a class="login-form-forgot" href="">
            忘记密码
          </a>
        </a-form-item>

        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            size="large"
            :loading="loading"
            block
          >
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage'
}
</script>

<script setup>
import { reactive, ref } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)

const formState = reactive({
  username: '',
  password: '',
  remember: true
})

const rules = {
  username: [
    { required: true, message: '请输入用户名' }
  ],
  password: [
    { required: true, message: '请输入密码' }
  ]
}

const handleFinish = async (values) => {
  loading.value = true
  try {
    // TODO: 实现实际的登录逻辑
    await new Promise(resolve => setTimeout(resolve, 1000))
    localStorage.setItem('token', 'dummy-token')
    message.success('登录成功')
    router.push('/')
  } catch (error) {
    message.error('登录失败')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f2f5;
}
.login-box {
  width: 368px;
  padding: 24px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}
.login-title {
  text-align: center;
  margin-bottom: 24px;
}
.login-form-forgot {
  float: right;
}
</style> 