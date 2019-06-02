<template>
  <div id="app" v-cloak>
    <router-view :state="state"></router-view>
  </div>
</template>

<script>
import helpers from '@/mixins/helpers'
import user from '@/mixins/user'

// const debug = require('debug')('app:index')

export default {
  mixins: [helpers, user],
  data: () => ({
    // state is the store, its a prop which is passed to all pages
    state: {
      auth: {},
      meta: {}
    }
  }),
  beforeMount() {

  },
  methods: {

  }
}
</script>

<style lang="scss">
$fa-font-path: "~font-awesome/fonts/";
@import "~font-awesome/scss/font-awesome";

@import "~bootstrap/scss/bootstrap.scss";

@import "./assets/style.css";
</style>
