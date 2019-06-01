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
        <strong>Control</strong>
        <i>panel</i>
      </h2>
    </header>
    <div role="content">
      <!-- <h1>{{control[ch-1].setpoint.setpoint}}</h1> -->
      <div class="jarviswidget-editbox">
      </div>
      <div class="widget-body">
        <form class="smart-form">
          <fieldset>
            <div class="row">
              <section class="col col-lg-6 col-xs-12">
                <label class="toggle">
                  <input type="radio" name="radio-toggle" value="0" v-model="select">
                  <i data-swchon-text="ON" data-swchoff-text="OFF" ></i>Manual</label>
                <label class="toggle">
                  <input type="radio" name="radio-toggle" value="1" v-model="select">
                  <i data-swchon-text="ON" data-swchoff-text="OFF"></i>Timer</label>
                <!-- <label class="toggle">
                  <input type="radio" name="radio-toggle" value="2" v-model="select">
                  <i data-swchon-text="ON" data-swchoff-text="OFF"></i>Set point</label>
                <label class="toggle">
                  <input type="radio" name="radio-toggle" value="3" v-model="select">
                  <i data-swchon-text="ON" data-swchoff-text="OFF"></i>Set Bound</label>
                <label class="toggle">
                  <input type="radio" name="radio-toggle" value="4" v-model="select">
                  <i data-swchon-text="ON" data-swchoff-text="OFF"></i>Setbound & Timing</label> -->

                <!-- <label class="toggle">
                  <input type="radio" name="radio-toggle" value="9" v-model="select">
                  <i data-swchon-text="ON" data-swchoff-text="OFF"></i>AI Irrigation</label> -->
                <label class="toggle">
                  <input type="radio" name="radio-toggle" value="6" v-model="select">
                  <i data-swchon-text="ON" data-swchoff-text="OFF"></i>Setpoint</label>
                <label class="toggle">
                  <input type="radio" name="radio-toggle" value="7" v-model="select">
                  <i data-swchon-text="ON" data-swchoff-text="OFF"></i>Setbound</label>
                <label class="toggle">
                  <input type="radio" name="radio-toggle" value="8" v-model="select">
                  <i data-swchon-text="ON" data-swchoff-text="OFF"></i>Setbound & Timing</label>
                <label class="toggle">
                  <input type="radio" name="radio-toggle" value="5" v-model="select">
                  <i data-swchon-text="ON" data-swchoff-text="OFF"></i>Advance Irrigation</label>
              </section>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

import {mapGetters} from 'vuex';
var controlName = ['manual', 'timer', 'setpoint', 'setbound', 'hybrid', 'irrigation', 'advancecondition', 'advancesetbound', 'advancetimingsetbound', 'dfirrigation']
export default {
  computed:{
    ...mapGetters(['control','getControlName']),
    ch: function(){
      return this.$route.params.ch;
    }
  },
  data(){
    return{
      select: 0
    }
  },
  watch:{
    select:function(data){
     this.$router.replace({
       name: controlName[data]
     })
    },
    ch: function(data){
      this.select = this.control[this.$route.params.ch-1].mode;
    }
  },
  mounted(){
    this.select = this.control[this.$route.params.ch-1].mode;
  }
};
</script>
