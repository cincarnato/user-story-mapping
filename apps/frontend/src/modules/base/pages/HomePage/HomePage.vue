<template>
    <v-container fill-height>
        <v-row justify="center" align="center">

            <v-col cols="12" class="text-center">
                <img src="@/assets/logo_sondeos.png">
            </v-col>

        </v-row>
        <v-row justify="center" align="center">
            <home-card
                :title="'User story mapping'"
                :subtitle="$t('base.subtitleUSM')"
                :img="require('@/assets/cards/project-management.png')"
                :link="'project-management'"
            ></home-card>
            <home-card
                :title="'Retrospective projects'"
                :subtitle="$t('retrospective.retrospectiveProject.subtitle')"
                :img="require('@/assets/cards/retrospective-project-card.png')"
                :link="'retrospective-project'"
            ></home-card>
        </v-row>
    </v-container>
</template>

<script>
    import HomeCard from './HomeCard'
    export default {
        name: 'HomePage',
        components: {
            HomeCard
        }
    }
</script>