<template>
  <div>
    <div>
      <b-navbar toggleable="lg" type="dark" id="navbar">
        <b-navbar-brand class="font-weight-bolder" href="/" id="title">@0xantman</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="/">Portfolio</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <em>Admin</em>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <nuxt />

    <footer class="border-top">
      <div class="container">
        <div class="row justify-content-start">
          <b-nav vertical class="w-25">
            <b-nav-item disabled class="font-weight-bold h5">Support</b-nav-item>
            <b-nav-item href="/contact">Contact</b-nav-item>
            <b-nav-item>Another Link</b-nav-item>
          </b-nav>
        </div>
        <div class="row justify-content-center">
          <p class="small text-muted">This website was build with ❥ Sqlite3, Express, VueJS, NodeJS, Bootstrap-vue, Vee-validate, Jest.</p>
        </div>
        <div class="row justify-content-end">
          <p class="small text-muted text-left">©2019 Tous droits réservés. - <a href="https://github.com/0xantman" class="font-weight-bold">@0xantman</a></p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
body{
  height: 100%;
  margin: 0;
  display:flex; 
  flex-direction:column; 
}
footer{
  margin-top:auto; 
  bottom: 0;
  width: 100%;
  height: 50px;
  margin-top: 50px;
}
#navbar{
  background-color:#563d7c;
}
#title{
  color:#ffe484;
}
</style>
