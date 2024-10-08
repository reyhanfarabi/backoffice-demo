import CategoriesDetailPage from '@/views/Categories/DetailPage.vue'
import CategoriesEditPage from '@/views/Categories/EditPage.vue'
import CategoriesListPage from '@/views/Categories/ListPage.vue'
import MainView from '@/views/MainView.vue'
import ProductsAddPage from '@/views/Products/AddPage.vue'
import ProductsDetailPage from '@/views/Products/DetailPage.vue'
import EditPage from '@/views/Products/EditPage.vue'
import ProductsListPage from '@/views/Products/ListPage.vue'
import ShopsDetailPage from '@/views/Shops/DetailPage.vue'
import ShopEditPage from '@/views/Shops/EditPage.vue'
import ShopsListPage from '@/views/Shops/ListPage.vue'
import type { RouteComponent } from 'vue-router'

export interface IRouteBase {
  path: string
  name: string
  component: RouteComponent
}

export interface IRoute extends IRouteBase {
  icon: string
  meta: IRouteMeta
  children: IRouteBase[]
}

export interface IRouteMeta {
  showChildRoute: boolean
}

export const routes: IRoute[] = [
  {
    path: '/admin',
    name: 'Dashboard',
    component: MainView,
    icon: 'pi-home',
    meta: {
      showChildRoute: false
    },
    children: []
  },
  {
    path: '/admin/categories',
    name: 'Categories',
    component: CategoriesListPage,
    icon: 'pi-th-large',
    meta: {
      showChildRoute: false
    },
    children: [
      {
        path: '/',
        name: 'Categories List',
        component: CategoriesListPage
      },
      {
        path: '/detail/:id',
        name: 'Categories Detail',
        component: CategoriesDetailPage
      },
      {
        path: '/edit/:id',
        name: 'Categories Edit',
        component: CategoriesEditPage
      }
    ]
  },
  {
    path: '/admin/products',
    name: 'Products',
    component: ProductsListPage,
    icon: 'pi-database',
    meta: {
      showChildRoute: false
    },
    children: [
      {
        path: '/',
        name: 'Products List',
        component: ProductsListPage
      },
      {
        path: '/detail/:id',
        name: 'Products Detail',
        component: ProductsDetailPage
      },
      {
        path: '/add',
        name: 'Products Add',
        component: ProductsAddPage
      },
      {
        path: '/edit/:id',
        name: 'Products Edit',
        component: EditPage
      }
    ]
  },
  {
    path: '/admin/shops',
    name: 'Shops',
    component: ShopsListPage,
    icon: 'pi-shop',
    meta: {
      showChildRoute: false
    },
    children: [
      {
        path: '/',
        name: 'Shops List',
        component: ShopsListPage
      },
      {
        path: '/edit/:id',
        name: 'Shops Edit',
        component: ShopEditPage
      },
      {
        path: '/detail/:id',
        name: 'Shops Detail',
        component: ShopsDetailPage
      }
    ]
  }
]
