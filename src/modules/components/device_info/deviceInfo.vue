<template>
  <div class="container">
    <div class="jarviswidget jarviswidget-color-greenDark jarviswidget-sortable">
      <header role="heading" class="ui-sortable-handle">
        <div class="jarviswidget-ctrls" role="menu">
          <a class="button-icon jarviswidget-fullscreen-btn">
            <i class="fa fa-expand "></i>
          </a>
        </div>
        <h2>
          <strong>Device Info</strong>
        </h2>

      </header>
      <div role="content">
        <div class="jarviswidget-editbox"></div>
        <div class="widget-body">
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
              <tr>
                <th style="padding: 10px;">Module</th>
                <th style="padding: 10px;">Version</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>SG-HQ</td>
                <td>{{version.sgmpu}}</td>
              </tr>
              <tr>
                <td>SG-INTF</td>
                <td>{{version.sgui}}</td>
              </tr>
              <tr>
                <td>SG-MCU</td>
                <td>{{version.sgmcu}}</td>
              </tr>
              <tr>
                <td>SG-SSR</td>
                <td>{{version.sgssr}}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    computed: {
      ...mapGetters(['version']),
    },
    mounted() {
      const {dispatch} = this.$store
      dispatch('version')
    }
  }
</script>
