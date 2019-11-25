<template>
  <b-container  class="mt-5">
    <b-row>
      <b-col>
        <b-nav pills vertical >
          <NuxtLink class="nav-link" to="/admin/my-inbox/news">
                   News <b-badge variant="light">{{news}}</b-badge>
            </NuxtLink>
            <NuxtLink class="nav-link" to="/admin/my-inbox/archive">
                  Archive <b-badge variant="light">{{archive}}</b-badge>
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
import { mapMutations } from 'vuex';
import firebase from 'firebase';
export default {

  async asyncData ({ $axios, $auth, redirect, $emit, store}) {
    try {
      const snapshot = await firebase.database().ref('inboxes/').once('value');
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
          store.commit('notification/updateNews', unreadCount);
          store.commit('notification/updateArchive', readCount);
      }
    } catch (error) {
      console.error(error)
    }
  },
  computed: {
    news () {
      return this.$store.state.notification.news
    },
    archive () {
      return this.$store.state.notification.archive
    }
  }
}
</script>

<style>

</style>