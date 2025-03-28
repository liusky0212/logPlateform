<template>
  <div class="trend" :class="[type, reverse && 'reverse']">
    <span class="value">{{ value }}</span>
    <span class="icon">
      <CaretUpOutlined v-if="type === 'up'" />
      <CaretDownOutlined v-if="type === 'down'" />
    </span>
  </div>
</template>

<script setup>
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons-vue'

defineProps({
  type: {
    type: String,
    default: 'up'
  },
  value: {
    type: [String, Number],
    default: ''
  },
  reverse: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.trend {
  display: inline-flex;
  align-items: center;
  margin-right: 8px;
}

.value {
  margin-right: 4px;
}

.up {
  color: #f5222d;
}

.down {
  color: #52c41a;
}

.reverse.up {
  color: #52c41a;
}

.reverse.down {
  color: #f5222d;
}
</style> 