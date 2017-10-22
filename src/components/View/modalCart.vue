<template>
  <modal name="cart">
    <div class="basic-modal">
      <div v-for="(item, index) in itemsCart">
        <img :src="item.simpleProducts[item.defaultSku].images[0].src" alt="">
        {{item.title}}
        {{ $t('form.summ')}}
        <strong>
          <a href="#" @click.prevent="productItemMinus(index)">-</a>
          {{item.count}}{{ $t('buttons.count')}}
          <a @click.prevent="productItemPlus(index)" href="#">+</a>
        </strong>
        {{item.price}} {{ $t('buttons.price')}}
        <a href="#" @click.prevent="deleteItem(index)">{{ $t('buttons.delete')}}</a>
      </div>
      {{ $t('form.summ')}} {{cartSum()}} {{ $t('buttons.price')}}
      <button class="button" type="button" @click="close">{{ $t('buttons.continueShopping')}}</button>
      <a href="/order" class="button">{{ $t('buttons.order')}}</a>
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
        getProduct: 'getProduct',
        modal: 'currentModal'
      })
    },
    components: {
      Modal
    },
    methods: {
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
      },
      deleteItem (index) {
        this.$store.dispatch('deleteItemFromCart', this.itemsCart[index], index)
      },
      close () {
        this.$store.dispatch(POP)
      },
      productItemPlus (index) {
        let count = this.itemsCart[index].count += 1
        if (count < 1) {
          count = this.itemsCart[index].count = 1
        }
        this.$store.dispatch('changeItemCount', {product: this.itemsCart[index], count: count})
      },
      productItemMinus (index) {
        let count = this.itemsCart[index].count -= 1
        if (count < 1) {
          count = this.itemsCart[index].count = 1
        }
        this.$store.dispatch('changeItemCount', {product: this.itemsCart[index], count: count})
      }
    }
  }
</script>
