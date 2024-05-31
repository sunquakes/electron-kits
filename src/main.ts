import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import i18n from './i18n'
import { init } from './db/init'

// Init db.
init()

createApp(App).use(router).use(store).use(Antd).use(i18n).mount('#app')
