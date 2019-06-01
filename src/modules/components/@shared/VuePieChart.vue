<template>
    <vue-easy-pie-chart :barColor="color" :percent="sensorPercent" :size="size" :line-width="3" :fontSize="fontSize">
       {{sensorValue}}
    </vue-easy-pie-chart>
</template>

<script>
import VueEasyPieChart from "vue-easy-pie-chart";
import "vue-easy-pie-chart/dist/vue-easy-pie-chart.css";
import VuePieData from '../../models/VuePieChart.json'

export default {
  props: ['id', 'value'],
  components: { VueEasyPieChart },
  data() {
    return {
      mode: 0,
      fontSize: "15px",
      color: "#76ff32",
      size: 65,
      PieData: VuePieData
    };
  },
  computed:{
      sensorPercent(){
        return this.value / this.PieData[this.id].max * 100
      },
      sensorValue(){
          return this.value + ' ' + this.PieData[this.id].post
      }
  }
};
</script>

<style scoped>
</style>