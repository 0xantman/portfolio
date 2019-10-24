<template>
  <b-container  class="mt-5">
    <b-row>
      <b-col>
        <b-nav pills vertical >
          <NuxtLink class="nav-link" to="/admin/my-inbox/news">
                   News <b-badge variant="light">{{news}}</b-badge>
            </NuxtLink>
            <NuxtLink class="nav-link" to="/admin/my-inbox/archive">
                  Archive
            </NuxtLink>
        </b-nav>
      </b-col>
      <b-col cols="10">
        <nuxt-child/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  /*asyncData ({ $axios, $auth, redirect, $emit}) {
    return $axios.$get('/admin/user/inbox/count')
    .then((res) => {
      //GET THE COUNT FOR NOTIFICATION NUMBERS.
      //console.log(res.new.length)
      //$emit('new-notification', res.new.length);
      return {  
              news: 2,
              archive: 0     
            }
    }).catch(async (e) =>{
        await $auth.logout();
        redirect(302, '/login');
    })
  },*/
}
</script>

<style>

</style>