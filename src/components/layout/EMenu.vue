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
import { reactive, watch, h, defineModel } from 'vue'
import router from '../../router'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

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
      let menuItem
      if (item.children != undefined && item.children.length > 0) {
        menuItem = getItem(t(item.meta.title), item.name, h(item.meta.icon), getMenu(item.children))
      } else {
        menuItem = getItem(t(item.meta.title), item.name, h(item.meta.icon))
      }
      menu.push(menuItem)
    }
  }
  // Get the children if there is no menu.
  if (menu.length == 0) {
    menu = getMenuChildren(list)
  }
  return menu
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
  (_val, oldVal) => {
    console.log('_val', _val)
  }
)

const items = getMenu(list)

router.push({ name: model.value })

const click = (menu) => {
  model.value = menu.key
  router.push({ name: menu.key })
}
</script>
