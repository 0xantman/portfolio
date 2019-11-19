<template>
  <div class="container">
    <profile class="mt-5"/>
    <folio class="mt-5" :data-post="post"/>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import Profile from '~/components/Profile.vue'
import Folio from '~/components/Folio.vue'

export default {
  asyncData ({ $axios, $auth, redirect, $emit, store}) {
    return $axios.$get('/admin/user/my-portfolio')
    .then((res) => {
      return{
        post : res.data
      }

    }).catch(async (e) =>{
       console.error(e);
    })
  },
  data(){
    return{
      post: []
    }
  },
  mounted(){
  },
  components: {
    Logo,
    Profile,
    Folio
  }
}
</script>


