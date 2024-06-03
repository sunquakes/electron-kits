<template>
  <a-row>
    <a-col class="chart-container" :span="12"><Pie :data="pieData" /></a-col>
    <a-col class="chart-container" :span="12"><Bar :data="barData" /></a-col>
  </a-row>
  <a-row>
    <a-col class="chart-container" :span="24"><Line :data="lineData" /></a-col>
  </a-row>
</template>

<script lang="ts" setup>
import Pie from './chart/Pie.vue'
import Bar from './chart/Bar.vue'
import Line from './chart/Line.vue'
import pieData from '../api/pie.json'
import barData from '../api/bar.json'
import lineData from '../api/line.json'
</script>

<style lang="scss" scoped>
.chart-container {
  height: 25vw;
}
</style>
