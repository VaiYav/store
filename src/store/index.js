import Vue from 'vue'
import Vuex from 'vuex'
import Cart from './cart'
import Customer from './customer'
import { modalModule } from 'vuex-modal'
import vuexI18n from 'vuex-i18n'

Vue.use(Vuex)

const state = {
  products: [],
  statusSend: {},
  methods:
  {
    delivery: [
      {
        value: 'personally',
        title: 'Самовывоз'
      },
      {
        value: 'address',
        title: 'Адрессная доставка'
      },
      {
        value: 'post',
        title: 'Доставка на почту'
      }
    ],
    payment: [
      {
        value: 'cash',
        title: 'Наличными'
      },
      {
        value: 'nonCash',
        title: 'Безналичный'
      }
    ]
  }
}
const localizeRus = {
  buttons:
  {
    send: 'Отправить',
    apply: 'Применить',
    close: 'Закрыть',
    delete: 'Удалить',
    continueShopping: 'Продолжить покупки',
    buy: 'Купить',
    question: 'Задать вопрос',
    order: 'Заказать',
    count: 'шт.',
    price: 'грн'
  },
  message:
  {
    thanks: 'Спасибо за заказ',
    success: 'Отправка успешная',
    error: 'Ошибка при отправке',
    numberOrder: 'Номер вашего заказа',
    contact: 'Мы свяжемся с вами по почте',
    statusPayment: 'Статус оплаты',
    questionAbout: 'Вопрос про'
  },
  form:
  {
    delivery: 'Тип доставки',
    address: 'Адрес доставки',
    payment: 'Способ оплаты',
    name: 'Имя',
    email: 'Электронная почта',
    additionText: 'Дополнительные пожелания',
    recall: 'Перезвонить для подтверждения?',
    cart: 'Корзина',
    count: 'Количество',
    summ: 'Итого к оплате',
    sure: 'Вы уверены?'
  }
}
const localizeEng = {
  buttons:
  {
    send: 'Send',
    apply: 'Apply',
    close: 'Close',
    delete: 'Delete',
    continueShopping: 'Continue shopping',
    buy: 'Buy',
    question: 'Ask a question',
    order: 'Order',
    count: 'pcs.',
    price: 'UAH'
  },
  message:
  {
    thanks: 'Thanks for the order',
    success: 'Sending successful',
    error: 'Error sending',
    numberOrder: 'Your order number',
    contact: 'We will contact you by mail',
    statusPayment: 'Payment status',
    questionAbout: 'Question about'
  },
  form:
  {
    delivery: 'Delivery type',
    address: 'Delivery address',
    payment: 'Payment method',
    name: 'Name',
    email: 'E-mail',
    additionText: 'Additional wishes',
    recall: 'Call back for confirmation?',
    cart: 'Cart',
    count: 'Quantity',
    summ: 'Total for payment',
    sure: 'Are you sure?'
  }
}
const localizeUa = {
  buttons:
  {
    send: 'Відправити',
    apply: 'Застосувати',
    close: 'Закрити',
    delete: 'Видалити',
    continueShopping: 'Продовжити покупки',
    buy: 'Купити',
    question: 'Задати питання',
    order: 'Замовити',
    count: 'шт.',
    price: 'грн'
  },
  message: {
    thanks: 'Дякую за замовлення',
    success: 'Відправка успішна',
    error: 'Помилка при відправці',
    numberOrder: 'Номер вашого замовлення',
    contact: 'Ми зв\'яжемося з вами поштою',
    statusPayment: 'Статус оплати',
    questionAbout: 'Питання про'
  },
  form: {
    delivery: 'Тип доставки',
    address: 'Адреса доставки',
    payment: 'Спосіб оплати',
    name: 'Ім\'я',
    email: 'Електронна пошта',
    additionText: 'Додаткові побажання',
    recall: 'Зателефонувати для підтвердження?',
    cart: 'Кошик',
    count: 'Кількість',
    summ: 'Разом до оплати',
    sure: 'Ви впевнені?'
  }
}
const getters = {
  getProduct: state => num => state.products[num],
  getProducts: state => state.products,
  getStatusSend: state => state.statusSend,
  getMethods: state => state.methods
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
    let lsCustomer = Vue.localStorage.get('customer')
    let lsOrder = Vue.localStorage.get('order')
    let lsUser = Vue.localStorage.get('user')
    if (lsCart !== null) {
      let arr = JSON.parse(lsCart)
      let length = arr.length
      for (let i = 0; i < length; i++) {
        commit('ADD_TO_CART', arr[i])
      }
    }
    if (lsCustomer !== null) {
      let obj = JSON.parse(lsCustomer)
      this.dispatch('changeCustomer', {type: 'customer', value: obj})
    }
    if (lsOrder !== null) {
      let obj = JSON.parse(lsOrder)
      this.dispatch('changeCustomer', {type: 'order', value: obj})
    }
    if (lsUser !== null) {
      let obj = JSON.parse(lsUser)
      this.dispatch('changeCustomer', {type: 'user', value: obj})
    }
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
  mutations,
  localizeRus
})
Vue.use(vuexI18n.plugin, store)
Vue.i18n.add('ru', localizeRus)
Vue.i18n.add('en', localizeEng)
Vue.i18n.add('ua', localizeUa)
Vue.i18n.set('ru')

export default store
