<template>
  <div>
    <div class="container-fluid" id="wrapper">
      <div class="row">
        <main class="col-xs-10 col-sm-8 col-md-4 m-auto">
          <div class="login-panel card mt-5">
            <div class="card-block">
              <h3 class="card-title text-center mt-1">Login</h3>
              <div class="divider mt-0"></div>
              <div class="form-group">
                <input
                  class="form-control"
                  placeholder="E-mail"
                  name="email"
                  type="email"
                  v-model="form.values.email"
                  autofocus
                >
              </div>
              <div class="form-group">
                <input
                  class="form-control"
                  placeholder="Password"
                  name="password"
                  type="password"
                  v-model="form.values.password"
                  value=""
                >
              </div>
              <div class="text-center">
                <button type="button" class="btn btn-lg btn-primary" @click="submit()">Login</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
const debug = require('debug')('app:auth:sign-in')

export default {
  name: 'auth-sign-in',
  props: ['state'],
  components: {},
  data: () => ({
    form: {
      errors: {},
      values: {}
    }
  }),
  mounted() {
    if (this.state.token) {
      this.$router.push({ path: '/' })
    }
  },
  sockets: {
    connect: function () {
      this.$socket.emit('announce', {}, data => {
        this.$set(this.state, 'clients', data)
      })
    }
  },
  methods: {
    submit() {
      this.$axios.post('/1.0/auth/sign-in', this.form.values).then(response => {
        if (response.data.token) {
          this.$set(this.state.auth, 'token', response.data.token)
          this.$storage.set('state', this.state)
          this.$router.push({ path: '/' })
        } else {

        }
      }).catch(error => {
        debug('An error occurred:', error)
      })
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/themes/teal.css";
</style>
