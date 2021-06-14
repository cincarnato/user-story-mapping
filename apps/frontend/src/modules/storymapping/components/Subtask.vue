<template>
    <v-card v-if="subtask">
        <v-text-field v-model="subtask.title">{{subtask.title}}</v-text-field>
    </v-card>
    
</template>

<script>
export default {
    name: 'Subtask',
    props: {
        subtask: Object
    }
    
}
</script>

<style>

</style>