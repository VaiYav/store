<template>

  <article class="col-xs-12 col-sm-4">
    <div class="image">
      <a href="">link</a>
      <img
        :src="product(num).simpleProducts[product(num).defaultSku].images[0].src"
        :alt="product(num).simpleProducts[product(num).defaultSku].images.alt"
        :title="product(num).simpleProducts[product(num).defaultSku].images.title">
    </div>
    <h2>{{ product(num).simpleProducts.title }}</h2>
    <p>{{ product(num).title }}</p>
    <div class="column" v-for="(attr, index) in product(num).attributes">
      <span>{{ attr.title }} - {{ attr.value }}</span>
    </div>
    <strong>{{ product(num).simpleProducts[product(num).defaultSku].price }} {{ $t('buttons.price')}}</strong>
    <div>
      <input style="text-align: center" min="1" type="number" v-model.number="value">
    </div>
    <div>
      <a @click="openQuestion(num)" href="#">{{ $t('buttons.question')}}</a>
      <a @click.prevent="sendToCart(num)" href="#">{{ $t('buttons.buy')}}</a>
    </div>
  </article>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { PUSH } from 'vuex-modal'

  export default {
    name: 'Product',
    data () {
      return {
        value: 1
      }
    },
    props: {
      num: { type: Number, require: true }
    },
    computed: {
      ...mapGetters({
        product: 'getProduct'
      })
    },
    methods: {
      sendToCart (num) {
        let product = {
          count: this.value,
          superSku: this.product(num).superSku
        }
        this.$store.dispatch('addToCart', product)
      },
      openQuestion (num) {
        this.$store.dispatch(PUSH, {name: 'question', id: num})
      }
    }
  }

</script>
<style lang="scss">
</style>
