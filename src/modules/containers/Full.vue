<template>
    <div>
        <app-modal v-if="isUpdating">
            <h3 slot="body" style="font-size: 18px; margin:0px;"> <img :src="popupImage" width="60" height="60"> {{popupMessage}}</h3>
        </app-modal>
        <app-header></app-header>
        <app-nav></app-nav>
        <div id="main" role="main">
            <date-time></date-time>
            <router-view></router-view>
        </div>
        <app-footer></app-footer>
    </div>
</template>

<script>
import Header from "../components/@shared/Header";
import Footer from "../components/@shared/Footer";
import Nav from "../components/@shared/Nav";
import Ribbon from "../components/@shared/Ribbon";
import DateTime from "../components/@shared/DateTime";
import Modal from "../components/@shared/Modal";
import {mapGetters} from 'vuex'
export default {
  components: {
    appHeader: Header,
    appFooter: Footer,
    appNav: Nav,
    appRibbon: Ribbon,
    DateTime,
    appModal: Modal
  },
   computed: {
    ...mapGetters(['isUpdating', 'popupMessage', 'popupImage'])
  },
  mounted(){
      this.$store.dispatch('IS_AUTH');
  }
};
</script>

<style scoped>
</style>