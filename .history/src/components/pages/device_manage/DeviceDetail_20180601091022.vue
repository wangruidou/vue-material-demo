<template>
    <div class="detail-content">
        <div class="detail-header">
            <md-toolbar slot="tree-toolbar" class="md-dense" md-elevation="0">
                <md-button class="md-icon-button" @click="backToLastPage" title="返回">
                    <md-icon>keyboard_backspace</md-icon>
                </md-button>
                <div class="md-toolbar-section-start">
                    <span>设备详细信息</span>
                </div>
            </md-toolbar>
            <md-table v-model="currentItem" md-card>
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="设备编号">{{ item.devicecode }}</md-table-cell>
                    <md-table-cell md-label="设备型号">{{ item.devicekindname }}</md-table-cell>
                    <md-table-cell md-label="建档日期">{{ item.createdate }}</md-table-cell>
                    <md-table-cell md-label="已使用时长">{{ $utils.trainsDataBetweenNow(item.firstusedate) }}</md-table-cell>
                    <md-table-cell md-label="设备状态">{{ $utils.trainsDeviceStatus(item.devicestatus) }}</md-table-cell>
                </md-table-row>
            </md-table>
        </div>
        <div class="detail-body">
            <div class="left">
                <md-content class="left-content">

                </md-content>
            </div>
            <div class="right">
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'device-detail',
    data() {
        return {
            
        }
    },
    methods: {
        backToLastPage (){            
            this.$router.push({path: '/DeviceManage'})
        }
    },
    computed: {
        currentItem() {
            let item = [this.$route.params.item]
            console.log(item)
            return item
        }
    },
    created() {

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
.detail-body,.left,.right{
    flex: 0 0 50%
}
.left-content{
    width: 100%;
    height: 100%;
}
</style>
