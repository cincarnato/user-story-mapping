<template>
    <v-card-text>
        <!-- {{ getProjectId }}
        {{ project }} -->

        <v-row v-if="project">
            <v-col cols="4">
                <v-text-field
                    v-model="project.title"
                    label="Título"
                ></v-text-field>
                <v-text-field
                    v-model="project.description"
                    label="Descripción"
                ></v-text-field>
                <v-btn @click="addActivity">
                    <v-icon>add</v-icon>
                    Agregar actividad
                </v-btn>
                <v-btn
                    depressed
                    elevation="2"
                    :loading="loading"
                    @click="updateProject"
                >
                    <v-icon>save_alt</v-icon>
                    Guardar
                </v-btn>
            </v-col>
        </v-row>
        <v-row v-if="project" class="padre">
            <v-col v-for="activity in project.activities" :key="activity.id">
                <activity
                    :value="activity"
                    @input="(val) => (activity = val)"
                    :index="project.activities.indexOf(activity)"
                >
                </activity>
            </v-col>
        </v-row>
    </v-card-text>
</template>

<script>
import ProjectProvider from "../../providers/ProjectProvider";
import Activity from "../../components/Activity";

export default {
    name: "ProjectPage",
    components: {
        Activity,
    },
    data() {
        return {
            project: null,
            loading: false,
        };
    },
    computed: {
        getProjectId() {
            return this.$route.params.id;
        },
    },
    methods: {
        findProject() {
            ProjectProvider.findProject(this.getProjectId).then((r) => {
                this.project = r.data.projectFind;
            });
        },
        updateProject() {
            this.loading = true;
            ProjectProvider.updateProject({
                id: this.project.id,
                title: this.project.title,
                description: this.project.description,
                activities: this.project.activities.map((activity) => {
                    return {
                        title: activity.title,
                        roles: activity.roles,
                        tasks: activity.tasks.map((task) => {
                            return {
                                title: task.title,
                                subtasks: task.subtasks.map(subtask => {
                                    return { title: subtask.title}
                                })
                            };
                        }),
                    };
                }),
            })
                .then((r) => {
                    this.project = r.data.projectUpdate;
                })
                .finally(() => (this.loading = false));
        },
        addActivity() {
            if (this.project.activities === null) {
                this.project.activities = [];
            }
            this.project.activities.push({ title: "", roles: [], tasks: [] });
        },
    },
    mounted() {
        this.getProjectId && this.findProject();
    },
};
</script>

<style>
.v-input__slot {
    margin-bottom: 0;
    box-shadow: none !important;
}

.v-text-field__details {
    display: none;
    margin: 0;
}
</style>