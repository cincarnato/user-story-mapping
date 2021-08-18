<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" class="pa-3">
               <retrospective-project-crud />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import RetrospectiveProjectCrud from "./RetrospectiveProjectCrud";
    export default {
        name: "RetrospectiveProject",
        components: {RetrospectiveProjectCrud}
    }
</script>

<style scoped>

</style>

