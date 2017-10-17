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
        <modal name="question">
          <div class="basic-modal">
            <h1 v-if="modal" class="title">Вопрос про {{products[modal.id].simples.title}}</h1>
            <form @submit.prevent="sendForm(form)">
            <label for="name">
            Name
            <input v-model="form.name" type="text" id="name">
            </label>
            <label for="email">
              Email
              <input v-model="form.email" type="text" id="email">
            </label>
            <label for="checkbox">
              Check
              <input v-model="form.checkbox" type="checkbox" id="checkbox">
            </label>
            <label for="area">
              <textarea v-model="form.text" name="area" id="area"></textarea>
            </label>
              <button type="submit">Submit</button>
            </form>
            <button class="button" type="button" @click="close">Close Modal</button>
          </div>
        </modal>
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
    <message></message>
  </div>
</template>

<script>
  import product from '@/components/View/Product'
  import cart from '@/components/View/Cart'
  import { mapGetters } from 'vuex'
  import { Modal, POP } from 'vuex-modal'
  import Api from '@/api/shop'
  import message from '@/components/View/message'
  export default {
    name: 'Products',
    data () {
      return {
        form: {
          name: '',
          email: '',
          checkbox: false,
          text: ''
        }
      }
    },
    components: {
      product,
      cart,
      Modal,
      message
    },
    computed: {
      ...mapGetters({
        itemsCart: 'getItemsCart',
        products: 'getProducts',
        modal: 'currentModal'
      })
    },
    methods: {
      close () {
        this.$store.dispatch(POP)
      },
      sendForm (value) {
        Api.sendForm(value)
          .then(response => {
            this.$store.dispatch('send_status', {status: true})
            this.resetForm()
          })
          .catch(errors => {
            this.$store.dispatch('send_status', {status: false})
          })
      },
      resetForm () {
        this.form = {
          name: '',
          email: '',
          checkbox: false,
          text: ''
        }
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
      },
      deleteItem (index) {
        this.$store.dispatch('delete_item_from_cart', this.itemsCart[index], index)
      }
    }
  }
</script>

<style lang="scss">

  .modal-content-wrapper {
    z-index: 1050;
  }
  .modal-backdrop{
    background-color: rgba(0, 0, 0, 0.5) !important;
  }
</style>
