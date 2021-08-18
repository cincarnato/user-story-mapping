<template>
        <crud-update :open="open"
                 :loading="loading"
                 :title="title"
                 :errorMessage="errorMessage"
                 @update="update"
                 @close="$emit('close')"
    >
         <retrospective-project-form ref="form" v-model="form" :input-errors="inputErrors" />
    </crud-update>
</template>

<script>

    import RetrospectiveProjectProvider from "../../../providers/RetrospectiveProjectProvider";
    
    import {CrudUpdate, ClientError} from '@dracul/common-frontend'
    
    import RetrospectiveProjectForm from "../RetrospectiveProjectForm";
  
    

    export default {
        name: "RetrospectiveProjectUpdate",
        
        components: { RetrospectiveProjectForm, CrudUpdate },
        
        props:{
          open: {type: Boolean, default: true},
          item: {type: Object, required: true}
        },

        data() {
            return {
                title: 'retrospective.retrospectiveProject.editing',
                errorMessage: '',
                inputErrors: {},
                loading: false,
                form: {
                    id: this.item.id,
                    title: this.item.title,
                    description: this.item.description,
                    votesPerUser: this.item.votesPerUser
                }
            }
        },
        methods: {
            update() {
                if (this.$refs.form.validate()) {
                    this.loading = true
                    RetrospectiveProjectProvider.updateRetrospectiveProject(this.form).then(r => {
                            if (r) {
                                this.$emit('itemUpdated',r.data.retrospectiveProjectUpdate)
                                this.$emit('close')
                            }
                        }
                    ).catch(error => {
                         let clientError = new ClientError(error)
                         this.inputErrors = clientError.inputErrors
                         this.errorMessage = clientError.i18nMessage
                    }).finally(() => this.loading = false)
                }

            }
        },
    }
</script>

<style scoped>

</style>

