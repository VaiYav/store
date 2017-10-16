<template>
  <div>
    <form>
      <label>
        Name
        <input type="text">
      </label>
      <label>
        email
        <input type="email">
      </label>

      <label>
        <select>
          Тип оплаты
          <option value="cash">Наличными</option>
          <option value="nonCash">Безналичный</option>
        </select>
      </label>
      <label>
        Тип доставки
        <select>
          <option value="personally">Самовывоз</option>
          <option value="address">Адрессная доставка</option>
          <option value="post">Доставка на почту</option>
        </select>
      </label>
      <label>
        Дополнительные пожелания
        <textarea></textarea>
      </label>
      <label>
        Перезвонить для подтверждения?
        <input type="checkbox">
      </label>
      <button>Send</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'Order',
    data () {
      return {
      }
    },
    computed: {
    }
  }
</script>
