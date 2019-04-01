<template>
  <div class="draw-board">
    <div class="div-canvas">
      <canvas class="canvas"
              @touchstart="handleTouchStart"
              @touchmove="handleTouchMove"
              @touchend="handleTouchEnd"
              :width="410"
              height="270">
      </canvas>
    </div>
    <div class="draw-setting">
      <div class="draw-color">
        <ul>
          <li v-for="(item,index) of color"
              :key="index"
              :style="{ background: item }"
              @click="setColor(item)"
              :class="{'isActive' : config.lineColor === item}">
          </li>
        </ul>
      </div>
      <div class="line-width">
        <ul>
          <li v-for="(item,index) of brushes"
              :key="index"
              class="iconfont"
              :style="{'font-size':item.x*8+'px'}"
              :class="{'isActive': config.lineWidth === item.lineWidth}"
              @click="setBrush(item.lineWidth)">&#xe753;

          </li>
        </ul>
        <span class="guess-name"> {{this.guessName}}</span>
        <button class="clear-button"
                @click="handleClaerCanvas">清空</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'DrawBoard',
  data () {
    return {
      color: ['#FF0000', '#FF7D00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#FF00FF', '#000000'],
      brushes: [{
        x: 3.5,
        lineWidth: 3
      }, {
        x: 4.5,
        lineWidth: 6
      }, {
        x: 5.5,
        lineWidth: 9
      }],
      config: {
        lineColor: '#000000',
        lineWidth: 3
      },
      ctx: {},
      startX: 0,
      startY: 0,
      drawing: false,
      canvas: {},
      guessName: ''
    }
  },
  computed: {
    ...mapState(['username', 'roomID', 'roomPlayer'])
  },
  methods: {
    setColor (color) {
      this.config.lineColor = color
    },
    setBrush (width) {
      this.config.lineWidth = width
    },
    handleTouchStart (e) {
      this.drawing = true
      this.setCanvasStyle()
      this.startX = e.targetTouches[0].clientX - this.canvas.offsetLeft
      this.startY = e.targetTouches[0].clientY - this.canvas.offsetTop
      this.$socket.emit('beginDraw', this.startX, this.startY, this.config.lineColor, this.config.lineWidth)
      this.ctx.beginPath()
      this.ctx.moveTo(this.startX, this.startY)
    },
    handleTouchMove (e) {
      if (this.drawing) {
        let canvasX = e.targetTouches[0].clientX - this.canvas.offsetLeft
        let canvasY = e.targetTouches[0].clientY - this.canvas.offsetTop
        this.$socket.emit('onDrawing', canvasX, canvasY)
        this.ctx.lineTo(canvasX, canvasY)
        this.ctx.stroke()
      }
    },
    handleTouchEnd (e) {
      this.drawing = false
      this.ctx.closePath()
      this.$socket.emit('endDrawing')
      e.preventDefault()
    },
    setCanvasStyle () {
      this.ctx.lineWidth = this.config.lineWidth
      this.ctx.strokeStyle = this.config.lineColor
    },
    handleBack () {
      this.$router.push('/room')
      this.$socket.emit('leave')
    },
    handleClaerCanvas () {
      this.$socket.emit('clearC')
    },
    clear () {
      this.ctx.clearRect(0, 0, 411, 310)
    },
    ...mapMutations(['changeRoomPlayer'])
  },
  sockets: {
    getPeople (people) {
      this.changeRoomPlayer(people)
    },
    clearCanvas () {
      this.clear()
    },
    sendGuess (guessMsg) {
      if (guessMsg[0] === this.username) {
        this.guessName = guessMsg[1]
      }
    }
  },
  mounted () {
    this.canvas = document.querySelector('.canvas')
    this.ctx = this.canvas.getContext('2d')
    this.$socket.emit('getRoom', this.roomID)
    this.$socket.emit('join', this.username)
    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault()
      e.stopPropagation()
    }, {
      passive: false
    })
  }
}
</script>
<style lang="stylus" scoped>
.draw-board {
  width: 100%;
  height: 350px;
  background: white;

  .div-canvas {
    width: 100%;
    height: 270px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    touch-action: none;
  }

  .draw-setting {
    width: 100%;
    height: 77px;
    background: white;
    position: relative;

    .line-width {
      width: 100%;
      height: 44px;
      border-top: 1px solid #000;

      .guess-name {
        position: absolute;
        top: 46px;
        right: 100px;
        font-size: 16px;
        font-weight: bold;
        color: red;
      }

      .clear-button {
        position: absolute;
        top: 46px;
        right: 20px;
      }

      ul {
        width: 100%;
        height: 100%;

        .isActive {
          color: pink;
        }

        li:first-child {
          margin-top: 5px;
        }

        li:nth-child(2) {
          margin-top: 3px;
        }

        li {
          width: 40px;
          height: 100%;
          float: left;
        }
      }
    }

    .draw-color {
      border-top: 1px solid #000;
      width: 100%;
      height: 33px;

      ul {
        width: 100%;
        height: 100%;

        .isActive {
          width: 25px;
          height: 22px;
          margin-top: 3px;
        }

        li {
          margin-left: 3%;
          margin-top: 8px;
          float: left;
          width: 25px;
          height: 40%;
        }
      }
    }
  }
}
</style>
