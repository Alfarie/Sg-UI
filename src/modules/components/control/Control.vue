<template>
  <div class="containter">
        <article class="col-xs-12 col-md-6 col-lg-6 col-md-offset-3 col-lg-offset-3">
            <app-select-channel></app-select-channel>
            <app-select-control v-if="$route.params.ch"></app-select-control>
            <router-view></router-view>
        </article>
    </div>
</template>

<script>
import SelectChannel from './components/shared/SelectChannel.vue'
import SelectControl from './components/shared/SelectControl.vue'
import Manual from './components/Manual.vue'
export default {
    components:{
        appSelectChannel: SelectChannel,
        appSelectControl: SelectControl,
        appManual: Manual,
    },
    mounted () {
        this.$store.dispatch('updateControl');
    }
};
</script>
