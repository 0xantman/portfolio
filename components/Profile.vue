<template>
    <div class="container">
        <div class="row justify-content-center">
            <b-spinner v-if="loading" label="Spinning"></b-spinner>
            <div v-else class="card mb-3 " style="max-width: 540px;">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img :src="image" class="card-img" alt="">
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">{{fullname}}</h5>
                        <p class="card-text">{{birthday}}</p>
                        <p class="card-text" v-html="biography"></p>
                        <p class="card-text" v-html="website"></p>
                        <!--<a :href="website">{{website}}</a>-->
                        <!--<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>-->
                    </div>
                    </div>
                </div>
            </div>
        </div>
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