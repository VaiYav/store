<template>

  <div>
    <section class="doubleColumn container">
      <h1 class="xs-12 col-md-3">from the blog</h1>
      <div class="items blogItems col-xs-12 col-md-9">
        <div class="row">
      <product v-for="(product, index) in products" :num="index" :key="index"></product>
      </div>
      </div>
    </section>
        <modal name="question">
          <div class="basic-modal">
            <h1 v-if="modal" class="title">Вопрос про {{products[modal.id].simples.title}}</h1>
            <form @submit.prevent="sendForm(form)">
            <label for="name">
            Name
            <input v-model="form.name" type="text" id="name">
            </label>
            <label for="email">
              Email
              <input v-model="form.email" type="text" id="email">
            </label>
            <label for="checkbox">
              Check
              <input v-model="form.checkbox" type="checkbox" id="checkbox">
            </label>
            <label for="area">
              <textarea v-model="form.text" name="area" id="area"></textarea>
            </label>
              <button type="submit">Submit</button>
            </form>
            <button class="button" type="button" @click="close">Close Modal</button>
          </div>
        </modal>
    <modal name="cart">
      <div class="basic-modal">
        <div v-for="(item, index) in itemsCart">
          <img :src="item.image.src" alt="">
          {{item.title}}
          Кол-во {{item.count}}шт.
          {{item.price}} грн
          <a href="#" @click.prevent="deleteItem(index)">Удалить</a>
        </div>
        Итого к оплате {{cartSum()}} грн
        <button class="button" type="button" @click="close">Продолжить покупки</button>
        <a href="/order" class="button">Оформить заказ</a>
      </div>
    </modal>
    <message></message>
    <form @submit.prevent="sendCustomer">
      Тип доставки
      <select v-model="customer.delivery">
        <option value="personally">Самовывоз</option>
        <option value="address">Адрессная доставка</option>
        <option value="post">Доставка на почту</option>
      </select>
      Адрес доставки
      <input type="text" v-model="customer.address">
      Способ оплаты
      <select v-model="customer.payment">
        <option value="cash">Наличными</option>
        <option value="nonCash">Безналичный</option>
      </select>
      <button type="submit">Применить</button>
    </form>
  </div>
</template>

<script>
  import product from '@/components/View/Product'
  import cart from '@/components/View/Cart'
  import { mapGetters } from 'vuex'
  import { Modal, POP } from 'vuex-modal'
  import Api from '@/api/shop'
  import message from '@/components/View/message'
  import Vue from 'vue'
  export default {
    name: 'Products',
    data () {
      return {
        form: {
          name: '',
          email: '',
          checkbox: false,
          text: ''
        },
        customer: {
          delivery: '',
          address: '',
          payment: ''
        }
      }
    },
    components: {
      product,
      cart,
      Modal,
      message
    },
    computed: {
      ...mapGetters({
        itemsCart: 'getItemsCart',
        products: 'getProducts',
        modal: 'currentModal',
        customers: 'getCustomer'
      })
    },
    methods: {
      close () {
        this.$store.dispatch(POP)
      },
      sendForm (value) {
        Api.sendForm(value)
          .then(response => {
            this.$store.dispatch('sendStatus', {status: true})
            this.resetForm()
          })
          .catch(errors => {
            this.$store.dispatch('sendStatus', {status: false})
          })
      },
      resetForm () {
        this.form = {
          name: '',
          email: '',
          checkbox: false,
          text: ''
        }
      },
      cartSum () {
        let arr = this.$store.state.cart.cart
        let count = 0
        let price = 0
        let sum = 0
        for (let i = 0; i < arr.length; i++) {
          count = this.$store.state.cart.cart[i].count
          price = this.$store.state.cart.cart[i].price
          sum += count * price
        }
        return sum
      },
      deleteItem (index) {
        this.$store.dispatch('deleteItemFromCart', this.itemsCart[index], index)
      },
      sendCustomer () {
        this.$store.dispatch('changeCustomer', this.customer)
      }
    },
    mounted () {
      let customer = Vue.localStorage.get('Customer')
      if (customer) {
        let objCustomer = JSON.parse(customer)
        this.customer = {
          payment: objCustomer.payment,
          address: objCustomer.address,
          delivery: objCustomer.delivery
        }
      }
    }
  }
</script>

<style lang="scss">

  .modal-content-wrapper {
    z-index: 1050;
  }
  .modal-backdrop{
    background-color: rgba(0, 0, 0, 0.5) !important;
  }
</style>
