﻿<template>
    <div>
        <div v-if="roundStats.died">
            <h1>You died!</h1>
        </div>
        <div v-else>
            <h1>
                <span class="good">You became the star dominator!<br></span>
                <span class="good" v-if="roundStats.planets > 0">+ {{ roundStats.planets }} planets!<br></span>
                <span class="bad" v-else-if="roundStats.planets < 0">- {{ roundStats.planets }} planets!<br></span>
                <span class="good" v-if="roundStats.ships">+ {{ roundStats.ships }} ships!<br></span>
                <span class="bad" v-else-if="roundStats.ships < 0">= {{ roundStats.ships }} ships!<br></span>
            </h1>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash';
    
    export default {
        name: "gameplay-result-page",
        data: () => ({
            roundStats: {
                planets: 1,
                ships: 26,
                died: false
            }
        }),
        computed: {
            roundStatsData() {
                return this.$store.getters.getCustomData('roundStats');
            },
        },
        methods: {
            async parseRoundStatsData() {
                if (!this.roundStatsData)
                    return;

                this.roundStats = await this.parseRoundStats(this.roundStatsData);
            },
        },
        watch: {
            roundStatsData() {
                this.parseRoundStatsData();
            },
        },
    }
</script>

<style scoped>
    .air-page--gameplayResult {
        background-color: #4caf50;
    }
</style>