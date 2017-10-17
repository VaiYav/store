<template>
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
</template>

<script>
  import { POP, Modal } from 'vuex-modal'
  import { mapGetters } from 'vuex'

  export default {
    name: 'modalCart',
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters({
        itemsCart: 'getItemsCart',
        modal: 'currentModal'
      })
    },
    components: {
      Modal
    },
    methods: {
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
      close () {
        this.$store.dispatch(POP)
      }
    }
  }
</script>
