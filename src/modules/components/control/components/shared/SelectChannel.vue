<template>
  <div class="jarviswidget jarviswidget-color-greenDark jarviswidget-sortable" >
    <header class="ui-sortable-handle">
      <div class="jarviswidget-ctrls" role="menu">
        <a href="javascript:void(0);" class="button-icon jarviswidget-fullscreen-btn" rel="tooltip" title="" data-placement="bottom"
          data-original-title="Fullscreen">
          <i class="fa fa-expand "></i>
        </a>
      </div>
      <h2>
        <strong>Channel</strong>
        <i>panel {{ch}}</i>
      </h2>
      <span class="jarviswidget-loader">
        <i class="fa fa-refresh fa-spin"></i>
      </span>
    </header>
    <div role="content">
      <div class="jarviswidget-editbox">

      </div>
      <div class="widget-body">

        <h2 class="alert alert-success"> Select Channel first.</h2>
        <form class="smart-form">
          <section>
            <label class="select">
              <select class="input-lg"  v-model="select">
                <option value="-1" key="c0">Choose Channel</option>
                <option v-for="(c,ind) in control" :key="controlName[c.mode] + ind" :value="ind+1">Channel {{ind+1}}: {{controlName[c.mode]}}</option>
              </select>
              <i></i>
            </label>
          </section>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getControlName", "control"]),
    ch: function() {
      return this.$route.params.ch;
    }
  },
  data() {
    return {
      select: -1,
      controlName: ['Manual', 'Timer', 'Setpoint', 'Setbound', 'Hybrid', 'Irrigation', 'Advance Setpoint', 'Advance Setbound', 'Advance Setbount & Timing', 'AI Irrigation']
    };
  },
  watch: {
    ch: function(data) {
      if (!data) {
        this.select = -1;
      }
    },
    select: function(data) {
      if (data != -1) {
        this.$router.replace({
          name: this.getControlName[data - 1],
          params: {
            ch: data
          }
        });
      } else {
        this.$router.replace({
          name: "grobot-control"
        });
      }
    }
  }
};
</script>

<style scoped>
</style>
