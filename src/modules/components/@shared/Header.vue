<template>
  <header id="header">
    <div id="logo-group">

      <!-- PLACE YOUR LOGO HERE -->
      <span id="logo"></span>
      <!-- END LOGO PLACEHOLDER -->

      <!-- Note: The activity badge color changes when clicked and resets the number to 0
				Suggestion: You may want to set a flag when this happens to tick off all checked messages / notifications -->
      <span id="activity" class="activity-dropdown">
        <i class="fa fa-user"></i>
        <!-- <b class="badge"> 21 </b> -->
      </span>

      <!-- AJAX-DROPDOWN : control this dropdown height, look and feel from the LESS variable file -->
      <div class="ajax-dropdown">

        <!-- the ID links are fetched via AJAX to the ajax container "ajax-notifications" -->
        <div class="btn-group btn-group-justified" data-toggle="buttons">
          <label class="btn btn-default">
            <input type="radio" name="activity" id="ajax/notify/mail.html"> Msgs (14) </label>
          <label class="btn btn-default">
            <input type="radio" name="activity" id="ajax/notify/notifications.html"> notify (3) </label>
          <label class="btn btn-default">
            <input type="radio" name="activity" id="ajax/notify/tasks.html"> Tasks (4) </label>
        </div>

        <!-- notification content -->
        <div class="ajax-notifications custom-scroll">

          <div class="alert alert-transparent">
            <h4>Click a button to show messages here</h4>
            This blank page message helps protect your privacy, or you can show the first message here automatically.
          </div>

          <i class="fa fa-lock fa-4x fa-border"></i>

        </div>
        <!-- end notification content -->

        <!-- footer: refresh area -->
        <span> Last updated on: 12/12/2013 9:43AM
          <button type="button" data-loading-text="<i class='fa fa-refresh fa-spin'></i> Loading..." class="btn btn-xs btn-default pull-right">
            <i class="fa fa-refresh"></i>
          </button>
        </span>
        <!-- end footer -->

      </div>
      <!-- END AJAX-DROPDOWN -->
    </div>



    <!-- pulled right: nav area -->
    <div class="pull-right">

      <!-- collapse menu button -->
      <div id="hide-menu" class="btn-header pull-right">
        <span>
          <a href="javascript:void(0);" data-action="toggleMenu" title="Collapse Menu">
            <i class="fa fa-reorder"></i>
          </a>
        </span>
      </div>
      <!-- end collapse menu -->

      <!-- #MOBILE -->
      <!-- Top menu profile link : this shows only when top menu is active -->
      <ul id="mobile-profile-img" class="header-dropdown-list hidden-xs padding-5">
        <li class="">
          <a href="#" class="dropdown-toggle no-margin userdropdown" data-toggle="dropdown">
            <img src="/src/assets/img/avatars/sunny.png" alt="John Doe" class="online" />
          </a>
          <ul class="dropdown-menu pull-right">
            <li>
              <a href="javascript:void(0);" class="padding-10 padding-top-0 padding-bottom-0">
                <i class="fa fa-cog"></i> Setting</a>
            </li>
            <li class="divider"></li>
            <li>
              <a href="profile.html" class="padding-10 padding-top-0 padding-bottom-0">
                <i class="fa fa-user"></i>
                <u>P</u>rofile</a>
            </li>
            <li class="divider"></li>
            <li>
              <a href="javascript:void(0);" class="padding-10 padding-top-0 padding-bottom-0" data-action="toggleShortcut">
                <i class="fa fa-arrow-down"></i>
                <u>S</u>hortcut</a>
            </li>
            <li class="divider"></li>
            <li>
              <a href="javascript:void(0);" class="padding-10 padding-top-0 padding-bottom-0" data-action="launchFullscreen">
                <i class="fa fa-arrows-alt"></i> Full
                <u>S</u>creen</a>
            </li>
            <li class="divider"></li>
            <li>
              <a class="padding-10 padding-top-5 padding-bottom-5" data-action="userLogout">
                <i class="fa fa-sign-out fa-lg"></i>
                <strong>
                  <u>L</u>ogout</strong>
              </a>
            </li>
          </ul>
        </li>
      </ul>

      <!-- logout button -->
      <div id="logout" class="btn-header transparent pull-right">
        <span>
          <a @click="logout">
            <i class="fa fa-sign-out"></i>
          </a>
        </span>
      </div>
      <!-- end logout button -->

      <!-- search mobile button (this is hidden till mobile view port) -->
      <!-- end search mobile button -->

      <!-- input: search field -->
      <!-- end input: search field -->

      <!-- fullscreen button -->
      <!-- end fullscreen button -->

      <!-- #Voice Command: Start Speech -->
      <!-- end voice command -->

      <!-- multiple lang dropdown : find all flags in the flags page -->
      <ul class="header-dropdown-list">
        <li>
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">
            <img src="/src/assets/img/blank.gif" :class="lang[language].flag" alt="United States">
            <span> {{lang[language].name}}  </span>
            <i class="fa fa-angle-down"></i>
          </a>
          <ul class="dropdown-menu pull-right">
            <li class="active" @click="changeLanguage('en')">
              <a href="javascript:void(0);">
                <img src="/src/assets/img/blank.gif" class="flag flag-us" alt="United States"> English (US)</a>
            </li>
            <li  @click="changeLanguage('jp')">
              <a href="javascript:void(0);">
                <img src="/src/assets/img/blank.gif" class="flag flag-jp" alt="Japan"> 日本語 </a>
            </li>
          </ul>
        </li>
      </ul>
      <!-- end multiple lang -->

    </div>
    <!-- end pulled right: nav area -->

  </header>
</template>

<script>
  export default { 
    data(){
      return {
        lang: {
          en: {
           flag: 'flag flag-us' ,
           name: 'English (US)'
          },
          jp: {
           flag: 'flag flag-jp' ,
           name: '日本語 (JP)'
          }
        }
      }
    },
    
    methods: {
      logout() {
        this.$store.dispatch('LOGOUT_USER');
      },
      changeLanguage(lang){
        this.language = lang;
      }
    }
  }

</script>
