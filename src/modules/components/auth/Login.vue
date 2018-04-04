<template>
  <div>
    <header id="header" style="height: 70px; background:#f4f4f4!important">

      <div id="extr-page-header-space">
        <span style="font-size: 25px; font-weight: bold;">
          <img src="/src/assets/img/logo1.png" alt=""> </span>
      </div>

      <span id="extr-page-header-space">
        <span class="hidden-mobile hiddex-xs">Need an account?</span>
        <span><a class="btn btn-default">Device</a></span>
      </span>

    </header>

    <div id="main" role="main">
      <div id="content" class="container">
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-7 col-lg-8 hidden-xs hidden-sm">
            <h1 class="txt-color-green login-header-big">Fully automation platfrom for Smart farm.</h1>
            <div class="hero">

              <img src="/src/assets/img/demo/iphoneview.png" class="pull-right display-image" alt="" style="width:210px">

            </div>

            <div class="row">
              
            </div>

          </div>

          <div class="col-xs-12 col-sm-12 col-md-5 col-lg-4">
            <div class="well no-padding">
              <form action="index.html" id="login-form" class="smart-form client-form">
                <header>
                  Sign In
                </header>

                <fieldset>

                  <section>
                    <label class="label">Username</label>
                    <label class="input">
                      <i class="icon-append fa fa-user"></i>
                      <input type="email" name="email" v-model="username">
                      <b class="tooltip tooltip-top-right">
                        <i class="fa fa-user txt-color-teal"></i> Please enter username</b>
                    </label>
                  </section>

                  <section>
                    <label class="label">Password</label>
                    <label class="input">
                      <i class="icon-append fa fa-lock"></i>
                      <input type="password" name="password"  v-model="password">
                      <b class="tooltip tooltip-top-right">
                        <i class="fa fa-lock txt-color-teal"></i> Enter your password</b>
                    </label>
                    
                  </section>

                  <section>
                    <label class="checkbox">
                      <input type="checkbox" name="remember" checked="" v-model="stayIn">
                      <i></i>Stay signed in</label>
                  </section>
                </fieldset>
                <footer>
                  <button type="button" class="btn btn-success" @click="login">
                    Sign in
                  </button>
                </footer>
              </form>

            </div>

            <h5 class="text-center"> - Or about us -</h5>

            <ul class="list-inline text-center">
              <li>
                <a href="javascript:void(0);" class="btn btn-primary btn-circle">
                  <i class="fa fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="javascript:void(0);" class="btn btn-default btn-circle">
                  <i class="fa fa-github"></i>
                </a>
              </li>
            </ul>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
  import {
    mapGetters
  } from 'vuex'
  export default {
    data() {
      return {
        username: null,
				password: null,
				stayIn: false
      };
    },
    methods: {
      login() {
        this.$store.dispatch("login", {
          username: this.username,
					password: this.password,
					stayIn: this.stayIn
        });
      }
    },
    computed: {
      ...mapGetters(['authMessage', 'isAuth'])
    }
  };

</script>

<style scoped>
	body{
		background: #fff;
	}
</style>
