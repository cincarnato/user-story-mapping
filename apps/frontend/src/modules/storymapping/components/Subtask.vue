<template>
    <div
        v-if="subtask"
        @mouseenter="hover = true"
        @mouseleave="hover = false"
        style="position: relative"
    >
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
            class="deleteButton"
            color="blue-grey lighten-1"
        >
            <v-icon>delete</v-icon>
        </v-btn>
    </div>
</template>

<script>
export default {
    name: "Subtask",
    props: {
        subtask: Object,
        index: Number,
    },
    data() {
        return {
            hover: false,
        };
    },
    methods: {
        deleteSubtask() {
            this.$emit("deleteSubtask", this.index);
        },
    },
};
</script>

<style scoped>
.subtask {
    width: 239px;
    border: 1px #78909c solid;
    border-left-width: 6px;
    margin: 0 0 0 -3px;
    padding: 0;
}
.deleteButton {
    margin-right: -5px;
}
</style>