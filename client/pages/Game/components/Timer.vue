<template>

  <div class="timer">
    <svg class="icon"
         aria-hidden="true">
      <use xlink:href="#icon-shijian"></use>
    </svg>
    <span>
      {{this.total}}</span>

  </div>
</template>
<script>
export default {
  name: 'Timer',
  data () {
    return {
      total: 60,
      timerClear: 0
    }
  },
  sockets: {
    clearTimer () {
      this.resetTimer()
    }
  },
  methods: {
    changeNum () {
      this.timerClear = setInterval(() => {
        this.total--
      }, 1000)
    },
    resetTimer () {
      clearInterval(this.timerClear)
      this.total = 60
    }
  }
}
</script>
<style lang="stylus" scoped>
.timer {
  display: inline;
  position: fixed;
  top: 12px;
  left: 35%;
  font-size: 16px;
  background: #FFCC00;
  color: black;
}
</style>
