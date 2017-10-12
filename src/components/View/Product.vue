<template>
<div>
  <span>Lorem</span>
  {{product.title}}
</div>
</template>

<script>
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
      product () { return this.$store.getters.getProduct(this.num) }
    }
  }

</script>
