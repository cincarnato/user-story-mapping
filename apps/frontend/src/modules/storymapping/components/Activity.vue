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
                <div v-if="hover" class="buttonsContainer">
                    <div class="buttons">
                        <v-btn icon @click="deleteActivity" x-small>
                            <v-icon>delete</v-icon>
                        </v-btn>
                        <v-btn icon @click="addActivity" x-small>
                            <v-icon>add</v-icon>
                        </v-btn>
                    </div>
                    <div class="buttons">
                        <v-btn icon @click="deleteAllTasks" x-small>
                            <v-icon>delete</v-icon>
                        </v-btn>
                        <v-btn icon @click="addTaskToEnd" x-small>
                            <v-icon>add</v-icon>
                        </v-btn>
                    </div>
                </div>
                <!-- <div @click="addActivity" class="button ml-1 mb-3"><p>+</p></div> -->
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
                                @addTask="addTask"
                                @deleteTask="deleteTask"
                                @startDrag="$emit('startDrag')"
                                @endDrag="$emit('endDrag')"
                            >
                            </task>
                        </div>
                    </transition-group>
                </draggable>

                <!-- <v-btn
                    @click="addTaskToEnd"
                    class="mt-1 ml-5"
                    fab
                    dark
                    small
                    color="green accent-4"
                >
                    <v-icon>add</v-icon>
                </v-btn> -->
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
            myArray: ["manzana", "banana", "pera"],
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
        addTask(i) {
            if (this.activity.tasks === null) {
                this.activity.tasks = [];
            }
            this.activity.tasks.splice(i+1, 0, { title: "", subtasks: [] });
        },
        addTaskToEnd() {
            if (this.activity.tasks === null) {
                this.activity.tasks = [];
            }
            this.activity.tasks.push({ title: "", subtasks: [] });
        },
        cleanInput() {
            this.activity.title = "";
        },
        deleteAllTasks() {
            this.activity.tasks = [] 
        },
        deleteTask(i) {
            this.activity.tasks.splice(i, 1);
        },
        addActivity() {
            this.$emit("addActivity", this.index);
        },
        deleteActivity() {
            this.$emit("deleteActivity", this.index);
        },
        startDragging() {
            this.$emit("startDrag");
        },
        endDragging() {
            this.$emit("endDrag");
        },
    },
};
</script>

<style scoped>
.buttonsContainer {
    position: absolute;
    top: 0;
    right: 0;
    margin: 6px 2px 0 0;
    border-radius: 4px;
    width: 40px;
    height: 46px;
}
.buttons {
    display: flex;
    border-radius: 4px;
}
.buttons:first-child {
    background-color: lightskyblue;
    margin-bottom: 4px;
    padding: 1px 2px 1px 0;
}
.buttons:last-child {
    background-color: #00e676;
    
}
.button {
    display: flex;
    justify-content: center;
    color: white;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    background-color: lightskyblue;
    cursor: pointer;
    font-weight: bold;
    font-size: 18px;
}
div.button p {
    margin: -2px 0 0 1px;
}
.activity {
    border: 1px lightskyblue solid;
    border-left-width: 10px;
    margin: 0px -4px 10px 12px;
    text-align: start;
    vertical-align: top;
}
</style>
