<template>
  <div class="containter">
        <article class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-md-offset-2 col-lg-offset-2">
          <app-select-panel></app-select-panel>
          <router-view></router-view>
        </article>
    </div>
</template>
<script>
import SelectPanel from "./components/SelectPanel.vue";
import GraphPanel from "./components/GraphPanel.vue";
import { mapGetters } from 'vuex';

export default {
  computed:{
    ...mapGetters(['loggerFetchingStatus'])
  },
  components: {
    appSelectPanel: SelectPanel,
    GraphPanel
  }
};
</script>