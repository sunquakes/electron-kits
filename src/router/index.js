import { createMemoryHistory, createRouter } from 'vue-router'

import StrayBirds from '../components/StrayBirds.vue'

const routes = [
  { path: '/', component: StrayBirds }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router