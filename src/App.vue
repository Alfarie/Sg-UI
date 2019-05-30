<template>
  <router-view></router-view>
</template>

<script>
  import Header from "./modules/components/@shared/Header";
  import Footer from "./modules/components/@shared/Footer";
  import Nav from "./modules/components/@shared/Nav";
  import Ribbon from "./modules/components/@shared/Ribbon";
  import DateTime from "./modules/components/@shared/DateTime";
  export default {
    computed: {
      auth() {
        return this.$store.getters.currentUser;
      }
    }
  };

</script>

<style>


</style>
