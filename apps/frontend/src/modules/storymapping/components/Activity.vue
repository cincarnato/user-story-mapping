<template>
    <v-card>
        <v-card-text>
            {{ index + 1 }}
            <v-text-field v-model="activity.title"></v-text-field>
            <list-combobox v-model="activity.roles"></list-combobox>
            <v-row v-if="activity.tasks">
                <v-col v-for="(task, i) in activity.tasks" :key="i">
                    <task :task="task"></task>
                    <!-- <v-text-field v-model="task.title">{{task.title}}</v-text-field> -->
                </v-col>
            </v-row>
            <v-btn @click="addTask">
                <v-icon>add_task</v-icon>
                Agregar tarea
            </v-btn>
            <p>{{ activity.tasks }}</p>
        </v-card-text>
    </v-card>
</template>

<script>
import { ListCombobox } from "@dracul/common-frontend";
import Task from "../components/Task";
export default {
    name: "Activity",
    components: {
        ListCombobox,
        Task,
    },
    props: {
        value: Object,
        index: Number,
    },
    computed: {
        activity: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit("input", val);
            },
        },
    },
    watch: {
        activity: {
            handler(val) {
                this.$emit("input", val);
            },
            deep: true,
        },
    },
    methods: {
        addTask() {
            if (this.activity.tasks === null) {
                this.activity.tasks = [];
            }
            this.activity.tasks.push({ title: "" });
        },
    },
};
</script>

<style lang="">
</style>