<template>
  <div>
    <fieldset>
      <section>
        <label class="label">SSID</label>
        <label class="input">
          <i class="icon-append fa fa-question-circle"></i>
          <input type="text" placeholder="Focus to view the tooltip"  v-model="ssid">
          <b class="tooltip tooltip-top-right">
            <i class="fa fa-warning txt-color-teal"></i>
            Enter wifi name</b>
        </label>
      </section>

      <section>
        <label class="label">Password</label>
        <label class="input">
          <i class="icon-append fa fa-question-circle"></i>
          <input type="password" placeholder="Focus to view the tooltip" v-model="password">
          <b class="tooltip tooltip-bottom-right">
            <i class="fa fa-warning txt-color-teal"></i>
            Enter password</b>
        </label>
      </section>



    </fieldset>
    <footer>
      <button @click.prevent="submit" type="submit" class="btn btn-primary">
        Submit
      </button>
      <button type="button" class="btn btn-default" onclick="window.history.back();">
        Set to Default
      </button>
    </footer>
  </div>

</template>


<script>
  export default {
    data(){
      return{
        ssid: 'SmartGrobot-A',
        password: 'raspberry'
      }
    },
    methods: {
      submit() {
        this.$store.dispatch('popUpWifi', 'pending');
        this.$store.dispatch('APMode',{
          ssid: this.ssid,
          password: this.password
        });
        setTimeout(()=>{
           window.location.href = 'about:blank'
        },10000);
      }
    }
  }
</script>