<template>

    <div class="flex-item device-type-tree">
        <md-button class="md-raised md-primary" @click="returnDeviceManage">修改配属</md-button>
        <TypeTree class="type-tree-content" rootName="全部种类" :selectedPath="selectedPath" :children="typeData"></TypeTree>
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
