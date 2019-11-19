<template>
  <b-container v-if="posts">
      <div class="card mb-3" v-for="(post, index) in posts" :key="index">
            <div class="card-body">
                <p class="card-text" v-html="post.content"></p>
                <p class="card-text"><small class="text-muted">Last updated {{post.date_time | moment("dddd, MMMM Do YYYY, HH:mm")}}</small></p>
                <b-button :to="'/admin/my-portfolio/' + post.id" variant="primary">Edit</b-button> 
            </div>
        </div>
  </b-container>
</template>

<script>
export default {
    asyncData({ $axios, $auth, redirect, $emit}){
        return $axios.$get('/admin/user/my-portfolio')
        .then((res) => {
        //console.log(res.new.length)
        //$emit('new-notification', res.new.length)
        return {
            posts : res.data
        }

        }).catch(async (e) =>{
            console.log(e);
            //await $auth.logout();
            //redirect(302, '/login');
        })
    },
    data(){
        return{
            posts: []
        }
    }
}
</script>

<style>

</style>