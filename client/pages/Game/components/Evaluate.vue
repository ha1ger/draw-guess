<template>
  <div class="eveluate">
    <div class="prop-img">
      <svg class="icon"
           aria-hidden="true"
           @click="handleSelect"
           ref="svg1">
        <use xlink:href="#icon-hua"></use>
      </svg>
      <svg class="icon"
           aria-hidden="true"
           @click="handleSelect"
           ref="svg2">
        <use xlink:href="#icon-jidan"></use>
      </svg>
      <svg class="icon"
           aria-hidden="true"
           @click="handleSelect"
           ref="svg3">
        <use xlink:href="#icon-tuoxie"></use>
      </svg>
      <svg class="icon"
           aria-hidden="true"
           @click="handleSelect"
           ref="svg4">
        <use xlink:href="#icon-hearts"></use>
      </svg>
      <svg class="icon"
           aria-hidden="true"
           @click="handleSelect"
           ref="svg5">
        <use xlink:href="#icon-icon-test"></use>
      </svg>
    </div>
    <div class="prop-info">
      <ul>
        <li v-for="(item,key,index) in prop"
            :key="index">
          {{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Evaluate',
  data () {
    return {
      prop: {
        'flower': 0,
        'egg': 0,
        'slipper': 0,
        'heart': 0,
        'six': 0
      }
    }
  },
  sockets: {
    changeProp (prop) {
      this.prop = prop
    },
    clickReset () {
      document.querySelector('.prop-img').classList.remove('no-click')
      this.$refs.svg1.style.border = 'none'
      this.$refs.svg2.style.border = 'none'
      this.$refs.svg3.style.border = 'none'
      this.$refs.svg4.style.border = 'none'
      this.$refs.svg5.style.border = 'none'
    }
  },
  methods: {
    handleSelect (e) {
      let prop = {
        flower: false,
        egg: false,
        slipper: false,
        heart: false,
        six: false
      }
      if (e.srcElement.farthestViewportElement === null) {
        e.srcElement.style.border = '2px solid red'
        switch (e.srcElement.firstChild.href.baseVal) {
          case '#icon-hua':
            prop.flower = true
            break
          case '#icon-jidan':
            prop.egg = true
            break
          case '#icon-tuoxie':
            prop.slipper = true
            break
          case '#icon-hearts':
            prop.heart = true
            break
          case '#icon-icon-test':
            prop.six = true
            break
          default:
            break
        }
      } else {
        e.srcElement.farthestViewportElement.style.border = '2px solid red'
        switch (e.srcElement.href.baseVal) {
          case '#icon-hua':
            prop.flower = true
            break
          case '#icon-jidan':
            prop.egg = true
            break
          case '#icon-tuoxie':
            prop.slipper = true
            break
          case '#icon-hearts':
            prop.heart = true
            break
          case '#icon-icon-test':
            prop.six = true
            break
          default:
            break
        }
      }
      this.$socket.emit('getProp', prop)
      document.querySelector('.prop-img').classList.add('no-click')
    }
  }
}
</script>
<style lang="stylus" scoped>
.eveluate {
  width: 300px;
  height: 200px;
  position: fixed;
  top: 110px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  background: #fff;

  .no-click {
    pointer-events: none;
  }

  .prop-img {
    width: 100%;
    height: 100px;

    .icon {
      width: 47px;
      height: 52px;
      float: left;
      margin-left: 10px;
      margin-top: 20px;
    }
  }

  .prop-info {
    width: 100%;
    height: 100px;

    ul {
      width: 100%;
      height: 50px;

      li {
        font-size: 16px;
        margin-top: 12px;
        float: left;
        margin-left: 33px;
        margin-right: 15px;
      }
    }
  }
}
</style>
