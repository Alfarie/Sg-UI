<template>
  <section>
    <label class="label">Choose WiFi</label>
    <section>
      <label class="select">
        <select class="input-lg" v-model="ssid">
          <option v-for="wifi in wifis" :key="wifi.ssid" :value="wifi.ssid">{{wifi.ssid}} ({{wifi.quality}}%)</option>
        </select>
        <i></i>
      </label>
    </section>

    <section>
      <label class="label">Password</label>
      <label class="input">
        <i class="icon-append fa fa-question-circle"></i>
        <input type="password" placeholder="Password" v-model="psk">
        <b class="tooltip tooltip-bottom-right">
          <i class="fa fa-warning txt-color-teal"></i>
          Enter password</b>
      </label>
    </section>
    <div style="margin-top: 20px;">
      <a class="btn btn-default btn-lg" @click="scanWifi">Scan Wifi</a>
      <a class="btn btn-success btn-lg" @click="connectWifi">Connect</a>
    </div>

  </section>

</template>

<script>
  import {
    mapGetters
  } from "vuex";
  export default {
    data(){
      return {
        ssid: null,
        psk: null
      }
    },
    methods: {
      scanWifi() {
        this.$store.dispatch("scanWifi");
      },
      connectWifi() {
        if(this.ssid == null || this.psk == null){
          return;
        }
        this.$store.dispatch("connectWifi", {
          ssid: this.ssid,
          psk: this.psk
        });
      }
    },
    computed: {
      ...mapGetters(["wifis"])
    },
    created(){
      this.$store.dispatch("scanWifi");
    }
  };

</script>
