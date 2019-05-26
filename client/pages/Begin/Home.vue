<template>
  <div class="home">
    <img class="image"
         src="./../../assets/styles/image/header.png" />

    <button class="sign-button btn1"
            @click="handleshowin"
            v-show="this.showButton1">
      <img src="./../../assets/styles/image/login.png">
    </button>
    <button class="sign-button btn2"
            @click="handleshowup"
            v-show="this.showButton1">
      <img src="./../../assets/styles/image/sign.png">
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
  background: #FFCC00;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  .image {
    position: fixed;
    top: 30px;
    overflow: hidden;
  }

  .sign-button {
    width: 150px;
    height: 100px;
    margin: 10px;
    display: inline-flex;
    justify-content: center;
    align-items: center;

    img {
      position: relative;
    }
  }

  .btn1 {
    background: #fbff1f;
    background-image: -webkit-linear-gradient(top, #fbff1f, #37cf04);
    background-image: -moz-linear-gradient(top, #fbff1f, #37cf04);
    background-image: -ms-linear-gradient(top, #fbff1f, #37cf04);
    background-image: -o-linear-gradient(top, #fbff1f, #37cf04);
    background-image: linear-gradient(to bottom, #fbff1f, #37cf04);
    -webkit-border-radius: 28;
    -moz-border-radius: 28;
    border-radius: 28px;
    -webkit-box-shadow: 3px 3px 3px #666666;
    -moz-box-shadow: 3px 3px 3px #666666;
    box-shadow: 3px 3px 3px #666666;

    img {
      left: 10px;
    }
  }

  .btn2 {
    background: #61e0de;
    background-image: -webkit-linear-gradient(top, #61e0de, #2bff4b);
    background-image: -moz-linear-gradient(top, #61e0de, #2bff4b);
    background-image: -ms-linear-gradient(top, #61e0de, #2bff4b);
    background-image: -o-linear-gradient(top, #61e0de, #2bff4b);
    background-image: linear-gradient(to bottom, #61e0de, #2bff4b);
    -webkit-border-radius: 28;
    -moz-border-radius: 28;
    border-radius: 28px;
    -webkit-box-shadow: 3px 3px 3px #666666;
    -moz-box-shadow: 3px 3px 3px #666666;
    box-shadow: 3px 3px 3px #666666;

    img {
      left: 2px;
    }
  }
}
</style>
