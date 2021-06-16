<template>
    <v-card-text>
        <!-- {{project}} -->
        <v-row v-if="project">
            <v-col cols="2">
                <v-text-field
                    v-model="project.title"
                    label="Título"
                ></v-text-field>
            </v-col>
            <v-col cols="8">
                <v-text-field
                    v-model="project.description"
                    label="Descripción"
                ></v-text-field>
            </v-col>

            <v-col cols="2" class="text-right">
                <v-btn
                    depressed
                    elevation="2"
                    :loading="loading"
                    @click="updateProject"
                    color="teal"
                    dark
                >
                    <v-icon left>save</v-icon>
                    Guardar
                </v-btn>
            </v-col>
        </v-row>

        <div v-if="project" ref="scroller" class="scrollerBox">
            <div
                v-for="activity in project.activities"
                :key="activity.id"
                class="activityBox"
            >
                <activity
                    :value="activity"
                    @input="(val) => (activity = val)"
                    :index="project.activities.indexOf(activity)"
                    @addActivity="addActivity"
                    @addActivityBefore="addActivityBefore"
                    @deleteActivity="deleteActivity"
                    @startDrag="startDrag"
                    @endDrag="endDrag"
                >
                </activity>
            </div>
            <div class="activityBox">
                <v-btn
                    @click="addActivity"
                    class="mt-6"
                    fab
                    dark
                    small
                    color="blue accent-4"
                >
                    <v-icon>add</v-icon>
                </v-btn>
            </div>
        </div>
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
            mouseDown: false
        };
    },
    computed: {
        getProjectId() {
            return this.$route.params.id;
        },
    },
    mounted() {
        this.getProjectId && this.findProject();
    },
    methods: {
        startDrag() {
            /* this.scrollHorizontal(false) */
        },
        endDrag() {
            /* this.scrollHorizontal(true) */
            console.log("endDrag index")
            this.mouseDown = false
        },
        scrollHorizontal(enable = true) {
            const slider = this.$refs.scroller;
            //const slider = document.querySelector('.scroller');

            let startX, scrollLeft;

            let startDragging = (e) => {
                if (e.button === 0) {
                    this.mouseDown = true;
                    startX = e.pageX - slider.offsetLeft;
                    scrollLeft = slider.scrollLeft;
                }
            };

            let stopDragging = (e) => {
                if (e.button === 0)
                    this.mouseDown = false;
            };

            let startMouseMove = (e) => {
                if (!this.mouseDown) {
                    return;
                }
                const x = e.pageX - slider.offsetLeft;
                const scroll = x - startX;
                slider.scrollLeft = scrollLeft - scroll;
            }
            
            if (enable) {

                slider.addEventListener("mousemove", startMouseMove);
                slider.addEventListener("mousedown", startDragging, false);
                slider.addEventListener("mouseup", stopDragging);
                slider.addEventListener("mouseleave", stopDragging, false);
            } else {
                console.log("removing listeners")
                slider.removeEventListener("mousemove", startMouseMove)
                slider.removeEventListener("mousedown", startDragging, false)
                slider.removeEventListener("mouseup", stopDragging, false)
                slider.removeEventListener("mouseleave", stopDragging, false)
            }
        },
        findProject() {
            ProjectProvider.findProject(this.getProjectId).then((r) => {
                this.project = r.data.projectFind;
                this.$nextTick(() => {
                    this.scrollHorizontal(true);
                });
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
                                subtasks: task.subtasks.map((subtask) => {
                                    return { title: subtask.title };
                                }),
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
        addActivityBefore(index) {
            if (this.project.activities === null) {
                this.project.activities = [];
            }
            this.project.activities.splice(index, 0, { title: "", roles: [], tasks: [] });
        },
        deleteActivity(i) {
            this.project.activities.splice(i, 1)
        },
    },
};
</script>

<style>
.scrollerBox {
    display: block;
    overflow-x: scroll; /* Just to show the div IS expanding horizontally, can delete. */
    white-space: nowrap;
    padding-bottom: 10px;
}

.activityBox {
    min-width: 300px;
    display: inline-block;
    margin-right: 20px;
    vertical-align: top;
}

.v-input__slot {
    margin-bottom: 0;
    box-shadow: none !important;
}

.v-text-field__details {
    display: none;
    margin: 0;
}
</style>
