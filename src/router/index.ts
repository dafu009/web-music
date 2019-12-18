import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/components/Recommend/index.vue')
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import('@/components/Recommend/index.vue')
  },
  {
    path: '/singer',
    name: 'singer',
    component: () => import('@/components/Singer/index.vue')
  },
  {
    path: '/rank',
    name: 'rank',
    component: () => import('@/components/Rank/index.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/components/Search/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

NProgress.configure({ easing: 'ease', speed: 500 })
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(transition => {
  NProgress.done()
})

export default router
