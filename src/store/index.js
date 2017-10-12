import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  products: []
}

const getters = {
  getProduct: state => num => state.products[num],
  getProducts: state => state.products
}
const actions = {
  addProducts: function ({commit}, value) {
    console.log(value)
    commit('ADD_PRODUCTS', value)
  }
}
const mutations = {
  ADD_PRODUCTS: function (state, value) {
    state.products.push(...value)
  }
}

const store = new Vuex.Store({
  modules: {
  },
  state,
  getters,
  actions,
  mutations
})

export default store
