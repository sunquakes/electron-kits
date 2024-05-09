import { h } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'

import StrayBirds from '../components/StrayBirds.vue'
import ELayout from '../components/ELayout.vue'
import User from '../components/User.vue'
import ELogin from '../components/ELogin.vue'

import {
  DashboardOutlined,
  SettingOutlined
} from '@ant-design/icons-vue'

const routes = [
  { name: 'Login', path: '/login', component: ELogin },
  {
    path: '/',
    component: ELayout,
    children: [
      {
        name: 'Dashboard',
        path: '/dashboard',
        component: StrayBirds,
        meta: { isMenu: true, title: '首页', icon: DashboardOutlined }
      },
      {
        name: 'System',
        path: '/system',
        meta: { isMenu: true, title: '系统管理', icon: SettingOutlined },
        children: [
          {
            name: 'User',
            path: '/user',
            meta: { isMenu: true, title: '系统用户' },
            component: User 
          }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router
