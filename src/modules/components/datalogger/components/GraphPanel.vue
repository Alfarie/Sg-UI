<template>

  <div class="jarviswidget jarviswidget-color-greenDark jarviswidget-sortable">
    <header role="heading" class="ui-sortable-handle">
      <div class="jarviswidget-ctrls" role="menu">
        <a class="button-icon jarviswidget-fullscreen-btn">
          <i class="fa fa-expand "></i>
        </a>
      </div>
      <h2>
        <strong>Graph {{sensor}}</strong>
      </h2>
    </header>
    <div role="content">
      <div class="jarviswidget-editbox">

      </div>
      <div class="widget-body">
        <form class="smart-form">
          <fieldset>
            <div class="row" v-if="showGraph">
              <graph :data="data" :sensor="sensor"></graph>
            </div>

             <section>
                <label>Choose Sensor</label>
                  <label class="select" style="margin-bottom: 20px;">
                      <select class="input-lg" v-model="sensor">
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
              </section>
          </fieldset>

          <footer >
            <form :action="link" method="get" target="_blank">
              <input type="hidden" name="start" :value="csvParams.startDate" />
              <input type="hidden" name="end" :value="csvParams.endDate" />
              <input type="hidden" name="interval" :value="csvParams.interval" />
              <input type="hidden" name="token" :value="token" />
              <button type="submit" class="btn btn-primary">
                <i class="fa fa-save "></i> Export to .xls
              </button>

            </form>
            <button @click.prevent="refresh" type="submit" class="btn btn-default">
                <i class="fa fa-refresh "></i> Refresh
            </button>
          </footer>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import axios from '../../../axios/axios'

import Graph from "./Graph.vue";

import { baseURL } from '../../../axios/axios'

export default {
  data(){
    return {
      link: baseURL + "/logger/interval/csv",
      sensor: 'soil',
      data: [],
      record: 0,
      showGraph: false,
      datevalue: '',
      token: '',
      csvParams: {
        startDate: String,
        endDate: String,
        interval: Number
      }
      // /logger/finds/date/csv?date=DATE2018-03-24
    }
  },
  methods:{
    refresh(){
      this.showGraph = false;
      this.sensor = this.sensor;
      setTimeout(()=>{
        this.showGraph =  true;
      },2000);
    }
  },
  components: {
    Graph
  },

  mounted(){
    this.data = [];
    if(this.$route.query.startDate == undefined){
      this.$router.push({path: '/logger'})
    }
    else{
      var data = this.$route.query;
      this.token = this.$store.getters.authData.tokenId;

      axios.get('/logger/interval',{
        headers:{ 'x-access-token': this.$store.getters.authData.tokenId},
        params: {
                start: data.startDate ,
                end: data.endDate,
                interval: data.interval
          }
      }).then(res=>{
        var length = res.data.length;
        this.$store.commit('popupShow', 'Records: ' + length)
        setTimeout(()=>{
          this.$store.commit('popupHide');
        },3000);
        if(length > 0){
          this.sensor = 'soil';
          this.data = res.data;
          this.showGraph = true;

          this.csvParams = {
            startDate: data.startDate,
            endDate: data.endDate,
            interval: data.interval
          }
        }
        else{
          this.$router.push({path: '/logger'})
        }
      })
    }
  }
};
</script>
