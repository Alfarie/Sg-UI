<template>

  <div class="row">
    <div class="col-xs-12 col-lg-6 col-lg-offset-3">
      <div class="jarviswidget jarviswidget-color-greenDark jarviswidget-sortable" id="wid-id-3">
        <header role="heading" class="ui-sortable-handle">
          <div class="jarviswidget-ctrls" role="menu">
            <a class="button-icon jarviswidget-fullscreen-btn">
              <i class="fa fa-expand "></i>
            </a>
          </div>
          <h2>
            <strong>Date & Time</strong>
            <i>panel</i>
          </h2>

        </header>
        <div role="content">
          <div class="jarviswidget-editbox">

          </div>
          <div class="widget-body">

            <h2 class="alert alert-success"> Date & Time configure.</h2>

            <form class="smart-form">
              <section>
                <div class="form-group">
                  <label>Time</label>
                  <div class="input-group">
                    <!-- <input class="form-control" id="picktime" type="text" placeholder="Select time" :value="time"> -->

                    <input type="time" name="" id="picktime" class="form-control" :value="time" required="required" title="">

                    <span class="input-group-addon">
                      <i class="fa fa-clock-o"></i>
                    </span>
                  </div>
                </div>
              </section>
              <section>
                <div class="form-group">
                  <label>Date</label>
                  <div class="input-group">

                    <input type="date" name="" id="pickdate" class="form-control" required="required" title="" :value="date">


                    <span class="input-group-addon">
                      <i class="fa fa-calendar"></i>
                    </span>
                  </div>
                </div>
              </section>
              <footer>
                <button @click="submit" type="button" class="btn btn-primary">
                  Submit
                </button>
              </footer>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  var $ = (window.jquery = require("jquery"));
  require("../../../../assets/js/plugin/clockpicker/clockpicker.min.js");
  import moment from 'moment';
  export default {
    data() {
      return {
        date: moment().format("YYYY-MM-DD"),
        time: moment().format("hh:mm")
      }
    },
    methods: {
      submit: function () {
        let d = $('#pickdate').val();
        let t = $('#picktime').val();
        console.log(d, t);
        this.$store.dispatch('updateDateTime', {
          date: d,
          time: t
        })
      }
    },
    // mounted () {
    //   $('#picktime').clockpicker({
    //     donetext: 'Done'
    //   })

    // }
  };

</script>