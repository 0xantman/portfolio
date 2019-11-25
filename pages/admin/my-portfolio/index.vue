<template>
  <b-container v-if="posts">
      <client-only placeholder="Loading...">
        <div class="card mb-3" v-for="(post, index) in posts" :key="index">
                <div class="card-body">
                    <p class="card-text" v-html="post.content"></p>
                    <p class="card-text"><small class="text-muted">Last updated {{post.date_time | moment("dddd, MMMM Do YYYY, HH:mm")}}</small></p>
                    <b-button :to="'/admin/my-portfolio/' + post.id" variant="primary">Edit</b-button> 
                </div>
            </div>
        </client-only>
  </b-container>
</template>

<script>
import firebase from 'firebase';
export default {
    async asyncData(){
        try {
            const snapshot = await firebase.database().ref('portfolio/').once('value');
            if(snapshot.exists()){
                const items = [];
                snapshot.forEach(el => {
                    const data = el.val();
                
                    const json = {
                        content : data.content,
                        date_start : data.date_start,
                        date_end : data.date_end,
                        date_time : data.date_time,
                        id : el.key
                    }
                    items.push(json);
                    
                })
                
                return {
                    posts : items
                }
            
            }
        } catch (error) {
            console.error(error);
        }
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