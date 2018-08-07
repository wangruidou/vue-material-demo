<template>
    <div class="flex-content">
        <div class="flex-item device-type-tree">            
            <TypeTree :rootName="rootName" :selectedPath="selectedPath" :children="typeData" v-on:onNodeSelectedChange="onNodeSelectedChange">
                <md-toolbar slot="tree-toolbar" class="md-dense" md-elevation="0">
                    <md-button class="md-icon-button" @click="returnDeviceManage" title="返回">
                        <md-icon>keyboard_backspace</md-icon>
                    </md-button>
                    <div class="md-toolbar-section-end">
                        <span>类型列表</span>
                    </div>
                </md-toolbar>
            </TypeTree>
        </div>
        <div class="flex-item flex-right">
            <div class="flex-item">
                <md-toolbar class="md-dense" md-elevation="0">
                    <div class="md-toolbar-section-start">
                        <span>已配属设备</span>
                    </div>
                    <div class="md-toolbar-section-end">
                        <md-button class="md-icon-button" title="更换设备" @click="changeDevice">
                            <md-icon>swap_vert</md-icon>
                        </md-button>
                        <md-button class="md-icon-button" title="卸载设备" @click="removeDevice">
                            <md-icon>remove</md-icon>
                        </md-button>
                        <md-button class="md-icon-button" title="卸载全部" @click="removeAllDevice">
                            <md-icon>clear_all</md-icon>
                        </md-button>
                    </div>
                </md-toolbar>
                <md-table v-model="devicesOnTrain" md-card style="height: 260px;margin: 0;" md-fixed-header @md-selected="selectOnTrain">                    
                    <md-table-row slot="md-table-row" slot-scope="{ item }" :class="getClass(item)" md-selectable="single"  >
                        <md-table-cell md-label="设备编号">{{ item.devicecode }}</md-table-cell>
                        <md-table-cell md-label="设备型号">{{ item.devicekindname }}</md-table-cell>
                        <md-table-cell md-label="已使用时长">{{ $utils.trainsDataBetweenNow(item.firstusedate) }}</md-table-cell>
                        <md-table-cell md-label="设备状态">{{ item.devicestatus }}</md-table-cell>
                        <md-table-cell md-label="所属机车">{{ item.traintypename }} - {{item.trainid}}</md-table-cell>
                        <md-table-cell md-label="更多信息">
                            <md-button class="md-icon-button" @click="moreInfos">
                                <md-icon>navigate_next</md-icon>
                            </md-button>
                        </md-table-cell>
                    </md-table-row>
                </md-table>
            </div>
            <div class="flex-item">                
                <md-toolbar class="md-dense" md-elevation="0">
                    <div class="md-toolbar-section-start">
                        <span>未配属设备</span>
                    </div>
                    <md-field md-clearable class="md-toolbar-section-start" style="margin: 0px;">
                        <md-input placeholder="搜索设备编号" v-model="search" @input="searchOnTable"/>
                    </md-field>
                    <div class="md-toolbar-section-end">
                        <md-button class="md-icon-button" title="配属" @click="addDevice">
                            <md-icon>add</md-icon>
                        </md-button>
                    </div>
                </md-toolbar>
                <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header style="height: 310px;margin: 0;" @md-selected="selectUnderTrain">
                    <md-table-row slot="md-table-row" slot-scope="{ item }" :class="getClass(item)" md-selectable="single">
                        <md-table-cell md-label="设备编号">{{ item.devicecode }}</md-table-cell>
                        <md-table-cell md-label="设备型号">{{ item.devicekindname }}</md-table-cell>
                        <md-table-cell md-label="已使用时长">{{ $utils.trainsDataBetweenNow(item.firstusedate) }}</md-table-cell>
                        <md-table-cell md-label="更多信息">
                            <md-button class="md-icon-button">
                                <md-icon>navigate_next</md-icon>
                            </md-button>
                        </md-table-cell>
                    </md-table-row>
                </md-table>
            </div>
        </div>
        <md-snackbar :md-position="position" :md-duration="2000" :md-active.sync="snackbarActive" md-persistent>
            <span>{{snackbarInfo}}</span>
        </md-snackbar>
        <md-dialog :md-active.sync="showDialog">
            <md-dialog-title>
                卸载设备
            </md-dialog-title>
            <md-content>
                <table v-if="!removeAll">
                    <tr>
                        <td>
                            卸载原因：
                        </td>
                        <td>
                            <md-field>
                                <md-select v-model="reason" name="reason" id="reason">
                                    <md-option value="check">检修卸载</md-option>
                                    <md-option value="good">良品卸载</md-option>
                                    <md-option value="bad">报废卸载</md-option>
                                </md-select>
                            </md-field>
                        </td>
                    </tr>
                </table>
                <md-field v-if="reason == 'bad'">
                    <label>报废说明</label>
                    <md-textarea v-model="scrapRemark"></md-textarea>
                </md-field>
                <p v-if="removeAll">
                    将会卸载全部设备，确定卸载吗？
                </p>
            </md-content>
            <md-dialog-actions>
                <md-button class="md-primary" @click="showDialog = false">关闭</md-button>
                <md-button class="md-accent" @click="dialogConfirm">确定</md-button>
            </md-dialog-actions>
        </md-dialog>
    </div>
</template>

<script>
import TypeTree from "../../device_type_tree/DeviceTypeTree.vue";

