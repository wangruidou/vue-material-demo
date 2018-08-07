<template>
    <div class="flex-content">
        <div class="flex-item device-type-tree">
            <md-button class="md-icon-button md-dense md-raised md-primary" @click="returnDeviceManage">
                <md-icon>cached</md-icon>
            </md-button>
            <TypeTree class="type-tree-content" rootName="rootName" :selectedPath="selectedPath" :children="typeData"></TypeTree>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EditDistribution',
    data() {
        return {
            rootName: ''
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
