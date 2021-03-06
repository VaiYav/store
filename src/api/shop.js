import axios from 'axios'
import Vue from 'vue'
export default {
  getProducts: () => {
    return axios.get('/products')
  },
  sendForm: (feedback) => {
    return axios.post('/feedbacks', {feedback})
  },
  createOrder: (order) => {
    let user = {
      name: order.name,
      email: order.email,
      delivery: order.delivery,
      payment: order.payment,
      address: order.address
    }
    Vue.localStorage.set('user', JSON.stringify(user))
    return axios.post('/orders', {order})
  }
}
