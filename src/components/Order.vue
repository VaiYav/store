<template>
  <div>
    <form @submit.prevent="sendForm(form, itemsCart)">
      <label>
        Name
        <input v-model="form.name" type="text">
      </label>
      <label>
        email
        <input v-model="form.email" type="email">
      </label>
      <label>
        <select v-model="form.payment">
          Тип оплаты
          <option value="cash">Наличными</option>
          <option value="nonCash">Безналичный</option>
        </select>
      </label>
      <label>
        Тип доставки
        <select v-model="form.delivery">
          <option value="personally">Самовывоз</option>
          <option value="address">Адрессная доставка</option>
          <option value="post">Доставка на почту</option>
        </select>
      </label>
      <label>
        Адресс доставки
        <input type="text" v-model="form.address">
      </label>
      <label>
        Дополнительные пожелания
        <textarea v-model="form.text"></textarea>
      </label>
      <label>
        Перезвонить для подтверждения?
        <input v-model="form.confirm" type="checkbox">
      </label>
      <button>Send</button>
    </form>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import ApiShop from '@/api/shop'
  import Vue from 'vue'
  export default {
    name: 'Order',
    data () {
      return {
        form: {
          name: '',
          email: '',
          payment: '',
          confirm: false,
          address: '',
          delivery: '',
          text: ''
        }
      }
    },
    computed: {
      ...mapGetters({
        itemsCart: 'getItemsCart'
      })
    },
    methods: {
      sendForm (form, itemsCart) {
        let order = Object.assign(form, { items: itemsCart })
        ApiShop.createOrder(order)
          .then(response => {
            this.$store.dispatch('orderCreated', response.data)
            this.$store.dispatch('cartClear')
            this.$router.push({path: 'typage'})
          })
          .catch(errors => {
            alert('Error')
          })
      }
    },
    mounted () {
      let user = Vue.localStorage.get('User')
      let customer = Vue.localStorage.get('Customer')
      if (user) {
        let objUser = JSON.parse(user)
        this.form = {
          name: objUser.name,
          email: objUser.email,
          payment: objUser.payment,
          delivery: objUser.delivery,
          address: objUser.address
        }
      }
      if (customer) {
        let objCustomer = JSON.parse(customer)
        this.form = {
          payment: objCustomer.payment,
          address: objCustomer.address,
          delivery: objCustomer.delivery
        }
      }
    }
  }
</script>
