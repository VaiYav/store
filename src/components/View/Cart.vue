<template>
  <div>
      <strong @click.prevent="openMiniCart">
        Cart - {{cartCount}} шт.
      </strong>
      <div class="cart" v-show="statusMiniCart">
        <div v-for="(item, index) in itemsCart">
          <img :src="item.image.src" alt="">
          {{item.title}}
          Кол-во {{item.count}} шт.
          {{item.price}} грн
        </div>
        Итого: {{cartSum}} грн.
        <a href="/order">Заказать</a>
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
        if (this.statusMiniCart === false) {
          value = true
        } else {
          value = false
        }
        this.$store.dispatch('switch_status', value)
      }
    },
    computed: {
      ...mapGetters({
        itemsCart: 'getItemsCart',
        statusMiniCart: 'getStatusMiniCart'
      }),
      cartCount () {
        let arr = this.$store.state.cart.cart
        let count = 0
        for (let i = 0; i < arr.length; i++) {
          count += this.$store.state.cart.cart[i].count
        }
        return count
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
      }
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
