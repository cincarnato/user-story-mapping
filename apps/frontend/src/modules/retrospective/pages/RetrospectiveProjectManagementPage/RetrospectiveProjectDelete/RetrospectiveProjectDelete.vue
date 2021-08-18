<template>
      <crud-delete :open="open"
                 :loading="loading"
                 :title="title"
                 :errorMessage="errorMessage"
                 @delete="remove"
                 @close="$emit('close')"
    >

        <v-card-text>
          <retrospective-project-show-data :item="item" />
        </v-card-text>

        <v-card-text>
            <v-row justify="center">
                <span class="title">{{areYouSure}}</span>
            </v-row>
        </v-card-text>

    </crud-delete>
</template>

<script>
    //Provider  
    import RetrospectiveProjectProvider from "../../../providers/RetrospectiveProjectProvider";
    
    //Show Data
    import RetrospectiveProjectShowData from "../RetrospectiveProjectShow/RetrospectiveProjectShowData";
    
    //Common
    import {CrudDelete, ClientError} from '@dracul/common-frontend'
    
    export default {
        name: "RetrospectiveProjectDelete",
        
        components: {RetrospectiveProjectShowData, CrudDelete},
        
        props: {
          open: {type: Boolean, default: true},
          item: {type: Object, required: true}
        },
        
        data() {
            return {
                modal: false,
                title: 'retrospective.retrospectiveProject.deleting',
                areYouSure: this.$t('common.areYouSureDeleteRecord'),
                errorMessage: '',
                loading: false,
            }
        },
        methods: {
            remove() {
                this.loading = true
                RetrospectiveProjectProvider.deleteRetrospectiveProject(this.item.id).then(result => {
                            if (result.data.retrospectiveProjectDelete.success) {
                                this.$emit('itemDeleted',result.data.retrospectiveProjectDelete)
                                this.$emit('close')
                            }else{
                                this.errorMessage = 'Error on Delete'
                            }
                        }
                    ).catch(error =>{
                        let clientError = new ClientError(error)
                        this.errorMessage = clientError.showMessage
                }).finally(() => this.loading = false)
            },
        },
    }
</script>


