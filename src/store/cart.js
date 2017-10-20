import Vue from 'vue'
import { PUSH } from 'vuex-modal'

const state = {
  cart: [],
  statusMiniCart: false
}

const getters = {
  getItemsCart: state => state.cart,
  getStatusMiniCart: state => state.statusMiniCart
}

const actions = {
  addToCart: function ({commit, dispatch}, { superSku, count }) {
    commit('ADD_TO_CART', { superSku, count })
    dispatch(PUSH, {name: 'cart', id: superSku})
    Vue.localStorage.set('Cart', JSON.stringify())
  },
  switchStatus: function ({commit}, value) {
    commit('SWITCH_STATUS', value)
  },
  deleteItemFromCart: function ({commit}, value) {
    let index = this.state.cart.cart.indexOf(value)
    let item = this.state.cart.cart.splice(index, 1)
    commit('DELETE_ITEM_FROM_CART', item)
  },
  cartClear: function ({commit}) {
    commit('CART_CLEAR')
  },
  changeItemCount: function ({commit}, {product, count}) {
    commit('CHANGE_ITEM_COUNT', {product, count})
  }
}

const mutations = {
  ADD_TO_CART: function (state, { superSku, count }) {
    let product = this.state.products.find(p => p.superSku === superSku)
    if (product) {
      state.cart.push(product)
    }
  },
  SWITCH_STATUS: function (state, value) {
    state.statusMiniCart = value
  },
  DELETE_ITEM_FROM_CART: function (state, items) {
    Vue.localStorage.set('Cart', JSON.stringify(this.state.cart.cart))
  },
  CART_CLEAR: function (state) {
    state.cart = []
    Vue.localStorage.remove('Cart')
  },
  CHANGE_ITEM_COUNT: function (state, {product, count}) {
    Vue.localStorage.set('Cart', JSON.stringify(state.cart))
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
