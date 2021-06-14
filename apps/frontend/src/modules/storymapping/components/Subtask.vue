<template>
        <div v-if="subtask">
            <v-text-field
                v-model="subtask.title"
                placeholder="Subtarea"
                solo
                class="subtask"
            >
                {{ subtask.title }}
            </v-text-field>
        </div>
</template>

<script>
export default {
    name: "Subtask",
    props: {
        subtask: Object,
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