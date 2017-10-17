<template>
  <div>
    <div>Спасибо за заказ, {{order.order.name}}!</div>
    <div>Номер вашего заказа: {{order.id}}</div>
    <div v-if="order.order.email">Мы свяжемся с вами по почте {{order.order.email}}</div>
    <div>Тип оплаты: {{order.order.payment}}</div>
    <div v-if="order.order.payment === 'nonCash'">Статус оплаты:</div>
    <div>Доставка: {{order.order.delivery}}</div>
    <div>Адресс доставки: {{order.order.address}}</div>
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
