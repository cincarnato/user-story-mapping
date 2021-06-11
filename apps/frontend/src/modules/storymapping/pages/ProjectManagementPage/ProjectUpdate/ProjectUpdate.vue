<template>
        <crud-update :open="open"
                 :loading="loading"
                 :title="title"
                 :errorMessage="errorMessage"
                 @update="update"
                 @close="$emit('close')"
    >
         <project-form ref="form" v-model="form" :input-errors="inputErrors" />
    </crud-update>
</template>

<script>

    import ProjectProvider from "../../../providers/ProjectProvider";
    
    import {CrudUpdate, ClientError} from '@dracul/common-frontend'
    
    import ProjectForm from "../ProjectForm";
  
    

    export default {
        name: "ProjectUpdate",
        
        components: { ProjectForm, CrudUpdate },
        
        props:{
          open: {type: Boolean, default: true},
          item: {type: Object, required: true}
        },

        data() {
            return {
                title: 'storymapping.project.editing',
                errorMessage: '',
                inputErrors: {},
                loading: false,
                form: {
                     id: this.item.id,
                    title: this.item.title,
                    description: this.item.description
                }
            }
        },
        methods: {
            update() {
                if (this.$refs.form.validate()) {
                    this.loading = true
                    ProjectProvider.updateProject(this.form).then(r => {
                            if (r) {
                                this.$emit('itemUpdated',r.data.projectUpdate)
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

