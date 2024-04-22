<template>
  <a-radio-group v-model:value="lang" @change="onChange">
    <a-radio-button value="zh">中文🇨🇳</a-radio-button>
    <a-radio-button value="en">English</a-radio-button>
  </a-radio-group>
  <div class="poem">
    {{ t("line_one") }}
    <p>
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
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n({ useScope: 'global' })

let lang = 'en'
onMounted(() => {
  locale.value = lang
})
const onChange = () => {
  locale.value = lang
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
