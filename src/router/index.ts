import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    component: () => {'@/components/NotFound/index.vue'}
  },
  {
    path: '/',
    component: () => import('@/components/Recommend/components/overview.vue')
  },
  {
    path: '/recommend',
    component: () => import('@/components/Recommend/index.vue'),
    children: [
      {
        path: '',
        name: 'recommend',
        component: () => import('@/components/Recommend/components/overview.vue')
      }
    ]
  },
  {
    path: '/singer',
    component: () => import('@/components/Singer/index.vue'),
    children: [
      {
        path: '',
        name: 'overview',
        component: () => import('@/components/Singer/components/Overview.vue'),
      },
      {
        path: ':id',
        component: () => import('@/components/Singer/components/Detail.vue')
      }
    ]
  },
  {
    path: '/rank',
    name: 'rank',
    component: () => import('@/components/Rank/index.vue')
  },
  {
    path: '/search',
    component: () => import('@/components/Search/index.vue'),
    children: [
      {
        path: '',
        name: 'search',
        component: () => import('@/components/Search/components/overview.vue'),
      }
    ]
  },
  {
    path: '/play-list',
    component: () => import('@/components/PlayList/index.vue'),
    children: [
      {
        path: ':id',
        component: () => import('@/components/PlayList/component/detail.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/login.vue'),
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
