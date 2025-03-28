<template>
  <a-form
    layout="inline"
    :model="formState"
    @finish="handleFinish"
    @reset="handleReset"
  >
    <slot name="before" />
    
    <template v-for="(field, index) in fields" :key="index">
      <a-form-item
        :label="field.label"
        :name="field.name"
      >
        <!-- 输入框 -->
        <a-input
          v-if="field.type === 'input'"
          v-model:value="formState[field.name]"
          :placeholder="field.placeholder"
          :allowClear="true"
        />
        
        <!-- 选择框 -->
        <a-select
          v-if="field.type === 'select'"
          v-model:value="formState[field.name]"
          :placeholder="field.placeholder"
          :allowClear="true"
          :mode="field.mode"
          :options="field.options"
        />
        
        <!-- 日期选择 -->
        <a-range-picker
          v-if="field.type === 'dateRange'"
          v-model:value="formState[field.name]"
          :show-time="field.showTime"
          :format="field.format"
        />
      </a-form-item>
    </template>
    
    <slot name="after" />
    
    <a-form-item>
      <a-space>
        <a-button type="primary" html-type="submit">
          <template #icon><SearchOutlined /></template>
          搜索
        </a-button>
        <a-button html-type="reset">
          <template #icon><ReloadOutlined /></template>
          重置
        </a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { reactive } from 'vue'
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons-vue'

const props = defineProps({
  fields: {
    type: Array,
    required: true
  },
  initialValues: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['search', 'reset'])

const formState = reactive({
  ...props.initialValues
})

const handleFinish = (values) => {
  emit('search', values)
}

const handleReset = () => {
  Object.keys(formState).forEach(key => {
    formState[key] = props.initialValues[key] || undefined
  })
  emit('reset')
}
</script> 