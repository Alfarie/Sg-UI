<template>
  <div class="jarviswidget jarviswidget-color-greenDark jarviswidget-sortable" id="wid-id-3">

    <header role="heading" class="ui-sortable-handle">
      <div class="jarviswidget-ctrls" role="menu">
        <a class="button-icon jarviswidget-fullscreen-btn">
          <i class="fa fa-expand "></i>
        </a>
      </div>
      <h2>
        <strong>Advance Condition</strong>
        <i>panel</i>
      </h2>

    </header>
    <div role="content">
      <div class="jarviswidget-editbox">

      </div>
      <div class="widget-body">
        <form class="smart-form">
          <header>Timer</header>
          <fieldset>
            <div class="row">
              <div class="col col-5">
                <label class="toggle">
                  <input type="checkbox" name="checkbox-toggle" v-model="control[ch-1].setpoint.timer_flag">
                  <i data-swchon-text="ON" data-swchoff-text="OFF"></i>Timer Condition
                </label>
                <br>
              </div>
            </div>
            <section v-show="control[ch-1].setpoint.timer_flag">
              <section class="col-xs-5">
                <label class="input">
                  <input type="text" placeholder="Start Time" id="starttime" readonly>
                </label>
              </section>
              <section class="col-xs-1">

              </section>
              <section class="col-xs-5">
                <label class="input">
                  <input type="text" placeholder="Stop time" id="stoptime" readonly>
                </label>
              </section>
              <button type="button" class="btn btn-primary btn-lg btn-block" @click="addTimer">
                <i class="fa fa-plus"></i> ADD TIME
              </button>

              <header>Timer List </header>


              <div class="dd" id="nestable2">
                <ol class="dd-list">
                  <li class="dd-item" data-id="13" v-for="(time,index) in timerList" :key="time[0]+index">
                    <div class="dd-handle text-center">
                      <span style="color:rgb(255, 127, 127); font-size: 18px;">{{time[0] | minToTime}}</span>
                      -
                      <span style="color:rgb(68, 177, 68); font-size: 18px;">{{time[1] | minToTime}}</span>
                      <a @click="deleteTimer(index)" class="pull-right badge bg-color-red padding-5" rel="tooltip"
                        title="" data-placement="left" data-original-title="Warning Icon Text">
                        <i class="fa fa-trash-o fa-lg txt-color-white"></i>
                      </a>
                    </div>
                  </li>
                </ol>
              </div>
            </section>
          </fieldset>

          <header>Sensor</header>
          <fieldset>
            <div class="row">
              <div class="col col-5">
                <label class="toggle">
                  <input type="checkbox" name="checkbox-toggle" v-model="control[ch-1].setpoint.sensor_flag">
                  <i data-swchon-text="ON" data-swchoff-text="OFF"></i>Sensor Condition
                </label>
                <br>
              </div>
            </div>

            <section v-show="control[ch - 1].setpoint.sensor_flag">
                <app-range :sliderobj="conditionObj" id="conditionslider" v-model.number="control[ch-1].setpoint.sensor_setpoint"
                style="margin-bottom: 20px;"></app-range>
              <label class="select" style="margin-bottom: 20px;">
                Select Sensor:
                <select class="input-lg" v-model='sensorCondition' style="background-color: #9de57e">
                  <!-- // 0:vpd, 1:soil, 2:par, 3:temp, 4:humi, 5:co2 -->
                  <option value="-1">Select Sensor</option>
                  <option value="0">VPD</option>
                  <option value="1">Soil Moisture</option>
                  <option value="3">Temperature</option>
                  <option value="4">Humidity</option>
                  <option value="5">Carbon dioxide</option>
                </select>
              </label>

                <label class="select" style="margin-bottom: 20px;">Select Condition:
                    <select class="input-lg" v-model='control[ch-1].setpoint.sensor_direction' style="background-color: #9de57e" >
                      <!-- // 0:vpd, 1:soil, 2:par, 3:temp, 4:humi, 5:co2 -->
                      <option value="1">Greater than ( &ge; )</option>
                      <option value="0">Less than (&le;)</option>
                    </select>
                  </label>
            </section>
          </fieldset>

          <header>Setpoint</header>
          <fieldset>

            <section>
              <label class="label">Working time</label>
              <label class="input">
                <input type="number" class="input-md" v-model.number="control[ch-1].setpoint.working">
              </label>
            </section>
            <section>
              <label class="label">Detecting time</label>
              <label class="input">
                <input type="number" class="input-md" v-model.number="control[ch-1].setpoint.detecting">
              </label>
            </section>

            <app-range :sliderobj="setpointObj" id="setpointslider" v-model.number="control[ch-1].setpoint.setpoint"
              style="margin-bottom: 20px;"></app-range>
              <label class="select" style="margin-bottom: 20px;">Select Sensor:
                  <select class="input-lg" v-model='sensor' style="background-color: #9de57e">
                    <!-- // 0:vpd, 1:soil, 2:par, 3:temp, 4:humi, 5:co2 -->
                    <option value="-1">Select Sensor</option>
                    <option value="0">VPD</option>
                    <option value="1">Soil Moisture</option>
                    <option value="3">Temperature</option>
                    <option value="4">Humidity</option>
                    <option value="5">Carbon dioxide</option>
                  </select>
                </label>

              <label class="select" style="margin-bottom: 20px;">Select Condition:
                  <select class="input-lg" v-model='control[ch-1].setpoint.direction' style="background-color: #9de57e" >
                    <!-- // 0:vpd, 1:soil, 2:par, 3:temp, 4:humi, 5:co2 -->
                    <option value="1">Greater than ( &ge; )</option>
                    <option value="0">Less than (&le;)</option>
                  </select>
                </label>
          </fieldset>

          <footer>
            <button @click="submit" type="button" class="btn btn-primary">
              Submit
            </button>
          </footer>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  // "setpoint": {
  //         "timer_list": [],
  //         "timer_size": 0,
  //         "timer_flag": false,
  //         "sensor_condition": 3,
  //         "sensor_setpoint": 30,
  //         "sensor_flag": false,
  //         "sensor": 5,
  //         "setpoint": 600,
  //         "working": 15,
  //         "detecting": 30
  //     }
  import {
    mapGetters
  } from 'vuex'
  import Range from "./shared/Range.vue";
  import RangeData from "./models/Range.js";
  var $ = (window.jQuery = require("jquery"));
  require("../../../../assets/js/plugin/clockpicker/clockpicker.min.js");
  export default {
    data() {
      return {
        timerFlag: false,
        sensorFlag: false,
        sensor: 5,
        sensorCondition: 3,
        setpointObj: {},
        conditionObj: {},
        timerList: []
      }
    },
    computed: {
      ...mapGetters(['control', 'getSensorName']),
      ch: function () {
        return this.$route.params.ch;
      }
    },
    watch: {
      sensor: function (data) {
        this.control[this.ch - 1].setpoint.sensor = parseInt(this.sensor);
        var sensor = this.getSensorName[data];
        var objData = RangeData[sensor];
        this.setpointObj = objData;
      },
      sensorCondition: function (data) {
        this.control[this.ch - 1].setpoint.sensor_condition = parseInt(this.sensorCondition);
        var sensor = this.getSensorName[this.sensorCondition];
        var objData = RangeData[sensor];
        this.conditionObj = objData;
      },
      timerFlag: function (data) {
        this.control[this.ch - 1].setpoint.timer_flag = (data) ? 1 : 0;
      },
      sensorFlag: function (data) {
        this.control[this.ch - 1].setpoint.sensor_flag = (data) ? 1 : 0;
      }
    },
    methods: {
      submit: function () {
        this.$store.dispatch('popupUpdateModal');
        this.control[this.ch - 1].mode = 6;
        this.$store.dispatch('uploadControl', this.ch);
      },
      update: function () {
        this.control[this.ch - 1].setpoint.sensor = this.sensor;
        var sensor = this.getSensorName[this.sensor];
        var objData = RangeData[sensor];
        objData.from = this.control[this.ch - 1].setpoint.setpoint;
        this.setpointObj = objData;


        this.control[this.ch - 1].setpoint.sensor_condition = this.sensorCondition;
        var sensorCondition = this.getSensorName[this.sensorCondition];
        var objDataCondition = RangeData[sensorCondition];
        objDataCondition.from = this.control[this.ch - 1].setpoint.sensor_setpoint;
        this.conditionObj = objDataCondition;
      },

      addTimer: function () {
        this.showAlert = false;
        var start = $("#starttime").val();
        var stop = $("#stoptime").val();


        let starr = start.split(":");
        let stmin = parseInt(starr[0]) * 60 + parseInt(starr[1]);

        let sparr = stop.split(":");
        let spmin = parseInt(sparr[0]) * 60 + parseInt(sparr[1]);

        if (stmin > spmin || (start == '') || (stop == '')) {
          this.showAlert = true
          return;
        }
        let t = [stmin, spmin];

        if(this.control[this.ch - 1].setpoint.timer_list.length < 3){
          this.control[this.ch - 1].setpoint.timer_list.push(t)
        }
      },
      deleteTimer: function (index) {
        this.control[this.ch - 1].setpoint.timer_list.splice(index, 1);
      }
    },
    components: {
      appRange: Range
    },
    mounted() {
      $("#starttime").clockpicker({
        placement: "top",
        donetext: "Done"
      });

      $("#stoptime").clockpicker({
        placement: "top",
        donetext: "Done"
      });
      this.sensor = this.control[this.$route.params.ch - 1].setpoint.sensor;
      this.sensorCondition = this.control[this.$route.params.ch - 1].setpoint.sensor_condition;
        this.timerList = this.control[this.$route.params.ch - 1].setpoint.timer_list;
        this.update();
    }
  };

</script>
