<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <ELogo :collapsed="collapsed"></ELogo>
      <EMenu v-model="currentMenu"></EMenu>
    </a-layout-sider>
    <a-layout>
      <EHeader />
      <a-layout-content style="margin: 0 16px">
        <EBreadCrumb v-model="currentMenu" />
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <router-view></router-view>
        </div>
      </a-layout-content>
      <EFooter></EFooter>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import ELogo from './layout/ELogo.vue'
import EBreadCrumb from './layout/EBreadCrumb.vue'
import EMenu from './layout/EMenu.vue'
import EHeader from './layout/EHeader.vue'
import EFooter from './layout/EFooter.vue'
import { ref, computed } from 'vue'
import { options } from '../db/sqlite3'

import { useRouter } from 'vue-router'

const collapsed = ref<boolean>(false)
const currentMenu = ref<string>('Dashboard')

// Get the current router object
const router = useRouter()

// Permission
options.before = (resolve, reject) => {
  const user = localStorage.getItem('user')
  const currentRoute = computed(() => router.currentRoute.value)
  console.log('currentRoute', currentRoute.value.name, !['Login'].includes(currentRoute.value.name))
  if (!user && !['Login'].includes(currentRoute.value.name)) {
    router.push({ name: 'Login' })
    reject(new Error('No permission.'))
  }
}
</script>

<style lang="scss" scoped>
.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>
