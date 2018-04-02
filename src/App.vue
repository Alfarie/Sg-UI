<template>


  <div>
    <div >
      <!-- v-show because haeder and navigation must initialize at created lifecycle 
          so we cannot use v-show instead of v-if
       -->
      <app-header v-show="auth"></app-header>
      <app-nav v-show="auth"></app-nav>
      <div id="main" role="main" v-if="auth">
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
