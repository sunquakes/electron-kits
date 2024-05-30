<template>
  <a-menu
    v-model:selectedKeys="state.selectedKeys"
    theme="dark"
    mode="inline"
    :items="items"
    @click="click"
  ></a-menu>
</template>

<script lang="ts" setup>
import { reactive, watch, ref, h, defineModel, VueElement } from 'vue'
import router from '../../router'
import { useI18n } from 'vue-i18n'
import { RouteRecord, RouteRecordName } from 'vue-router'
import { ItemType } from 'ant-design-vue'
import { Key } from 'ant-design-vue/es/_util/type'
const { t, locale } = useI18n({ useScope: 'global' })

const model = defineModel({ required: true })

const state = reactive({
  selectedKeys: [model.value as Key]
})

const routes = router.options.routes
const list = routes.map((item) => {
  return { ...item }
})

function getItem(
  label: VueElement | string,
  key: string,
  icon?: any,
  children?: ItemType[],
  type?: 'group'
): ItemType {
  return {
    key,
    icon,
    children,
    label,
    type
  } as ItemType
}

const getMenu = (list: RouteRecord[]): any => {
  let menu = []
  for (let item of list) {
    if (item.meta != undefined && item.meta.isMenu) {
      const menuItem = getMenuItem(item)
      if (menuItem != undefined) {
        menu.push(menuItem)
      }
    }
  }
  // Get the children if there is no menu.
  if (menu.length == 0) {
    menu = getMenuChildren(list)
  }
  return menu
}

const getMenuItem = (item: RouteRecord) => {
  let menuItem
  if (item.children != undefined && item.children.length > 0) {
    menuItem = getItem(
      t(item.meta.title as string),
      item.name as string,
      item?.meta?.icon ? h(item.meta.icon) : null,
      getMenu(item.children as RouteRecord[])
    )
  } else {
    menuItem = getItem(
      t(item.meta.title as string),
      item.name as string,
      item?.meta?.icon ? h(item.meta.icon) : null
    )
  }

  return menuItem
}

const getMenuChildren = (list: RouteRecord[]) => {
  let menu = []
  for (let item of list) {
    if (item.children != undefined && item.children.length > 0) {
      menu = getMenu(item.children as RouteRecord[])
    }
  }
  return menu
}

watch(
  () => state.selectedKeys,
  (_val) => {
    console.log('_val', _val)
  }
)

const items = ref<ItemType[]>()
items.value = getMenu(list as RouteRecord[])

watch(
  () => locale.value,
  (_val) => {
    items.value = getMenu(list as RouteRecord[])
  }
)

router.push({ name: model.value as RouteRecordName })

const click = (menu: any) => {
  model.value = menu.key
  router.push({ name: menu.key as RouteRecordName })
}
</script>
