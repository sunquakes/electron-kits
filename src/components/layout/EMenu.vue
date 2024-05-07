<template>
  <a-menu
    v-model:selectedKeys="state.selectedKeys"
    theme="dark"
    mode="inline"
    :items="items"
  ></a-menu>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue'
import router from '../../router'
const state = reactive({
  selectedKeys: ['1']
})

const list = router.options.routes
console.log('list', list)

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
  console.log('list0', list)
  let menu = []
  for (let item of list) {
    if (item.meta != undefined && item.meta.isMenu) {
      let menuItem
      if (item.children != undefined && item.children.length > 0) {
        menuItem = getItem(item.meta.title, item.path, null, getMenu(item.children))
      } else {
        menuItem = getItem(item.meta.title, item.path)
      }
      menu.push(menuItem)
    }
  }
  return menu
}

watch(
  () => state.selectedKeys,
  (_val, oldVal) => {
    console.log('_val', _val)
  }
)

const items = getMenu(list)
console.log('menu', items)
</script>
