<template>
  <div class="chat">
    <ul id="messages"
        ref="parent"></ul>
    <div id="input-message">
      <input ref="input"
             type="text" /><button class="send-button"
              @click="sendMsg"
              ref="btn">Send</button>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Chat',
  computed: {
    ...mapState(['username'])
  },
  sockets: {
    getMsg (msg) {
      let newLi = document.createElement('li')
      newLi.innerHTML = msg[0] + '：' + msg[1]
      newLi.style.color = msg[2]
      this.$refs.parent.appendChild(newLi)
      this.$refs.parent.scrollTop = this.$refs.parent.scrollHeight
    },
    sysMsg (msg) {
      let newLi = document.createElement('li')
      newLi.innerHTML = msg
      newLi.style.backgroundColor = '#eee'
      this.$refs.parent.appendChild(newLi)
      this.$refs.parent.scrollTop = this.$refs.parent.scrollHeight
    },
    openWrite (drawer) {
      if (this.username !== drawer) {
        this.$refs.input.disabled = false
        this.$refs.btn.disabled = false
      }
    },
    stopWrite (drawer) {
      if (this.username === drawer) {
        this.$refs.input.disabled = true
        this.$refs.btn.disabled = true
      }
    }
  },
  methods: {
    sendMsg () {
      this.$socket.emit('sendMsg', this.username, this.$refs.input.value)
      this.$refs.input.value = ''
    }
  }
}
</script>
<style lang="stylus" scoped>
.chat {
  width: 100%;
  background: #fff;
  overflow: hidden;
  position: fixed;
  top: 470px;
  bottom: 0;

  #messages {
    height: 80%;
    font-size: 16px;
    line-height: 19px;
    overflow-y: scroll;
  }

  #input-message {
    width: 100%;
    height: 20%;

    input {
      width: 84.47%;
      height: 90%;
      border: 1px solid #000;
    }

    .send-button {
      height: 90%;
      width: 13%;
      background: rgb(130, 224, 255);
      border: 1px solid rgb(130, 224, 255);
      border-radius: 6px;
      margin-left: 0.5%;
      margin-right: 0.5%;
    }
  }
}
</style>
