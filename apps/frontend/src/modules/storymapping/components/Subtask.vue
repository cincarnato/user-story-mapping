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

        <div v-if="hover" class="buttonsContainer">
            <div class="buttons">
                <v-btn icon @click="deleteSubtask" x-small dark class="mb-1">
                    <v-icon>delete</v-icon>
                </v-btn>
                <v-btn icon @click="addSubtask" x-small dark>
                    <v-icon>add</v-icon>
                </v-btn>
            </div>
        </div>
        <!-- <v-btn 
                v-if="hover"
                icon
                @click="deleteSubtask"
                absolute
                right  
                bottom
                x-small
                class="mr-2"
            >
                <v-icon>delete</v-icon>
            </v-btn> -->
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
        addSubtask() {
            this.$emit("addSubtask", this.index);
        },
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
.buttonsContainer {
    background-color: #78909c;
    position: absolute;
    top: 0;
    right: 0;
    margin: 3px 6px 0 0;
    border-radius: 4px;
    width: 20px;
}
.buttons {
    display: flex;
    flex-direction: column;
}
</style>