import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'
import ElementUI from 'element-ui'
import 'assets/css/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  loading: 'https://image.yy.com/yjmf/YjFkNzdjYTgtYWQ3Ny00ZTUwLTgxMjUtNDU2MDNiYzEwMjc0.gif'
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
