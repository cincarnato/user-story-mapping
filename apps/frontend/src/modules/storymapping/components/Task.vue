<template>
    <div v-if="task" class="container">
        <v-row
            @mouseenter="hover = true"
            @mouseleave="hover = false"
            style="position: relative"
        >
            <v-text-field
                v-model="task.title"
                placeholder="Tarea"
                solo
                class="task"
            >
                {{ task.title }}
            </v-text-field>
            <div v-if="hover" class="buttonsContainer">
                <div class="buttons">
                    <v-btn icon @click="deleteTask" x-small class="mb-1">
                        <v-icon>delete</v-icon>
                    </v-btn>
                    <v-btn icon @click="addTask" x-small>
                        <v-icon>add</v-icon>
                    </v-btn>
                </div>
            </div>
            <!-- <v-btn
                v-if="hover"
                icon
                @click="deleteTask"
                absolute
                right
                bottom
                x-small
                class="mr-2"
            >
                <v-icon>delete</v-icon>
            </v-btn> -->
        </v-row>

        <v-row v-if="task.subtasks" class="flex-column">
            <draggable
                :list="task.subtasks"
                @start="startDragging"
                @end="endDragging"
            >
                <transition-group>
                    <v-col
                        v-for="(subtask, i) in task.subtasks"
                        :key="i"
                        style="padding: 10px 0 0 11px"
                    >
                        <subtask
                            :subtask="subtask"
                            :index="i"
                            @addSubtask="addSubtask"
                            @deleteSubtask="deleteSubtask"
                        >
                        </subtask>
                    </v-col>
                </transition-group>
            </draggable>
        </v-row>

        <!-- <v-btn
            @click="addSubtask"
            class="mt-3"
            fab
            dark
            small
            color="blue-grey lighten-1"
        >
            <v-icon style="padding-left: 4px">playlist_add</v-icon>
        </v-btn> -->
    </div>
</template>

<script>
import Subtask from "../components/Subtask";
import Draggable from "vuedraggable";

export default {
    name: "Task",
    props: {
        task: Object,
        index: Number,
    },
    data() {
        return {
            hover: false,
        };
    },
    components: {
        Subtask,
        Draggable,
    },
    methods: {
        addSubtask(i) {
            if (this.task.subtasks === null) {
                this.task.subtasks = [];
            }
            this.task.subtasks.splice(i+1, 0, { title: "" });
        },
        deleteSubtask(i) {
            this.task.subtasks.splice(i, 1);
        },
        addTask() {
            this.$emit("addTask", this.index);
        },
        deleteTask() {
            this.$emit("deleteTask", this.index);
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
.container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 0 0 16px;
}
.task {
    width: 236px;
    border: 1px #00e676 solid;
    border-left-width: 8px;
    margin: 0 8px;
}
.buttonsContainer {
    background-color: #00e676;
    position: absolute;
    top: 0;
    right: 0;
    margin: 3px 11px 0 0;
    border-radius: 4px;
    width: 20px;
}
.buttons {
    display: flex;
    flex-direction: column;
}
</style>