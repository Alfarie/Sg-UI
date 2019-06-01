<template>

    <div class="container">
        <h3>Sensors</h3>
        <p>{{GET_SENSORS}}</p>

        <h3>Control</h3>
        <p>{{GET_CONTROL}}</p>

        <h3>GPIO</h3>
        <p>{{GET_GPIO}}</p>

        <h3>Web app</h3>


        <div class="row">

            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                <label for="mode">mode</label>
                <input v-model="mode" type="number" name="mode" id="input${1/(\w+)/\u\1/g}" class="form-control" value="" max="" step="">
            </div>
        </div>


        <div class="row" style="margin-top: 30px;">
            <button type="button" class="btn btn-default" @click="logout">Logout</button>
            <button type="button" class="btn btn-default" @click="changeMode(mode)">mode</button>
            <button type="button" class="btn btn-default" @click="update1">Update 1</button>
            <button type="button" class="btn btn-default" @click="update2">Update 2</button>
        </div>

        <h3>pie chart</h3>
        <div>
            <vue-easy-pie-chart :scaleColor="color" :barColor="color" :percent="percent" :size="77" :line-width="3" :fontSize="fontSize"></vue-easy-pie-chart>
        </div>

    </div>
</template>

<script>
    // #76ff32
    import VueEasyPieChart from "vue-easy-pie-chart";
    import "vue-easy-pie-chart/dist/vue-easy-pie-chart.css";
    import { mapGetters } from "vuex";
    export default {
        components: { VueEasyPieChart },
        data() {
            return {
                mode: 0,
                fontSize: '15px',
                color: '#76ff32',
                percent: 30
            };
        },
        computed: {
            ...mapGetters(["GET_SENSORS", "GET_CONTROL", "GET_GPIO"])
        },
        methods: {
            logout() {
                this.$store.dispatch("LOGOUT_USER");
            },
            update1() {
                this.GET_CONTROL[0].mode = 1;
                this.GET_CONTROL[0].timer.list = [[0, 60], [40, 90]];
                var data = {
                    control: {
                        ch1: this.GET_CONTROL[0]
                    }
                };
                console.log(data);
                this.$store.dispatch("UPDATE_THING", data);
            },
            update2() {
                this.GET_CONTROL[0].mode = 1;
                this.GET_CONTROL[0].timer.list = [[0, 60], [40, 90], [45, 800]];
                var data = {
                    control: {
                        ch1: this.GET_CONTROL[0]
                    }
                };
                console.log(data);
                this.$store.dispatch("UPDATE_THING", data);
            },
            changeMode(mode) {
                var control_ch1 = JSON.parse(JSON.stringify(this.GET_CONTROL[0]));
                control_ch1.mode = parseInt(mode);
                var data = {
                    control: {
                        ch1: control_ch1
                    }
                };
                console.log(data);
                this.$store.dispatch("UPDATE_THING", data);
            }
        }
    };
</script>

<style scoped>
</style>