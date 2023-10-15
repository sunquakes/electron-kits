<script setup>
import { ref } from 'vue'
import { execute } from '../db/sqlite3';

execute(
  'CREATE TABLE IF NOT EXISTS session (' +
  'id Integer PRIMARY KEY AUTOINCREMENT,' +
  'ip VARCHAR(255) NOT NULL DEFAULT "",' +
  'port Integer NOT NULL DEFAULT 80,' +
  'state Integer NOT NULL DEFAULT 0,' +
  'type Integer NOT NULL DEFAULT 0,' +
  'delimiter VARCHAR(255) NOT NULL DEFAULT "",' +
  'message_type VARCHAR(20) NOT NULL DEFAULT "",' +
  'create_time DATETIME,' +
  'update_time DATETIME' +
  ')'
)

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the official Vue + Vite
    starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
