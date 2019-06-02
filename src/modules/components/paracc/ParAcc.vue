<template>
 <div class="container">
     <div class="col-lg-8 col-lg-offset-2">
         <div class="jarviswidget jarviswidget-color-greenDark jarviswidget-sortable" id="wid-id-3">
    <header role="heading" class="ui-sortable-handle">
      <div class="jarviswidget-ctrls" role="menu">
        <a class="button-icon jarviswidget-fullscreen-btn">
          <i class="fa fa-expand "></i>
        </a>
      </div>
      <h2>
        <strong>Par Accumulation</strong>
      </h2>

    </header>
    <div role="content">
      <div class="jarviswidget-editbox">

      </div>
      <div class="widget-body">
        <form class="smart-form">
          <header>
            Par Accumulation Chart
          </header>
          <fieldset>
            <div id="paraccgraph" style="width:100%; height:300px;"></div>
          </fieldset>
          <header>
            PAR Status
          </header>
          <fieldset>
            <!-- <div id="pargraph" style="width:100%; height:300px;"></div> -->
            <!-- {{getChannelParAcc}} -->
            <!-- {{control[0].mode}} -->
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th style="padding: 10px;">CHANNEL</th>
                    <th style="padding: 10px;">Progress</th>
                    <th style="padding: 10px;">Percentage</th>
                    <th style="padding: 10px;">Mode</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(channel, index) in getChannelParAcc" :key="index" v-show="control[index].mode == 5">
                    <td  style="width:10%;">{{index+1}}</td>
                    <td style="width: 60%;">
                      <div class="progress">
                        <div class="progress-bar" role="progressbar" :style="{'width': (channel/1000000/ control[index].irrigation.par_acc * 100) +  '%'}" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
                          {{channel/1000000 | toFixed}}/{{ control[index].irrigation.par_acc}} MJ
                        </div>
                      </div>
                    </td>
                    <td>
                      {{(channel/1000000/ control[index].irrigation.par_acc * 100) | toFixed }} %
                    </td>
                    <td>
                      {{ (channel.mode==0)?'Soil':'PAR'}}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </fieldset>
          <header>
            Infomation
          </header>
          <fieldset>
            <div class="table-responsive">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th style="padding: 10px;">STATUS</th>
                      <th style="padding: 10px;">OUTPUT (watt/m<sup>2</sup>)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <!-- {{getSensors}} -->
                      <td>Current PAR</td>
                      <td> {{getSensors.par}}  </td>
                    </tr>
                    <tr>
                      <td>PAR Accumulation </td>
                      <td> {{getSensors.paracc}}  </td>
                    </tr>
                    <tr>
                      <td>Average PAR</td>
                      <td> {{parStat.avg}}  </td>
                    </tr>
                    <tr>
                      <td>Minimum PAR</td>
                      <td> {{parStat.min}}  </td>
                    </tr>
                    <tr>
                      <td>Maximum PAR</td>
                      <td> {{parStat.max}}  </td>
                    </tr>

                  </tbody>
                </table>
              </div>
          </fieldset>

          <!-- <footer>
            <button type="button"  class="btn btn-primary">
              Submit
            </button>
            <button type="button" class="btn btn-default" onclick="window.history.back();">
              Set default
            </button>
            <button type="button" class="btn btn-default" @click="refresh">
              Refresh
            </button>
            <button type="button" class="btn btn-default" @click="loggerInterval">
              Logger Interval
            </button>
          </footer> -->
        </form>
      </div>
    </div>
  </div>
     </div>
 </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "../../axios/axios";
export default {
  data() {
    return {
      parStat: { max: 0, min: 0, avg: 0 },
      loggerData: []
    };
  },
  computed: {
    ...mapGetters([
      "getSensors",
      "parAccLog",
      "getDateTime",
      "getChannelParAcc",
      "control",
      "getDate",
      "authData"
    ])
  },
  filters: {
    toFixed: function(value) {
      if (!value) return "";
      return value.toFixed(2);
    }
  },
  methods: {
    getParStatisticData() {
      axios
        .get(
          "/logger/statistic?start=" + this.getDate + "&end=" + this.getDate,
          {
            headers: { "x-access-token": this.authData.tokenId }
          }
        )
        .then(res => {
          const parstat = res.data.par;
          this.parStat = {
            max: parstat[0],
            avg: parstat[1],
            min: parstat[2]
          };
        });
    },
    getParData() {
      axios
        .get("/logger/least?interval=3&limit=50", {
          headers: { "x-access-token": this.authData.tokenId }
        })
        .then(res => {
          this.loggerData = res.data;
          var parAccStrData = this.craftParAccStringData();
          this.createGraph(parAccStrData);
          // var parStrData = this.craftParStringData();
          // this.createParGraph(parStrData);
        });
    },
    createGraph: function(strData) {
      setTimeout(() => {
        new Dygraph(document.getElementById("paraccgraph"), strData, {
          customBars: true,
          title:
            "Daily Par Accumulation : in " +
            moment(this.getDateTime.date).format("DD-MMM"),
          ylabel: "Par Accumulation",
          legend: "always",
          labelsDivStyles: {
            textAlign: "right"
          },
          showRangeSelector: true
        });
      }, 500);
    },
    craftParAccStringData: function() {
      var strData = "";
      strData = "Date,PARACC\n";
      var date = moment(this.loggerData[0].datetime).format("MMM Do YY");
      this.loggerData.forEach(log => {
        var datetime = moment(log.datetime).format("YYYY-MM-DD HH:mm:ss");
        var sensorData =
          log.paracc - 10000 + ";" + log.paracc + ";" + (log.paracc + 10000);
        var str = datetime + "," + sensorData + "\n";
        strData += str;
      });
      return strData;
    },
    createParGraph: function(strData) {
      setTimeout(() => {
        new Dygraph(document.getElementById("pargraph"), strData, {
          customBars: true,
          title:
            "Daily PAR : in " + moment(this.getDateTime.date).format("DD-MMM"),
          ylabel: "PAR",
          legend: "always",
          labelsDivStyles: {
            textAlign: "right"
          },
          showRangeSelector: true
        });
      }, 500);
    },
    craftParStringData: function() {
      var strData = "";
      strData = "Date,PARACC\n";
      var date = moment(this.parAccLog.data[0].datetime).format("MMM Do YY");
      this.parAccLog.data.forEach(log => {
        var datetime = moment(log.datetime).format("YYYY-MM-DD HH:mm:ss");
        var sensorData = log.par - 100 + ";" + log.par + ";" + (log.par + 100);
        var str = datetime + "," + sensorData + "\n";
        strData += str;
      });
      return strData;
    }
  },
  mounted() {
    this.$store.dispatch("updateControl");
    this.getParData();
    this.getParStatisticData();
    this.$store.dispatch("popupParAcc");
  }
};
</script>

<style scoped>
td {
  font-size: 16px;
  font-weight: normal;
  text-align: left;
}
</style>
