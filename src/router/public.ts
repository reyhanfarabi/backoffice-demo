import LandingLayout from '@/layouts/LandingLayout.vue'
import MainPage from '@/views/Landing/MainPage.vue'
import ShopPage from '@/views/Landing/ShopPage.vue'
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
    component: MainPage,
    meta: {
      layout: LandingLayout
    }
  },
  {
    path: '/shop',
    name: 'Shop',
    component: ShopPage,
    meta: {
      layout: LandingLayout
    }
  }
  // {
  //   path: '/',
  //   name: 'Landing Page',
  //   component: MainPage
  // },
  // {
  //   path: '/',
  //   name: 'Landing Page',
  //   component: MainPage
  // }
]
