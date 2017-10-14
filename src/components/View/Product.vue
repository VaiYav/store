<template>

  <article class="col-xs-12 col-sm-4">
    <div class="image">
      <a href="">link</a>
      <img :src="product(num).simples.images.src" :alt="product(num).simples.images.alt" :title="product(num).simples.images.title">
    </div>
    <h2>{{ product(num).simples.title }}</h2>
    <p>{{ product(num).title }}</p>
    <div class="column" v-for="(attr, index) in product(num).attributes">
      <span>{{ attr.title }} - {{ attr.value }}</span>
    </div>
    <strong>{{ product(num).simples.price }} грн</strong>
    <div>
      <a href="#">Задать вопрос</a>
      <a href="#">Купить</a>
    </div>
  </article>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'Product',
    data () {
      return {
      }
    },
    props: {
      num: { type: Number, require: true }
    },
    computed: {
      ...mapGetters({
        product: 'getProduct'
      })
    }
  }

</script>
<style lang="scss">

</style>
