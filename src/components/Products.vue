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
  </div>
</template>

<script>
  import product from '@/components/View/Product'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Products',
    data () {
      return {
      }
    },
    components: {
      product
    },
    computed: {
      ...mapGetters({
        products: 'getProducts'
      })
    }
  }
</script>

<style>
</style>
