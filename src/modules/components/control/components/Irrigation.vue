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
        <strong>Irrigation</strong>
        <i>panel</i>
      </h2>
    </header>
    <div role="content">
      <div class="jarviswidget-editbox">

      </div>
      <div class="widget-body">
        <form class="smart-form">

          <fieldset>
            <label class="select label" style="margin-bottom: 20px;"> Sensors
              <select class="input-lg" style="background-color: rgb(157, 229, 126);" v-model.number="control[ch-1].irrigation.mode">
                <option value="0">PAR</option>
                <option value="1">PAR & Soil</option>
                <option value="2">PAR AI</option>
              </select>
            </label>
          </fieldset>

          <div  v-show="control[ch-1].irrigation.mode == 1">
            <header>Soil moisture</header>
            <fieldset>
              <section>
                <label class="label">Soil moisture detecting</label>
                <label class="input">
                  <input type="number" class="input-md" v-model.number="control[ch-1].irrigation.soil_detecting">
                </label>
              </section>
              <section>
                <label class="label">Soil moisture working</label>
                <label class="input">
                  <input type="number" class="input-md" v-model.number="control[ch-1].irrigation.soil_working">
                </label>
              </section>
              <label class="label">Soil moisture setpoint</label>
              <app-range :sliderobj="soilobj" id="soil" v-model="soil" style="margin-bottom: 20px;"></app-range>
            </fieldset>
          </div>
          <div>
            <header>PAR</header>
            <fieldset>
              <section  v-show="control[ch-1].irrigation.mode == 1">
                <label class="label">Soil Setpoint</label>
                <label class="input">
                  <input type="number" class="input-md" v-model.number="control[ch-1].irrigation.par_soil_setpoint">
                </label>
              </section>
              <section  v-show="control[ch-1].irrigation.mode == 1">
                <label class="label">PAR detecting</label>
                <label class="input">
                  <input type="number" class="input-md" v-model.number="control[ch-1].irrigation.par_detecting">
                </label>
              </section>
              <section v-show="control[ch-1].irrigation.mode == 2">
                <label class="label">Descent rate</label>
                <label class="input">
                  <input type="number" class="input-md" v-model.number="control[ch-1].irrigation.descent_rate">
                </label>
              </section>
              <section v-show="control[ch-1].irrigation.mode == 2">
                <label class="label">Limit time</label>
                <label class="input">
                  <input type="number" class="input-md" v-model.number="control[ch-1].irrigation.limit_time">
                </label>
              </section>
              <section>
                <label class="label">PAR working</label>
                <label class="input">
                  <input type="number" class="input-md" v-model.number="control[ch-1].irrigation.par_working">
                </label>
              </section>
              <section>
                <label class="label">PAR setpoint</label>
              <app-range :sliderobj="parobj" id="irrigation" v-model="par" style="margin-bottom: 20px;"></app-range>
              </section>
              
            </fieldset>
          </div>
          <footer>
            <button type="button" @click="submit" class="btn btn-primary">
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
  import DoubleRangeData from "./models/DoubleRange.js";
  import RangeData from "./models/Range.js";
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        soilobj: DoubleRangeData['soil'],
        parobj: RangeData['par'],
        soil: '',
        par: ''
      };
    },
    methods: {
      submit: function () {
        this.$store.dispatch('popupUpdateModal');
        this.control[this.ch - 1].mode = 5;
        this.$store.dispatch('uploadControl', this.ch);
      },
      update: function () {
        this.soilobj.from = this.control[this.ch - 1].irrigation.soil_lower;
        this.soilobj.to = this.control[this.ch - 1].irrigation.soil_upper;
        // this.soilobj.to = 88;
        this.parobj.from = this.control[this.ch - 1].irrigation.par_acc;
      }
    },
    components: {
      appRange: Range
    },
    computed: {
      ...mapGetters(['control']),
      ch: function () {
        return this.$route.params.ch;
      }
    },
    watch: {
      soil: function () {
        let arr = this.soil.split(';');
        this.control[this.ch - 1].irrigation.soil_lower = parseInt(arr[0]);
        this.control[this.ch - 1].irrigation.soil_upper = parseInt(arr[1]);
      },
      par: function () {
        this.control[this.ch - 1].irrigation.par_acc = this.par;
      },
      ch: function (data) {
        this.update();
      }
    },
    beforeMount() {
      this.update();
    }
  };

</script>