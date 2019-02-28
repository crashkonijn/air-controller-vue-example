<template>
    <div>
        <h1>{{ text }}</h1>
    </div>
</template>

<script>
    export default {
        name: 'CustomData',
        computed: {
            text() {
                return this.$store.getters.getCustomData('text');
            }
        },
    }
</script>