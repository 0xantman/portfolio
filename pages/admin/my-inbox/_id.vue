<template>
  <div>
     <b-card :title="post.subject" :sub-title="post.email" >
      <b-card-text >
        {{post.message}}
      </b-card-text>
      <b-card-text>
        <small class="text-muted">{{post.date_time | moment("dddd, MMMM Do YYYY, HH:mm")}}</small>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import firebase from 'firebase';
export default {
  async asyncData({ $axios, $auth, redirect, $emit, store, params}){
    try {
      const ref = firebase.database().ref('inboxes/' + params.id);
      await ref.update({read : true});
      const snapshot = await ref.once('value');
      if(snapshot) {
            if(snapshot.exists()){
                const data = snapshot.val();
                return{
                  post : data
                }
            }
        }
    } catch (error) {
      console.error(error);
    }
  },
  data(){
    return{
      newsCount : null,
      archiveCount : null
    }
  },
  watch:{
    newsCount(){
      this.$store.commit('notification/updateArchive', this.newsCount);
    },
    archiveCount(){
      this.$store.commit('notification/updateNews', this.archiveCount);
    }
  },
  methods:{
    reload(){
        firebase.database().ref('inboxes/').once('value', snapshot =>{
            if(snapshot.exists()){
                let unreadCount = 0;
                let readCount = 0;
                
                snapshot.forEach(el => {
                    const data = el.val();
                    
                    if(!data.read && data.archive){
                        readCount++
                    }
                    else if(!data.read && !data.archive){
                        unreadCount++;
                    }
                })

                this.newsCount = readCount;
                this.archiveCount = unreadCount;  
            }                
        });
    }
  },
  mounted(){
    this.reload();
  }
}
</script>

<style>

</style>