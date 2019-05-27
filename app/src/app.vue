<template>
  <div id="app" v-cloak>
    <router-view :state="state"></router-view>
  </div>
</template>

<script>
import helpers from '@/mixins/helpers'

export default {
  mixins: [helpers],
  data: () => ({
    // state is the store, its a prop which is passed to all pages
    state: {
      auth: {
        id: 0,
        token: '',
        secret: ''
      },
      meta: {}
    }
  }),
  sockets: {
    connect: function () {
      this.$socket.emit('announce', {}, function (data) {
        // eslint-disable-next-line
        console.log('socket announced', data)
      })
    }
  },
  beforeMount() {
    // get/store state
    // if (this.$storage.isset('state')) {
    //  this.state = this.$storage.get('state')
    // } else {
    // init a new state
    this.state.auth.secret = this.$randomString(64)

    this.$storage.set('state', this.state)
    // }
  }
}
</script>

<style lang="scss">
$fa-font-path: "~font-awesome/fonts/";
@import "~font-awesome/scss/font-awesome";

@import "~bootstrap/scss/bootstrap.scss";

@import "./assets/style.css";
</style>
