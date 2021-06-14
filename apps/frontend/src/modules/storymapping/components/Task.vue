<template>
    <div v-if="task" class="contenedor">
        <v-text-field v-model="task.title" placeholder="Tarea" solo class="task">{{ task.title }}</v-text-field>

        <v-row v-if="task.subtasks" class="flex-column">
            <v-col
                v-for="(subtask, i) in task.subtasks"
                :key="i"
                style="padding: 12px 12px 0"
            >
                <subtask :subtask="subtask"></subtask>
            </v-col>
        </v-row>

        <v-btn @click="addSubtask" class="mt-3" fab dark small color="blue-grey lighten-1">
            <v-icon style="padding-left: 4px">playlist_add</v-icon>
        </v-btn>
        <subtask></subtask>
    </div>
</template>

<script>
import Subtask from "../components/Subtask";

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

<style scoped>
.contenedor {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.task {
    border: 1px #00E676 solid;
    border-left-width: 8px;
    margin: 0 20px 0 0;
}
</style>