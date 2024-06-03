<template>
  <a-drawer :title="title" :open="open" @close="onClose">
    <a-form :model="formState" v-bind="layout" :validate-messages="validateMessages" ref="formRef">
      <a-form-item name="username" :label="t('user.username')" :rules="[{ required: true }]">
        <a-input :disabled="model != null" v-model:value="formState.username" />
      </a-form-item>
      <a-form-item name="nickname" :label="t('user.nickname')" :rules="[{ required: true }]">
        <a-input v-model:value="formState.nickname" />
      </a-form-item>
      <a-form-item
        name="password"
        :label="t('user.password')"
        :rules="[{ required: formState.id === undefined }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>
    </a-form>
    <template #extra>
      <a-space>
        <a-button @click="onClose">Cancel</a-button>
        <a-button type="primary" @click="handleSubmit">Submit</a-button>
      </a-space>
    </template>
  </a-drawer>
</template>

<script lang="ts" setup>
import { ref, defineModel, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { add, edit } from '../../api/user'
import { message } from 'ant-design-vue'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
}

const emit = defineEmits(['close', 'refreshList'])

const { t } = useI18n({ useScope: 'global' })

const model = defineModel()

defineProps({
  open: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    required: true
  }
})

const validateMessages = {
  required: t('form.required', ['${label}'])
}

interface User {
  id?: number | undefined
  username: string
  nickname: string
  password: string
}

const user: User = {
  username: '',
  nickname: '',
  password: ''
}

let formState = ref<User>({ ...user })

const formRef = ref()

const handleSubmit = async (values: any) => {
  const valid = await formRef.value.validate()
  if (valid) {
    if (formState.value.id !== undefined) {
      await handleEdit()
    } else {
      await handleAdd()
    }
  }
}

const handleAdd = async () => {
  try {
    await add(formState.value)
    message.success(t('message.add.success'))
    onClose()
    emit('refreshList')
  } catch (e) {
    console.log('e', e)
    message.error(t('message.add.fail'))
  }
}

const handleEdit = async () => {
  try {
    await edit(formState.value.id as number, formState.value)
    message.success(t('message.edit.success'))
    onClose()
    emit('refreshList')
  } catch (e) {
    message.error(t('message.edit.fail'))
  }
}

const onClose = () => {
  emit('close', false)
}

const resetFormState = (data: User) => {
  if (data == null) {
    formState.value = { ...user }
  } else {
    data.password = ''
    formState.value = { ...data }
  }
}

watch(
  () => model.value,
  (_val) => {
    resetFormState(model.value as User)
  }
)
</script>
