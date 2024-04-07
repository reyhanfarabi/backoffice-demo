import MainView from '@/views/MainView.vue'
import TestPage1 from '@/views/TestPage1.vue'
import TestPage1Child1 from '@/views/TestPage1Child1.vue'
import TestPage2 from '@/views/TestPage2.vue'

export const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: MainView,
    icon: 'pi-home',
    children: []
  },
  {
    path: '/page1',
    name: 'Page 1',
    icon: 'pi-clipboard',
    component: TestPage1,
    children: [
      {
        path: '/',
        name: 'Page 1',
        component: TestPage1
      },
      {
        path: '/child1',
        name: 'Child 1',
        component: TestPage1Child1
      }
    ]
  },
  {
    path: '/page2',
    name: 'Page 2',
    component: TestPage2,
    icon: 'pi-file-plus',
    children: []
  }
]
