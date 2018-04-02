<template>


  <div>
    <div v-if="auth">
      <app-header></app-header>
      <app-nav></app-nav>
      <div id="main" role="main">
        <app-ribbon></app-ribbon>
        <date-time></date-time>
        <router-view></router-view>
      </div>
      <app-footer></app-footer>
    </div>

    <div v-if="!auth">
      <login></login>
    </div>

  </div>

</template>

<script>
  import Header from "./modules/components/@shared/Header";
  import Footer from "./modules/components/@shared/Footer";
  import Nav from "./modules/components/@shared/Nav";
  import Ribbon from "./modules/components/@shared/Ribbon";
  import DateTime from "./modules/components/@shared/DateTime";
  import Login from "./modules/components/auth/Login";
  export default {
    components: {
      appHeader: Header,
      appFooter: Footer,
      appNav: Nav,
      appRibbon: Ribbon,
      DateTime,
      Login
    },
    computed: {
      auth() {
        return this.$store.getters.isAuth;
      }
    },
    created(){
      this.$store.dispatch('tryAutoLogin');
    }
  };

</script>

<style>


</style>
