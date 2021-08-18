<template>
    <!-- <v-card style="min-width: 700px, width:auto"> -->
    <v-card-text class="px-1">
        <v-row
            class="d-flex justify-center align-center"
            @mouseenter="hover = true"
            @mouseleave="hover = false"
            style="position: relative"
        >
            <v-text-field
                v-model="category.title"
                v-on:focus="blockTimeout(true)"
                v-on:blur="saveOrUpdateCategory(); blockTimeout(false)"
                placeholder="Categoria"
                solo
                full-width
                class="category"
            >
            </v-text-field>

            <v-btn
                v-if="hover"
                @click="deleteCategory"
                icon
                absolute
                right
                top
                small
                color="#87cefa"
            >
                <v-icon>delete</v-icon>
            </v-btn>
        </v-row>

        <!-- <list-combobox v-model="category.roles" class="mb-4"></list-combobox> -->
        <div v-if="category.cards" class="d-flex flex-column align-center">
            <draggable
                :list="category.cards"
                @start="startDragging"
                @end="endDragging"
            >
                <transition-group>
                    <div v-for="(card, i) in category.cards" :key="i">
                        <card
                            :value="card" 
                            @input="val => $set(category.cards, i, val)"
                            :category="category"
                            :index="i"
                            @blockTimeout="blockTimeout"
                            @deleteCard="deleteCard"
                            @startDrag="$emit('startDrag')"
                            @endDrag="$emit('endDrag')"
                        >
                        </card>
                    </div>
                </transition-group>
            </draggable>
            <v-btn
            @click="addCard"
            class="mt-2"
            fab
            dark
            small
            color="blue-grey lighten-1"
        >
            <v-icon style="padding-left: 4px">playlist_add</v-icon>
        </v-btn>
        </div>
    </v-card-text>
    <!-- </v-card> -->
</template>

<script>
/* import { ListCombobox } from "@dracul/common-frontend"; */
import Card from "../components/Card";
import Draggable from "vuedraggable";
import ProjectProvider from "../providers/RetrospectiveProjectProvider";

export default {
    name: "Category",
    components: {
        /* ListCombobox, */
        Card,
        Draggable,
    },
    data() {
        return {
            hover: false,
        };
    },
    props: {
        value: Object,
        index: Number,
        retrospectiveProjectId: String
    },
    computed: {
        category: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit("input", val);
            },
        },
        checkTitleExist() {
            return this.category.title != "" ? true : false;
        },
    },
    watch: {
        category: {
            handler(val) {
                this.$emit("input", val);
            },
            deep: true,
        },
    },
    methods: {
        deleteCategory() {
            this.$emit("deleteCategory", this.index);
            ProjectProvider.deleteCategory({
                id: this.category.id,
            })
            .then((r) => {
                this.project = r.data.deleteCategory;
            })
            .finally(() => { this.loading = false } );
        },
        startDragging() {
            this.$emit("startDrag");
        },
        endDragging() {
            this.$emit("endDrag");
        },
        addCard() {
            if (this.category.cards === null) {
                this.category.cards = [];
            }
            this.category.cards.push({ title: "", colour: "" });
        },
        deleteCard(i) {
            this.category.cards.splice(i, 1);
        },
        saveOrUpdateCategory() {
            if (this.category.title) {
                ProjectProvider.saveOrUpdateCategory({
                    idRetrospectiveProject: this.retrospectiveProjectId,
                    id: this.category.id || '',
                    title: this.category.title,
                    colour: this.category.colour,
                    cards: this.category.cards || []
                })
                .then((r) => {
                    this.category = r.data.categorySaveOrUpdate;
                })
                .finally(() => { this.loading = false } );
            }
        },
        blockTimeout(value) {
            this.$emit("blockTimeout", value);
        }
        // updateCategory(category) {
        //     this.category = category;
        // }
    },
};
</script>

<style scoped>
.category {
    min-width: 236px;
    border: 1px rgb(135, 206, 250) solid;
    border-left-width: 10px;
    margin: 0px 4px 10px 12px;
    text-align: start;
    vertical-align: top;
}
</style>
