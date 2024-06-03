<template>
  <div class="chart-container" :id="id"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { onMounted } from 'vue'

const props = defineProps({
  id: {
    type: String,
    default: 'bar-container'
  },
  data: {
    type: Object,
    default: () => {}
  }
})

onMounted(() => {
  init()
})

const init = () => {
  const chartDom = document.getElementById(props.id)
  const chart = echarts.init(chartDom)
  window.addEventListener('resize', function () {
    chart.resize()
  })

  const option = {
    grid: {
      top: '10%',
      left: '2%',
      right: '2%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: props.data.xAxis
    },
    yAxis: {
      type: 'value'
    },
    series: props.data.series
  }

  option && chart.setOption(option)
}
</script>

<style lang="scss" scoped>
.chart-container {
  width: 100%;
  height: 100%;
}
</style>
