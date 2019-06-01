<template>
    <div class="col-md-8 col-md-offset-2">
        <div class="jarviswidget jarviswidget-color-greenDark jarviswidget-sortable" >
            <header role="heading" class="ui-sortable-handle"> <h2>Map Location</h2> </header>
            <div role="content">
              <div class="widget-body">
                <div class="containter">
                <GmapMap :center="{lat:10, lng:10}" :zoom="7" map-type-id="terrain" style="width: 320px; height: 300px">
                    <GmapMarker 
                    :key="index" v-for="(m, index) in [1,2,3,4]" 
                    :position="m.position" 
                    :clickable="true" 
                    :draggable="true" 
                    @click="center=m.position"
                    />
                </GmapMap>
            </div>
              </div>
            </div>
          </div>
    </div>
    
</template>

<script>
    //api key: AIzaSyAWgCegC8hnqGKIJWtTdZB2cTM9U4gBHzU
    import { gmapApi } from "vue2-google-maps";
    export default {
        computed: {
            google: gmapApi,
            width: ()=>{
                return window.innerWidth
            }
        }
    };
</script>

<style scoped>
</style>