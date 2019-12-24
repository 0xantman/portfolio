<template>
    <div>
        <client-only placeholder="Loading...">
            <ValidationObserver ref="observer" v-slot="{ valid}" tag="form" >
                <b-form @submit.prevent="submit()" >
                    
                    <ValidationProvider name="content" rules="required" v-slot="{ errors }">
                        <b-form-group label-for="content-input" label="Content:">
                            <tinymce-editor v-model="content" :api-key="env" :init="{plugins: 'wordcount'}" theme = "classic"></tinymce-editor>
                            <span class="text-danger small">{{ errors[0] }}</span>
                        </b-form-group>
                    </ValidationProvider>

                    <ValidationProvider name="date start" rules="required" v-slot="{ errors }">
                        <b-form-group label-for="date-start-input" label="Date start:">
                            <b-form-input 
                                type="date"
                                id="date-start-input"
                                v-model="date_start" 
                                placeholder="01/12/2019"
                            ></b-form-input>
                            <span class="text-danger small">{{ errors[0] }}</span>
                        </b-form-group>
                    </ValidationProvider>

                    <b-form-group label-for="date-end-input" label="Date end:" description="Leave empty if you still working on.">
                        <b-form-input 
                            type="date"
                            id="date-end-input"
                            v-model="date_end" 
                            placeholder="01/12/2019"
                        ></b-form-input>
                    </b-form-group>
                    
                    <b-alert variant="success" :show="success">Update success!</b-alert>
                    <b-alert :show="error" variant="danger">Error update review log error. </b-alert>
                    <b-button type="submit" variant="primary" :disabled="!valid || sending" >
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
        <b-container class="mt-5" >
            <b-row>
                <b-button block @click="deletePost" variant="danger" >
                    <span v-if="sending">
                        <b-spinner small type="grow"></b-spinner>
                        In process...
                    </span>
                    <span v-else>
                        Delete
                    </span>
                </b-button>
            </b-row>
        </b-container>
        
    </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import firebase from 'firebase';
export default {
    async asyncData({redirect, params}){
        try {
            const snapshot = await firebase.database().ref('portfolio/' + params.id).once('value');
            if(snapshot.exists()){
                const data = snapshot.val();
                return{
                    content: data.content,
                    date_start: data.date_start,
                    date_end: data.date_end,
                    id: snapshot.key
                }  
            }
        } catch (error) {
            redirect(404, '/admin/my-portfolio');
        }
    },
    data(){
        return {
            env: process.env.NUXT_ENV_TINYMCE_API,
            content: null,
            date_start: null,
            date_end: null,
            id: null,
            sending: false,
            success: false,
            error: false
        }
    },
    components: {
        'tinymce-editor': Editor, // <- Important part,
        ValidationProvider,
        ValidationObserver
    },
    methods:{
        async deletePost(){
            try {
                this.sending = true;
                await firebase.database().ref('portfolio/' + this.id).remove();
                this.sending = false;
                this.success = true;
                this.content = "";
                this.date_start = "";
                this.date_end = "";
                this.$router.push({ path: "/admin/my-portfolio/"});
            } catch (error) {
                console.error(error);
                this.error = true;
            }
        },
        async submit(){
            try {
                const isValid = await this.$refs.observer.validate();

                if (!isValid) {
                    throw new Error('error form required');
                }

                this.sending = true;
                await firebase.database().ref('portfolio/' + this.id).update({
                    content : this.content,
                    date_start : this.date_start,
                    date_end : this.date_end,
                    date_time : Date.now()
                })
                this.sending = false;
                this.success = true;
                this.content = "";
                this.date_start = "";
                this.date_end = "";

                requestAnimationFrame(() => {
                    this.$refs.observer.reset();
                });
            } catch (error) {
                console.error(error);
                this.sending = false;
                this.error = true;
            }    
        }
    }
}
</script>

<style>

</style>