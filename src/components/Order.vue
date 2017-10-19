<template>
  <div>
    <form @submit.prevent="sendForm(form, itemsCart)">
      <label>
        {{ $t('form.name')}}
        <input v-model="form.name" type="text">
      </label>
      <label>
        {{ $t('form.email')}}
        <input v-model="form.email" type="email">
      </label>
      <label>
        {{ $t('form.payment')}}
        <select v-model="form.payment">
          <option v-for="(item, index) in methods.payment" :key="index">{{item.title}}</option>
        </select>
      </label>
      <label>
        {{ $t('form.delivery')}}
        <select v-model="form.delivery"> //tyt for in
          <option v-for="(item, index) in methods.delivery" :key="index">{{item.title}}</option>
        </select>
      </label>
      <label>
        {{ $t('form.address')}}
        <input type="text" v-model="form.address">
      </label>
      <label>
        {{ $t('form.additionText')}}
        <textarea v-model="form.text"></textarea>
      </label>
      <label>
        {{ $t('form.recall')}}
        <input v-model="form.confirm" type="checkbox">
      </label>
      <button>{{ $t('buttons.send')}}</button>
    </form>
    <div>
      {{ $t('form.cart')}}
      <div v-for="(item, index) in itemsCart" :key="index">
        <img :src="item.image.src" :alt="item.image.alt">
        {{item.title}}
        {{item.count}} - {{ $t('form.count')}}
        {{item.price}} {{ $t('buttons.price')}}
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import ApiShop from '@/api/shop'
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
        itemsCart: 'getItemsCart',
        user: 'getUser',
        customers: 'getCustomer',
        methods: 'getMethods'
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
      Object.assign(this.form, this.user, this.customers)
    }
  }
</script>