const searchDevice = (items, term) => {
    if (term) {
        return items.filter(item => item.devicecode.includes(term))
    }
    return items
}

export default {
    name: 'EditDistribution',    
    components: {
        TypeTree
    },
    computed: {      
        typeData () {
            // let typedata = this.$store.state.typeData
            let ary = this.$route.params.dataObj
            return ary
        },
        deviceData () {
            return this.$store.state.deviceData
        },
        selectedNode () {
            return this.$store.getters.getSelectedNode
        },        
        allDevicesOnTrain () {
            return this.$store.state.devicesOnTrain
        },
        localDevices () {
            return this.$store.state.localDevices
        }
    },
    data() {
        return {
            position: 'center',
            snackbarActive: false,
            snackbarInfo: '',
            showDialog: false,
            search: '',
            searched: [],
            rootName: '',
            parenttypeid: '',
            selectedOnTrain: [],
            selectedUnderTrain: [],
            selectedPath: [],
            selectedNodeid: '',
            devicesOnTrain: [],
            devicesOffTrain: [],
            reason: '',
            scrapRemark: '',
            removeAll: false
        }
    },
    methods: {
        getClass: ({ id }) => ({
            'md-primary': id != ''
        }),
        onNodeSelectedChange (path) {
            this.selectedPath = path
        },
        returnDeviceManage() {
            this.$router.push({path: '/DeviceManage'})
        },
        searchOnTable () {
            this.searched = searchDevice(this.devicesOffTrain, this.search)
        },
        changeDevice () {
            if(this.$utils.isEmptyObject(this.selectedOnTrain)){
                this.snackbarActive = true
                this.snackbarInfo = '请选择需要更换的设备'
                return false
            }
            if(this.$utils.isEmptyObject(this.selectedUnderTrain)){
                this.snackbarActive = true
                this.snackbarInfo = '请选择需要配属的设备'
                return false
            }
            let index = this.devicesOnTrain.indexOf(this.selectedOnTrain)
            if (index >= 0) {
                this.devicesOnTrain.splice(index, 1)
            }
            index = this.allDevicesOnTrain.indexOf(this.selectedOnTrain)
            if (index >= 0){
                this.allDevicesOnTrain.splice(index, 1)
            }
            index = this.localDevices[this.selectedNodeid].indexOf(this.selectedUnderTrain)
            if (index >= 0) {
                this.localDevices[this.selectedNodeid].splice(index, 1)
            }            
            this.devicesOnTrain.push(this.selectedUnderTrain)
            this.searched = this.localDevices[this.selectedNodeid].slice(0)
        },
        removeDevice () {
            this.removeAll = false
            if(this.$utils.isEmptyObject(this.selectedOnTrain)) {
                this.snackbarActive = true
                this.snackbarInfo = '请选择需要卸载的设备'
                return false
            }
            this.showDialog = true
        },
        dialogConfirm () {
            if(this.removeAll) {
                this.devicesOnTrain.splice(0, this.devicesOnTrain.length)
            } else {
                if(this.reason == ''){
                    this.snackbarActive = true
                    this.snackbarInfo = '请选择卸载原因'
                    return false
                }
                if (this.reason == 'bad' && this.scrapRemark == ''){                
                    this.snackbarActive = true
                    this.snackbarInfo = '请填写报废说明'
                    return false
                }
                let index = this.devicesOnTrain.indexOf(this.selectedOnTrain)
                if(index >= 0){
                    this.devicesOnTrain.splice(index, 1)
                }
                this.reason = ''
                this.scrapRemark = ''
            }
            this.showDialog = false
        },
        removeAllDevice () {
            this.showDialog = true
            this.removeAll = true
        },
        addDevice () {
            if(this.$utils.isEmptyObject(this.selectedUnderTrain)) {
                this.snackbarActive = true
                this.snackbarInfo = '请选择需要配属的设备'
                return false
            }
            let index = this.localDevices[this.selectedNodeid].indexOf(this.selectedUnderTrain)
            if (index >= 0) {
                this.localDevices[this.selectedNodeid].splice(index, 1)
            }            
            this.devicesOnTrain.push(this.selectedUnderTrain)
            this.searched = this.localDevices[this.selectedNodeid].slice(0)            
        },
        selectOnTrain (item) {
            this.selectedOnTrain = item
        },
        selectUnderTrain (item) {
            this.selectedUnderTrain = item
        },
        moreInfos () {

        }
    },
    created () {
        this.rootName = this.$route.params.name
        this.searched = this.devicesOffTrain
    },    
    watch: {
        selectedPath: function (newValue, oldValue) {
            let typeid = this.typeData[newValue].model.typeid
            this.selectedNodeid = typeid
            let ary = []
            this.allDevicesOnTrain.forEach(function(item) {
                if(typeid == item.devicetypeid){
                    ary.push(item)
                }
            })
            this.devicesOnTrain = ary
            this.devicesOffTrain = this.localDevices[typeid].slice(0)            
            this.searched = this.devicesOffTrain
        }
    }
}
</script>

<style scoped>
.flex-content{
  height: 100%;
  display: flex;
  flex-flow: row;
}
.flex-item{
  width: 100%;
}
.flex-right{
    flex: 1;
    padding-left: 10px;
    display: flex;
    flex-flow: column;
}
.device-type-tree{
  width: 240px;
  height: 100%;
}
.md-dialog{
    width: 400px;
    padding: 0 20px 0 20px;
}
</style>
