import Vue from 'vue'
import VueRouter from 'vue-router'
import LayoutDefault from '@/layouts/LayoutDefault'
import Dashboard from '@/views/Home'
import Settings from '@/views/Settings'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: LayoutDefault,
    children: [
      {
        path: '',
        name: 'Home',
        meta: {
          hasNavigation: true,
          themeColor: '#545e78'
        },
        props: true,
        component: Dashboard
      },
      {
        path: '/settings',
        name: 'Settings',
        meta: {
          hasNavigation: true,
          themeColor: '#545e78'
        },
        component: Settings
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// router.beforeEach(checkNotification)

export default router
