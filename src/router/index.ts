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
        name: 'singer',
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
    path: '/album',
    component: () => import('@/components/Album/index.vue'),
    children: [
      {
        path: ':id',
        component: () => import('@/components/Album/component/detail.vue')
      }
    ]
  },
  {
    path: '/user',
    component: () => import('@/components/User/index.vue'),
    children: [
      { 
        path: '',
        name: 'user',
        component: () => import('@/components/User/components/user.vue' ),
      },
      {
        path: 'login-register',
        name: 'loginRegister',
        component: () => import('@/components/LoginRegister/index.vue')
      },
      {
        path: 'change-password',
        name: 'changePassword',
        component: () => import('@/components/changePassword/index.vue')
      },
      {
        path: 'edit',
        name: 'edit',
        component: () => import('@/components/User/components/edit/index.vue' ),
      }
    ]
  }
]

const routerPush: any = VueRouter.prototype.push
VueRouter.prototype.push = function push(location: any) {
  return routerPush.call(this, location).catch((error: any)=> error)
}

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

router.beforeEach((to, from, next) => {
  next()
})
router.afterEach(transition => {
  NProgress.done()
})

export default router
