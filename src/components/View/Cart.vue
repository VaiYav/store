<template>
  <div>
      <strong @click.prevent="openMiniCart">
        {{ $t('form.cart')}} - {{cartCount}} {{ $t('buttons.count')}}
      </strong>
      <div class="cart" v-show="statusMiniCart">
        <div v-for="(item, index) in itemsCart">
          {{ $t('form.count')}}: {{item.count}} {{ $t('buttons.count')}}
          {{item.price}} {{ $t('buttons.price')}}
        </div>
        {{ $t('form.summ')}}: {{cartSum}} {{ $t('buttons.price')}}
        <a href="/order"> {{ $t('buttons.order')}}</a>
      </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Cart',
    data () {
      return {
      }
    },
    components: {
    },
    methods: {
      openMiniCart () {
        let value
        this.statusMiniCart === false ? value = true : value = false
        this.$store.dispatch('switchStatus', value)
      }
    },
    computed: {
      ...mapGetters({
        product: 'getProduct',
        itemsCart: 'getItemsCart',
        statusMiniCart: 'getStatusMiniCart'
      }),
      cartCount () {
        let arr = this.itemsCart
        let count = 0
        for (let i = 0; i < arr.length; i++) {
          count += arr[i].count
        }
        return count
      },
      cartSum () {
        let arr = this.itemsCart
        let count = 0
        let price = 0
        let sum = 0
        for (let i = 0; i < arr.length; i++) {
          count = arr[i].count
          price = arr[i].simpleProducts[arr[i].defaultSku].price
          sum += count * price
        }
        return sum
      }
    },
    mounted () {
      this.$store.dispatch('initCart')
    }
}
</script>

<style lang="scss">
  .cart{
    position: absolute;
    background: #fff;
    color: #000;
    &>div{
      display: flex;
      flex-direction: column;
      img{
        max-width: 100px;
      }
    }
  }
</style>
