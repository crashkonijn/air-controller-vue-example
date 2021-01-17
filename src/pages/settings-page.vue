<template>

    <div>
        <air-button name="start-game" mode="down" anchor="bottom-center"></air-button>
        <air-button name="add-computer" mode="down" anchor="bottom-right">+</air-button>
        <air-button name="remove-computer" mode="down" anchor="bottom-left">-</air-button>
        <air-profile-image name="profile-img" anchor="top-center" :style="style"></air-profile-image>
    </div>
</template>

<script>
    export default {
        name: "settings-page",
        computed: {
            color() {
                return this.$store.getters.getCustomData('color');
            },
            style() {
                return {
                    'border-color': '#' + this.color
                }
            }
        }
    }
</script>

<style scoped>

</style>