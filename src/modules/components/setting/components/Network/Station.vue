<template>
  <div>
      <section>
          <label class="label">Choose WiFi</label>
          <section>
            <label class="select">
              <select class="input-lg" v-model="ssid">
                <option v-for="wifi in AvailableWifi" :key="wifi.ssid" :value="wifi.ssid">{{wifi.ssid}} ({{wifi.signal | percent}}%)</option>
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
          </div>
      
        </section>
        <footer>
            <button @click.prevent="submit" type="submit" class="btn btn-primary">
              Submit
            </button>
            <button type="button" class="btn btn-default" onclick="window.history.back();">
              Set to Default
            </button>
          </footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      ssid: null,
      psk: null
    };
  },
  methods: {
    scanWifi() {
      this.$store.dispatch("GetAvailableWifi");
    },
    submit() {
      if (this.ssid == null || this.psk == null) {
        return;
      }
      this.$store.dispatch("popUpWifi", "pending");
      this.$store.dispatch("STAMode", {
        ssid: this.ssid,
        password: this.psk
      });
      setTimeout(() => {
        window.location.href = "about:blank";
      }, 10000);
    }
  },
  computed: {
    ...mapGetters(["AvailableWifi"])
  },
  created() {
    this.$store.dispatch("GetAvailableWifi");
  },
  filters: {
    percent: value => {
      return Math.min(Math.max(2 * (value + 100), 0), 100);
    }
  }
};
</script>
