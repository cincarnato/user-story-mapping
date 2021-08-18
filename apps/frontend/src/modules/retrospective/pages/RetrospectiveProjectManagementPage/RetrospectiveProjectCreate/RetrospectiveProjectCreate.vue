<template>
    <crud-create :open="open"
                 :loading="loading"
                 :title="title"
                 :errorMessage="errorMessage"
                 @create="create"
                 @close="$emit('close')"
    >
        <retrospective-project-form ref="form" v-model="form" :input-errors="inputErrors" />
    </crud-create>
</template>

<script>

    import RetrospectiveProjectProvider from "../../../providers/RetrospectiveProjectProvider";
    
    import {CrudCreate, ClientError} from '@dracul/common-frontend'
    
    import RetrospectiveProjectForm from "../RetrospectiveProjectForm";
    
    


    export default {
        name: "RetrospectiveProjectCreate",
         
        components: { RetrospectiveProjectForm, CrudCreate },
        
        props:{
          open: {type: Boolean, default: true}
        },
        
        data() {
            return {
                name: 'retrospective.retrospectiveProject.creating',
                errorMessage: '',
                inputErrors: {},
                loading: false,
                form: {
                    title: '',
                    description: '',
                    votesPerUser: null
                }
            }
        },
        
        methods: {
            create() {
                if (this.$refs.form.validate()) {
                    this.loading = true
                    RetrospectiveProjectProvider.createRetrospectiveProject(this.form).then(r => {
                            if (r) {
                                this.$emit('itemCreated',r.data.retrospectiveProjectCreate)
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

