<template>
    <v-card-text>
        <v-row v-if="project" align="center">
            <v-col cols="3">
                <v-text-field
                    v-model="project.title"
                    label="Título"
                ></v-text-field>
            </v-col>
            <v-col cols="4">
                <v-text-field
                    v-model="project.description"
                    label="Descripción"
                ></v-text-field>
            </v-col>

            <v-col cols="5">
                <v-btn
                    :small="$vuetify.breakpoint.smAndDown"
                    class="mr-2"
                    depressed
                    elevation="2"
                    :loading="loading"
                    @click="updateProject"
                    color="teal"
                    dark
                >
                    <v-icon :left="$vuetify.breakpoint.mdAndUp">save</v-icon>
                    <span v-if="$vuetify.breakpoint.mdAndUp">Guardar</span> 
                </v-btn>
                <v-btn
                    :small="$vuetify.breakpoint.smAndDown"
                    depressed
                    elevation="2"
                    :loading="loading"
                    @click="findProject"
                    color="amber darken-1"
                    dark
                >
                     <v-icon :left="$vuetify.breakpoint.mdAndUp">refresh</v-icon>
                    <span v-if="$vuetify.breakpoint.mdAndUp">Actualizar</span> 
                </v-btn>
            </v-col>
            
            <!-- <v-col cols="2" class="text-right">
                
            </v-col> -->
        </v-row>

        <div v-if="project" ref="scroller" class="scrollerBox">
            <div class="categoryBox">
                <draggable
                    :list="project.categories"
                    @start="startDrag"
                    @end="endDrag"
                >
                    <transition-group class="row" style="flex-wrap: nowrap">
                        <div
                            v-for="(category, i) in project.categories"
                            :key="i"
                            class="categoryBox"
                        >
                            <category
                                :value="category"
                                :retrospectiveProjectId="project.id"
                                @input="val => $set(project.categories, i, val)"
                                :index="project.categories.indexOf(category)"
                                @blockTimeout="blockTimeoutEvent"
                                @deleteCategory="deleteCategory"
                                @startDrag="startDrag"
                                @endDrag="endDrag"
                            >
                            </category>
                        </div>
                    </transition-group>
                </draggable>
            </div>
            <v-btn
                @click="addCategory"
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
import ProjectProvider from "../../providers/RetrospectiveProjectProvider";
import Category from "../../components/Category";
import Draggable from "vuedraggable";

export default {
    name: "RetrospectiveProjectPage",
    components: {
        Category,
        Draggable,
    },
    data() {
        return {
            project: null,
            loading: false,
            mouseDown: false,
            hover: false,
            interval: null,
            timeout: null,
            blockTimeout: false
        };
    },
    computed: {
        getProjectId() {
            return this.$route.params.id;
        },
    },
    mounted() {
        // this.interval = setInterval(() => {
        //     console.log("Entre al set interval");
        //     this.findProject();
        // }, 2000);
        this.refreshProject();
    },
    beforeDestroy() {
        // clearInterval(this.interval);
        clearTimeout(this.timeout);
    },
    methods: {
        refreshProject() {
            this.timeout = setTimeout(() => {
                if (!this.blockTimeout) {
                    this.findProject().then(() => {
                        this.refreshProject();
                    });
                } else {
                    this.refreshProject();
                }
            }, 2000);
        },
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
            return new Promise((resolve, reject) => {
                    ProjectProvider.findRetrospectiveProject(this.getProjectId)
                    .then((r) => {
                        this.project = r.data.retrospectiveProjectFind;
                        this.$nextTick(() => {
                            this.scrollHorizontal(true);
                        });
                        resolve();
                    })
                    .catch(error => reject(error))
            })
            
        },
        updateProject() {
            this.loading = true;
            ProjectProvider.updateRetrospectiveProject({
                id: this.project.id,
                title: this.project.title,
                description: this.project.description,
                votesPerUser: this.project.votesPerUser,
                categories: this.project.categories.map((category) => {
                    return {
                        title: category.title,
                        colour: category.colour,
                        cards: category.cards.map((card) => {
                            return {
                                title: card.title,
                                colour: card.colour,
                            };
                        }),
                    };
                }),
            })
            .then((r) => {
                this.project = r.data.retrospectiveProjectUpdate;
            })
            .finally(() => { this.loading = false } );
               
        },
        addCategory() {
            if (!this.project.categories) {
                this.project.categories = [];
            }
            this.project.categories.push({ title: "", colour: "", cards: [] });
        },
        deleteCategory(i) {
            this.project.categories.splice(i, 1);
        },
        blockTimeoutEvent(value) {
            this.blockTimeout = value;
        }
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
.categoryBox {
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
