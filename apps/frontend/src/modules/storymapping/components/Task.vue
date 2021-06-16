<template>
    <div v-if="task" class="contenedor">
        <v-row
            @mouseenter="hover = true"
            @mouseleave="hover = false"
            style="position: relative"
        >
            <!-- <div @click="addTaskBefore" class="button ml-1 mb-3"><p>+</p></div> -->
            <v-text-field 
                v-model="task.title"
                placeholder="Tarea"
                solo
                class="task"
            >
                {{ task.title }}
            </v-text-field>
            <v-btn 
                v-if="hover"
                icon
                @click="deleteTask"
                absolute
                right  
                bottom
                x-small
                class="mr-2"
            >
            <v-icon>delete</v-icon></v-btn>
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
                        style="padding: 12px 12px 0"
                    >
                        <subtask
                            :subtask="subtask"
                            :index="i"
                            @deleteSubtask="deleteSubtask"
                        >
                        </subtask>
                    </v-col>
                </transition-group>
            </draggable>
        </v-row>

        <v-btn @click="addSubtask" class="mt-3" fab dark small color="blue-grey lighten-1">
            <v-icon style="padding-left: 4px">playlist_add</v-icon>
        </v-btn>

    </div>
</template>

<script>
import Subtask from "../components/Subtask";
import Draggable from 'vuedraggable'

export default {
    name: "Task",
    props: {
        task: Object,
        index: Number
    },
    data() {
        return {
            hover: false
        }
    },
    components: {
        Subtask,
        Draggable
    },
    methods: {
        addTaskBefore() {
            this.$emit("addTaskBefore", this.index);
        },
        addSubtask() {
            if (this.task.subtasks === null) {
                this.task.subtasks = [];
            }
            this.task.subtasks.push({ title: "" });
        },
        deleteSubtask(i) {
            this.task.subtasks.splice(i, 1)
        },
        deleteTask() {
            this.$emit("deleteTask", this.index);
        },
        startDragging() {
            this.$emit('startDrag')
            console.log("subtask StartDragging")
        },
        endDragging() {
            this.$emit('endDrag')
        }
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
    margin: 0 20px 0 10px;
}
</style>