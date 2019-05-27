<template>
  <div>
    <!-- - -->
    <nav class="navbar navbar-expand-lg bg-white navbar-light fixed-top">
      <div class="container">
        <router-link tag="a" to="/" class="navbar-brand">
          <i class="fa fa-cube"></i> Projex
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTop"
          aria-controls="navbarTop"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTop">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link tag="a" to="/" class="nav-link" active-class="active" exact>Home</router-link>
            </li>
            <li class="nav-item">
              <router-link tag="a" to="/about" class="nav-link" active-class="active">About</router-link>
            </li>
            <li class="nav-item">
              <router-link tag="a" to="/login" class="nav-link" active-class="active">Login</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- - -->

    <div class="container pt-5">
      <pre>{{ state }}</pre>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'

Vue.use(new VueSocketIO({
  debug: true,
  connection: ':'
}))

// import HelloWorld from '@/components/HelloWorld.vue'

const debug = require('debug')('app:index')

export default {
  name: 'index',
  props: ['state'],
  components: {
    // HelloWorld
  },
  data: () => ({
    users: []
  }),
  mounted() {
    if (this.state.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.auth.token}`
    } else {
      // this.$router.push({ path: '/auth/login' })
      // eslint-disable-next-line
      // return
    }

    this.getItem()

    this.$set(this.state, 'from', 'index')
  },
  sockets: {
    connect: function () {
      this.$socket.emit('page:' + this.$options.name, {
        auth: this.state.auth
      }, data => {
        this.$set(this.state, 'page', data)
      })
    }
  },
  methods: {
    getItem() {
      axios.get('/test', {}).then(response => {
        this.$set(this.state, 'test', response.data)
      }).catch(error => {
        debug('An error occurred:', error)
      })
    }
  }
}
</script>

<style lang="scss">
.jumbotron {
  margin: 0;
  padding: 0;
}

.navbar {
  width: 100%;
  margin: 0 auto;
  font-size: 1rem;
}

.navbar a.navbar-brand {
  text-align: center;
  color: #000;
  font-weight: bold;
  font-size: 30px;
  height: 48px;
  line-height: 48px;
  padding: 0;
  margin: 0;
}

.navbar-light .navbar-nav .nav-link {
  font-size: 15px;
  color: black;
  text-transform: uppercase;
}

@media only screen and (min-width: 1200px) {
  .navbar-light .navbar-nav .nav-link {
    font-size: 20px;
  }
}

.navbar-toggler {
  padding: 0.2rem;
}
.navbar-toggler-icon {
  width: 1.5rem;
  height: 1.5rem;
}
</style>
