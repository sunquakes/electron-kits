<template>
  <div class="chart-container" :id="id"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { onMounted } from 'vue'

const props = defineProps({
  id: {
    type: String,
    default: 'pie-container'
  },
  name: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  data: { type: Array, default: () => [] }
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
    title: {
      text: props.title,
      subtext: props.subtitle,
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: props.name,
        type: 'pie',
        radius: '50%',
        data: props.data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
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
