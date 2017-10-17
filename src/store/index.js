import Vue from 'vue'
import Vuex from 'vuex'
import Cart from './cart'
import Customer from './customer'
import { modalModule } from 'vuex-modal'

Vue.use(Vuex)

const state = {
  products: [],
  statusSend: {}
}

const getters = {
  getProduct: state => num => state.products[num],
  getProducts: state => state.products,
  getStatusSend: state => state.statusSend
}
const actions = {
  addProducts: function ({commit}, value) {
    commit('ADD_PRODUCTS', value)
  },
  sendStatus: function ({commit}, {status}) {
    commit('SEND_STATUS', {status})
  }
}
const mutations = {
  ADD_PRODUCTS: function (state, value) {
    state.products.push(...value)
  },
  SEND_STATUS: function (state, {status}) {
    state.statusSend = {status}
  }
}

const store = new Vuex.Store({
  modules: {
    cart: Cart,
    modal: modalModule,
    customer: Customer
  },
  state,
  getters,
  actions,
  mutations
})

export default store
