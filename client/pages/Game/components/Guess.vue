<template>
  <div class="guess-board">
    <div class="div-canvasG">
      <canvas class="canvasG"
              :width="411"
              height="270">
      </canvas>
    </div>
  </div>
</template>
<script>
export default {
  name: 'GuessBoard',
  data () {
    return {
      startXG: 0,
      SstartYG: 0,
      canvasG: {},
      ctxG: {},
      drawingG: false,
      canvasXG: 0,
      canvasYG: 0,
      config: {
        lineWidth: 0,
        lineColor: ''
      }
    }
  },
  methods: {
    handleClaerCanvas () {
      this.ctxG.clearRect(0, 0, 411, 310)
    }
  },
  sockets: {
    beginDraw (startXY) {
      this.startXG = startXY[0]
      this.startYG = startXY[1]
      this.ctxG.strokeStyle = startXY[2]
      this.ctxG.lineWidth = startXY[3]
      this.drawingG = true
      this.ctxG.beginPath()
      this.ctxG.moveTo(this.startXG, this.startYG)
    },
    onDrawing (canvasXY) {
      this.canvasXG = canvasXY[0]
      this.canvasYG = canvasXY[1]
      this.ctxG.lineTo(this.canvasXG, this.canvasYG)
      this.ctxG.stroke()
    },
    endDrawing () {
      this.drawingG = false
      this.ctxG.closePath()
    },
    clearCanvas () {
      this.handleClaerCanvas()
    }
  },
  mounted () {
    this.canvasG = document.querySelector('.canvasG')
    this.ctxG = this.canvasG.getContext('2d')
  }
}
</script>
<style lang="stylus" scoped>
.guess-board {
  width: 100%;
  height: 350px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;

  .div-canvasG {
    width: 100%;
    height: 270px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
