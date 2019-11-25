<template>
  <div class="container mt-5">
    <client-only placeholder="Loading...">
        <ValidationObserver ref="observer" v-slot="{ valid }" tag="form" >
                <b-form @submit.prevent="submit()" >

                <ValidationProvider name="photo" rules="required" v-slot="{ errors }">
                        <b-form-group label-for="link-input" label="Photo de votre profile liens:" description="http://google.com" >
                            <b-form-input 
                                id="link-input"
                                v-model="image" 
                                placeholder="http://www.myphotolink.xcom"
                            ></b-form-input>
                            <span class="text-danger small">{{ errors[0] }}</span>
                        </b-form-group>
                    </ValidationProvider>

                <ValidationProvider name="nom complet" rules="required" v-slot="{ errors }">
                        <b-form-group label-for="fullname-input" label="Nom complet:">
                            <b-form-input 
                                id="fullname-input"
                                v-model="fullname"
                            ></b-form-input>
                            <span class="text-danger small">{{ errors[0] }}</span>
                        </b-form-group>
                    </ValidationProvider>
                    
                    <ValidationProvider name="pseudo" rules="required" v-slot="{ errors }">
                        <b-form-group label-for="username-input" label="Pseudo:">
                            <b-form-input 
                                id="username-input"
                                v-model="username"
                            ></b-form-input>
                            <span class="text-danger small">{{ errors[0] }}</span>
                        </b-form-group>
                    </ValidationProvider>

                    <ValidationProvider name="birthday" rules="required" v-slot="{ errors }">
                        <b-form-group label-for="birthday-input" label="Date de naissance:" description="format flexible.">
                            <b-form-input 
                                id="birthday-input"
                                v-model="birthday" 
                                placeholder="05/05/5555"
                            ></b-form-input>
                            <span class="text-danger small">{{ errors[0] }}</span>
                        </b-form-group>
                    </ValidationProvider>

                    <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                        <b-form-group label-for="email-input" label="Adresse email:">
                            <b-form-input 
                                id="email-input"
                                v-model="email" 
                                placeholder="Email"
                            ></b-form-input>
                            <span class="text-danger small">{{ errors[0] }}</span>
                        </b-form-group>
                    </ValidationProvider>

                    <ValidationProvider name="web url" rules="required" v-slot="{ errors }">
                        <b-form-group label-for="url-input" label="Web url:" description="Liens de votre profile Facebook, LinkedIn... Respect this convention <a href='http://google.com'>google</a>">
                            <b-form-input 
                                id="url-input"
                                v-model="website" 
                                placeholder="http://google.com"
                            ></b-form-input>
                            <span class="text-danger small">{{ errors[0] }}</span>
                        </b-form-group>
                    </ValidationProvider>
                    
                    <b-form-group label-for="textarea-input" label="Biographie:">
                        <b-form-textarea
                            id="textarea-input"
                            v-model="biography"
                            placeholder="Ecrire quelque chose sur vous..."
                            rows="3"
                            max-rows="6"
                        ></b-form-textarea>
                    </b-form-group>
            
                    <b-alert variant="success" :show="success">Data success sync !</b-alert>
                    <b-alert :show="error" variant="danger">Error data sync ! </b-alert>

                    <b-button type="submit" variant="primary"  >
                    <span v-if="sending">
                            <b-spinner small type="grow"></b-spinner>
                            In process...
                        </span>
                        <span v-else>
                            Update
                        </span>
                    </b-button>
                </b-form>
            </ValidationObserver>
        </client-only>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import firebase from 'firebase';
export default {
    async asyncData () {
        try {
            const snapshot = await firebase.database().ref('profile/').once('value');
            if(snapshot.exists()){
                const data = snapshot.val();
                return {  
                    email: data.email ,
                    fullname: data.fullname,
                    image: data.image,
                    birthday: data.birthday,
                    username: data.username,
                    website: data.website,
                    biography: data.biography
                }
            }

        } catch (error) {
            console.error(error)
        }
  },
  data(){
      return{
        email: "",
        fullname: "",
        image: "",
        birthday: "",
        username: "",
        website: "",
        biography: "",
        sending: false,
        error: false,
        success: false
      }
  },
  components:{
    ValidationProvider,
    ValidationObserver
  },
  methods:{

        async submit(){
            try {
                const isValid = await this.$refs.observer.validate();
                if (!isValid) {
                    throw new Error("error form required")
                }
                this.sending = true;
                await firebase.database().ref('profile/').set({
                    email : this.email.trim().toLowerCase(),
                    image : this.image,
                    fullname : this.fullname,
                    birthday : this.birthday,
                    biography : this.biography,
                    username : this.username,
                    website : this.website
                })
                this.sending = false;
                this.success = true;
                requestAnimationFrame(() => {
                    this.$refs.observer.reset();
                });
            } catch (error) {
                this.sending = false;
                this.error = true
            }
        
      }
  }
}
</script>

<style>

</style>