<template>
    <v-card>
        <v-card-text>
            {{ index + 1 }}
            <v-text-field v-model="activity.title" solo></v-text-field>
            <list-combobox v-model="activity.roles"></list-combobox>
            <div v-if="activity.tasks" >
                <div v-for="(task, i) in activity.tasks" :key="i" >
                    <task :task="task"></task>
                </div>
                <v-col class="flex-grow-0">
                    <v-btn @click="addTask" icon>
                        <v-icon>add</v-icon>
                    </v-btn>
                </v-col>
            </div>
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
            this.activity.tasks.push({ title: "", subtasks: [] });
        },
    },
};
</script>

<style>
</style>