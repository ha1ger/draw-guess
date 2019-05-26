<template>
  <div class="room">
    <div class="login-info">
      欢迎您，{{this.username}}
      <router-link to="/"
                   style="color:green">退出</router-link>
    </div>
    <img class="image"
         src="./../../assets/styles/image/header.png" />
    <button class="button btn1"
            @click="handleCreate"
            v-show="this.showButton2">
      <img src="./../../assets/styles/image/create.png">
    </button>
    <button class="button btn2"
            @click="handleJoin"
            v-show="this.showButton2">
      <img src="./../../assets/styles/image/join.png">
    </button>
    <fade-animation>
      <create-room v-show="this.showCreate"></create-room>
    </fade-animation>
    <fade-animation>
      <join-room v-show="this.showJoin"></join-room>
    </fade-animation>
  </div>
</template>
<script>
import FadeAnimation from './../../common/fade/fade'
import CreateRoom from './components/CreateRoom'
import JoinRoom from './components/JoinRoom'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'room',
  components: {
    CreateRoom,
    JoinRoom,
    FadeAnimation
  },
  computed: {
    ...mapState(['showCreate', 'showJoin', 'username', 'showButton2'])
  },
  methods: {
    handleCreate () {
      this.changeShowCreate(true)
      this.changeShowButton2(false)
    },
    handleJoin () {
      this.changeShowJoin(true)
      this.changeShowButton2(false)
    },
    ...mapMutations(['changeShowCreate', 'changeShowJoin', 'changeShowButton2'])
  },
  mounted () {
    if (this.username === '') {
      this.$layer.dialog({
        content: '请先登录！',
        btn: ['我知道了']
      })
      this.$router.push('/')
    }
  }
}
</script>
<style lang="stylus" scoped>
.room {
  height: 100%;
  width: 100%;
  background: #FFCC00;
  display: flex;
  justify-content: center;
  align-items: center;

  .image {
    position: fixed;
    top: 30px;
    overflow: hidden;
  }

  .login-info {
    color: #000;
    font-size: 18px;
    position: fixed;
    right: 10px;
    top: 15px;
    font-weight: 600;
  }

  .button {
    width: 150px;
    height: 100px;
    margin: 10px;
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
  }
}
</style>
