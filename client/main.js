// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import './assets/styles/border.css'
import './assets/styles/reset.css'
import './assets/styles/iconfont.css'
import './assets/styles/iconfont'
import axios from 'axios'
import VueSocketIO from 'vue-socket.io'
import 'vue-layer-mobile/need/layer.css'
import layer from 'vue-layer-mobile'
import 'lib-flexible/flexible'
Vue.use(layer)
Vue.use(
  new VueSocketIO({
    debug: false,
    connection: 'http://haiger.club:3000',
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
    }
  })
)

Vue.config.productionTip = false
Vue.prototype.axios = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
