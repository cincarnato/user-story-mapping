<template>
    <crud-show :title="title" :open="open"  @close="$emit('close')">

        <v-card-text>
            <project-show-data :item="item" />
        </v-card-text>

  </crud-show>
</template>

<script>
    import ProjectShowData from "./ProjectShowData";
    import {CrudShow} from '@dracul/common-frontend'
 
    export default {
        name: "ProjectShow",
        components: {CrudShow, ProjectShowData},
        props: {
            open: {type: Boolean, default: true},
            item: {type: Object, required: true}
        },
        data() {
            return {
                title: 'storymapping.project.showing',
            }
        },
    }
</script>

