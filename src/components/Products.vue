<template>

  <div>
    <product v-for="(product, index) in products" :key="index" :num="index"></product>
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
      ...mapGetters([
        'getProducts'
      ]),
      products () { return this.$store.getters.getProducts }
    },
    props: {
      num: { type: Number, require: true }
    }
  }
</script>

<style>
</style>
