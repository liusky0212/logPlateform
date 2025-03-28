<template>
  <a-layout class="layout">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo">
        <LogoIcon /> 日志分析平台
      </div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="inline"
      >
        <a-menu-item key="dashboard">
          <router-link to="/">
            <DashboardOutlined />
            <span>仪表盘</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="search">
          <router-link to="/search">
            <SearchOutlined />
            <span>日志查询</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="analysis">
          <router-link to="/analysis">
            <BarChartOutlined />
            <span>日志分析</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="alert">
          <router-link to="/alert">
            <BellOutlined />
            <span>告警管理</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="settings">
          <router-link to="/settings">
            <SettingOutlined />
            <span>系统设置</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    
    <a-layout>
      <a-layout-header class="header">
        <div class="header-right">
          <a-dropdown>
            <a class="user-dropdown">
              <UserOutlined />
              <span>管理员</span>
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item key="profile">
                  个人信息
                </a-menu-item>
                <a-menu-item key="logout">
                  退出登录
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>
      
      <a-layout-content class="content">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import {
  DashboardOutlined,
  SearchOutlined,
  BarChartOutlined,
  BellOutlined,
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons-vue'

const route = useRoute()
const collapsed = ref(false)
const selectedKeys = ref([route.name])
</script>

<style scoped>
.layout {
  min-height: 100vh;
}
.logo {
  height: 64px;
  line-height: 64px;
  color: white;
  text-align: center;
  font-size: 18px;
  overflow: hidden;
}
.header {
  background: #fff;
  padding: 0;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
}
.header-right {
  float: right;
  margin-right: 24px;
}
.user-dropdown {
  color: rgba(0,0,0,.85);
  padding: 0 12px;
}
.content {
  margin: 24px 16px;
  padding: 24px;
  background: #fff;
  min-height: 280px;
}
</style> 