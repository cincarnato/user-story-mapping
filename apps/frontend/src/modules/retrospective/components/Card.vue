<template>
    <div v-if="card" class="container mb-2">
        <v-row
            @mouseenter="hover = true"
            @mouseleave="hover = false"
            style="position: relative"
        >
            <v-text-field
                v-model="card.title"
                v-on:blur="saveOrUpdateCard(); blockTimeoutEvent(false)"
                v-on:focus="blockTimeoutEvent(true)"
                placeholder="Tarjeta"
                solo
                class="card"
            >
                {{ card.title }}
            </v-text-field>

            <v-btn
                v-if="hover && !isNewCard"
                @click="deleteCard"
                icon
                absolute
                right
                bottom
                x-small
                color="green accent-4"
            >
                <v-icon>delete</v-icon>
            </v-btn>
        </v-row>

    </div>
</template>

<script>
import ProjectProvider from "../providers/RetrospectiveProjectProvider";
import Category from "./Category";

export default {
    name: "Card",
    props: {
        value: Object,
        index: Number,
        category: Category,
    },
    data() {
        return {
            hover: false,
            blockTimeout: false,
        };
    },
    methods: {
        deleteCard() {
            this.loading = true;
            ProjectProvider.categoryRemoveCardFromCategory({
                idCategory: this.category.id,
                idCard: this.card.id,
            })
            .then(()=> {
                this.$emit("deleteCard", this.index);
            })
            .finally(() => {
                this.loading = false; 
            });
        },
        startDragging() {
            this.$emit("startDrag");
        },
        endDragging() {
            this.$emit("endDrag");
        },
        saveOrUpdateCard() {
            this.loading = true;
            ProjectProvider.saveOrUpdateCard({
                idCategory: this.category.id,
                id: this.card.id || null,
                title: this.card.title,
                colour: this.card.colour
            })
            .then((r) => {
                this.card = r.data.cardSaveOrUpdate;
            })
            .finally(() => {
                this.loading = false; 
            });
        },
        blockTimeoutEvent(value) {
            this.$emit("blockTimeout", value);
        },
    },
    computed: {
        card: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', value);
            }
        },
        isNewCard() {
            return !(this.card && this.card.id);
        }
    }
};
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 0 0 16px;
}
.card {
    width: 236px;
    border: 1px #00e676 solid;
    border-left-width: 8px;
    margin: 0 8px;
}
.deleteButton {
    position: absolute;
    top: 0;
    right: 0;
    margin: 3px 11px 0 0;
    border-radius: 4px;
    width: 40px;
    height: 44px;
}
</style>