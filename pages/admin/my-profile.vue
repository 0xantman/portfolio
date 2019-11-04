<template>
  <div class="container mt-5">
    
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
   asyncData ({ $axios, $auth, redirect}) {
    return $axios.$get('/admin/user/profile')
    .then((res) => {
      console.log(res.profile)
      return {  
                email: res.profile.email,
                fullname: res.profile.fullname,
                image: res.profile.image,
                birthday: res.profile.birthday,
                username: res.profile.username,
                website: res.profile.website,
                biography: res.profile.biography,
                sending: false,
                error: false,
                success: false
            }
    }).catch(async (e) =>{
        await $auth.logout();
        redirect(302, '/login');
    })
  },
  components:{
    ValidationProvider,
    ValidationObserver
  },
  methods:{

    async submit(){
        const isValid = await this.$refs.observer.validate();
        if (!isValid) {
           console.error('error form required')
        }
            this.sending = true;
            this.$axios.post('/admin/user/profile/update', {
                email: this.email,
                fullname: this.fullname,
                image: this.image,
                birthday: this.birthday,
                username: this.username,
                website: this.website,
                biography: this.biography
            }).then(response =>{
                this.sending = false;
                //console.log(response)
                if(!response.data.err){
                    this.success = true;
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