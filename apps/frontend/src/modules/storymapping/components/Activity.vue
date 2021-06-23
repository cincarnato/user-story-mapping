<template>
    <!-- <v-card style="min-width: 700px, width:auto"> -->
    <v-card-text class="px-1">
        <v-row
            class="d-flex justify-center align-center"
            @mouseenter="hover = true"
            @mouseleave="hover = false"
            style="position: relative"
        >
            <v-text-field
                v-model="activity.title"
                placeholder="Actividad"
                solo
                full-width
                class="activity"
            >
            </v-text-field>

            <v-btn
                v-if="hover"
                @click="deleteActivity"
                icon
                absolute
                right
                top
                small
                color="#87cefa"
            >
                <v-icon>delete</v-icon>
            </v-btn>
        </v-row>

        <!-- <list-combobox v-model="activity.roles" class="mb-4"></list-combobox> -->
        <div v-if="activity.tasks" class="d-flex flex-row">
            <draggable
                :list="activity.tasks"
                @start="startDragging"
                @end="endDragging"
            >
                <transition-group class="row" style="flex-wrap: nowrap">
                    <div v-for="(task, i) in activity.tasks" :key="i">
                        <task
                            :task="task"
                            :index="i"
                            @deleteTask="deleteTask"
                            @startDrag="$emit('startDrag')"
                            @endDrag="$emit('endDrag')"
                        >
                        </task>
                    </div>
                </transition-group>
            </draggable>

            <v-btn
                @click="addTask"
                class="mt-1 ml-6"
                fab
                dark
                small
                color="green accent-4"
            >
                <v-icon>add</v-icon>
            </v-btn>
        </div>
    </v-card-text>
    <!-- </v-card> -->
</template>

<script>
/* import { ListCombobox } from "@dracul/common-frontend"; */
import Task from "../components/Task";
import Draggable from "vuedraggable";

export default {
    name: "Activity",
    components: {
        /* ListCombobox, */
        Task,
        Draggable,
    },
    data() {
        return {
            hover: false,
        };
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
        checkTitleExist() {
            return this.activity.title != "" ? true : false;
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
        deleteActivity() {
            this.$emit("deleteActivity", this.index);
        },
        startDragging() {
            this.$emit("startDrag");
        },
        endDragging() {
            this.$emit("endDrag");
        },
        addTask() {
            if (this.activity.tasks === null) {
                this.activity.tasks = [];
            }
            this.activity.tasks.push({ title: "", subtasks: [] });
        },
        deleteTask(i) {
            this.activity.tasks.splice(i, 1);
        },
    },
};
</script>

<style scoped>
.activity {
    min-width: 236px;
    border: 1px rgb(135, 206, 250) solid;
    border-left-width: 10px;
    margin: 0px 4px 10px 12px;
    text-align: start;
    vertical-align: top;
}
</style>
