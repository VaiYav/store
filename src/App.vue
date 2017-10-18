<template>
  <div id="app">
    <header>
      <cart></cart>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <modal-cart></modal-cart>
    <modal-question></modal-question>
  </div>
</template>

<script>
  import Cart from '@/components/View/Cart'
  import ModalQuestion from '@/components/View/modalQuestion'
  import ModalCart from '@/components/View/modalCart'

  export default {
    name: 'app',
    components: {
      Cart,
      ModalCart,
      ModalQuestion
    },
    methods: {
    },
    computed: {
    },
    created () {
      this.$store.dispatch('init')
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
