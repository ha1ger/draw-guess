<template>
  <div class="home">

    <button class="sign-button"
            @click="handleshowin"
            v-show="this.showButton1">
      登录
    </button>
    <button class="sign-button"
            @click="handleshowup"
            v-show="this.showButton1">
      注册
    </button>
    <fade-animation>
      <sign-in v-show="this.showIn"></sign-in>
    </fade-animation>
    <fade-animation>
      <sign-up v-show="this.showUp"></sign-up>
    </fade-animation>
  </div>

</template>

<script>
import SignIn from './components/SignIn.vue'
import SignUp from './components/SignUp.vue'
import FadeAnimation from '../../common/fade/fade.vue'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Home',
  components: {
    SignIn, SignUp, FadeAnimation
  },
  computed: {
    ...mapState(['showIn', 'showUp', 'showButton1'])
  },
  methods: {
    handleshowin () {
      this.changeShowIn(true)
      this.changeShowButton1(false)
    },
    handleshowup () {
      this.changeShowUp(true)
      this.changeShowButton1(false)
    },
    ...mapMutations(['changeShowIn', 'changeShowUp', 'changeShowButton1'])
  }
}

</script>
<style lang="stylus" scoped>
.home {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FFCC00;

  .sign-button {
    width: 150px;
    height: 100px;
    margin: 10px;
    border-radius: 30px;
    color: #000;
    background: #fff;
    font-size: 30px;
    font-family: YouYuan;
    letter-spacing: 6px;
    text-align: center;
  }
}
</style>
