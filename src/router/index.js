import { createMemoryHistory, createRouter } from 'vue-router'

import StrayBirds from '../components/StrayBirds.vue'
import User from '../components/User.vue'
import ELogin from '../components/ELogin.vue'

const routes = [
  { name: '登录', path: '/', component: ELogin },
  // { name: '首页', path: '/', component: StrayBirds },
  { name: '用户管理', path: '/User', component: User }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router
