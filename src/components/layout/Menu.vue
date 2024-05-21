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
import { reactive, watch, ref, h, defineModel } from 'vue'
import router from '../../router'
import { useI18n } from 'vue-i18n'
import { RouteRecord } from 'vue-router'
const { t, locale } = useI18n({ useScope: 'global' })

const model = defineModel({ required: true })

const state = reactive({
  selectedKeys: [model.value]
})

const list = router.options.routes

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

const getMenu = (list: RouteRecord[]) => {
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
      t(item.meta.title),
      item.name,
      item?.meta?.icon ? h(item.meta.icon) : null,
      getMenu(item.children)
    )
  } else {
    menuItem = getItem(t(item.meta.title), item.name, item?.meta?.icon ? h(item.meta.icon) : null)
  }

  return menuItem
}

const getMenuChildren = (list: RouteRecord[]) => {
  let menu = []
  for (let item of list) {
    if (item.children != undefined && item.children.length > 0) {
      menu = getMenu(item.children)
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
items.value = getMenu(list)

watch(
  () => locale.value,
  (_val) => {
    items.value = getMenu(list)
  }
)

router.push({ name: model.value })

const click = (menu) => {
  model.value = menu.key
  router.push({ name: menu.key })
}
</script>