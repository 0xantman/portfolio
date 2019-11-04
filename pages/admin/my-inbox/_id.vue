<template>
  <div>
     <b-card :title="post.subject" :sub-title="post.email" >
      <b-card-text >
        {{post.message}}
      </b-card-text>
      <b-card-text>
        <small class="text-muted">{{post.date_time}}</small>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  asyncData({ $axios, $auth, redirect, $emit, store, params}){
    console.log(params.id);
    return $axios.$get('/admin/user/my-inbox/'+params.id).then(res =>{
      return{
        post : res.message
      }
    }).catch(async (e) =>{
        await $auth.logout();
        redirect(302, '/login');
    })
  },
  mounted(){
    this.$axios.get('/admin/user/inbox/count').then(resTwo =>{
        this.$store.commit('notification/updateNews', resTwo.data.unread);
        this.$store.commit('notification/updateArchive', resTwo.data.read);
        
    });
  }
}
</script>

<style>

</style>