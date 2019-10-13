<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="card mb-3 " style="max-width: 540px;">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src="https://cdn.webshopapp.com/shops/178694/files/234636382/700x1000x1/marvel-ant-man-marvel-profile.jpg" class="card-img" alt="">
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">{{fullname}}</h5>
                        <p class="card-text">{{birthday}}</p>
                        <p class="card-text" v-html="biography"></p>
                        <a :href="website">{{website}}</a>
                        <!--<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>-->
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            fullname: null,
            birthday: null,
            website: null,
            biography: null,
            username: null
        }
    },
    created(){
        this.$axios.get('/admin/profile').then(response =>{
            console.log(response);
            this.fullname = response.data.profile.fullname;
            this.birthday = response.data.profile.birthday;
            this.biography = response.data.profile.biography;
            this.website = response.data.profile.website;
            this.username = response.data.profile.username;

        }).catch(error =>{
            console.log(error);
        })
    },
    methods:{

    }
}
</script>

<style>

</style>