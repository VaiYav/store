<template>
  <div>
    <div>{{ $t('message.thanks')}}, {{order.order.name}}!</div>
    <div>{{ $t('message.numberOrder')}}: {{order.id}}</div>
    <div v-if="order.order.email">{{ $t('message.contact')}} {{order.order.email}}</div>
    <div>{{ $t('form.payment')}}: {{order.order.payment}}</div>
    <div>{{ $t('form.delivery')}}: {{order.order.delivery}}</div>
    <div>{{ $t('form.address')}}: {{order.order.address}}</div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'typage',
    computed: {
      ...mapGetters({
        order: 'getOrder'
      })
    },
    created () {
      this.$store.dispatch('orderCreated')
    }
  }
</script>
