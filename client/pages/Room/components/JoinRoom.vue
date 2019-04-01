<template>
  <div class="join-room">
    <div class="form">
      <div class="info1">
        <p>房间ID：</p>
        <input type="text"
               placeholder="请输入要进入的房间ID"
               v-model="roomID">
      </div>
      <div class="info2">
        <p>房间密码：</p>
        <input type="password"
               placeholder="请输入房间密码，不填写默认为空"
               v-model="roomPassword">
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
  border-radius: 5px;

  .form {
    margin-top: 45px;
    line-height: 35px;

    p {
      float: left;
      height: 20px;
      font-size: 18px;
      margin-right: -30px;
    }

    .info1 {
      padding-left: 30px;
    }

    .info2 {
      padding-left: 12px;
    }

    input {
      width: 180px;
      height: 25px;
    }

    button {
      background: #fff;
      color: #000;
      border-radius: 10px;
      margin-top: 20px;
      margin-right: 15px;
      width: 70px;
      height: 40px;
      font-family: YouYuan;
      letter-spacing: 3px;
      padding-left: 3px;
      text-align: center;
      font-size: 15px;
    }
  }
}
</style>
