import Vue from 'vue'
const state = {
  customer: {},
  order: {},
  user: {}
}

const getters = {
  getCustomer: state => state.customer,
  getOrder: state => state.order
}
const actions = {
  changeCustomer: function ({commit}, {type, customer}) {
    Vue.localStorage.set('Customer', JSON.stringify(customer))
    console.log(customer)
    commit('CHANGE_CUSTOMER', {type, customer})
  },
  orderCreated: function ({commit}, order) {
    if (order) {
      Vue.localStorage.set('Order', JSON.stringify(order))
      commit('ORDER_CREATED', order)
    } else {
      let order = Vue.localStorage.get('Order')
      let obj = JSON.parse(order)
      commit('ORDER_CREATED', obj)
    }
  }
}

const mutations = {
  CHANGE_CUSTOMER: function (state, {type, customer}) {
    state[type] = customer
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
