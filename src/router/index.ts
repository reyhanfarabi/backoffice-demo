import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import { routes } from './private'
import { publicRoutes } from './public'
import { API } from '@/api'

const getRoutes = (): RouteRecordRaw[] => {
  let result: RouteRecordRaw[] = []

  routes.forEach((route) => {
    if (route.children.length === 0) {
      result.push({
        path: route.path,
        name: route.name,
        meta: { layout: MainLayout },
        component: route.component
      })
    } else {
      route.children.forEach((child) => {
        result.push({
          path: route.path + child.path,
          name: child.name,
          meta: { layout: MainLayout },
          component: child.component
        })
      })
    }
  })

  result = [...result, ...publicRoutes]
  return result
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: getRoutes()
})

router.beforeEach(async (to) => {
  const routeName = String(to.name)
  const whiteList = publicRoutes.map((r) => r.name)

  if (whiteList.includes(routeName)) {
    return true
  }

  try {
    const response = await API.auth.whoAmI()
    console.log(response)
    return true
  } catch (e) {
    console.log(e)
    return { name: 'Login' }
  }
})

export default router
