﻿<template>
    <div>
        <div v-if="roundStats.died">
            <h1>You died!</h1>
        </div>
        <div v-else>
            <h1>
                <span v-if="roundStats.dominator">You became the <span class="good">star dominator!</span><br></span>
                <span v-else-if="roundStats.positionChange < 0">You wend up to <span class="good">{{ positionString(roundStats.position) }}</span> place!<br></span>
                <span v-else-if="roundStats.positionChange > 0">You wend down to <span class="bad">{{ positionString(roundStats.position) }}</span> place!<br></span>
                <span v-if="roundStats.planets > 0"><span class="good">+{{ roundStats.planets }}</span> planets!<br></span>
                <span v-else-if="roundStats.planets < 0"><span class="bad">{{ roundStats.planets }}</span> planets!<br></span>
                <span v-if="roundStats.ships > 0"><span class="good">+{{ roundStats.ships }}</span> ships!<br></span>
                <span v-else-if="roundStats.ships < 0"><span class="bad">{{ roundStats.ships }}</span> ships!<br></span>
            </h1>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash';
    import Messages from "../mixins/messages";
    
    export default {
        name: "gameplay-result-page",
        mixins: [Messages],
        data: () => ({
            roundStats: {
                planets: 0,
                ships: 0,
                died: false,
                dominator: false,
                position: 0,
                positionChange: 0
            }
        }),
        mounted() {
            this.parseRoundStatsData();
        },
        computed: {
            roundStatsData() {
                return this.$store.getters.getCustomData('roundStats');
            },
        },
        methods: {
            async parseRoundStatsData() {
                console.log('parseRoundStatsData');
                if (!this.roundStatsData)
                    return;

                this.roundStats = await this.parseRoundStats(this.roundStatsData);
            },
            positionString(position) {
                switch (position) {
                    case 0: return 'first'
                    case 1: return 'second'
                    case 2: return 'third'
                    case 3: return 'fourth'
                    case 4: return 'fifth'
                    case 5: return 'sixth'
                    case 6: return 'seventh'
                    case 7: return 'eight'
                }
            }
        },
        watch: {
            roundStatsData() {
                console.log('watch: roundStatsData');
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