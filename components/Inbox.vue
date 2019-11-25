<template>
  <div>
        <b-card border-variant="light" header="Select rows to edit action">
            <b-card-text>
                <b-form-select  v-model="selectedOption" :options="options" ></b-form-select>
            </b-card-text>
            <b-button @click="action" block :disabled="!selectedOption || selectedItems.length <= 0" v-if="selectedOption" class="mt-2" :variant=" (selectedOption == 'A') ? 'primary' : 'danger'"> <span v-if="selectedOption == 'A'"> Archive {{selectedItems.length}} item(s)</span> <span v-else>Delete {{selectedItems.length}} item(s)</span></b-button>
        </b-card>
        <b-table v-if="items.length != 0" striped hover :items="items" :busy="isBusy" :fields="fields" selectable  @row-selected="onRowSelected">
            <template v-slot:table-busy>
                <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                </div>
            </template>
            <template v-slot:cell(selected)="{ rowSelected }">
                
                <template v-if="rowSelected">
                    <span aria-hidden="true">&check;</span>
                    <span class="sr-only">Selected</span>
                </template>
                <template v-else>
                    <span aria-hidden="true">&nbsp;</span>
                    <span class="sr-only">Not selected</span>
                </template>
            </template>
            <template v-slot:cell(date)="row" >
                {{row.item.date | moment("dddd, MMMM Do YYYY, HH:mm")}}
            </template>
           
            <template v-slot:cell(show_details)="row" >
                <b-container>
                    <b-badge pill variant="primary" v-if="!row.item.unread">New</b-badge>
                </b-container>
                
                <NuxtLink class="nav-link" :to="'/admin/my-inbox/' + row.item.id" >
                    View
                </NuxtLink>
            </template>

            <!-- <template v-slot:cell(edit)="row" > 
                
                <Action :row-id="row.item.id"  /> 
            
            </template> -->
            
            <!--<template v-slot:custom-foot="data">
                <b-tr>
                    <b-th></b-th>
                    <b-th></b-th>
                    <b-th class="d-flex justify-content-end"><b-button variant="success">Update</b-button></b-th>
                </b-tr>
                
            </template>-->
        </b-table>
        <div v-else>
             <b-alert show variant="warning">There is no news today.</b-alert>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase';
import { mapMutations } from 'vuex';
export default {
    props:{
        items:{
            type: Array
        },
        archiveOption:{
            type: Boolean,
            default: true
        }
    },
    data(){
        return{
            fields: ['selected', 'date', 'email', 'subject',  'show_details'/*, 'edit'*/],
            isBusy: false,
            selectedItems: [],
            selectedOption: null,
            archiveCount: null,
            newsCount: null

        }
    },
    watch:{
        archiveCount(){
            this.$store.commit('notification/updateNews', this.archiveCount);
        },
        newsCount(){
            this.$store.commit('notification/updateArchive', this.newsCount);
        }
    },
    computed:{
        options(){
            if(this.archiveOption){
                return [
                    { value: null, text: 'Please select an option' },
                    { value: "A" , text: 'Archive' },
                    { value: "D" , text: 'Delete' }
                ]
            }else{
                return [
                    { value: null, text: 'Please select an option' },
                    { value: "D" , text: 'Delete' }
                ]
            }
            
        }
    },
    methods:{
        onRowSelected(items){          
            this.selectedItems = items;
        },
        reload(){
            this.selectedItems = [];
            this.$emit("action");
            firebase.database().ref('inboxes/').once('value', snapshot =>{
                console.log(snapshot);
                if(snapshot.exists()){
                    let unreadCount = 0;
                    let readCount = 0;
                    
                    snapshot.forEach(el => {
                        const data = el.val();
                        
                        if(!data.read && data.archive){
                            readCount++
                        }
                        else if(!data.read && !data.archive){
                            unreadCount++;
                        }
                    })

                    this.newsCount = readCount;
                    this.archiveCount = unreadCount;
                    
                }                
            });
        
        },
        action(){
            switch (this.selectedOption) {
                case 'A':

                    try {
                        this.selectedItems.forEach(async element => {
                            await firebase.database().ref('inboxes/' + element.id).update({
                                archive : true
                            })
                        })

                        this.reload();
                    } catch (error) {
                        console.error(error);
                    }

                    break;
                case 'D':

                    try {
                        this.selectedItems.forEach(async element => {
                            await firebase.database().ref('inboxes/' + element.id).remove()
                        })

                        this.reload();
                    } catch (error) {
                        console.error(error);
                    }
                    break;
                default:
                    break;
            }
        }
    }
}
</script>

<style>

</style>