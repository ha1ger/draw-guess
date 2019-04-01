<template>
  <div class="settlement">
    <div class="info-div">
      <span class="info">玩家ID</span>
      <span class="info">得分</span>
      <span class="info">玩家评价</span>
    </div>
    <ul class="integral">
      <li v-for="(item,index) in this.roomPlayer"
          :key="index"
          class="player-item">{{item}}
        <span>{{integral[index]}}</span>
      </li>

    </ul>
    <ul class="fame">
      <li v-for="(item,index) in this.fame"
          :key="index">{{item}}
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Settlement',
  data () {
    return {
      fame: [1, 2]
    }
  },
  props: {
    integral: Array
  },
  computed: {
    ...mapState(['roomPlayer'])
  },
  sockets: {
    sendFame (fame) {
      this.fame.push(fame)
    },
    closeSettlement () {
      this.fame = []
    }
  }
}
</script>
<style lang="stylus" scoped>
.settlement {
  font-size: 0.35rem;
  background: yellow;
  width: 100%;
  height: 350px;
  position: fixed;
  top: 5.5%;
  line-height: 0.5rem;

  .info-div {
    display: flex;
    margin-left: 15%;

    .info {
      margin-right: 15%;
    }
  }

  .integral {
    margin-left: 15%;
    width: 45%;

    span {
      position: absolute;
      left: 41%;
      background: #000;
      color: white;
    }
  }

  .fame {
    position: absolute;
    top: 5.3%;
    right: 33%;
    background: black;
    color: white;
  }
}
</style>
