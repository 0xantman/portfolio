<template>
  <div class="container mt-4">
    <h2>Page de conection</h2>
        <client-only placeholder="Loading...">
            <ValidationObserver ref="observer" v-slot="{ valid, passes}" tag="form" >
                <b-form @submit.prevent="passes(submit)" >
                    <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                        <b-form-group label-for="email-input" label="Email:">
                            <b-form-input 
                                id="email-input"
                                v-model="email" 
                                placeholder="Email"
                            ></b-form-input>
                            <span class="text-danger small">{{ errors[0] }}</span>
                        </b-form-group>
                    </ValidationProvider>
                    <ValidationProvider name="mot de passe" rules="required" v-slot="{ errors }">
                        <b-form-group label-for="password-input" label="Mot de passe:">
                            <b-form-input 
                                id="password-input"
                                v-model="password" 
                                placeholder="*********"
                                type="password"
                            ></b-form-input>
                            <span class="text-danger small">{{ errors[0] }}</span>
                        </b-form-group>
                    </ValidationProvider>
                    <b-alert :show="error" variant="danger">Erreur le mot de passe ou l'identifiant utiliser n'es pas valide. </b-alert>
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
import axios from 'axios'; 
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import firebase from 'firebase';

export default {
    middleware: "guest",
    data(){
        return{
            email: null,
            password: null,
            error: false,
            sending: false
        }
    },
    components:{
        ValidationProvider,
        ValidationObserver
    },
    methods:{
       async submit(){
            try {
                this.sending = true;
                await firebase.auth().signInWithEmailAndPassword(this.email.trim().toLowerCase(), this.password);
                const idToken = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
                this.$auth.setUserToken(idToken);
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

