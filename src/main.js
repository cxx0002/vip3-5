// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/rem/index.js'
import '@/assets/style/base.css'
import mandMobile from 'mand-mobile'
import 'mand-mobile/lib/mand-mobile.css'
import '@/request/http.js'
import Bridge from "@/utils/bridge.js";

Vue.prototype.$bridge = Bridge 
Vue.use(mandMobile)
Vue.config.productionTip = false
router.afterEach((to,from,next) => {

  window.scrollTo(0,0);

})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
