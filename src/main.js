import { createApp } from 'vue'
import './style.css'
import "@ant-design-vue/pro-layout/dist/style.css"; // pro-layout css or style.less
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import ProLayout, { PageContainer } from "@ant-design-vue/pro-layout";
import 'ant-design-vue/dist/reset.css'
import i18n from './i18n'

createApp(App).use(router).use(Antd).use(ProLayout).use(PageContainer).use(i18n).mount('#app')
