<template>
    <v-card v-if="task">
        <v-text-field v-model="task.title">{{task.title}}</v-text-field>
        <subtask></subtask>
    </v-card>
</template>

<script>
import Subtask from '../components/Subtask'

export default {
    name: 'Task',
    props: {
        task: Object
    },
    components: {
        Subtask
    }
}
</script>

<style>
    
</style>