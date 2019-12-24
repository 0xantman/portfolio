<template>
  <b-navbar toggleable="lg" type="dark" id="navbar">
    <b-navbar-brand class="font-weight-bolder" to="/" id="title">{{websiteName}}</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
            <b-nav-item to="/">Portfolio</b-nav-item>
            <b-nav-item to="/contact">Contact</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
         
          <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
              <em>Admin</em>
              </template>
              <b-dropdown-item to="/admin" v-if="loggedIn">Profile</b-dropdown-item>
              <b-dropdown-item to="#" v-if="loggedIn" @click="logout">Sign Out</b-dropdown-item>
              <b-dropdown-item to="/login" v-if="!loggedIn" >Sign In</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
    </b-collapse>
    </b-navbar>
</template>

<script>


export default {
  data(){
    return{
      websiteName : process.env.NUXT_ENV_WEBSITE_NAME
    }
  },
  computed:{
    loggedIn() {
      return this.$auth.loggedIn
    } 
  },
  methods:{
    async logout(){
      await this.$auth.logout();
      
    }
  }
}
</script>

<style>

</style>