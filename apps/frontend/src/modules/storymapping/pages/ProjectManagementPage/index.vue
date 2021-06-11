<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" class="pa-3">
               <project-crud />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import ProjectCrud from "./ProjectCrud";
    export default {
        name: "Project",
        components: {ProjectCrud}
    }
</script>

<style scoped>

</style>

