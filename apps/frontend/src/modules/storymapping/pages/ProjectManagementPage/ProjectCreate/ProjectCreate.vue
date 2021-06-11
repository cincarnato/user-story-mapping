<template>
    <crud-create :open="open"
                 :loading="loading"
                 :title="title"
                 :errorMessage="errorMessage"
                 @create="create"
                 @close="$emit('close')"
    >
        <project-form ref="form" v-model="form" :input-errors="inputErrors" />
    </crud-create>
</template>

<script>

    import ProjectProvider from "../../../providers/ProjectProvider";
    
    import {CrudCreate, ClientError} from '@dracul/common-frontend'
    
    import ProjectForm from "../ProjectForm";
    
    


    export default {
        name: "ProjectCreate",
         
        components: { ProjectForm, CrudCreate },
        
        props:{
          open: {type: Boolean, default: true}
        },
        
        data() {
            return {
                title: 'storymapping.project.creating',
                errorMessage: '',
                inputErrors: {},
                loading: false,
                form: {
                    title: '',
                    description: ''
                }
            }
        },
        
        methods: {
            create() {
                if (this.$refs.form.validate()) {
                    this.loading = true
                    ProjectProvider.createProject(this.form).then(r => {
                            if (r) {
                                this.$emit('itemCreated',r.data.projectCreate)
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

