// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import store from './store'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.use(Vuex)
Vue.config.productionTip = false
Vue.axios.defaults.baseURL = 'http://localhost:3000'
import 'vuex-modal/dist/vuex-modal.css'
import VueLocalStorage from 'vue-localstorage'
import VueDefaultValue from 'vue-default-value'

Vue.use(VueDefaultValue)
Vue.use(VueLocalStorage)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
}).$mount('#app')
