<template>
    <div class="container">
        <b-spinner v-if="loading" label="Spinning"></b-spinner>
        <b-card
            v-else
            :title="fullname"
            :sub-title="birthday"
            :img-src="image"
            img-alt="My profile picture"
            img-top
            tag="article"
            class="mb-2"
        >
            <b-card-text>
                <!-- <h5 class="card-title">{{fullname}}</h5>
                <p class="card-text">{{birthday}}</p> -->
                <p class="card-text" v-html="biography"></p>
                <p class="card-text" v-html="website"></p>
           
            </b-card-text>

        </b-card>
        <!-- <div class="row justify-content-center">
            <b-spinner v-if="loading" label="Spinning"></b-spinner>
            <div v-else class="card mb-3 " style="max-width: 540px;">
                <div class="row">
                    <div class="col-md-4">
                        <img :src="image" class="card-img" alt="">
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">{{fullname}}</h5>
                        <p class="card-text">{{birthday}}</p>
                        <p class="card-text" v-html="biography"></p>
                        <p class="card-text" v-html="website"></p>
                    </div>
                    </div>
                </div>
            </div>
        </div> -->
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