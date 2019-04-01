import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    showIn: false,
    showUp: false,
    showCreate: false,
    showJoin: false,
    username: '',
    roomID: 0,
    roomPlayer: '',
    showButton1: true,
    showButton2: true
  },
  mutations: {
    changeShowIn (state, showIn) {
      state.showIn = showIn
    },
    changeShowUp (state, showUp) {
      state.showUp = showUp
    },
    changeShowCreate (state, showCreate) {
      state.showCreate = showCreate
    },
    changeShowJoin (state, showJoin) {
      state.showJoin = showJoin
    },
    changeUsername (state, username) {
      state.username = username
    },
    changeRoomID (state, roomID) {
      state.roomID = roomID
    },
    changeRoomPlayer (state, roomPlayer) {
      state.roomPlayer = roomPlayer
    },
    changeShowButton1 (state, showButton1) {
      state.showButton1 = showButton1
    },
    changeShowButton2 (state, showButton2) {
      state.showButton2 = showButton2
    }
  }
})
