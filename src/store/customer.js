import Vue from 'vue'
const state = {
  customer: {},
  order: {}
}

const getters = {
  getCustomer: state => state.customer,
  getOrder: state => state.order
}
const actions = {
  changeCustomer: function ({commit}, value) {
    Vue.localStorage.set('Customer', JSON.stringify(value))
    commit('CHANGE_CUSTOMER', value)
  },
  orderCreated: function ({commit}, value) {
    if (value) {
      Vue.localStorage.set('Order', JSON.stringify(value))
      commit('ORDER_CREATED', value)
    } else {
      let order = Vue.localStorage.get('Order')
      let obj = JSON.parse(order)
      commit('ORDER_CREATED', obj)
    }
  }
}

const mutations = {
  CHANGE_CUSTOMER: function (state, value) {
    state.customer = value
  },
  ORDER_CREATED: function (state, value) {
    state.order = value
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
