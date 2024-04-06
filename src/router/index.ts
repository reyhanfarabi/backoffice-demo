import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import TestPage1 from '../views/TestPage1.vue'
import TestPage2 from '../views/TestPage2.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      meta: { layout: MainLayout },
      component: MainView
    },
    {
      path: '/page1',
      name: 'page 1',
      meta: { layout: MainLayout },
      component: TestPage1
    },
    {
      path: '/page2',
      name: 'page 2',
      meta: { layout: MainLayout },
      component: TestPage2
    }
  ]
})

export default router
