<template>
  <div class="log-search">
    <a-card>
      <a-form layout="inline">
        <a-form-item label="时间范围">
          <a-range-picker showTime />
        </a-form-item>
        <a-form-item label="日志级别">
          <a-select style="width: 120px">
            <a-select-option value="error">ERROR</a-select-option>
            <a-select-option value="warn">WARN</a-select-option>
            <a-select-option value="info">INFO</a-select-option>
            <a-select-option value="debug">DEBUG</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-input-search
            placeholder="请输入搜索关键词"
            style="width: 300px"
            @search="onSearch"
          />
        </a-form-item>
      </a-form>

      <a-table
        :columns="columns"
        :data-source="data"
        :scroll="{ x: 1500 }"
        style="margin-top: 20px"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'level'">
            <a-tag :color="getLevelColor(record.level)">
              {{ record.level }}
            </a-tag>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'LogSearch',
  setup() {
    const columns = [
      {
        title: '时间',
        dataIndex: 'timestamp',
        key: 'timestamp',
        width: 180,
      },
      {
        title: '级别',
        dataIndex: 'level',
        key: 'level',
        width: 100,
      },
      {
        title: '来源',
        dataIndex: 'source',
        key: 'source',
        width: 150,
      },
      {
        title: '内容',
        dataIndex: 'content',
        key: 'content',
        ellipsis: true,
      },
    ]

    const getLevelColor = (level) => {
      const colors = {
        ERROR: 'red',
        WARN: 'orange',
        INFO: 'blue',
        DEBUG: 'green'
      }
      return colors[level] || 'blue'
    }

    return {
      columns,
      data: [],
      getLevelColor
    }
  }
})
</script> 