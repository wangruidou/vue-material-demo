<template>
    <div>
        <md-button class="md-raised md-primary" @click="returnDeviceManage">修改配属</md-button>
    </div>
</template>

<script>
export default {
    name: 'EditDistribution',
    data() {
        return {
            
        }
    },
    methods: {
        returnDeviceManage() {
            this.$router.push({path: '/DeviceManage'})
        }
    }
}
</script>

<style>

</style>
