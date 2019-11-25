<template>
    <div class="container mt-4">
        <h2>Page de contact</h2>
        <client-only placeholder="Loading...">
            <ValidationObserver ref="observer" v-slot="{ valid}" tag="form" >
                <b-form @submit.prevent="submit()" >
                    <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                        <b-form-group label-for="email-input" label="Adresse email:" description="Nous ne partagerons jamais votre email avec qui que ce soit.">
                            <b-form-input 
                                id="email-input"
                                v-model="email" 
                                placeholder="Email"
                            ></b-form-input>
                            <span class="text-danger small">{{ errors[0] }}</span>
                        </b-form-group>
                    </ValidationProvider>
                    <ValidationProvider name="sujet" rules="required" v-slot="{ errors }">
                        <b-form-group label-for="subject-input" label="Sujet:">
                            <b-form-input 
                                id="subject-input"
                                v-model="subject" 
                                placeholder="Sujet"
                            ></b-form-input>
                            <span class="text-danger small">{{ errors[0] }}</span>
                        </b-form-group>
                    </ValidationProvider>
                    <ValidationProvider name="message" rules="required|min:100" v-slot="{ errors }">
                        <b-form-group label-for="textarea-input" label="Message:">
                            <b-form-textarea
                                id="textarea-input"
                                v-model="message"
                                placeholder="Ecrire quelque chose..."
                                rows="3"
                                max-rows="6"
                            ></b-form-textarea>
                            <span class="text-danger small">{{ errors[0] }}</span>
                        </b-form-group>
                    </ValidationProvider>
                    <b-alert variant="success" :show="success">Votre message a été envoyé avec succès!</b-alert>
                    <b-alert :show="error" variant="danger">Erreur lors de l'envoie du message </b-alert>
                    <b-button type="submit" variant="primary" :disabled="!valid || sending" >
                    <span v-if="sending">
                            <b-spinner small type="grow"></b-spinner>
                            En cours...
                        </span>
                        <span v-else>
                            Envoyer
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
    data(){
     return{
         email : null,
         subject: null,
         message: null,
         sending: false,
         success: false,
         error: false,
  
     }
    },
    components:{
        ValidationProvider,
        ValidationObserver
    },
    mounted(){
     
    },
    methods: {

      async submit(){
          try {
            const isValid = await this.$refs.observer.validate();
            if (!isValid) {
                throw new Error("error form required")
            }
            this.sending = true;
            await firebase.database().ref('inboxes/').push({
                email : this.email,
                subject : this.subject,
                message : this.message,
                read : false,
                archive : false,
                date_time : Date.now()
            }, (err) =>{
                if(err){
                    this.sending = false;
                    this.error = true
                }else{
                    this.sending = false;
                    this.success = true;
                    this.email = '';
                    this.sujet = '';
                    this.message = '';
                }
            });
    
            requestAnimationFrame(() => {
                this.$refs.observer.reset();
            });

          } catch (error) {
              console.error(error)
          }
      }
    }
}
</script>

