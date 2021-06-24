<template>
    <v-card-text>
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
            <div class="activityBox">
                <draggable
                    :list="project.activities"
                    @start="startDrag"
                    @end="endDrag"
                >
                    <transition-group class="row" style="flex-wrap: nowrap">
                        <div
                            v-for="(activity, i) in project.activities"
                            :key="i"
                            class="activityBox"
                        >
                            <activity
                                :value="activity"
                                @input="(val) => (activity = val)"
                                :index="project.activities.indexOf(activity)"
                                @deleteActivity="deleteActivity"
                                @startDrag="startDrag"
                                @endDrag="endDrag"
                            >
                            </activity>
                        </div>
                    </transition-group>
                </draggable>
            </div>
            <v-btn
                @click="addActivity"
                fab
                dark
                small
                color="#87cefa"
                class="mt-6 ml-1 mr-2"
            >
                <v-icon>add</v-icon>
            </v-btn>
        </div>
    </v-card-text>
</template>

<script>
import ProjectProvider from "../../providers/ProjectProvider";
import Activity from "../../components/Activity";
import Draggable from "vuedraggable";

export default {
    name: "ProjectPage",
    components: {
        Activity,
        Draggable,
    },
    data() {
        return {
            project: null,
            loading: false,
            mouseDown: false,
            hover: false,
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
            this.mouseDown = false;
        },
        scrollHorizontal(enable = true) {
            const slider = this.$refs.scroller;

            let startX, scrollLeft;

            let startDragging = (e) => {
                if (e.button === 0) {
                    this.mouseDown = true;
                    startX = e.pageX - slider.offsetLeft;
                    scrollLeft = slider.scrollLeft;
                }
            };

            let stopDragging = (e) => {
                if (e.button === 0) this.mouseDown = false;
            };

            let startMouseMove = (e) => {
                if (!this.mouseDown) {
                    return;
                }
                const x = e.pageX - slider.offsetLeft;
                const scroll = x - startX;
                slider.scrollLeft = scrollLeft - scroll;
            };

            if (enable) {
                slider.addEventListener("mousemove", startMouseMove);
                slider.addEventListener("mousedown", startDragging, false);
                slider.addEventListener("mouseup", stopDragging);
                slider.addEventListener("mouseleave", stopDragging, false);
            } else {
                console.log("removing listeners");
                slider.removeEventListener("mousemove", startMouseMove);
                slider.removeEventListener("mousedown", startDragging, false);
                slider.removeEventListener("mouseup", stopDragging, false);
                slider.removeEventListener("mouseleave", stopDragging, false);
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
        deleteActivity(i) {
            this.project.activities.splice(i, 1);
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
    background-color: white;
    height: 75vh;
}
.activityBox {
    min-width: auto;
    display: inline-block;
    vertical-align: top;
    padding: 0 10px;
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
