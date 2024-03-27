import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/pages/index.vue'
import Babylon from '@/pages/babylon.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/babylon',
      name: 'babylon',
      component: Babylon
    }
  ]
})

export default router
