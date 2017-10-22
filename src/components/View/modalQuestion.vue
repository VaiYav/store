<template>
  <modal name="question">
    <div class="basic-modal">
      <h1 v-if="modal && (modal.name === 'question')" class="title">{{ $t('message.questionAbout')}}
            {{products[modal.id].simpleProducts[products[modal.id].defaultSku].title}}
      </h1>
      <form @submit.prevent="sendForm(form)">
        <label for="name">
          {{ $t('form.name')}}
          <input v-model="form.name" type="text" id="name">
        </label>
        <label for="email">
          {{ $t('form.email')}}
          <input v-model="form.email" type="text" id="email">
        </label>
        <label for="checkbox">
          {{ $t('form.sure')}}
          <input v-model="form.checkbox" type="checkbox" id="checkbox">
        </label>
        <label for="area">
          <textarea v-model="form.text" name="area" id="area"></textarea>
        </label>
        <button type="submit">{{ $t('buttons.send')}}</button>
      </form>
      <button class="button" type="button" @click="close">{{ $t('buttons.close')}}</button>
    </div>
  </modal>
</template>

<script>
  import { POP, Modal } from 'vuex-modal'
  import { mapGetters } from 'vuex'
  import Api from '@/api/shop'

  export default {
    name: 'modalQuestion',
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
      Modal
    },
    methods: {
      close () {
        this.$store.dispatch(POP)
      },
      sendForm (value) {
        Api.sendForm(value)
          .then(response => {
            this.$store.dispatch('sendStatus', {status: true})
            this.resetForm()
          })
          .catch(errors => {
            this.$store.dispatch('sendStatus', {status: false})
          })
      },
      resetForm () {
        this.form = {
          name: '',
          email: '',
          checkbox: false,
          text: ''
        }
      }
    },
    computed: {
      ...mapGetters({
        products: 'getProducts',
        modal: 'currentModal'
      })
    }
  }
</script>
