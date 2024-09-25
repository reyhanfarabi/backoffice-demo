import MainPage from '@/views/Landing/MainPage.vue'
import LoginView from '@/views/LoginView.vue'
import type { RouteRecordRaw } from 'vue-router'

export const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/admin/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/',
    name: 'Landing Page',
    component: MainPage
  }
]
