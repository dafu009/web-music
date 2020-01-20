import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'
import VueDrawerLayout from 'vue-drawer-layout'
import Component from 'vue-class-component'
import 'assets/css/iconfont.css'
import { DatePicker } from 'element-ui'
Vue.use(DatePicker)
Vue.use(VueDrawerLayout)
Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  loading: 'https://image.yy.com/yjmf/YjFkNzdjYTgtYWQ3Ny00ZTUwLTgxMjUtNDU2MDNiYzEwMjc0.gif',
  error: 'http://image-source-lsy.oss-cn-shenzhen.aliyuncs.com/static/images/default-avatar.png'
})
Vue.config.productionTip = false
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate',
])
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
