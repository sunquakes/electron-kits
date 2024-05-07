import { createMemoryHistory, createRouter } from 'vue-router'

import StrayBirds from '../components/StrayBirds.vue'
import ELayout from '../components/ELayout.vue'
import User from '../components/User.vue'
import ELogin from '../components/ELogin.vue'

const routes = [
  { name: '登录', path: '/login', component: ELogin },
  {
    path: '/',
    component: ELayout,
    meta: { isMenu: true, title: '用户管理' },
    children: [
      {
        name: '诗A',
        path: '/poemA',
        meta: { isMenu: true, title: '诗A' },
        component: StrayBirds
      },
      {
        name: '诗',
        path: '/poem',
        meta: { isMenu: true, title: '诗' },
        component: StrayBirds
      }
    ]
  },
  { name: '用户管理', path: '/User', component: User }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router
