import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Begin/Home'
import Room from '@/pages/Room/Room'
import Game from '@/pages/Game/Game'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/room',
      name: 'Room',
      component: Room
    },
    {
      path: '/game/:id',
      name: 'Game',
      component: Game
    }
  ],
  scrollBehavior (to, from, savePosition) {
    return {
      x: 0,
      y: 0
    }
  }
})
