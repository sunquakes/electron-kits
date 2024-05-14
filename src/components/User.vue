<template>
  <a-table :columns="columns" :data-source="list" :scroll="{ x: '100%', y: 'calc(100vh - 360px)' }">
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'operation'">
        <a>action</a>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import type { TableColumnsType } from 'ant-design-vue'
import { getList } from '../api/user'

const columns: TableColumnsType = [
  { title: 'ID', width: 50, dataIndex: 'id', key: 'id', fixed: 'left' },
  { title: 'Username', width: 100, dataIndex: 'username', key: 'username', fixed: 'left' },
  { title: 'Create Time', width: 100, dataIndex: 'create_time', key: 'create_time', fixed: 'left' },
  { title: 'Update Time', width: 100, dataIndex: 'update_time', key: 'update_time', fixed: 'left' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100
  }
]

interface DataItem {
  id: number
  username: string
  state: number
  create_time: string
  update_time: string
}

const list = ref<DataItem[]>([])
onMounted(async () => {
  list.value = await getList()
})
</script>
