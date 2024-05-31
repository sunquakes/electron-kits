<template>
  <a-breadcrumb style="margin: 16px 0" :routes="items">
    <template #itemRender="{ route, params, routes, paths }">
      <span v-if="routes.indexOf(route) === routes.length - 1">{{ route.breadcrumbName }}</span>
      <router-link v-else :to="paths.join('/')">{{ route.breadcrumbName }}</router-link>
    </template>
  </a-breadcrumb>
</template>

<script lang="ts" setup>
import { watch, defineModel, ref } from 'vue'
import router from '../../router'
import { useI18n } from 'vue-i18n'
import { RouteRecordRaw } from 'vue-router'
const { t, locale } = useI18n({ useScope: 'global' })

interface Route {
  path: string
  breadcrumbName: string
  children?: Array<{
    path: string
    breadcrumbName: string
  }>
}

const routes = router.options.routes
const list = routes.map((item) => {
  return { ...item }
})

const getMenu = (list: RouteRecordRaw[], name: string): Route[] | undefined => {
  let breadcrumb = []
  for (let item of list) {
    if (item.meta != undefined && item.meta.isMenu) {
      breadcrumb.push({ path: item.path, breadcrumbName: t(item.meta.title as string) })
      if (item.name == name) {
        return breadcrumb
      }
    }
    if (item.children != undefined && item.children.length > 0) {
      const children = getMenu(item.children, name)
      if (children != undefined && children.length > 0) {
        breadcrumb = breadcrumb.concat(children)
        return breadcrumb
      }
    }
    breadcrumb = []
  }
}

const model = defineModel({ required: true, type: String })

const items = ref<Route[]>()
items.value = getMenu(list, model.value)

watch(
  () => locale.value,
  (_val) => {
    items.value = getMenu(list, model.value)
  }
)

watch(
  () => model.value,
  (_val) => {
    items.value = getMenu(list, model.value)
  }
)
</script>
