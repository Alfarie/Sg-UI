<template>
  <div>
    <!-- <header id="header">
			<div id="logo-group">
				<span id="logo"> <img src="/src/assets/img/logo.png" alt="SmartAdmin"> </span>
			</div>
		</header> -->
    <div id="main" role="main">
      
			<!-- MAIN CONTENT -->
			<div id="content" class="container">
        <div class="text-center" style="margin: 10px;">
          <img src="/src/assets/img/logo1.png" alt="SmartAdmin">
        </div>
				<div class="row">
					<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 hidden-xs hidden-sm">
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
										<label class="input"> <i class="icon-append fa fa-user"></i>
											<input type="text" name="text" v-model="username">
											<b class="tooltip tooltip-top-right"><i class="fa fa-user txt-color-teal"></i> Please enter username</b></label>
									</section>

									<section>
										<label class="label">Password</label>
										<label class="input"> <i class="icon-append fa fa-lock"></i>
											<input type="password" name="password" v-model="password">
											<b class="tooltip tooltip-top-right"><i class="fa fa-lock txt-color-teal"></i> Enter your password</b> </label>
										<div class="note">
											<a href="forgotpassword.html">Forgot password?</a>
										</div>
									</section>

									<section>
										<label class="checkbox">
											<input type="checkbox" name="remember" checked="">
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
						
						<h5 class="text-center"> - Or About us -</h5>
															
							<ul class="list-inline text-center">
								<li>
									<a href="javascript:void(0);" class="btn btn-primary btn-circle">
                    <i class="fa fa-facebook"></i> 
                  </a>
								</li>
								
							</ul>
						
					</div>
				</div>
			</div>

		</div>
      <!-- <label for="">username</label>
      <input type="text" v-model="username">
      <label for="">password</label>
      <input type="password" v-model="password">
      <button @click="login">Login</button>
      {{authMessage}}
      {{isAuth}} -->
  </div>
</template>


<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      username: null,
      password: null
    };
  },
  methods: {
    login() {
      this.$store.dispatch("login", {
        username: this.username,
        password: this.password
      });
    }
  },
  computed: {
      ...mapGetters(['authMessage', 'isAuth'])
  }
};
</script>