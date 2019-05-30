<template>
  <aside id="left-panel">

    <!-- User info -->
    <div class="login-info">
      <span>
        <!-- User image size is adjusted inside CSS, it should stay as it -->

        <a href="javascript:void(0);" id="show-shortcut" data-action="toggleShortcut">
          <img src="/src/assets/img/avatars/man.png" alt="me" />
          <span>
            Name
          </span>
          <i class="fa fa-angle-down"></i>
        </a>

      </span>
    </div>
    <!-- end user info -->

    <!-- NAVIGATION : This navigation is also responsive-->
    <nav>
      <!--
				NOTE: Notice the gaps after each icon usage <i></i>..
				Please note that these links work a bit different than
				traditional href="" links. See documentation for details.
				-->

      <ul>


        <router-link to="/summary" tag="li" active-class="active">
          <a href="#">
            <i class="fa fa-lg fa-fw fa-dashboard txt-color-blue"></i>
            <span class="menu-item-parent">Dashboard</span>
          </a>
        </router-link>


        <router-link to="/status" tag="li" active-class="active">
          <a href="#">
            <i class="fa fa-lg fa-fw fa-desktop txt-color-blue"></i>
            <span class="menu-item-parent">MCU STATUS</span>
          </a>
        </router-link>

        <router-link to="/control" tag="li" active-class="active">
          <a href="#">
            <i class="fa fa-lg fa-fw fa-cog txt-color-blue"></i>
            <span class="menu-item-parent">MCU CONTROL</span>
          </a>
        </router-link>


        <router-link to="/paracc" tag="li" active-class="active">
          <a href="#">
            <i class="fa fa-lg fa-fw fa-bar-chart-o txt-color-blue"></i>
            <span class="menu-item-parent">PAR ACCUMULATION</span>
          </a>
        </router-link>
        <!-- <router-link to="/location" tag="li" active-class="active">
          <a href="#">
            <i class="fa fa-lg fa-fw fa-map-marker txt-color-blue"></i>
            <span class="menu-item-parent">Map Location</span>
          </a>
        </router-link> -->

        <li class="top-menu-invisible">
          <a href="#" @click="show('configuration')">
            <i class="fa fa-lg fa-fw fa-cube txt-color-blue"></i>
            <span class="menu-item-parent">Configuration</span>
            <b class="collapse-sign">
              <em class="fa fa-plus-square-o" v-if="!collapse.configuration"></em>
              <em class="fa fa-minus-square-o" v-else></em>
            </b>
          </a>
          <ul :style="{display: (collapse.configuration)?'block':'none'}">
            <router-link to="/setting/network/station" tag="li" active-class="active">
              <a>
                <i class="fa fa-lg fa-fw fa-gear"></i> Network</a>
            </router-link>
            <router-link to="/setting/datetime" tag="li" active-class="active">
              <a>
                <i class="fa fa-lg fa-fw fa-gear"></i> Date Time</a>
            </router-link>
          </ul>
        </li>

        <router-link to="/logger" tag="li" active-class="active">
          <a>
            <i class="fa fa-lg fa-fw fa-cube txt-color-blue"></i>
            <span class="menu-item-parent">Data Logger</span>
          </a>
        </router-link>

        <router-link to="/info" tag="li" active-class="active">
          <a>
            <i class="fa fa-lg fa-fw fa-cube txt-color-blue"></i>
            <span class="menu-item-parent">Device Info</span>
          </a>
        </router-link>

        <!-- <router-link to="/pages/show" tag="li" active-class="active">
          <a>
            <i class="fa fa-lg fa-fw fa-cube txt-color-blue"></i>
            <span class="menu-item-parent">SHOW DATA</span>
          </a>
        </router-link> -->
      </ul>
    </nav>


    <!-- <span class="minifyme" data-action="minifyMenu">
      <i class="fa fa-arrow-circle-left hit"></i>
    </span> -->

  </aside>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      collapse: {
        configuration: false
      }
    };
  },
  methods:{
    show(key){
      this.collapse[key] = !this.collapse[key];
    }
  },
  computed: {
    ...mapGetters(["getUid", "getUserInfo"])
  }
};
</script>
