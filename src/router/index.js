import { h } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'

import StrayBirds from '../components/StrayBirds.vue'
import Layout from '../components/Layout.vue'
import User from '../components/User.vue'
import Login from '../components/Login.vue'

import {
  DashboardOutlined,
  SettingOutlined
} from '@ant-design/icons-vue'

const routes = [
  { name: 'Login', path: '/login', component: Login },
  {
    path: '/',
    component: Layout,
    children: [
      {
        name: 'Dashboard',
        path: '/dashboard',
        component: StrayBirds,
        meta: { isMenu: true, title: 'menu.dashboard', icon: DashboardOutlined }
      },
      {
        name: 'System',
        path: '/system',
        meta: { isMenu: true, title: 'menu.system', icon: SettingOutlined },
        children: [
          {
            name: 'User',
            path: '/user',
            meta: { isMenu: true, title: 'menu.system_user' },
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
