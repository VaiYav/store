import axios from 'axios'

export default {
  getProducts: () => {
    return axios.get('/products')
  },
  sendForm: (feedback) => {
    return axios.post('/feedbacks', {feedback})
  }
}
