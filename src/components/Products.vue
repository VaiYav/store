<template>
  <div>
    <section class="doubleColumn container">
      <div class="items blogItems col-xs-12 col-md-9">
        <div class="row">
      <product v-for="(product, index) in products" :num="index" :key="index"></product>
      </div>
      </div>
    </section>
    <message></message>
    <form @submit.prevent="sendCustomer">
      {{ $t('form.delivery')}}
      <select v-model="customer.delivery">
        <option v-for="(item, index) in methods.delivery" :key="index">{{item.title}}</option>
      </select>
      {{ $t('form.address')}}
      <input type="text" v-model="customer.address">
      {{ $t('form.payment')}}
      <select v-model="customer.payment">
        <option v-for="(item, index) in methods.payment" :key="index">{{item.title}}</option>
      </select>
      <button type="submit">{{ $t('buttons.apply')}}</button>
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
        customers: 'getCustomer',
        methods: 'getMethods'
      })
    },
    methods: {
      sendCustomer () {
        this.$store.dispatch('changeCustomer', {type: 'customer', value: this.customer})
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
      Object.assign(this.customer, this.customers)
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
