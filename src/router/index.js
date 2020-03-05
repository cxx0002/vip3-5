import Vue from 'vue'
import Router from 'vue-router'

const Android = () => import('@/pages/android')
const Ios = () => import('@/pages/ios')
const TestAndroid = () => import('@/iview/testAndroid')
const TestIOS = () => import('@/iview/testIos')
const Yhxy = () => import('@/iview/yhxy')
const Ysxy = () => import('@/iview/ysxy')
const Error = () => import('@/error/index')
Vue.use(Router)
export default new Router({
  mode: "hash",
  routes: [
    {
      path: '/',
      // name: 'HelloWorld',
      // component: HelloWorld
    },
    {
      path: '/pay/android',
      name: 'Android',
      component: Android,
      meta: { requireAuth: true, keepAlive: true },
    },
    {
      path: '/pay/ios',
      name: 'Ios',
      component: Ios,
      meta: { requireAuth: true, keepAlive: true },
    },
    {
      path: '/test/android',
      name: 'TestAndroid',
      component: TestAndroid
    },{
      path: '/test/ios',
      name: 'TestIOS',
      component: TestIOS
    },
    {
      path: '/other/ysxy',
      name: 'Ysxy',
      component: Ysxy
    },{
      path: '/other/yhxy',
      name: 'Yhxy',
      component: Yhxy
    },
    {
      path: '/error',
      name: 'Error',
      component: Error
    },
  ]
})
