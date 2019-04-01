<template>
  <div class="game">
    <Evaluate v-show="evaluateShow">
    </Evaluate>
    <Settlement :integral="integral"
                v-show="showSettlement"></Settlement>
    <div class="header">
      <span class="iconfont back-icon"
            @click="handleBack">&#xe64f;
      </span>
      <Timer ref='timer'
             v-show="timerShow"></Timer>
      <button class="begin-button"
              @click="handleBeginGame"
              v-show="this.roomOwner === this.username && buttonShow">开始游戏</button>
      <span class="tip"
            v-show="showTip">提示：{{this.guess.guessLength}}个字{{this.guess.guessTip}}</span>
      <div class="room-id">房间号：{{this.roomID}} </div>
    </div>
    <draw-board v-show="playerDrawing"></draw-board>
    <guess-board v-show="playerGuessing"></guess-board>
    <div class="player">
      <span>当前房间内玩家：</span>
      <ul>
        <li v-for="(item,index) in this.roomPlayer"
            :key="index"
            class="player-item"
            :id="item">{{item}}
          <span>{{integral[index]}}</span>
        </li>
      </ul>
    </div>
    <Chat></Chat>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Timer from './components/Timer.vue'
import DrawBoard from './components/Draw.vue'
import GuessBoard from './components/Guess.vue'
import Evaluate from './components/Evaluate'
import Chat from './components/Chat'
import Settlement from './components/Settlement'
export default {
  name: 'Game',
  data () {
    return {
      timerShow: false,
      playerDrawing: false,
      playerGuessing: true,
      evaluateShow: false,
      buttonShow: true,
      showTip: false,
      showSettlement: false,
      roomOwner: '',
      guessName: '',
      guess: {
        guessTip: '',
        guessLength: 0
      },
      integral: [0, 0, 0, 0, 0, 0],
      drawer: ''
    }
  },
  components: { DrawBoard, GuessBoard, Timer, Evaluate, Chat, Settlement },
  computed: {
    ...mapState(['username', 'roomID', 'roomPlayer'])
  },
  methods: {
    handleBack () {
      this.$layer.dialog({
        content: '如果你在游戏中退出房间，会导致游戏提前结束，所有玩家都被踢出房间',
        btn: ['坚持退出', '留在房间']
      })
        .then((res, that) => {
          let position = res === 0 ? 'left' : 'right'
          if (position === 'left') {
            back()
          }
        })
      var back = () => {
        this.$router.push('/room')
        this.$socket.emit('leave')
      }
    },
    handleBeginGame () {
      if (this.roomPlayer.length <= 1 || this.roomPlayer.length > 6) {
        this.$layer.toast({
          content: '玩家人数不足',
          time: 2000
        })
      } else {
        this.buttonShow = false
        this.$socket.emit('beginGame')
      }
    }
  },
  sockets: {
    showIn5 () {
      this.$layer.toast({
        content: '5秒后开始游戏',
        time: 5000
      })
    },
    getRoomOwner (roomOwner) {
      this.roomOwner = roomOwner
    },
    guessRight (msguser) {
      for (let i in this.roomPlayer) {
        if (this.roomPlayer[i] === msguser) {
          this.integral[i]++
        }
      }
    },
    sendGuess (guessMsg) {
      if (guessMsg[0] === this.username) {
        this.guessName = guessMsg[1]
        this.$layer.toast({
          content: '您的题目是：' + guessMsg[1],
          time: 5000
        })
      }
    },
    sendTip (tipMsg) {
      if (tipMsg !== '') {
        this.guess.guessTip = '，' + tipMsg
      } else {
        this.guess.guessTip = tipMsg
      }
    },
    sendLength (lengthMsg) {
      this.guess.guessLength = lengthMsg
    },
    drawColor (player) {
      for (let i in player) {
        document.querySelector('#' + player[i]).style.background = '#C0FF3E'
      }
    },
    drawerChange (drawer) {
      this.evaluateShow = false
      if (drawer !== 'end') {
        document.querySelector('#' + drawer).style.background = '#BFEFFF'
      }
      if (this.username === drawer) {
        this.playerGuessing = false
        this.playerDrawing = true
      } else {
        this.playerGuessing = true
        this.playerDrawing = false
      }
    },
    timerBegin () {
      this.showTip = true
      this.timerShow = true
      this.$refs.timer.changeNum()
    },
    showEvaluate () {
      this.evaluateShow = true
    },
    showSettlement () {
      this.showSettlement = true
    },
    closeSettlement () {
      this.showSettlement = false
      this.integral = [0, 0, 0, 0, 0, 0]
    },
    gameEnd () {
      this.buttonShow = true
      this.showTip = false
      this.timerShow = false
      this.playerGuessing = true
      this.playerDrawing = false
      this.guess.guessLength = ''
      this.guess.guessTip = ''
    },
    stopGame (roomID) {
      this.$router.push('/room')
      this.$socket.emit('playerOut')
      this.$layer.dialog({
        content: '有玩家中途退出，请重新创建房间开始游戏',
        btn: ['我知道了']
      })
    }
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
.game {
  height: 100%;
  width: 100%;
  background: #FFCC00;
  overflow-x: hidden;
  overflow-y: hidden;

  .header {
    width: 100%;
    height: 40px;
    overflow: hidden;

    .tip {
      font-size: 18px;
      font-weight: bold;
      position: fixed;
      top: 45px;
      left: 26%;
    }

    .back-icon {
      font-size: 40px;
    }

    .room-id {
      float: right;
      margin-top: 10px;
      margin-right: 15px;
      font-size: 20px;
      color: #000;
    }

    .begin-button {
      width: 75px;
      height: 25px;
      background: #fff;
      position: fixed;
      top: 8px;
      left: 28%;
      font-size: 14px;
      letter-spacing: 2px;
      font-family: YouYuan;
      padding-left: 3px;
    }
  }

  .player {
    width: 100%;
    height: 80px;
    margin-top: 3px;
    font-size: 16px;

    ul {
      width: 99%;
      height: 30px;
      margin-left: 3px;

      .player-item {
        margin-top: 6px;
        background: #C0FF3E;
        float: left;
        margin-right: 8px;
        border-radius: 3px;

        span {
          background: #000;
          color: white;
          border-radius: 2px;
        }
      }
    }
  }
}
</style>
