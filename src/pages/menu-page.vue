<template>
    <div>
        <air-position name="text" anchor="bottom-center">
            <h1>Waiting for host!</h1>
        </air-position>
        <air-profile-image name="profile-img" anchor="center-center" :style="style"></air-profile-image>
    </div>
</template>

<script>
    export default {
        name: "menu-page",
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