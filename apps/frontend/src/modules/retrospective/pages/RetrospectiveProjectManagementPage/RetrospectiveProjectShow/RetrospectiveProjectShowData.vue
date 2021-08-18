<template>
    <v-row>
        <v-col cols="12" sm="6" md="4">
            <v-list>
                 <show-field :value="item.title" :label="$t('retrospective.retrospectiveProject.labels.title')" icon="title"/>
            </v-list>
        </v-col>

        <v-col cols="12" sm="6" md="4">
            <v-list>
                 <show-field :value="item.description" :label="$t('retrospective.retrospectiveProject.labels.description')" icon="description"/>
            </v-list>
        </v-col>

        <v-col cols="12" sm="6" md="4">
            <v-list>
                 <show-field :value="String(item.votesPerUser)" :label="$t('retrospective.retrospectiveProject.labels.votesPerUser')" icon="thumb_up"/>
            </v-list>
        </v-col>

    </v-row>
</template>
<script>
    import {ShowField} from '@dracul/common-frontend'
     
    
    export default {
        name: 'RetrospectiveProjectShowData',
        components: {ShowField},
        
        props: {
            item: {type: Object, required: true}
        }
    }
</script>

