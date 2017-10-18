import Vue from 'vue'
const state = {
  customer: {},
  order: {},
  user: {}
}

const getters = {
  getCustomer: state => state.customer,
  getOrder: state => state.order,
  getUser: state => state.user
}
const actions = {
  changeCustomer: function ({commit}, {type, value}) {
    Vue.localStorage.set([type], JSON.stringify(value))
    commit('CHANGE_CUSTOMER', {type, value})
  },
  orderCreated: function ({commit}, order) {
    if (order) {
      Vue.localStorage.set('order', JSON.stringify(order))
      commit('ORDER_CREATED', order)
    } else {
      let order = Vue.localStorage.get('order')
      let obj = JSON.parse(order)
      commit('ORDER_CREATED', obj)
    }
  }
}

const mutations = {
  CHANGE_CUSTOMER: function (state, {type, value}) {
    state[type] = value
  },
  ORDER_CREATED: function (state, order) {
    state.order = order
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
