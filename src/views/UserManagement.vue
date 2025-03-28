<template>
  <div class="user-management">
    <a-card>
      <template #extra>
        <a-button type="primary" @click="showCreateUser">
          <user-add-outlined /> 新建用户
        </a-button>
      </template>

      <a-table :columns="columns" :data-source="users">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <a-tag :color="record.status === 'active' ? 'green' : 'red'">
              {{ record.status === 'active' ? '启用' : '禁用' }}
            </a-tag>
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a-button type="link" @click="editUser(record)">编辑</a-button>
              <a-button type="link" @click="resetPassword(record)">重置密码</a-button>
              <a-button
                type="link"
                :danger="record.status === 'active'"
                @click="toggleUserStatus(record)"
              >
                {{ record.status === 'active' ? '禁用' : '启用' }}
              </a-button>
            </a-space>
          </template>
        </template>
      </a-table>

      <!-- 用户表单弹窗 -->
      <a-modal
        v-model:visible="userModalVisible"
        :title="userModalTitle"
        @ok="handleUserModalOk"
      >
        <a-form
          :model="userForm"
          :rules="userFormRules"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-form-item label="用户名" name="username">
            <a-input v-model:value="userForm.username" />
          </a-form-item>
          <a-form-item label="邮箱" name="email">
            <a-input v-model:value="userForm.email" />
          </a-form-item>
          <a-form-item label="角色" name="role">
            <a-select v-model:value="userForm.role">
              <a-select-option value="admin">管理员</a-select-option>
              <a-select-option value="operator">运维人员</a-select-option>
              <a-select-option value="viewer">普通用户</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="权限组" name="groups">
            <a-select
              v-model:value="userForm.groups"
              mode="multiple"
              placeholder="请选择权限组"
            >
              <a-select-option value="log_manage">日志管理</a-select-option>
              <a-select-option value="alert_manage">告警管理</a-select-option>
              <a-select-option value="system_config">系统配置</a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
      </a-modal>

      <!-- 重置密码弹窗 -->
      <a-modal
        v-model:visible="passwordModalVisible"
        title="重置密码"
        @ok="handlePasswordReset"
      >
        <a-form :model="passwordForm">
          <a-form-item label="新密码">
            <a-input-password v-model:value="passwordForm.password" />
          </a-form-item>
          <a-form-item label="确认密码">
            <a-input-password v-model:value="passwordForm.confirmPassword" />
          </a-form-item>
        </a-form>
      </a-modal>
    </a-card>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
  name: 'UserManagement',
  setup() {
    const columns = [
      { title: '用户名', dataIndex: 'username', key: 'username' },
      { title: '邮箱', dataIndex: 'email', key: 'email' },
      { title: '角色', dataIndex: 'role', key: 'role' },
      { title: '状态', dataIndex: 'status', key: 'status' },
      { title: '最后登录', dataIndex: 'lastLogin', key: 'lastLogin' },
      { title: '操作', key: 'action' }
    ]

    const userForm = reactive({
      username: '',
      email: '',
      role: 'viewer',
      groups: []
    })

    const userFormRules = {
      username: [{ required: true, message: '请输入用户名' }],
      email: [
        { required: true, message: '请输入邮箱' },
        { type: 'email', message: '请输入有效的邮箱地址' }
      ],
      role: [{ required: true, message: '请选择角色' }]
    }

    const passwordForm = reactive({
      password: '',
      confirmPassword: ''
    })

    return {
      columns,
      userForm,
      userFormRules,
      passwordForm,
      users: [],
      userModalVisible: ref(false),
      userModalTitle: ref('新建用户'),
      passwordModalVisible: ref(false)
    }
  }
})
</script> 