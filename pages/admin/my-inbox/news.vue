<template>
    <Inbox :items="items" @action="reload"/>
</template>

<script>
import Inbox from '~/components/Inbox'
export default {

    asyncData ({ $axios, $auth, redirect, $emit}) {
    return $axios.$get('/admin/user/inbox/news')
    .then((res) => {
      console.log(res.new)
      //$emit('new-notification', res.new.length);
      return {  
        items: res.new,
        inbox: res.inbox,                
            }
    }).catch(async (e) =>{
        await $auth.logout();
        redirect(302, '/login');
    })
  },
    components:{
        Inbox
    },
    methods:{
        reload(){
            this.$axios.get('/admin/user/inbox/news').then(res =>{
                this.items = res.data.new;
                this.inbox = res.data.inbox;
            }).catch(err =>{
                console.log(err)
            });
        }   
    }

}
</script>

<style>

</style>