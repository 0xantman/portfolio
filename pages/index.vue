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
import firebase from 'firebase';

export default {
  async asyncData () {
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
          post : items
        }
      }
    } catch (error) {
      console.error(error)
    }  
  },
  data(){
    return{
      post: null
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


