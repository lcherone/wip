<template>
  <div v-cloak>
    <div class="container-fluid" id="wrapper">
      <div class="row">
        <layout-navigation :state="state"/>

        <main class="col-xs-12 col-sm-8 col-lg-9 col-xl-10 pl-4 ml-auto">
          <layout-header :state="state"/>

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
import LayoutNavigation from '@/components/layout/navigation.vue'
import LayoutHeader from '@/components/layout/header.vue'

// const debug = require('debug')('app:index')

export default {
  name: 'index',
  props: ['state'],
  components: {
    LayoutNavigation,
    LayoutHeader
  },
  data: () => ({
    users: []
  }),
  beforeMount() {
    if (this.state.auth.token) {
      this.$axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.auth.token}`
      //
      this.$socket.emit('announce', {
        page: this.$router.path
      }, () => {
        console.log('It Works')
      })
    } else {
      return this.$router.push({ path: '/auth/sign-in' })
    }
    // this.getItem()
  },
  mounted() {
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
@import "../assets/themes/teal.css";
</style>
