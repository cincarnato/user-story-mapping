<template>
    <v-card v-if="task">
        <v-text-field v-model="task.title">{{task.title}}</v-text-field>
    </v-card>
</template>

<script>
export default {
    name: 'Task',
    props: {
        task: Object
    }
}
</script>

<style>
    
</style>