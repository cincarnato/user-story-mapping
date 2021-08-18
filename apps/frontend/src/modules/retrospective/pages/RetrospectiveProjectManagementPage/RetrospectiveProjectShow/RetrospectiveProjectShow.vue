<template>
    <crud-show :title="title" :open="open"  @close="$emit('close')">

        <v-card-text>
            <retrospective-project-show-data :item="item" />
        </v-card-text>

  </crud-show>
</template>

<script>
    import RetrospectiveProjectShowData from "./RetrospectiveProjectShowData";
    import {CrudShow} from '@dracul/common-frontend'
 
    export default {
        name: "RetrospectiveProjectShow",
        components: {CrudShow, RetrospectiveProjectShowData},
        props: {
            open: {type: Boolean, default: true},
            item: {type: Object, required: true}
        },
        data() {
            return {
                title: 'retrospective.retrospectiveProject.showing',
            }
        },
    }
</script>

