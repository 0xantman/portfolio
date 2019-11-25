<template>
  <Inbox :items="items" :archiveOption="false" @action="reload"/>
</template>

<script>
import Inbox from '~/components/Inbox';
import firebase from 'firebase';
export default {
    async asyncData({ $axios, $auth, redirect, $emit}){

        try {
            const snapshot = await firebase.database().ref('inboxes/').once('value');
            if(snapshot.exists()){
            
                const news = [];
            
                snapshot.forEach(el => {
                    const data = el.val();
                    if(data.archive){
                        const json = {
                            date: data.date_time,
                            email: data.email,
                            subject: data.subject,
                            unread: data.read,
                            id: el.key
                        }
                        news.push(json);
                    }
                })
                return {  
                    items: news,
                    inbox: true                
                    }
            }
        } catch (error) {
            console.error(error)
        }
    },
    data(){
        return{
            items: [],
            inbox: false
        }
    },
    components:{
        Inbox
    },
    methods:{
        async reload(){
            try {
                const snapshot = await firebase.database().ref('inboxes/').once('value');
                if(snapshot.exists()){
                
                    const news = [];
                
                    snapshot.forEach(el => {
                        const data = el.val();
                        if(data.archive){
                            const json = {
                                date: data.date_time,
                                email: data.email,
                                subject: data.subject,
                                unread: data.read,
                                id: el.key
                            }
                            news.push(json);
                        }
                    })
                    this.items = news;
                    this.inbox = true
                }
            } catch (error) {
                this.inbox = false
                console.error(error)
            }
        }
    }

}
</script>

<style>

</style>