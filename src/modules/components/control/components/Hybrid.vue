<template>
  <div class="jarviswidget jarviswidget-color-greenDark jarviswidget-sortable" id="wid-id-3">

    <header role="heading" class="ui-sortable-handle">
      <div class="jarviswidget-ctrls" role="menu">
        <a class="button-icon jarviswidget-fullscreen-btn">
          <i class="fa fa-expand "></i>
        </a>
      </div>
      <h2>
        <strong>Setbound & Timing </strong>
        <i>panel</i>
      </h2>

    </header>
    <div role="content">
      <div class="jarviswidget-editbox">

      </div>
      <div class="widget-body">
        <form class="smart-form">
          <fieldset>
            <label class="select label"> Sensors
              <select class="input-lg" v-model="select">
                <!-- // 0:vpd, 1:soil, 2:par, 3:temp, 4:humi, 5:co2 -->
                <option value="-1">Select Sensor</option>
                <option value="0">VPD</option>
                <option value="1">Soil</option>
                <option value="3">temperature</option>
                <option value="4">humidity</option>
                <option value="5">co2</option>
              </select>
              <i></i>
            </label>
            <section>
              <label class="label">Working time</label>
              <label class="input">
                <input type="number" class="input-md" v-model="control[ch-1].sbtiming.working">
              </label>
            </section>
            <section>
              <label class="label">Detecting time</label>
              <label class="input">
                <input type="number" class="input-md" v-model="control[ch-1].sbtiming.detecting">
              </label>
            </section>


            <label class="label" style="margin-top: 30px;">Set bound</label>
            <app-range :sliderobj="obj" id="setbound" v-model="value" style="margin-bottom: 20px;"></app-range>
          </fieldset>


          <footer>
            <button @click="submit" type="button" class="btn btn-primary">
              Submit
            </button>
            <button type="button" class="btn btn-default" onclick="window.history.back();">
              Set default
            </button>
          </footer>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import Range from "./shared/Range.vue";
  import RangeData from "./models/DoubleRange.js";
  import { mapGetters } from "vuex";
  export default {
    data() {
      return {
        obj: {},
        select: 1,
        value: 0
      };
    },
    methods: {
      submit: function () {
        this.$store.dispatch('popupUpdateModal');
        this.control[this.ch - 1].mode = 4;
        this.control[this.ch - 1].sensor = this.select;
        this.$store.dispatch("uploadControl", this.ch);
      },
      update: function () {
        this.select = this.control[this.ch - 1].sensor;
        var sensor = this.getSensorName[this.select];
        var objData = RangeData[sensor];
        objData.from = this.control[this.ch - 1].setbound.lower;
        objData.to = this.control[this.ch - 1].setbound.upper;
        this.obj = objData;
      }
    },
    computed: {
      ...mapGetters(["control", "getSensorName"]),
      ch: function () {
        return this.$route.params.ch;
      }
    },
    components: {
      appRange: Range
    },
    watch: {
      value: function () {
        var arr = this.value.split(";");
        this.control[this.ch - 1].sbtiming.lower = parseInt(arr[0]);
        this.control[this.ch - 1].sbtiming.upper = parseInt(arr[1]);
      },
      ch: function () {
        this.update();
      },
      select: function (data) {
        var sensor = this.getSensorName[data];
        var objData = RangeData[sensor];
        // console.log(RangeData);
        // objData.from = this.control[this.ch - 1].setbound.start;
        // objData.to = this.control[this.ch - 1].setbound.stop;
        this.obj = objData;
      }
    },
    beforeMount() {
      this.update();
    }
  };
</script>