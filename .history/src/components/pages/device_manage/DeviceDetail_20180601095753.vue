<template>
    <div class="detail-content">
        <div class="detail-header">
            <md-toolbar slot="tree-toolbar" class="md-dense" md-elevation="0">
                <md-button class="md-icon-button" @click="backToLastPage" title="返回">
                    <md-icon>keyboard_backspace</md-icon>
                </md-button>
                <div class="md-toolbar-section-start">
                    <span>设备基本信息</span>
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
                <md-toolbar slot="tree-toolbar" class="md-dense" md-elevation="0">
                    <div class="md-toolbar-section-start">
                        <span>设备详细信息</span>
                    </div>
                </md-toolbar>
                <md-card md-with-hover>
                    <md-ripple>
                        <md-card-content>
                            <md-list class="md-double-line">
                                <md-subheader>Phone</md-subheader>
                                <md-list-item>
                                    <div class="md-list-item-text">
                                        <span>(650) 555-1234</span>
                                        <span>Mobile</span>
                                    </div>
                                    <md-button class="md-icon-button md-list-action">
                                        <md-icon>sms</md-icon>
                                    </md-button>
                                </md-list-item>
                                <md-list-item class="md-inset">
                                    <div class="md-list-item-text">
                                        <span>(650) 555-1234</span>
                                        <span>Mobile</span>
                                    </div>
                                    <md-button class="md-icon-button md-list-action">
                                        <md-icon>sms</md-icon>
                                    </md-button>
                                </md-list-item>
                                <md-divider></md-divider>
                                <md-subheader>Email</md-subheader>
                                <md-list-item>
                                    <div class="md-list-item-text">
                                        <span>aliconnors@example.com</span>
                                        <span>Personal</span>
                                    </div>
                                </md-list-item>
                                <md-list-item class="md-inset">
                                    <div class="md-list-item-text">
                                        <span>ali_connors@example.com</span>
                                        <span>Work</span>
                                    </div>
                                </md-list-item>
                            </md-list>
                        </md-card-content>
                    </md-ripple>
                </md-card>
            </div>
            <div class="right">
                <md-toolbar slot="tree-toolbar" class="md-dense" md-elevation="0">
                    <div class="md-toolbar-section-start">
                        <span>设备作业信息</span>
                    </div>
                </md-toolbar>
                <md-card md-with-hover>
                    <md-ripple>
                        <md-card-content>
                            
                        </md-card-content>
                    </md-ripple>
                </md-card>
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
            return item
        },
        currentParam() {
            let param = this.$route.params.item.params
            return param
        },
        currentPoint() {
            let point = this.$route.params.item.point
            return point
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
    display: flex;
    margin-top: 10px;
    width: 100%;
    height: 100%;
}
.detail-body,.left,.right{
    flex: 0 0 50%
}
</style>
