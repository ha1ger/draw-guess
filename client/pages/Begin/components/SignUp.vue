<template>
  <div class="sign-up">
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
      <button @click="handeSignUp">
        注册</button>
      <button @click="handleBack">取消
      </button>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  name: 'SignUp',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    handleBack () {
      this.changeShowUp(false)
      setTimeout(() => {
        this.changeShowButton1(true)
      }, 520)
    },
    handeSignUp () {
      if (!this.username.match('^[a-zA-Z][a-zA-Z0-9_]{4,15}$') || !this.password.match('^[a-zA-Z][a-zA-Z0-9_]{4,15}$') ||
        this.password.length < 6 || this.password.length > 16 ||
        this.username.length < 6 || this.username.length > 16) {
        this.$layer.dialog({
          content: '用户名及密码需以字母开头，长度在6~16之间，只能包含字母、数字和下划线',
          btn: ['我知道了']
        })
      } else {
        let data = {
          username: this.username,
          password: this.password
        }
        this.axios.post('/api/user/addUser', data)
          .then((res) => {
            if (res.data.errno === 1062) {
              this.$layer.dialog({
                content: '用户名已存在',
                btn: ['我知道了']
              })
            } else {
              this.$layer.dialog({
                content: '恭喜您！注册成功',
                btn: ['我知道了']
              })
              this.changeShowUp(false)
              setTimeout(() => {
                this.changeShowButton1(true)
              }, 530)
            }
          })
          .catch(error => console.log(error))
      }
    },
    ...mapMutations(['changeShowUp', 'changeShowButton1'])
  }
}
</script>

<style lang='stylus' scoped>
.sign-up {
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
