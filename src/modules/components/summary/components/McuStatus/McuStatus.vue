<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xs-12 col-lg-8 col-lg-offset-2">
        <div class="jarviswidget jarviswidget-color-greenDark jarviswidget-sortable" id="wid-id-3">

      <header role="heading" class="ui-sortable-handle">
        <div class="jarviswidget-ctrls" role="menu">
          <a class="button-icon jarviswidget-fullscreen-btn">
            <i class="fa fa-expand "></i>
          </a>
        </div>
        <h2>
          <strong>MCU Status</strong>
          <i>panel</i>
        </h2>

      </header>
      <div role="content">
        <div class="jarviswidget-editbox">

        </div>
        <div class="widget-body">
          <form class="smart-form">
            <header>
              CHANNEL OUTPUT
            </header>
            <fieldset>
              <div class="table-responsive">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th style="padding: 10px;">CHANNEL</th>
                      <th style="padding: 10px;">OUTPUT</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(value,ind) in getGpio" :key="value + ' ' + ind">
                      <td style="padding: 5px; font-size: 16px;"> Channel: {{ind + 1}} </td>
                      <td style="padding: 5px;">
                        <button-status :value="value"></button-status>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </fieldset>
            <!-- <header>
              Water Status
            </header>
            <fieldset>
              <div class="table-responsive">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th style="padding: 10px;">Status</th>
                      <th style="padding: 10px;">Current Time</th>
                      <th style="padding: 10px;"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style="padding: 5px; font-size: 16px;">{{GetWater.type.toUpperCase()}}</td>
                      <td style="padding: 5px; font-size: 16px;">{{GetWater.data.crt}}</td>
                      <td style="padding: 5px; font-size: 16px;">{{GetWater.data.max}}</td>
                    </tr>
                    <tr>
                      <td style="padding: 5px; font-size: 16px;">Floating Sensors</td>
                      <td style="padding: 5px; font-size: 16px;">{{getSensors.floating}}</td>
                      <td style="padding: 5px; font-size: 16px;"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </fieldset> -->

            <footer>
              <button type="button" class="btn btn-default">
                Refresh
              </button>
            </footer>
          </form>
        </div>
      </div>
    </div>
      </div>
    </div>
  </div>
</template>


<script>
  import {
    mapGetters
  } from "vuex";
  import ButtonStatus from "./components/ButtonStatus";
  import ParProgress from "./components/ParProgress.vue";
  export default {
    components: {
      ButtonStatus,
      ParProgress
    },
    data(){
      return {
        chName: ['LED', 'CO2 valve', 'EC Pump', 'pH Pump', 'Water Pump', 'Water Valve']
      }
    },
    computed:{
      ...mapGetters(['getGpio','getSensors', 'GET_GPIO']),
    }
  };

</script>


<style scoped>
  th,
  td {
    padding: 1px;
    text-align: center;
  }

</style>
