<template>
  <div class="navigation">
    <nav class="sidebar col-xs-12 col-sm-4 col-lg-3 col-xl-2">
      <h1 class="site-title">
        <router-link tag="a" to="/">
          <i class="fa fa-cube"></i> Projex
        </router-link>
      </h1>
      <a href="#menu-toggle" class="btn btn-default" id="menu-toggle">
        <em class="fa fa-bars"></em>
      </a>
      <ul class="nav nav-pills flex-column sidebar-nav">
        <li class="nav-item">
          <router-link tag="a" to="/" class="nav-link" active-class="active" exact>
            <em class="fa fa-home"></em> Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link tag="a" to="/users" class="nav-link" active-class="active">
            <em class="fa fa-users"></em> Users
          </router-link>
        </li>
        <!--
        <li class="parent nav-item">
          <a class="nav-link" data-toggle="collapse" href="#sub-item-1">
            <em class="fa fa-file-o">&nbsp;</em> Pages
            <span data-toggle="collapse" href="#sub-item-1" class="icon pull-right">
              <i class="fa fa-plus"></i>
            </span>
          </a>
          <ul class="children collapse" id="sub-item-1">
            <li class="nav-item">
              <a class="nav-link" href="login.html">Login</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="error.html">Error 404</a>
            </li>
          </ul>
        </li>
        -->
      </ul>
      <a href="javascript:void(0)" class="logout-button" @click="signOut()">
        <em class="fa fa-power-off"></em> Signout
      </a>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'LayoutNavigation',
  props: ['state'],
  methods: {
    signOut() {
      this.$storage.remove('state')
      this.$router.push({ path: '/auth/sign-in' })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
