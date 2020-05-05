// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store/index.js'
import 'element-ui/lib/theme-chalk/index.css'
import Router from 'vue-router'

Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

// 如果没有登录（session中没有userInfo和roleInfo），那么路由跳转时自动跳转到登录页面
router.beforeEach((to, from, next) => {
  let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
  let roleInfo = JSON.parse(sessionStorage.getItem('roleInfo'))

  if (userInfo && userInfo.access_token && roleInfo) {
    next()
  } else if (to.path === '/login') {
    next()
  } else if (to.path === '/register') {
    next()
  } else {
    next('/login')
  }
})

// 解决点击底部导航栏出现的路由报错
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
