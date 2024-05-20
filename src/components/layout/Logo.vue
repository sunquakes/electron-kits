<template>
  <div class="logo">
    <img src="/logo.png" alt="logo" />
    <span :class="{ 'title-hide': collapsed }">Electron Kits</span>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  collapsed: Boolean
})
</script>

<style lang="scss" scoped>
.logo {
  height: 32px;
  margin: 16px;
  color: #fff;
  display: flex;
  align-items: center;
  text-align: center;
  span {
    padding: 8px 8px;
    font-size: 20px;
    font-weight: bold;
  }

  .title-hide {
    display: none;
  }

  img {
    margin: 0 auto;
    width: 30px;
  }
}
</style>
