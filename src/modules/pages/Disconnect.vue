<template>

    <div class="col-xs-12 col-sm-12 col-md-5 col-lg-4 col-lg-offset-5">
        <h1 :class="[{red: !ConnectionStatus}, {green:ConnectionStatus}]"> {{isConnect}}</h1>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    computed:{
        ...mapGetters(['isConnect','ConnectionStatus'])
    }
};
</script>

<style scoped>
    .red{
        color:red;
    }
    .green {
        color: green;
    }
</style>