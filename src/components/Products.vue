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
    <message></message>
    <form @submit.prevent="sendCustomer">
      Тип доставки
      <select v-model="customer.delivery"> //tyt for in
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
  import Api from '@/api/shop'
  import message from '@/components/View/message'

  export default {
    name: 'Products',
    data () {
      return {
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
      sendCustomer () {
        this.$store.dispatch('changeCustomer', {type: 'customer', customer: this.customer})
      }
    },
    created () {
      Api.getProducts()
        .then(products => {
          this.$store.dispatch('addProducts', products.data)
        })
        .catch(errors => {
          alert(errors)
        })
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
