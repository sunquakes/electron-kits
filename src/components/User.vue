<template>
  <a-form ref="formRef" name="advanced_search" class="ant-advanced-search-form" :model="formState">
    <a-row :gutter="24">
      <a-col :span="8">
        <a-form-item name="nickname" :label="t('user.nickname')">
          <a-input v-model:value="formState.nickname" :placeholder="t('user.nickname')"></a-input>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item name="username" :label="t('user.username')">
          <a-input v-model:value="formState.username" :placeholder="t('user.username')"></a-input>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="12">
        <a-button type="primary" @click="handleAdd">{{ t('action.add') }}</a-button>
      </a-col>
      <a-col :span="12" style="text-align: right">
        <a-button type="primary" html-type="submit">{{ t('action.search') }}</a-button>
        <a-button style="margin: 0 8px" @click="() => formRef.resetFields()">{{
          t('action.reset')
        }}</a-button>
      </a-col>
    </a-row>
  </a-form>
  <a-table :columns="columns" :data-source="list" :scroll="{ x: '100%', y: 'calc(100vh - 360px)' }">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'operation'">
        <a href="#" @click="handleEdit(record)">{{ t('action.edit') }}</a>
        <a-divider type="vertical" />
        <a-popconfirm
          :title="t('confirm.delete')"
          :ok-text="t('button.ok')"
          :cancel-text="t('button.no')"
          @confirm="handleDel(record)"
        >
          <a href="#">{{ t('action.delete') }}</a>
        </a-popconfirm>
      </template>
    </template>
  </a-table>
  <Form
    v-model="item"
    :title="formTitle"
    :open="open"
    @close="() => (open = false)"
    @refreshList="handlePage"
  ></Form>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue'
import type { TableColumnsType, FormInstance } from 'ant-design-vue'
import { page, del } from '../api/user'
import { useI18n } from 'vue-i18n'
import Form from './user/Form.vue'

const formRef = ref<FormInstance>()
const formState = reactive({})

const { t } = useI18n({ useScope: 'global' })

const columns: TableColumnsType = [
  { title: 'ID', width: 50, dataIndex: 'id', key: 'id', fixed: 'left' },
  { title: 'Nickname', width: 100, dataIndex: 'nickname', key: 'nickname', fixed: 'left' },
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
  handlePage()
})

const handlePage = async () => {
  list.value = await page()
}

const handleDel = async (record) => {
  await del([['id', record.id]])
  handlePage()
}

const open = ref<Boolean>(false)
const item = ref(null)

const formTitle = ref<String>('')

const handleAdd = () => {
  formTitle.value = t('title.add')
  open.value = true
  item.value = null
}

const handleEdit = (record) => {
  formTitle.value = t('title.edit')
  open.value = true
  item.value = record
}
</script>

<style lang="scss" scoped>
.ant-advanced-search-form {
  padding: 10px 0px;
}
</style>
