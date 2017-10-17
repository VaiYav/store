<template>
  <div id="app">
    <header>
      <cart></cart>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  import Products from '@/components/Products'
  import Cart from '@/components/View/Cart'
  import Api from '@/api/shop'
  export default {
    name: 'app',
    components: {
      Products,
      Cart
    },
    created () {
      Api.getProducts()
        .then(products => {
          this.$store.dispatch('addProducts', products.data)
        })
        .catch(errors => {
          alert(errors)
        })
    },
    methods: {
    },
    computed: {
    },
    mounted () {
      this.$store.dispatch('importFromLS')
    }
  }
</script>

<style lang="scss">
  @import 'assets/css/bootstrap';
  @import 'assets/css/blog';

  body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
  .blogItems article .image a::before{
    background: url('assets/link.png') center no-repeat;
  }
</style>
