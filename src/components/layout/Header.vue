<template>
  <a-layout-header style="background: #fff; padding: 0">
    <a-page-header
      title="Title"
      class="site-page-header"
      sub-title="This is a subtitle"
      :avatar="{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }"
    >
      <template #tags>
        <a-tag color="blue">Running</a-tag>
      </template>
      <template #extra>
        <a-button key="3">Operation</a-button>
        <a-button key="2">Operation</a-button>
        <a-select v-model:value="locale" style="width: 90px" :options="langOptions"></a-select>
        <a-dropdown key="more">
          <a-button :style="{ border: 'none', padding: 0 }">
            <EllipsisOutlined :style="{ fontSize: '20px', verticalAlign: 'top' }" />
          </a-button>
          <template #overlay>
            <a-menu>
              <a-menu-item @click="profile"> Profile </a-menu-item>
              <a-menu-item @click="logout"> Logout </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </a-page-header>
  </a-layout-header>
  <contextHolder />
</template>

<script lang="ts" setup>
import { EllipsisOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue'
import type { SelectProps } from 'ant-design-vue'
import { ref, h } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Modal } from 'ant-design-vue'

const { t, locale } = useI18n({ useScope: 'global' })
const router = useRouter()
const store = useStore()
const [modal, contextHolder] = Modal.useModal()

const langOptions = ref<SelectProps['options']>([
  {
    value: 'en',
    label: 'English'
  },
  {
    value: 'zh',
    label: '中文'
  }
])

const logout = () => {
  console.log(2)
  modal.confirm({
    title: t('logout.confirm'),
    icon: h(ExclamationCircleOutlined),
    onOk() {
      // Remove login user info and route to the login page.
      store.dispatch('removeUser')
      router.push({ name: 'Login' })
    }
  })
}

const profile = () => {
  console.log('profile')
}
</script>
