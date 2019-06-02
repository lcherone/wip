/**
 * Socket.io Plugin
 */
import Vue from 'vue'
import io from 'socket.io-client'

const Plugin = {
  install (Vue, options = {}) {
    /**
     * Single instance
     */
    if (this.installed) {
      return
    }
    this.installed = true

    // init socket.io connection
    let socket = io(':', {
      query: { token: options.token || '' }
    })

    /**
     * base events
     */

    // refresh token
    socket.on('refresh_token', data => {
      socket.disconnect()
      socket.io.opts.query = { token: data.token }
      socket.connect()
    })

    //
    socket.on('connection', client => {
      console.log('WS connection: ', client)
    })

    socket.on('connect', () => {
      console.log('WS connected: ', socket.id)
    })

    socket.on('disconnect', () => {
      console.log('WS disconnected')
    })

    /**
     * Plugin property
     */
    Vue.prototype.$socket = socket
  }
}

export default options => {
  Vue.use(Plugin, options)
}
