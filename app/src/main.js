/* eslint-disable */

import Vue from 'vue'
import App from './app.vue'
import router from './router'
import axios from 'axios'
import storage from './plugins/storage'
import socketIo from './plugins/socket.io'
import 'bootstrap'

//
Vue.use(storage, {
  prefix: 'storage_',
  obfusck: 'no-dummy'
})

// get state from ocal storage
const state = Vue.prototype.$storage.get('state') || {}
socketIo({ token: state.auth && state.auth.token })

Vue.config.productionTip = false

Vue.prototype.$axios = axios;

if (process.env.NODE_ENV === 'production') {
  window.localStorage.removeItem('debug')
} else {
  window.localStorage.setItem('debug', '*:*')
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
