<template>
<crud-layout :title="title" :subtitle="subtitle">

        <template v-slot:list>
            <retrospective-project-list 
                       ref="list"
                       @create="create"
                       @update="update"
                       @delete="remove"
                       @show="show"
            
            />
        </template>
        
        <add-button @click="create"></add-button>
      
        <retrospective-project-create v-if="creating" 
                        :open="creating"
                        v-on:itemCreated="onItemCreated" 
                        v-on:close="creating=false" 
        />
        
        <retrospective-project-update v-if="updating" 
                        :open="updating"
                        :item="itemToEdit" 
                        v-on:itemUpdated="onItemUpdated" 
                        v-on:close="updating=false" 
        />
          
        <retrospective-project-show v-if="showing" 
                           :open="showing" 
                           :item="itemToShow"  
                           v-on:close="showing=false" 
         />

        <retrospective-project-delete v-if="deleting" 
                         :open="deleting"
                         :item="itemToDelete"  
                         v-on:itemDeleted="onItemDeleted" 
                         v-on:close="deleting=false" 
        />

        <snackbar v-model="flash"/>

</crud-layout>
</template>

<script>
    
    import RetrospectiveProjectCreate from "../RetrospectiveProjectCreate";
    import RetrospectiveProjectUpdate from "../RetrospectiveProjectUpdate";
    import RetrospectiveProjectDelete from "../RetrospectiveProjectDelete";
    import RetrospectiveProjectShow from "../RetrospectiveProjectShow";
    import RetrospectiveProjectList from "../RetrospectiveProjectList";
    
     import {CrudLayout, AddButton, Snackbar} from "@dracul/common-frontend"
     
    export default {
        name: "RetrospectiveProjectCrud",
        components: {
            CrudLayout, AddButton, Snackbar,
            RetrospectiveProjectCreate, 
            RetrospectiveProjectUpdate, 
            RetrospectiveProjectDelete, 
            RetrospectiveProjectShow,
            RetrospectiveProjectList
        },
        data() {
            return {
                title: 'retrospective.retrospectiveProject.title',
                subtitle: 'retrospective.retrospectiveProject.subtitle',
                flash: null,
                creating: false,
                updating: false,
                deleting: false,
                showing: false,
                itemToEdit: null,
                itemToDelete: null,
                itemToShow: null,
            }
        },
        methods: {
            //On
            onItemCreated() {
                this.$refs.list.fetch()
                this.flash= "common.created"
            },
            onItemUpdated() {
                this.$refs.list.fetch()
                this.flash= "common.updated"
            },
            onItemDeleted() {
                this.$refs.list.fetch()
                this.flash= "common.deleted"
            },
            //Open
            create() {
                this.creating = true
            },
            update(item) {
                this.updating = true
                this.itemToEdit = item
            },
            show(item) {
                this.showing = true
                this.itemToShow = item
            },
            remove(item) {
                this.deleting = true
                this.itemToDelete = item
            }
        }
        
    }
</script>


