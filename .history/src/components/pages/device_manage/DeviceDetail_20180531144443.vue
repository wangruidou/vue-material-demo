<template>
    <div class="detail-content">
        <div class="detail-header">
            <md-toolbar slot="tree-toolbar" class="md-dense" md-elevation="0">
                <md-button class="md-icon-button" @click="returnDeviceManage" title="返回">
                    <md-icon>keyboard_backspace</md-icon>
                    <span>设备详细信息</span>
                </md-button>
            </md-toolbar>
        </div>
        <div class="detail-body">
            <div class="left">

            </div>
            <div class="conter">

            </div>
            <div class="right">

            </div>
        </div>
        <div class="detail-footer">

        </div>
    </div>
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
        this.currentItem = this.$route.params.item
        console.log(this.currentItem)
    }
}
</script>

<style>
.detail-content{
    display: flex;
    flex-direction: column;
}
.detail-content div{
    flex: 1;
}
.detail-body{
    display: flex
}
.detail-body,.detail-footer,.left,.right{
    flex: 0 0 20%!important
}
</style>
