<template>
    <div class="detail-content">
        <div class="detail-header">
            <md-toolbar slot="tree-toolbar" class="md-dense toolbar-con" md-elevation="0">
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
                <md-toolbar slot="tree-toolbar" class="md-dense toolbar-con" md-elevation="0">
                    <div class="md-toolbar-section-start">
                        <span>设备详细信息</span>
                    </div>
                </md-toolbar>
                <md-card md-with-hover>
                    <md-ripple>
                        <md-card-content>
                            <md-list class="md-double-line">
                                <md-subheader>自定义字段</md-subheader>
                                <div v-for="item in currentModel.params" :key="item.id" class="left-content">
                                    {{item.name}} : {{currentParam[$utils.trainsIdToKey(item.id)]}}
                                </div>                                
                                <md-divider></md-divider>
                                <md-subheader>检查项点</md-subheader>
                                <div v-for="item in currentModel.points" :key="item.id" class="left-content">
                                    {{item.name}} : {{currentPoint[$utils.trainsIdToKey(item.id)]}}
                                </div>  
                            </md-list>
                        </md-card-content>
                    </md-ripple>
                </md-card>
            </div>
            <div class="right">
                <md-toolbar slot="tree-toolbar" class="md-dense toolbar-con" md-elevation="0">
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
            let point = this.$route.params.item.points
            return point
        },
        currentModel() {
            let model = this.$route.params.model
            return model
        }
    },
    created() {

    }
}
</script>

<style scoped>
.detail-content{
    display: flex;
    flex-direction: column;
}
.left{
    width: 360px;
}
.right{
    flex: 1;
}
.detail-body{
    display: flex;
    margin-top: 10px;
}
.left-content{
    margin-left: 50px;
    padding: 5px;
}
.toolbar-con{
    padding: 10px;
}
</style>
