<template>
  <Inbox :inbox="inbox" :items="items" :archiveOption="false" @action="reload"/>
</template>

<script>
import Inbox from '~/components/Inbox'
export default {
    asyncData({ $axios, $auth, redirect, $emit}){
        return $axios.$get('/admin/user/inbox/archive')
        .then((res) => {
            
        //$emit('new-notification', res.new.length);
        return {  
                    
            items: res.archive,
            inbox: res.inbox
                       
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
            this.$axios.get('/admin/user/inbox/archive').then(res => {
                this.items = res.data.archive;
                this.inbox = res.data.inbox;
                console.log(res)
            });
        }
    }

}
</script>

<style>

</style>