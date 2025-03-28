<template>
  <div class="log-viewer">
    <div class="log-viewer-header">
      <a-space>
        <a-select
          v-model:value="wrapLines"
          style="width: 120px"
        >
          <a-select-option value="nowrap">不换行</a-select-option>
          <a-select-option value="wrap">自动换行</a-select-option>
        </a-select>
        <a-button type="primary" @click="copyContent">
          <template #icon><CopyOutlined /></template>
          复制
        </a-button>
      </a-space>
    </div>
    <div 
      class="log-content" 
      :style="{ 'white-space': wrapLines === 'wrap' ? 'pre-wrap' : 'pre' }"
    >
      <div 
        v-for="(line, index) in logLines" 
        :key="index"
        class="log-line"
        :class="{ highlight: highlightLines.includes(index + 1) }"
      >
        <span class="line-number">{{ index + 1 }}</span>
        <span class="line-content">{{ line }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { CopyOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

const props = defineProps({
  content: {
    type: String,
    default: ''
  },
  highlightLines: {
    type: Array,
    default: () => []
  }
})

const wrapLines = ref('nowrap')
const logLines = computed(() => props.content.split('\n'))

const copyContent = async () => {
  try {
    await navigator.clipboard.writeText(props.content)
    message.success('复制成功')
  } catch (err) {
    message.error('复制失败')
  }
}
</script>

<style scoped>
.log-viewer {
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}

.log-viewer-header {
  padding: 8px;
  border-bottom: 1px solid #d9d9d9;
  background: #fafafa;
}

.log-content {
  padding: 8px 0;
  background: #1e1e1e;
  color: #d4d4d4;
  font-family: monospace;
  overflow-x: auto;
}

.log-line {
  display: flex;
  padding: 0 8px;
}

.log-line:hover {
  background: #2a2a2a;
}

.log-line.highlight {
  background: #3a3a3a;
}

.line-number {
  color: #858585;
  padding-right: 16px;
  user-select: none;
}

.line-content {
  flex: 1;
}
</style> 