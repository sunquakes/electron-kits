<template>
  <a-row>
    <a-col :span="12">
      <a-statistic title="Active Users" :value="userCount" style="margin-right: 50px" />
    </a-col>
    <a-col :span="12">
      <a-statistic title="Account Balance (CNY)" :precision="2" :value="112893" />
    </a-col>
  </a-row>
  <a-row>
    <a-col :span="24">
      <a-collapse v-model:activeKey="activeKey">
        <a-collapse-panel key="1" header="This is panel header 1">
          <p>
            A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be
            found as a welcome guest in many households across the world.
          </p>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="This is panel header 2">
          <p>
            A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be
            found as a welcome guest in many households across the world.
          </p>
        </a-collapse-panel>
        <a-collapse-panel key="3" header="This is panel header 3" collapsible="disabled">
          <p>
            A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be
            found as a welcome guest in many households across the world.
          </p>
        </a-collapse-panel>
      </a-collapse>
    </a-col>
  </a-row>
  <a-row>
    <a-col :span="24">
      <a-alert message="Success Tips" type="success" show-icon />
    </a-col>
    <a-col :span="24">
      <a-alert message="Informational Notes" type="info" show-icon />
    </a-col>
    <a-col :span="24">
      <a-alert message="Warning" type="warning" show-icon />
    </a-col>
    <a-col :span="24">
      <a-alert message="Error" type="error" show-icon />
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import { doCount } from '../api/user'
import { ref, onMounted } from 'vue'

const userCount = ref<number>(0)
const activeKey = ref(['1'])
onMounted(async () => {
  userCount.value = await doCount()
})
</script>

<style lang="scss" scoped>
.ant-row {
  padding: 8px 0;
}
.ant-col {
  margin: 4px 0;
}
</style>
