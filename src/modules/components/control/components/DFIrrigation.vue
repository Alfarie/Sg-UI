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
     
      <div class="widget-body">
        <form class="smart-form">
          <!-- {{control[ch-1].dfirrigation}} -->
          <div>
            <header>Soil moisture</header>
            <fieldset>
              <label class="label">Soil moisture setpoint</label>
              <app-range :sliderobj="soilobj" id="soil" v-model="soil" style="margin-bottom: 20px;"></app-range>
            </fieldset>
          </div>

          <header>PAR</header>
            <fieldset>
              <section>
                <label class="label">PAR working</label>
                <label class="input">
                  <input type="number" class="input-md" v-model.number="control[ch-1].dfirrigation.working">
                </label>
              </section>
              <section>
                <label class="label">Descent rate</label>
                <label class="input">
                  <input type="number" class="input-md" v-model.number="control[ch-1].dfirrigation.descent">
                </label>
              </section>
              <section>
                <label class="label">Limit time</label>
                <label class="input">
                  <input type="number" class="input-md" v-model.number="limit">
                </label>
              </section>
              <label class="label">PAR setpoint</label>
              <app-range :sliderobj="parobj" id="irrigation" v-model.number="par" style="margin-bottom: 20px;"></app-range>
            </fieldset>
          
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
        par: '',
        limit: 3
      };
    },
    methods: {
      submit: function () {
        this.$store.dispatch('popupUpdateModal');
        this.control[this.ch - 1].mode = 9;
        this.$store.dispatch('uploadControl', this.ch);
      },
      update: function () {
        this.soilobj.from = this.control[this.ch - 1].dfirrigation.lower;
        this.soilobj.to = this.control[this.ch - 1].dfirrigation.upper;
        this.parobj.from = this.control[this.ch - 1].dfirrigation.paracc;
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
        this.control[this.ch - 1].dfirrigation.lower = parseInt(arr[0]);
        this.control[this.ch - 1].dfirrigation.upper = parseInt(arr[1]);
      },
      par: function () {
        this.control[this.ch - 1].dfirrigation.paracc = this.par;
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