<template>
    <v-card>
        <v-card-text>
            {{ index + 1 }}
            <v-text-field v-model="activity.title" placeholder="Actividad" solo class="activity"></v-text-field>
            <!-- <list-combobox v-model="activity.roles" class="mb-4"></list-combobox> -->
            <div v-if="activity.tasks" class="activities">
                <div v-for="(task, i) in activity.tasks" :key="i" >
                    <task :task="task"></task>
                </div>
                <v-btn @click="addTask" class="mt-1" fab dark small color="green accent-4">
                    <v-icon>add</v-icon>
                </v-btn>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
/* import { ListCombobox } from "@dracul/common-frontend"; */
import Task from "../components/Task";
export default {
    name: "Activity",
    components: {
        /* ListCombobox, */
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

<style scoped>
.activities {
    display: flex;
    flex-direction: row;
}
.activity {
    border: 1px lightskyblue solid;
    border-left-width: 10px;
    margin-bottom: 12px;
}
</style>