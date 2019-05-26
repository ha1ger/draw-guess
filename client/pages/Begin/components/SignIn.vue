<template>
  <div class="sign-in">
    <div class="form">
      <div class="info1">
        <p>用户名：</p>
        <div class="input-container">
          <input type="text"
                 placeholder="请输入您的用户名"
                 v-model="username"
                 class="input">
        </div>
      </div>
      <div class="info2">
        <p>密码：</p>
        <div class="input-container">
          <input type="password"
                 placeholder="请输入您的密码"
                 v-model="password"
                 class="input">
        </div>
      </div>
      <button @click="handleSignIn">登录</button>
      <button @click="handleback">取消
      </button>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  name: 'SignIn',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    handleback () {
      setTimeout(() => {
        this.changeShowButton1(true)
      }, 520)
      this.changeShowIn(false)
    },
    handleSignIn () {
      if (this.username.length < 6 || this.password.length < 6) {
        this.$layer.dialog({
          content: '用户名及密码长度需要6位或以上',
          btn: ['我知道了']
        })
      } else {
        let data = {
          username: this.username,
          password: this.password
        }
        this.axios.post('/api/user/login', data)
          .then((res) => {
            if (res.data.length === 1) {
              this.$layer.toast({
                content: '欢迎您，' + this.username,
                time: 3000
              })
              this.changeUsername(this.username)
              this.$router.push('/room')
            } else {
              this.$layer.dialog({
                content: '用户名或密码错误',
                btn: ['我知道了']
              })
            }
          })
          .catch(error => { console.log(error) })
      }
    },

    ...mapMutations(['changeShowIn', 'changeUsername', 'changeShowButton1'])
  }

}
</script>
<style lang="stylus" scoped>
.sign-in {
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
