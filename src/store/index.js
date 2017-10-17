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
  addProducts: function ({commit}, product) {
    commit('ADD_PRODUCTS', product)
  },
  sendStatus: function ({commit}, {status}) {
    commit('SEND_STATUS', {status})
  },
  init: function ({commit}) {
    let lsCart = Vue.localStorage.get('Cart')
    let lsCustomer = Vue.localStorage.get('Customer')
    // let lsOrder = Vue.localStorage.get('Order')
    // let lsUser = Vue.localStorage.get('User')
    if (lsCart !== null) {
      let arr = JSON.parse(lsCart)
      let length = arr.length
      for (let i = 0; i < length; i++) {
        commit('ADD_TO_CART', arr[i])
      }
    }
    if (lsCustomer) {
      let obj = JSON.parse(lsCustomer)
      this.dispatch('changeCustomer', {type: 'customer', customer: obj})
    }
    // if (lsOrder) {
    //   let obj = JSON.parse(lsOrder)
    //   this.dispatch('changeCustomer', {type: 'order', value: obj})
    // }
    // if (lsUser) {
    //   let obj = JSON.parse(lsUser)
    //   this.dispatch('changeCustomer', {type: 'user', value: obj})
    // }
  }
}
const mutations = {
  ADD_PRODUCTS: function (state, product) {
    state.products.push(...product)
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
