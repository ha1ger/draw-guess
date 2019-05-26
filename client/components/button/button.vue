<template>
  <div class="button"
       refs="button"
       @click="onClick">
    <p>Click me</p>
  </div>

</template>

<script>
import { TweenMax } from 'gsap'
export default {
  name: 'button1',
  methods: {
    onClick () {
      var button1 = this.$refs.button
      var duration = 0.3
      var delay = 0.08
      TweenMax.to(button1, duration, { scaleY: 1.6, ease: Expo.easeOut })
      TweenMax.to(button1, duration, { scaleX: 1.2, scaleY: 1, ease: Back.easeOut, easeParams: [3], delay: delay })
      TweenMax.to(button1, duration * 1.25, { scaleX: 1, scaleY: 1, ease: Back.easeOut, easeParams: [6], delay: delay * 3 })
    }
  }
}
</script>
<style lang="stylus" scoped>
.button {
  background: #3498db;
  width: 180px;
  padding: 4px 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 3px;

  p {
    font-family: 'Roboto';
    text-align: center;
    text-transform: uppercase;
    color: #FFF;
    user-select: none;
  }

  &:hover {
    cursor: pointer;
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 10%;
    border-radius: 50%;
    background-color: darken(#f1c40f, 20%);
    opacity: 0.4;
    bottom: -30px;
  }
}
</style>
