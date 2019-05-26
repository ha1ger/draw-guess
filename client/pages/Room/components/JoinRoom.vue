<template>
  <div class="join-room">
    <div class="form">
      <div class="info1">
        <p>房间ID：</p>
        <div class="input-container">
          <input type="text"
                 placeholder="请输入要进入的房间ID"
                 v-model="roomID"
                 class="input">
        </div>
      </div>
      <div class="info2">
        <p>密码：</p>
        <div class="input-container">
          <input type="password"
                 placeholder="请输入房间密码，不填写默认为空"
                 v-model="roomPassword"
                 class="input">
        </div>
      </div>
      <button @click="handleJoin">进入</button>
      <button @click="handleback">取消</button>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'JoinRoom',
  data () {
    return {
      roomID: '',
      roomPassword: ''
    }
  },
  computed: {
    ...mapState(['username'])
  },
  methods: {
    handleback () {
      this.changeShowJoin(false)
      setTimeout(() => {
        this.changeShowButton2(true)
      }, 520)
    },
    handleJoin () {
      if (this.roomID.length === 4 && this.roomPassword.length <= 6) {
        if (this.roomID.match('^[0-9]*$') && this.roomPassword.match('^[0-9]*$')) {
          this.axios.post('api/room/joinRoom', {
            roomID: this.roomID,
            roomPassword: this.roomPassword
          })
            .then((res) => {
              if (res.data.length === 1) {
                if (res.data[0].onGaming === 1) {
                  this.$layer.dialog({
                    content: '该房间正在游戏',
                    btn: ['我知道了']
                  })
                } else if (res.data[0].player >= 6) {
                  this.$layer.dialog({
                    content: '该房间玩家已满',
                    btn: ['我知道了']
                  })
                } else {
                  this.changeRoomID(this.roomID)
                  this.changeRoomPlayer(this.username)
                  // this.$socket.emit('join', this.username)
                  this.$router.push('/game/' + this.roomID)
                }
              } else {
                this.$layer.dialog({
                  content: '房间不存在或密码错误',
                  btn: ['我知道了']
                })
              }
            })
            .catch(error => console.log(error))
        } else {
          this.$layer.dialog({
            content: '房间ID应为4位数字,密码应为0-6位数字',
            btn: ['我知道了']
          })
        }
      } else {
        this.$layer.dialog({
          content: '房间ID应为4位数字,密码应为0-6位数字',
          btn: ['我知道了']
        })
      }
    },
    ...mapMutations(['changeShowJoin', 'changeRoomID', 'changeRoomPlayer', 'changeShowButton2'])
  }
}

</script>
<style lang="stylus" scoped>
.join-room {
  width: 100%;
  height: 200px;
  background: #FFCC00;
  text-align: center;
  border: 2.5px solid #000;
  box-sizing: border-box;
  border-radius: 15px;

  .form {
    margin-top: 35px;
    line-height: 35px;

    p {
      float: left;
      height: 20px;
      font-size: 20px;
      font-weight: 600;
      color: #2f2f2f;
    }

    .info1 {
      padding-left: 10px;
    }

    .info2 {
      padding-left: 10px;
    }

    .input-container {
      margin-right: 20px;
      height: 40px;
      border-radius: 5px;
      background: #fff;
      margin-left: 80px;
      margin-bottom: 5px;
      padding: 0 10px;

      .input {
        width: 100%;
        font-weight: 600;
        font-size: 16px;
        background: #fff;
        color: #000;
      }
    }

    button {
      background: #fff;
      color: #000;
      border-radius: 10px;
      margin-top: 10px;
      margin-right: 15px;
      width: 70px;
      height: 40px;
      font-family: YouYuan;
      letter-spacing: 3px;
      padding-left: 3px;
      text-align: center;
      font-size: 15px;
      font-weight: 600;
    }
  }
}
</style>
