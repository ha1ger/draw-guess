<template>
  <div class="create-room">
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
      <button @click="handleCreate">创建</button>
      <button @click="handleback">取消</button>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  name: 'CreateRoom',
  data () {
    return {
      roomID: '',
      roomPassword: ''
    }
  },
  methods: {
    handleback () {
      this.changeShowCreate(false)
      setTimeout(() => {
        this.changeShowButton2(true)
      }, 520)
    },
    handleCreate () {
      if (this.roomID.length === 4 && this.roomPassword.length <= 6) {
        if (this.roomID.match('^[0-9]*$') && this.roomPassword.match('^[0-9]*$')) {
          this.axios.post('api/room/createRoom', {
            roomID: this.roomID,
            roomPassword: this.roomPassword
          })
            .then((res) => {
              if (res.data.errno === 1062) {
                this.$layer.dialog({
                  content: '该房间ID已被占用',
                  btn: ['我知道了']
                })
              } else {
                this.changeRoomID(this.roomID)
                this.$router.push('/game/' + this.roomID)
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
    ...mapMutations(['changeShowCreate', 'changeRoomID', 'changePlayerIntegral', 'changeShowButton2'])
  }
}

</script>
<style lang="stylus" scoped>
.create-room {
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
