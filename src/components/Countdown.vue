<template>
    <div class="progress-bar">
        <span class="progress-bar__fill" :style="progressBarStyle"></span>
    </div>
</template>

<script>

    export default {
        name: "countdown",
        
        props: {
            duration: {
                required: true,
                type: Number
            }
        },
        
        data: () => ({
            time : 0 
        }),

        computed: {
            percentage() {
                return 100 / this.duration * this.time;
            },
            progressBarStyle() {
                return {
                    'width': this.percentage + '%',
                    'background': '#' + this.color
                }
            },
            color() {
                return this.$store.getters.getCustomData('color');
            },
        },

        watch: {
            
        },

        mounted() {
            this.timer();
        },

        methods: {
            timer() {
                if(this.time < this.duration) {
                    setTimeout(() => {
                        this.time += 0.01
                        this.timer()
                    }, 10)
                    return
                }

                // setTimeout(() => {
                //     this.time = 0;
                //     this.timer();
                // }, 500)
            }
        }
    };
</script>

<style scoped lang="scss">
    .progress-bar {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 10px;
        background: #000000;
    }

    .progress-bar__fill {
        display: block;
        height: 10px;
        /*background: #659cef;*/
    }
</style>
