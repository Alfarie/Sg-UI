<template>
    <div class="containter">
        <router-view></router-view>
    </div>
</template>


<script>
import { mapGetters } from "vuex";

let newVar = {
  computed: {
    ...mapGetters(["getSensors"])
  },
  beforeCreate: function () {
    this.$store.dispatch('updateShortLogger');
    this.$store.dispatch('updateSparklineLogger');
  }
};
export default newVar;
</script>
