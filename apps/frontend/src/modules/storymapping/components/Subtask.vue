<template>
        <div v-if="subtask" @mouseenter="hover = true"
                @mouseleave="hover = false" style="position: relative">
            <v-text-field
                v-model="subtask.title"
                placeholder="Subtarea"
                solo
                class="subtask"
            >
                {{ subtask.title }}
            </v-text-field>
            <v-btn 
                v-if="hover"
                icon
                @click="deleteSubtask"
                absolute
                right  
                bottom
                x-small
                class="mr-2"
            >
            <v-icon>delete</v-icon></v-btn>
        </div>
</template>

<script>
export default {
    name: "Subtask",
    props: {
        subtask: Object,
        index: Number
    },
    data() {
        return {
            hover: false
        }
    },
    methods: {
        deleteSubtask() {
            this.$emit("deleteSubtask", this.index);
        }
    },
};
</script>

<style scoped>
.subtask {
    border: 1px #78909C solid;
    border-left-width: 6px;
    margin: 0 20px 0 0;
}
</style>