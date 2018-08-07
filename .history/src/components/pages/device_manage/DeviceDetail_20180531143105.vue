<template>
    <p>设备详细信息</p>
</template>

<script>
export default {
    name: 'device-detail',
    data() {
        return {
            currentItem: null
        }
    },
    methods: {

    },
    watch: {

    },
    created() {
        this.currentItem = this.$route
    }
}
</script>

<style>

</style>
