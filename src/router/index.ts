import { createMemoryHistory, createRouter } from 'vue-router'

import Layout from '../components/Layout.vue'
import Dashboard from '../components/Dashboard.vue'
import Chart from '../components/Chart.vue'
import User from '../components/User.vue'
import Login from '../components/Login.vue'

import { DashboardOutlined, PieChartOutlined, SettingOutlined } from '@ant-design/icons-vue'

const routes = [
  { name: 'Login', path: '/login', component: Login },
  {
    path: '/',
    component: Layout,
    children: [
      {
        name: 'Dashboard',
        path: '/dashboard',
        component: Dashboard,
        meta: { isMenu: true, title: 'menu.dashboard', icon: DashboardOutlined }
      },
      {
        name: 'Chart',
        path: '/chart',
        component: Chart,
        meta: { isMenu: true, title: 'menu.chart', icon: PieChartOutlined }
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
