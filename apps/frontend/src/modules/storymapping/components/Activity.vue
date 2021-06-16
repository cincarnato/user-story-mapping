<template>
    <v-card >
        <v-card-text>
            <v-row 
                class="d-flex justify-center align-center px-3"
                @mouseenter="hover = true"
                @mouseleave="hover = false"
                style="position: relative"
            >
                <!-- <div @click="addActivityBefore" class="button mr-1 mb-3"><p>+</p></div> -->
                    <!-- :append-icon="checkTitleExist ? 'clear' : ''"
                    @click:append="cleanInput" -->

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
                    icon
                    @click="deleteActivity"
                    absolute
                    right  
                    top
                    small
                    class="mr-2"
                >
            <v-icon>delete</v-icon></v-btn>

                <!-- <div @click="addActivity" class="button ml-1 mb-3"><p>+</p></div> -->
            </v-row>

            <!-- <list-combobox v-model="activity.roles" class="mb-4"></list-combobox> -->
            <div v-if="activity.tasks" class="activities">
                <!-- draggeable class row -->
                <div v-for="(task, i) in activity.tasks" :key="i" >
                    <task
                        :task="task"
                        :index="i"
                        @addTask="addTask"
                        @addTaskBefore="addTaskBefore"
                        @deleteTask="deleteTask"
                        @startDrag="$emit('startDrag')"
                        @endDrag="$emit('endDrag')"
                    >
                    </task>
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
        Task
    },
    data() {
        return {
            myArray: ['manzana', 'banana', 'pera'],
            hover: false
        }
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
            return this.activity.title != '' ? true : false
        }
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
        addTaskBefore(i) {
            if (this.activity.tasks === null) {
                this.activity.tasks = [];
            }
            this.activity.tasks.splice(i, 0, { title: "", subtasks: [] });
        },
        addActivityBefore() {
            this.$emit("addActivityBefore", this.index);
        },
        cleanInput() {
            this.activity.title = ''
        },
        deleteTask(i) {
            this.activity.tasks.splice(i, 1)
        },
        addActivity() {
            this.$emit("addActivity", this.index);
        },
        deleteActivity() {
            this.$emit("deleteActivity", this.index);
        }
    },
};
</script>

<style scoped>
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
