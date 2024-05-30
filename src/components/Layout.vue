<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <Logo :collapsed="collapsed"></Logo>
      <Menu v-model="currentMenu"></Menu>
    </a-layout-sider>
    <a-layout>
      <Header />
      <a-layout-content style="margin: 0 16px">
        <BreadCrumb v-model="currentMenu" />
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <router-view></router-view>
        </div>
      </a-layout-content>
      <Footer></Footer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import Logo from './layout/Logo.vue'
import BreadCrumb from './layout/BreadCrumb.vue'
import Menu from './layout/Menu.vue'
import Header from './layout/Header.vue'
import Footer from './layout/Footer.vue'
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
  const currentRoute = router.currentRoute.value
  if (!user && !['Login'].includes(currentRoute.name as string)) {
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
