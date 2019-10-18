<template>
  <div class="container mt-5">
    
    <ValidationObserver ref="observer" v-slot="{ valid}" tag="form" >
            <b-form @submit.prevent="submit()" >

              <ValidationProvider name="photo" rules="required" v-slot="{ errors }">
                    <b-form-group label-for="link-input" label="Photo de votre profile liens:" >
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

                <ValidationProvider name="birthday" rules="required" v-slot="{ errors }">
                    <b-form-group label-for="birthday-input" label="Date de naissance:" description="format flexible.">
                        <b-form-input 
                            id="birthday-input"
                            v-model="email" 
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

                <ValidationProvider name="sujet" rules="required" v-slot="{ errors }">
                    <b-form-group label-for="url-input" label="Web url:" description="Liens de votre profile Facebook, LinkedIn...">
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
                        placeholder="Ecrire quelque chose..."
                        rows="3"
                        max-rows="6"
                    ></b-form-textarea>
                </b-form-group>
           
                <b-alert variant="success" :show="success">Votre message a été envoyé avec succès!</b-alert>
                <b-alert :show="error" variant="danger">Erreur lors de l'envoie du message contacter moi directement megalima@hotmail.com </b-alert>

                <b-button type="submit" variant="primary"  >
                  <span v-if="sending">
                        <b-spinner small type="grow"></b-spinner>
                        En cours...
                    </span>
                    <span v-else>
                        Actualiser
                    </span>
                </b-button>
            </b-form>
        </ValidationObserver>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
export default {
    /*data(){
        return{
            email: null,
            fullname: null,
            image: null,
            birthday: null,
            username: null,
            website: null,
            biography: null
        }
    },*/
   asyncData ({ $axios }) {
    return $axios.$get('/admin/user')
    .then((res) => {
      console.log(res.profile)
      return {  
                email: res.profile.email,
                fullname: res.profile.fullname,
                image: res.profile.image,
                birthday: res.profile.birthday,
                username: res.profile.username,
                website: res.profile.website,
                biography: res.profile.biography
            }
      //return { title: res.data.title }
    })
  },
  /*async asyncData ({ $axios }) {
    let {data}  = await $axios.$get('/admin/profile')
    console.log(data)
    //return { title: data.fullname }
  },*/
  components:{
    ValidationProvider,
    ValidationObserver
  },
  /*mounted(){
    this.$axios.get('/admin/profile').then(res =>{
      console.log(res)
    })
  },*/
  methods:{

    async submit(){
        const isValid = await this.$refs.observer.validate();
        if (!isValid) {
           console.error('error form required')
        }
         this.sending = true;

            this.$axios.post('/api', {
                email: this.email,
                subject: this.sujet,
                message: this.message
            }).then(response =>{
                this.sending = false;
                console.log(response)
                if(!response.data.err){
                    this.success = true;
                    this.email = '';
                    this.sujet = '';
                    this.message = '';
                }else{
                    this.error = true
                }
            }).catch(err =>{
                this.sending = false;
                this.error = true
            })
    
        requestAnimationFrame(() => {
            this.$refs.observer.reset();
        });

        
      }
  }
}
</script>

<style>

</style>