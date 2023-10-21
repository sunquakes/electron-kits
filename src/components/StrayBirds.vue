<template>
  <a-radio-group v-model:value="lang" @change="onChange">
    <a-radio-button value="zh">中文🇨🇳</a-radio-button>
    <a-radio-button value="en">English</a-radio-button>
  </a-radio-group>
  <div class="poem">
    <p>
      {{ $t('line_one') }}
    </p>
    <p>
      {{ $t('line_two') }}
    </p>
    <p>
      {{ $t('line_three') }}
    </p>
    <p>
      {{ $t('line_four') }}
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n({ useScope: 'global' })

const { modelValue } = defineProps({
  modelValue: {
    type: String,
    require: true
  }
})
let lang = ref("")
onMounted(() => {
  lang.value = modelValue
  locale.value = lang.value
})
const onChange = () => {
  locale.value = lang.value
}
</script>

<style scoped>
p {
  text-align: left;
}

.poem {
  margin-top: 20px;
}
</style>// 
