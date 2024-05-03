import CategoriesListPage from '@/views/Categories/ListPage.vue'
import MainView from '@/views/MainView.vue'
import ProductsListPage from '@/views/Products/ListPage.vue'
import type { RouteComponent } from 'vue-router'

export interface IRouteBase {
  path: string
  name: string
  component: RouteComponent
}

export interface IRoute extends IRouteBase {
  icon: string
  children: IRouteBase[]
}

export const routes: IRoute[] = [
  {
    path: '/',
    name: 'Dashboard',
    component: MainView,
    icon: 'pi-home',
    children: []
  },
  // {
  //   path: '/page1',
  //   name: 'Page 1',
  //   icon: 'pi-clipboard',
  //   component: TestPage1,
  //   children: [
  //     {
  //       path: '/',
  //       name: 'Page 1',
  //       component: TestPage1
  //     },
  //     {
  //       path: '/child1',
  //       name: 'Child 1',
  //       component: TestPage1Child1
  //     }
  //   ]
  // },
  // {
  //   path: '/page2',
  //   name: 'Page 2',
  //   component: TestPage2,
  //   icon: 'pi-file-plus',
  //   children: []
  // },
  {
    path: '/categories',
    name: 'Categories',
    component: CategoriesListPage,
    icon: 'pi-th-large',
    children: []
  },
  {
    path: '/products',
    name: 'Products',
    component: ProductsListPage,
    icon: 'pi-database',
    children: []
  }
]
