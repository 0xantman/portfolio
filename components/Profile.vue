<template>
    <div class="container">
        <b-spinner v-if="loading" label="Spinning"></b-spinner>
        <b-card
            v-else
            no-body
            tag="article"
            class="mb-2"
        >
            <b-row no-gutters>
                <b-col md="6" >
                    <b-card-img :src="image" class="rounded-0" img-alt="My profile picture" ></b-card-img>
                </b-col>
                <b-col md="6">
                    <b-card-body :title="fullname" :sub-title="birthday">
                        <b-card-text>
                            <p class="card-text" v-html="biography"></p>
                            <p class="card-text" v-html="website"></p>
                        </b-card-text>
                    </b-card-body>
                </b-col>
            </b-row>
        </b-card>
    </div>
</template>

<script>
import firebase from 'firebase';
export default {
    data(){
        return{
            fullname: null,
            birthday: null,
            website: null,
            biography: null,
            username: null,
            image : null,
            loading: true
        }
    },
    created(){
        this.profile();
    },
    methods:{
        async profile (){
            try {
                const snapshot = await firebase.database().ref('profile/').once('value');
                if(snapshot.exists()){

                    const data = snapshot.val();

                    this.fullname = data.fullname;
                    this.birthday = data.birthday;
                    this.biography = data.biography;
                    this.website = data.website;
                    this.username = data.username;
                    this.image = data.image;
                }
                this.loading = false;

            } catch (error) {
                console.error(error)
            }
        }
    }
}
</script>

<style>

</style>