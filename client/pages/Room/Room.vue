<template>
  <div class="room">
    <div class="login-info">
      欢迎您，{{this.username}}
      <router-link to="/"
                   style="color:green">退出</router-link>
    </div>

    <button class="button"
            @click="handleCreate"
            v-show="this.showButton2">
      创建房间
    </button>
    <button class="button"
            @click="handleJoin"
            v-show="this.showButton2">
      加入房间
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

  .login-info {
    color: #000;
    font-size: 18px;
    position: fixed;
    right: 10px;
    top: 15px;
  }

  .button {
    width: 150px;
    height: 100px;
    margin: 10px;
    border-radius: 30px;
    color: #000;
    background: #fff;
    font-size: 22px;
    font-family: YouYuan;
    letter-spacing: 3px;
    text-align: center;
  }
}
</style>
