<template>
  <div v-cloak>
    <div class="container-fluid" id="wrapper">
      <div class="row">
        <layout-navigation :state="state"/>

        <main class="col-xs-12 col-sm-8 col-lg-9 col-xl-10 pl-4 ml-auto">
          <layout-header :state="state">Users</layout-header>

          <section class="row">
            <div class="col-sm-12">
              <pre>{{ state }}</pre>
            </div>
          </section>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
//
import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'

//
import LayoutNavigation from '@/components/layout/navigation.vue'
import LayoutHeader from '@/components/layout/header.vue'

Vue.use(new VueSocketIO({
  debug: true,
  connection: ':'
}))

// import HelloWorld from '@/components/HelloWorld.vue'

// const debug = require('debug')('app:index')

export default {
  name: 'user',
  props: ['state'],
  components: {
    LayoutNavigation, LayoutHeader
  },
  data: () => ({
    users: []
  }),
  beforeMount() {
    if (this.state.auth.token) {
      this.$axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.auth.token}`
    } else {
      return this.$router.push({ path: '/auth/sign-in' })
    }

    // this.getItem()
  },
  mounted() {
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
    // getItem() {
    //   axios.get('/user', {}).then(response => {
    //     console.log(response)

    //     this.$set(this.state, 'test', response.data)
    //   }).catch(error => {
    //     debug('An error occurred:', error)
    //   })
    // }
  }
}
</script>

<style>
@import "../../assets/themes/teal.css";
</style>
