<template>
 <v-row row wrap>

    <v-col cols="12" sm="6" md="4" offset-md="8" offset-sm="6">
        <search-input  @search="performSearch" v-model="search" />
    </v-col>

    <v-col cols="12">
       <v-data-table
                class="mt-3"
                :headers="headers"
                :items="items"
                :search="search"
                :single-expand="false"
                :server-items-length="totalItems"
                :loading="loading"
                :page.sync="pageNumber"
                :items-per-page.sync="itemsPerPage"
                :sort-by.sync="orderBy"
                :sort-desc.sync="orderDesc"
                :footer-props="{ itemsPerPageOptions: [5, 10, 25, 50] }"
                @update:page="fetch"
                @update:sort-by="fetch"
                @update:sort-desc="fetch"
                @update:items-per-page="fetch"
        >
            
            
            <template slot="no-data">
               <div class="text-xs-center" v-t="'common.noData'"></div>
            </template>

            <template slot="loading">
               <div   class="text-xs-center" v-t="'common.loading'"></div>
            </template>

            <!-- <template v-slot:top>
                 <v-dialog v-model="dialog" max-width="500px" >
                    <template v-slot:activator="{ on }">
                        <v-btn @click="$emit('create')" color="primary" class="mb-2" v-on="on">
                           {{ $t('retrospective.retrospectiveProject.create') }} 
                        </v-btn>
                    </template>
                </v-dialog>
            </template> -->

            <template v-slot:item.action="{ item }">
                <show-button  @click="$emit('show', item)" />
                <!-- <edit-button  @click="$emit('update', item)" /> -->
                <router-link :to="{ path: `retrospective-project/${item.id}`}" class="editButton">
                    <edit-button />
                </router-link>
                <delete-button @click="$emit('delete', item)" />
            </template>

        </v-data-table>
    </v-col>
</v-row>
</template>

<script>
   import RetrospectiveProjectProvider from "../../../providers/RetrospectiveProjectProvider";
//    import RetrospectiveProjectCreate from "../RetrospectiveProjectCreate";
//    RetrospectiveProjectCreate
   import {DeleteButton, EditButton, ShowButton, SearchInput} from "@dracul/common-frontend"
    
   
    export default {
        name: "RetrospectiveProjectList",
        components: {DeleteButton, EditButton, ShowButton, SearchInput, },
        
        data() {
            return {
                items: [],
                totalItems: null,
                loading: false,
                orderBy: null,
                orderDesc: false,
                itemsPerPage: 5,
                pageNumber: 1,
                search: '',
                creating: false,
                dialog: false
            }
        },
        computed: {   
          headers () {
            return [
                    //Entity Headers
                    {text: this.$t('retrospective.retrospectiveProject.labels.title'), value: 'title'},
                    {text: this.$t('retrospective.retrospectiveProject.labels.description'), value: 'description'},
                    {text: this.$t('retrospective.retrospectiveProject.labels.votesPerUser'), value: 'votesPerUser'},
                    //Actions
                    {text: this.$t('common.actions'), value: 'action', sortable: false},
                ]
          },
          getOrderBy(){
              return  (Array.isArray(this.orderBy)) ? this.orderBy[0]: this.orderBy
          },
          getOrderDesc(){
              return  (Array.isArray(this.orderDesc)) ? this.orderDesc[0]: this.orderDesc
          } 
        },
        created() {
            this.fetch()
        },
        methods:{
            performSearch(){
                this.pageNumber = 1
                this.fetch()
            },
            fetch() {
                this.loading = true
                RetrospectiveProjectProvider.paginateRetrospectiveProjects(
                    this.pageNumber, 
                    this.itemsPerPage,
                    this.search,
                    this.getOrderBy, 
                    this.getOrderDesc
                ).then(r => {
                    this.items = r.data.retrospectiveProjectPaginate.items
                    this.totalItems = r.data.retrospectiveProjectPaginate.totalItems
                }).catch(err => {
                    console.error(err)
                }).finally(() => this.loading = false)
            },
            create() {
                this.creating = true
            },
        },
        watch: {
            dialog (val) {
                val || this.close()
            },
            dialogDelete (val) {
                val || this.closeDelete()
            },
        },
        
    }
</script>


