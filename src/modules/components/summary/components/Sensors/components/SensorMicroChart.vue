<template>
  <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 sensor-panel">
    
  <div class="pull-left" style="margin-top: 5px;">
    <vue-pie-chart :id="id" :value="getSensors[id]"></vue-pie-chart>
  </div>
    <span class="easy-pie-title" style="margin-top: 25px;"> 
      <slot name="sensor-name"></slot>
    </span>

    <ul class="smaller-stat hidden-sm pull-right" style="margin-top: 15px;">
      <li>
        <span class="label bg-color-greenLight">
          <i class="fa fa-caret-up"></i> {{max}}</span>
      </li>
      <li>
        <span class="label bg-color-blueLight">
          <i class="fa fa-caret-down"></i> {{min}}</span>
      </li>
    </ul>
  </div>
</template>


<script>
import { mapGetters } from "vuex";

import PieData from "../../../../../models/PieChart.js";
import PieChart from "../../../../@shared/PieChart.vue";
import VuePieChart from "../../../../@shared/VuePieChart.vue";
import Sparkline from "../../../../@shared/Sparkline.vue";
export default {
  props: ["id"],
  data() {
    return {
      chartData: PieData
    };
  },
  components: {
    PieChart,
    VuePieChart,
    appSparkline: Sparkline
  },
  computed: {
    ...mapGetters(["getSensors", "sparklineLogger"]),
    max: function() {
      try {
        let value = this.sparklineLogger[this.id].max;
        if (value != undefined) return value;
        else return "--";
      } catch (ex) {
        return "--";
      }
    },
    min: function() {
      try {
        let value = this.sparklineLogger[this.id].min;
        if (value != undefined) return value;
        else return "--";
      } catch (ex) {
        return "--";
      }
    },
    records: function() {
      try {
        let value = this.sparklineLogger[this.id].records;
        if (value != undefined) return value;
        else return [];
      } catch (ex) {
        return [];
      }
    }
  }
};
</script>
