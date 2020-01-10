import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'
import VueDrawerLayout from 'vue-drawer-layout'
import VueContentPlaceholders from 'vue-content-placeholders'
import ElementUI from 'element-ui'
import Component from 'vue-class-component'
import 'assets/css/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'vue-content-placeholders/dist/vue-content-placeholders.css'
// import 'papercss/dist/paper.css'
Vue.use(ElementUI)
Vue.use(VueDrawerLayout)
Vue.use(VueContentPlaceholders)
Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  loading: 'https://image.yy.com/yjmf/YjFkNzdjYTgtYWQ3Ny00ZTUwLTgxMjUtNDU2MDNiYzEwMjc0.gif'
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
