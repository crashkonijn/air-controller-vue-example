<template>
    <div style="height: 100vh; width: 100vw">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" aria-labelledby="scissors" role="presentation" v-if="galaxy" @touchstart="onTouchStart" @touchend="onTouchEnd" @touchmove="onTouchMove">
            <line class="attack-path" :x1="line.from.x" :y1="line.from.y" :x2="line.target.x" :y2="line.target.y" :style="line.style" v-for="(line, key) in this.lines" :key="key"/>
            <circle :cx="getScreenXPos(planet.position.x)" :cy="getScreenYPos(planet.position.y)" :r="getScreenSize(planet.size)" :stroke="planet.color" stroke-width="3" :fill="planetColor(planet)" v-for="(planet) in galaxy.planets" :key="'circle' + planet.id" :id="'planet' + planet.id" @click="onPlanetClick(planet)"/>
            <text :x="getScreenXPos(planet.position.x)" :y="getScreenYPos(planet.position.y)" fill="white" dominant-baseline="middle" text-anchor="middle" v-for="(planet) in galaxy.planets" :key="'text' + planet.id" @click="onPlanetClick(planet)">{{ planet.ships }}</text>
        </svg>
        <countdown :duration="6.5"></countdown>
    </div>
</template>

<script>
    import _ from 'lodash';
    import Messages from '../mixins/messages'
    import Countdown from "../components/Countdown";
    import Victor from 'victor'
    
    export default {
        name: "gameplay-page",
        components: {Countdown},
        mixins: [Messages],
        mounted() {
            this.$nextTick(() => {
                window.addEventListener('resize', () => {
                    this.$forceUpdate();
                });

                this.parseGalaxyData();
                this.parseAction();
                this.parsePlanetData();
            })
        },
        data: () => ({
            planet: null,
            // galaxy: {"planets":[{"id":-83388,"color":"#00FFA9","position":{"x":0.5796921849250793,"y":0.609741747379303},"size":1,"ships":-83388},{"id":-83420,"color":"#5200FF","position":{"x":0.20395639538764954,"y":0.5066172480583191},"size":1,"ships":-83420},{"id":-83452,"color":"#FFFFFF","position":{"x":0.8186108469963074,"y":0.21459724009037018},"size":1.100000023841858,"ships":-83452},{"id":-83484,"color":"#FFFFFF","position":{"x":0.20101627707481384,"y":0.2358587682247162},"size":1.0555555820465088,"ships":-83484},{"id":-83516,"color":"#FFFFFF","position":{"x":0.4893662631511688,"y":0.2173883020877838},"size":1.0111111402511597,"ships":-83516},{"id":-83548,"color":"#5200FF","position":{"x":0.43946951627731323,"y":0.6393479704856873},"size":0.9666666984558105,"ships":-83548},{"id":-83580,"color":"#5200FF","position":{"x":0.7492157816886902,"y":0.46617239713668823},"size":0.9222222566604614,"ships":-83580},{"id":-83612,"color":"#FFFFFF","position":{"x":0.1268204152584076,"y":0.7118176817893982},"size":0.8777778148651123,"ships":9},{"id":-83644,"color":"#00FFA9","position":{"x":0.7718483209609985,"y":0.8472230434417725},"size":0.8333333730697632,"ships":5},{"id":-83676,"color":"#FFFFFF","position":{"x":0.6239445209503174,"y":0.8274285793304443},"size":0.7888889312744141,"ships":9},{"id":-83708,"color":"#FFFFFF","position":{"x":0.34861308336257935,"y":0.7877376079559326},"size":0.7444444894790649,"ships":2},{"id":-83740,"color":"#FFFFFF","position":{"x":0.8879354596138,"y":0.48368075489997864},"size":0.7000000476837158,"ships":2},{"id":-83772,"color":"#5200FF","position":{"x":0.32003599405288696,"y":0.42298805713653564},"size":0.6555555462837219,"ships":6},{"id":-83804,"color":"#FFFFFF","position":{"x":0.8106197714805603,"y":0.6233698129653931},"size":0.6111111044883728,"ships":9},{"id":-83836,"color":"#FFFFFF","position":{"x":0.6361986398696899,"y":0.26895982027053833},"size":0.5666666626930237,"ships":4},{"id":-83868,"color":"#FFFFFF","position":{"x":0.6813498735427856,"y":0.15218830108642578},"size":0.5222222208976746,"ships":6},{"id":-83900,"color":"#FFFFFF","position":{"x":0.4161069989204407,"y":0.45652055740356445},"size":0.47777777910232544,"ships":8},{"id":-83932,"color":"#FFFFFF","position":{"x":0.7288677096366882,"y":0.6908939480781555},"size":0.4333333671092987,"ships":2},{"id":-83964,"color":"#FFFFFF","position":{"x":0.32633736729621887,"y":0.2640281617641449},"size":0.3888888955116272,"ships":5},{"id":-83996,"color":"#FFFFFF","position":{"x":0.5553173422813416,"y":0.434508740901947},"size":0.34444448351860046,"ships":2}]},
            galaxy: {
                planets: []
            },
            action: {
                history: [],
                current: {
                    selectedPlanets: [],
                    target: null
                }
            },
            localAction: {
                selectedPlanets: [],
                target: null,
                position: {
                    x: 0,
                    y: 0
                }
            }
        }),
        computed: {
            planetData() {
                return this.$store.getters.getCustomScreenData('planet');
            },
            galaxyData() {
                return this.$store.getters.getCustomScreenData('galaxy');
            },
            actionData() {
                return this.$store.getters.getCustomData('action');
            },
            lines() {
                if (this.action === null)
                    return [];

                return _.flatten(_.map(this.action.history, this.getLinesForAction)).concat(this.getLinesForLocalAction(this.localAction))
            },
            roundTime() {
                return this.$store.getters.getCustomScreenData('roundTime');
            },
            color() {
                // return '#5200FF';
                return "#" + this.$store.getters.getCustomData('color');
            },
        },
        methods: {
            getLinesForAction(action) {
                if (action === null)
                    return [];

                if (action.selectedPlanets.length === 0) {
                    return [];
                }

                if (!action.target) {
                    return [];
                }

                let target = this.findPlanet(action.target);

                if (target === null) return [];

                return _.map(action.selectedPlanets, (id) => {
                    let planet = this.findPlanet(id);

                    return {
                        from: this.getScreenPos(planet.position),
                        target: this.getScreenPos(target.position),
                        style: "stroke:" + planet.color + ";stroke-width:5",
                    }
                })
            },
            getLinesForLocalAction(action) {
                if (action === null)
                    return [];

                if (action.selectedPlanets.length === 0) {
                    return [];
                }

                let targetPosition = this.localAction.position;

                if (action.target) {
                    targetPosition = this.getScreenPos(this.findPlanet(action.target).position);
                }

                if (targetPosition === null) return [];

                return _.map(action.selectedPlanets, (id) => {
                    let planet = this.findPlanet(id);

                    return {
                        from: this.getScreenPos(planet.position),
                        target: targetPosition,
                        style: "stroke:" + planet.color + ";stroke-width:5",
                    }
                })
            },
            getScreenPos(pos)
            {
                return {
                    x: this.getScreenXPos(pos.x),
                    y: this.getScreenYPos(pos.y),
                }
            },
            getScreenXPos(x)
            {
                return window.innerWidth * x;
            },
            getScreenYPos(y)
            {
                return window.innerHeight - (window.innerHeight * y);
            },
            getScreenSize(size)
            {
                return window.innerWidth / 16 * size / 1.2;
            },
            planetColor(planet)
            {
                if (!this.isSelected(planet))
                {
                    return "#000000";
                }

                return planet.color;
            },
            planetOpacity(planet)
            {
                if (!this.isSelected(planet))
                {
                    return 0;
                }
                
                return 1;
            },
            isSelected(planet)
            {
                if (this.action === null)
                    return false;

                if (this.localAction.selectedPlanets.includes(planet.id))
                    return true;

                return this.action.current.selectedPlanets.includes(planet.id);
            },
            findPlanet(id)
            {
                return _.find(this.galaxy.planets, (p) => { return p.id === id});
            },
            onPlanetClick(planet)
            {
                // this.$store.commit('sendMessage', {
                //     type: 'tap-button',
                //     event: 'down',
                //     value: planet.id.toString(),
                //     key: 'planetSelect'
                // });
            },
            sendAction()
            {
                this.$store.commit('sendMessage', {
                    type: 'tap-button',
                    event: 'down',
                    value: JSON.stringify(this.localAction),
                    key: 'action'
                });

                this.localAction.selectedPlanets = [];
                this.localAction.target = null;
            },
            onTouchStart(e) {
                this.localAction.selectedPlanets = [];
                this.localAction.target = null;
            },
            onTouchEnd(e) {
                var planet = this.getClosestPlanet(e.changedTouches[0].clientX, e.changedTouches[0].clientY)

                if (!planet) {
                    this.localAction.selectedPlanets = [];
                    this.localAction.target = null;
                    return
                }

                this.localAction.target = planet.id;
                this.localAction.selectedPlanets = _.filter(this.localAction.selectedPlanets, x => x !== planet.id);

                this.sendAction()
            },
            onTouchMove(e) {
                this.localAction.position.x = e.changedTouches[0].clientX;
                this.localAction.position.y = e.changedTouches[0].clientY;

                var planet = this.getClosestPlanet(e.changedTouches[0].clientX, e.changedTouches[0].clientY)

                if (!planet)
                    return;

                if (!planet.isOwned)
                    return;

                if (this.localAction.selectedPlanets.includes(planet.id))
                    return;

                this.localAction.selectedPlanets.push(planet.id);
            },
            getClosestPlanet(x, y) {
                var pos = new Victor(x, y)

                var sized = _.map(this.galaxy.planets, (planet) => {
                    return {
                        pos: new Victor(this.getScreenXPos(planet.position.x), this.getScreenYPos(planet.position.y)),
                        id: planet.id,
                        size: planet.size,
                        isOwned: planet.color === this.color,
                    }
                })

                var closest = _.orderBy(sized, x => pos.distance(x.pos))[0];

                return closest;
                // if (pos.distance(closest.pos) < this.getScreenSize(closest.size))
                //     return closest;
            },
            async parseGalaxyData() {
                if (!this.galaxyData)
                    return;

                this.galaxy = await this.parseGalaxy(this.galaxyData);
            },
            async parseActionData() {
                if (!this.actionData)
                    return;

                this.action = await this.parseAction(this.actionData);
            },
            async parsePlanetData() {
                if (!this.planetData)
                    return;

                this.planet = await this.parsePlanet(this.planetData);
            },
        },
        watch: {
            galaxyData() {
                this.parseGalaxyData();
            },
            planetData() {
                this.parsePlanetData()
            },
            actionData() {
                this.parseActionData();
            },
        }
    }
</script>

<style>
    .attack-path {
        stroke-dasharray: 10;
        animation: dash 5s linear infinite;
    }

    @keyframes dash {
        to {
            stroke-dashoffset: -200;
        }
    }
</style>