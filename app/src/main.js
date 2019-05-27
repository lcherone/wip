/* eslint-disable */

import Vue from 'vue'
import App from './app.vue'
import router from './router'
//
import 'bootstrap'
//
import storage from './plugins/storage'
Vue.use(storage, {
  prefix: 'storage_',
  obfusck: 'no-dummy'
})

var fooo = {a:'a'}

Vue.config.productionTip = false

if (process.env.NODE_ENV === 'production') {
  window.localStorage.removeItem('debug')
} else {
  window.localStorage.setItem('debug', '*:*')
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
