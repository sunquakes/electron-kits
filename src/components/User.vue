<template>
  <a-table :columns="columns" :data-source="list" :scroll="{ x: '100%', y: 'calc(100vh - 360px)' }">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'operation'">
        <a href="#">{{ t('action.edit') }}</a>
        <a-divider type="vertical" />
        <a-popconfirm
          :title="t('confirm.delete')"
          :ok-text="t('button.ok')"
          :cancel-text="t('button.no')"
          @confirm="deleteConfirm(record)"
        >
          <a href="#">{{ t('action.delete') }}</a>
        </a-popconfirm>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import type { TableColumnsType } from 'ant-design-vue'
import { userList, userRemove } from '../api/user'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })

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
  handleList()
})

const handleList = async () => {
  list.value = await userList()
}

const deleteConfirm = async (record) => {
  await userRemove([['id', record.id]])
  handleList()
}
</script>
