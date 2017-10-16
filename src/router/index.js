import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Index from '@/components/Index.vue'
import Order from '@/components/Order.vue'
import TYpage from '@/components/typage.vue'

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Index },
    { path: '/order', component: Order },
    { path: '/typage', component: TYpage }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
