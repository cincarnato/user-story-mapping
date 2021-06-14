<template>
    <v-card v-if="task">
        <v-text-field v-model="task.title">{{ task.title }}</v-text-field>

        <v-row v-if="task.subtasks">
            <v-col v-for="(subtask, i) in task.subtasks" :key="i">
                <subtask :subtask="subtask"></subtask>
                <!-- <v-text-field v-model="task.title">{{task.title}}</v-text-field> -->
            </v-col>
        </v-row>
        <v-btn @click="addSubtask">
            <v-icon>playlist_add</v-icon>
            Agregar subtarea
        </v-btn>
        <subtask></subtask>
    </v-card>
</template>

<script>
import Subtask from "../components/Subtask"

export default {
    name: "Task",
    props: {
        task: Object,
    },
    components: {
        Subtask,
    },
    methods: {
        addSubtask() {
            if (this.task.subtasks === null) {
                this.task.subtasks = [];
            }
            this.task.subtasks.push({ title: "" });
        },
    },
};
</script>

<style>
</style>