<template>
  <div class="container">
    <div class="jarviswidget jarviswidget-color-greenDark jarviswidget-sortable" id="wid-id-3" data-widget-colorbutton="false"
      data-widget-editbutton="false" data-widget-togglebutton="false" data-widget-deletebutton="false" role="widget">

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
              GPIO
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
                    <tr v-for="(value,ind) in gpio" :key="value + ' ' + ind">
                      <td style="padding: 5px; font-size: 20px;"> {{ind+1}} </td>
                      <td style="padding: 5px;">
                        <button-status :value="value"></button-status>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </fieldset>
            <header>
              Par Accumulation
            </header>
            <fieldset>
              <div class="table-responsive">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th style="padding: 10px;">CHANNEL</th>
                      <th style="padding: 10px;">PAR kJ/m<sup>2</sup></th>
                      <th style="padding: 10px;">PROGRESS</th>
                      <th style="padding: 10px;">MODE</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(value,ind) in paracc" :key="value + ' ' + ind" v-show="value.isuse == 1">
                      <td style="padding: 5px; font-size: 15px;"> {{ind+1}} </td>
                      <td style="padding: 5px;">
                        {{kj(value.acc)}} / {{kj(value.max)}} 
                      </td>
                      <td style="padding: 5px;">
                        <span class="txt-color-purple">
                          {{ (value.acc / value.max * 100).toFixed(2)}} %
                        </span>
                      </td>
                      <td style="padding: 5px;">
                        {{mode[value.mode]}}
                      </td>


                    </tr>
                  </tbody>
                </table>
              </div>
            </fieldset>

            <header>
              Memory
            </header>
            <fieldset>
              <div class="table-responsive">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th style="padding: 10px;">Module Name</th>
                      <th style="padding: 10px;">Memory</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style="padding: 5px; font-size: 20px;">MCU</td>
                      <td style="padding: 5px; font-size: 20px; color: green;">{{memory}} Byte</td>
                    </tr>
                    <tr>
                      <td style="padding: 5px; font-size: 20px; ">MPU</td>
                      <td style="padding: 5px; font-size: 20px; color: green;">112 MB</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </fieldset>

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
    data() {
      return {
        mode: ['SOIL', 'PAR', 'PAR & SOIL']
      };
    },
    methods: {
      kj: function(value){
        return (value / 1000).toFixed(2);
      }
    },
    computed: {
      ...mapGetters(["GetStatus"]),
      gpio: function () {
        return this.GetStatus.gpio;
      },
      memory: function () {
        return this.GetStatus.memory;
      },
      paracc: function () {
        return this.GetStatus.paracc;
      }
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
