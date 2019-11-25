<template>
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
                
                <b-alert variant="success" :show="success">New item added in your portfolio!</b-alert>
                <b-alert :show="error" variant="danger">Error items was not added please retry or review log error. </b-alert>
                <b-button type="submit" variant="primary" :disabled="!valid || sending" >
                    <span v-if="sending">
                        <b-spinner small type="grow"></b-spinner>
                        In process...
                    </span>
                    <span v-else>
                        Send
                    </span>
                </b-button>
            </b-form>
        </ValidationObserver>
    </client-only>   
</template>

<script>
import Editor from '@tinymce/tinymce-vue';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import firebase from 'firebase';
export default {
    data(){
        return {
            env: process.env.TINYMCE_API,
            content: "",
            date_start: "",
            date_end : "",
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
        
        async submit(){
            try {
                const isValid = await this.$refs.observer.validate();

                if (!isValid) {
                throw new Error('error form required')
                }

                this.sending = true;    

                await firebase.database().ref('portfolio/').push({
                    content : this.content,
                    date_start : this.date_start,
                    date_end : this.date_end,
                    date_time : Date.now()
                }, (err) =>{
                    if(err){
                        throw new Error(err);
                    }else{
                        this.sending = false;
                        this.success = true;
                        this.content = "";
                        this.date_start = "";
                        this.date_end = "";
                    }
                });

                requestAnimationFrame(() => {
                    this.$refs.observer.reset();
                });
            } catch (error) {
                this.sending = false;
                this.error = true;
            }
        }
    }
}
</script>

<style>

</style>