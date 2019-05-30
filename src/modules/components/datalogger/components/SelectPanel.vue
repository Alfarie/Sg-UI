<template>
  <div class="jarviswidget jarviswidget-color-greenDark jarviswidget-sortable" id="wid-id-3" data-widget-colorbutton="false"
    data-widget-editbutton="false" data-widget-togglebutton="false" data-widget-deletebutton="false" role="widget">

    <header role="heading" class="ui-sortable-handle">
      <div class="jarviswidget-ctrls" role="menu">
        <a class="button-icon jarviswidget-fullscreen-btn">
          <i class="fa fa-expand "></i>
        </a>
      </div>
      <h2>
        <strong> Data Logger</strong>
        <i>panel</i>
      </h2>

    </header>
    <div role="content">
      <div class="jarviswidget-editbox">

      </div>
      <div class="widget-body">
        <form class="smart-form">
          <fieldset>
            <div class="row">
              <section>
                <label>Choose start-date</label>
                <input type="date" name="" id="" class="form-control" v-model="startDate">
              </section>
              <section>
                <label>Choose end-date</label>
                <input type="date" name="" id="" class="form-control" v-model="endDate">
              </section>
              <section>
                <label>Choose Interval</label>
                  <label class="select" style="margin-bottom: 20px;">
                      <select class="input-lg" v-model.number="interval">
                        <option v-if="diffDate < 10" value="1">1 minute</option>
                        <option v-if="diffDate < 20" value="3">3 minutes</option>
                        <option v-if="diffDate < 30" value="5">5 minutes</option>
                        <option v-if="diffDate < 30" value="10">10 minutes</option>
                        <option v-if="diffDate < 30" value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                      </select>
                      <i></i>
                    </label>
              </section>

              <!-- <section>
                <label>Choose Sensor</label>
                  <label class="select" style="margin-bottom: 20px;">
                      <select class="input-lg" @input="selectSensor">
                        <option value="soil">Soil Moisture</option>
                        <option value="vpd">VPD</option>
                        <option value="temperature">Temperature</option>
                        <option value="humidity">Relative Humidity</option>
                        <option value="co2">CO<sub>2</sub></option>
                        <option value="par">PAR</option>
                        <option value="paracc">PAR Accumulation</option>
                      </select>
                      <i></i>
                    </label>
              </section> -->
            </div>
          </fieldset>
          <footer>
            <button type="button" class="btn btn-primary" @click="fetchData">
              Fetch Data 
            </button>
          </footer>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
var $ = (window.jQuery = require("jquery"));
require("../../../../assets/js/plugin/clockpicker/clockpicker.min.js");
export default {
  data() {
    return {
      startDate: moment().format("YYYY-MM-DD"),
      endDate: moment().format("YYYY-MM-DD"),
      select: "soil",
      interval: 30
    };
  },
  computed: {  
    diffDate(){
      var start = moment(this.startDate);
      var end = moment(this.endDate)
      return Math.abs(end.diff(start, 'days'))
    }
  },
  watch: {
    diffDate(value){
      if(value > 5) {
        this.interval = 30;
      }
    }
  },
  methods: {
    
    fetchData: function() {
      this.$store.dispatch('popupFetching');
      this.$router.push({ path: "/logger" });
      setTimeout(() => {
        this.$router.push({ path: "/logger/graph", query: {
          interval: this.interval,
          startDate: this.startDate,
          endDate: this.endDate
        } });
      }, 1000);
    }
  }
};
</script>
