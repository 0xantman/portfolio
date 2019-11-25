<template>
  <div>
    <header>
      <b-alert variant="danger" :show="$nuxt.isOffline">No internet connection</b-alert>
      <Navbar/>
    </header>
    <nuxt/>
    <footer class="border-top mt-5">
      <div class="container">
        <div class="row justify-content-start">
          <b-nav vertical class="w-25">
            <b-nav-item disabled class="font-weight-bold h5">Support</b-nav-item>
            <b-nav-item to="/contact">Contact</b-nav-item>
          </b-nav>
        </div>
        <div class="row justify-content-center">
          <p class="small text-muted">This website was build with ❥ Sqlite3, Express, VueJS, NodeJS, Bootstrap-vue, Vee-validate, Jest.</p>
        </div>
        <div class="row justify-content-end">
          <p class="small text-muted text-left">©2019 Made with 💙 by - <a href="https://github.com/0xantman" class="font-weight-bold">@0xantman</a></p>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
import Navbar from '~/components/Navbar'

export default {
  components: {
    Navbar
  },  
}
</script>
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
  height: 100%;
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
  height:100%;
}

#navbar{
  background-color:#563d7c;
}
#title{
  color:#ffe484;
}
</style>
