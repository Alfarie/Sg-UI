<template>
    <div class="jarviswidget">

        <header class="ui-sortable-handle">
            <div class="jarviswidget-ctrls">
                <a class="button-icon jarviswidget-fullscreen-btn">
                    <i class="fa fa-expand "></i>
                </a>
            </div>
            <h2>
                <strong>Conductivity</strong>
                <i>panel</i>
            </h2>

        </header>
        <div role="content">
            <div class="jarviswidget-editbox">
            </div>
            <div class="widget-body">
                <form class="smart-form">
                    <header> Setting </header>
                    <div class="row" style="margin: 20px;"> 
                        <div class="col-xs-6">
                            <label class="toggle">
                                <input type="checkbox" name="checkbox-toggle">
                                <i data-swchon-text="ON" data-swchoff-text="OFF"></i> Activation
                            </label>
                            <label class="toggle">
                                <input type="checkbox" name="checkbox-toggle">
                                <i data-swchon-text="ON" data-swchoff-text="OFF"></i> Timer mode
                            </label>
                            <label class="toggle">
                                <input type="checkbox" name="checkbox-toggle">
                                <i data-swchon-text="ON" data-swchoff-text="OFF"></i> Cycle mode
                            </label>
                        </div>
                    </div>
                    <header>
                        Timer mode
                    </header>
                    <fieldset>
                        <section>
                            <label class="label">Working time</label>
                            <label class="input">
                                <input type="number" class="input-md">
                            </label>
                        </section>
                        <section>
                            <label class="label">Waiting time</label>
                            <label class="input">
                                <input type="number" class="input-md">
                            </label>
                        </section>
                        
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
    import Range from "../shared/Range.vue";
    import RangeData from "../models/Range.js";
    import { mapGetters } from "vuex";

    export default {
        data() {
            return {};
        },
        components: {
            appRange: Range
        },
        methods: {
            submit() { }
        }
    };
</script>