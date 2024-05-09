<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible @collapse="collapse">
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

const collapsed = ref<boolean>(false)
const currentMenu = ref<string>('Dashboard')
</script>

<style lang="scss" scoped>
.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>
