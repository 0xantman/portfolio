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
            selectedItems : [],
            selectedOption : null,
            
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
        action(){
            switch (this.selectedOption) {
                case 'A':
                    this.$axios.post('/admin/user/inbox/action/archive',{
                        data: this.selectedItems
                    }).then( result => {     
                        this.selectedItems = [];
                        this.$emit("action");

                        this.$axios.get('/admin/user/inbox/count').then(resTwo =>{
                            this.$store.commit('notification/updateNews', resTwo.data.unread);
                            this.$store.commit('notification/updateArchive', resTwo.data.read);
                            
                        });
                        

                    }).catch(err =>{
                        console.error(err)
                    });
                    break;
                case 'D':
                    this.$axios.post('/admin/user/inbox/action/delete',{
                        data: this.selectedItems
                    }).then(result => {
                        this.selectedItems = [];
                        this.$emit("action");

                        this.$axios.get('/admin/user/inbox/count').then(resTwo =>{
                            this.$store.commit('notification/updateNews', resTwo.data.unread);
                            this.$store.commit('notification/updateArchive', resTwo.data.read);
                        });

                        

                    }).catch(err =>{
                        console.error(err)
                    });
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