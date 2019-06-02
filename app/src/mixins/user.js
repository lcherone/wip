
const debug = require('debug')('app:mixin:user')

//
export default {
  beforeMount() {
    // get/store state
    if (this.$storage.isset('state')) {
      this.state = this.$storage.get('state')

      if (this.state.auth && this.state.auth.token) {
        this.$axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.auth.token}`
        this.$getUser()
      }
    } else {
      this.state.auth.secret = this.$randomString(64)
      this.$storage.set('state', this.state)
    }
  },
  methods: {
    //
    $getUser(id) {
      this.$axios.get('/1.0/user' + (id ? '/' + id : ''), {}).then(response => {
        if (response.data.error && response.data.error === 'TokenExpiredError') {

        }

        this.$set(this.state, 'user', response.data)
      }).catch(error => {
        debug('An error occurred:', error)
      })
    }
  }
}
