<template>
    <div class="message" >
      <transition name="slide-fade">
        <div class="mess" v-if="status.status === true">Send Success</div>
        <div class="mess" v-if="status.status === false">Send Error</div>
      </transition>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'message',
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters({
        status: 'getStatusSend'
      })
    }
  }
</script>

<style lang="scss">
  .message{
    position: fixed;
    top:20px;
    left: 10px;
    z-index: 4000;
  }
  .mess{
    padding: 20px;
  }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    {
    transform: translateX(40px);
    opacity: 0;
  }
</style>
