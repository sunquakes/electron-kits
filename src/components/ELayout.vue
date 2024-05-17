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
import { ref } from 'vue'
import { options } from '../db/sqlite3'

import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const collapsed = ref<boolean>(false)
const currentMenu = ref<string>('Dashboard')

// Get the current router object
const router = useRouter()
const store = useStore()

// Permission
options.before = (resolve, reject) => {
  const user = store.getters.user
  console.log('user', user)
  const currentRoute = router.currentRoute.value
  if (!user && !['Login'].includes(currentRoute.name)) {
    // Route to the login page.
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
