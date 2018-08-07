<template>
    <div class="flex-content">
        <div class="flex-item device-type-tree">            
            <TypeTree :rootName="rootName" :selectedPath="selectedPath" :children="typeData" v-on:onNodeSelectedChange="onNodeSelectedChange">
                <md-toolbar slot="tree-toolbar" class="md-dense" md-elevation="0">
                    <md-button class="md-icon-button" @click="backToLastPage" title="返回">
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
                        <span>当前配属设备</span>
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
                <md-table v-model="onDevice" md-card style="height: 260px;margin: 0;" md-fixed-header @md-selected="selectOnDevice">                    
                    <md-table-row slot="md-table-row" slot-scope="{ item }" :class="getClass(item)" md-selectable="single"  >
                        <md-table-cell md-label="设备编号">{{ item.devicecode }}</md-table-cell>
                        <md-table-cell md-label="设备型号">{{ item.devicekindname }}</md-table-cell>
                        <md-table-cell md-label="已使用时长">{{ $utils.trainsDataBetweenNow(item.firstusedate) }}</md-table-cell>
                        <md-table-cell md-label="设备状态">{{ item.devicestatus }}</md-table-cell>
                        <md-table-cell md-label="所属机车">{{ item.traintypename }} - {{item.trainid}}</md-table-cell>
                    </md-table-row>
                </md-table>
            </div>
            <div class="flex-item">                
                <md-toolbar class="md-dense" md-elevation="0">
                    <div class="md-toolbar-section-start">
                        <span>其他设备</span>
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
                <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header style="height: 310px;margin: 0;" @md-selected="selectUnderDevice">
                    <md-table-row slot="md-table-row" slot-scope="{ item }" :class="getClass(item)" md-selectable="single">
                        <md-table-cell md-label="设备编号">{{ item.devicecode }}</md-table-cell>
                        <md-table-cell md-label="设备型号">{{ item.devicekindname }}</md-table-cell>
                        <md-table-cell md-label="已使用时长">{{ $utils.trainsDataBetweenNow(item.firstusedate) }}</md-table-cell>
                    </md-table-row>
                </md-table>
            </div>
        </div>
        <md-snackbar :md-position="position" :md-duration="2000" :md-active.sync="snackbarActive" md-persistent>
            <span>{{snackbarInfo}}</span>
        </md-snackbar>
        <md-dialog :md-active.sync="showDialog" :md-click-outside-to-close="clickOutSide">
            <md-dialog-title>
                卸载设备
            </md-dialog-title>
            <md-content>
                <div v-if="underDeviceHasParent || addDeviceHasParent">
                    <p>
                        你选择的“其他设备”已有配属，是否卸载并且配属在当前设备上？
                    </p>
                </div>
                <div v-else-if="changeOnUnder">
                    <p>
                        是否更换设备？
                    </p>
                </div>
                <div v-else-if="addDeviceNoParent">
                    <p>
                        是否添加设备？
                    </p>
                </div>
                <div v-else>
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
                </div>
            </md-content>
            <md-dialog-actions>
                <md-button class="md-primary" @click="dialogClose">关闭</md-button>
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
        rootName () {
            return this.$route.params.item.devicecode
        },
        deviceData () {
            return this.$store.state.deviceData
        },
        deviceDataIndex () {
            return this.$store.state.deviceDataIndex
        },
        selectedNode () {
            return this.$store.getters.getSelectedNode
        }
    },
    data() {
        return {
            position: 'center',
            snackbarActive: false,
            snackbarInfo: '',
            showDialog: false,
            clickOutSide: false, // 点击外部不关闭dialog
            search: '',
            searched: [],
            selectedOnDevice: [],
            selectedUnderDevice: [],
            selectedPath: [],
            selectedNodeid: '',
            onDevice: [],
            underDevice: [],
            reason: '',
            scrapRemark: '',
            removeAll: false,
            allOnCurrentDevice: [],
            allUnderCurrentDevice: [],
            underDeviceHasParent: false,
            changeOnUnder: false,
            addDeviceNoParent: false,
            addDeviceHasParent: false,
        }
    },
    methods: {
        getClass: ({ id }) => ({
            'md-primary': id != ''
        }),
        onNodeSelectedChange (path) {
            this.selectedPath = path
        },
        backToLastPage() {
            this.$router.push({path: '/DeviceManage'})
        },
        searchOnTable () {
            this.searched = searchDevice(this.underDevice, this.search)
        },
        changeDevice () {
            if(this.$utils.isEmptyObject(this.selectedOnDevice)){
                this.snackbarActive = true
                this.snackbarInfo = '请选择需要更换的设备'
                return false
            }
            if(this.$utils.isEmptyObject(this.selectedUnderDevice)){
                this.snackbarActive = true
                this.snackbarInfo = '请选择需要配属的设备'
                return false
            }
            if (this.selectedUnderDevice.parentid != '') {
                this.underDeviceHasParent = true
            }else{
                this.changeOnUnder = true
            }
            this.showDialog = true
        },
        removeDevice () {
            this.removeAll = false
            if(this.$utils.isEmptyObject(this.selectedOnDevice)) {
                this.snackbarActive = true
                this.snackbarInfo = '请选择需要卸载的设备'
                return false
            }
            this.showDialog = true
        },
        addDevice () {
            if(this.$utils.isEmptyObject(this.selectedUnderDevice)) {
                this.snackbarActive = true
                this.snackbarInfo = '请选择需要配属的设备'
                return false
            }
            if (this.selectedUnderDevice.parentid != ''){
                this.addDeviceHasParent = true
            } else {
                this.addDeviceNoParent = true
            }
            this.showDialog = true
        },
        dialogConfirm () {
            if(this.underDeviceHasParent == true || this.changeOnUnder == true) {
                this.$utils.clearParentRelation(this.deviceData, this.deviceDataIndex, this.selectedOnDevice)
                if(this.underDeviceHasParent) {
                    this.$utils.clearParentRelation(this.deviceData, this.deviceDataIndex, this.selectedUnderDevice)
                }
                this.$utils.addParentRelation(this.deviceData, this.deviceDataIndex, this.selectedUnderDevice, this.selectedOnDevice.parentid)
                let currentParentid = this.selectedOnDevice.parentid
                this.selectedUnderDevice.parentid = currentParentid
                this.selectedOnDevice.parentid = ''
                let index = this.onDevice.indexOf(this.selectedOnDevice)
                if (index >= 0) {
                    this.onDevice.splice(index, 1)
                }
                index = this.allOnCurrentDevice.indexOf(this.selectedOnDevice)
                if (index >= 0){
                    this.allOnCurrentDevice.splice(index, 1)
                }
                index = this.underDevice.indexOf(this.selectedUnderDevice)
                if (index >= 0){
                    this.underDevice.splice(index, 1)
                }
                index = this.allUnderCurrentDevice.indexOf(this.selectedUnderDevice)
                if (index >= 0){
                    this.allUnderCurrentDevice.splice(index, 1)
                }                
                this.onDevice.push(this.selectedUnderDevice)
                this.underDevice.push(this.selectedOnDevice)
                this.searched = this.underDevice
            } else if (this.addDeviceHasParent == true || this.addDeviceNoParent == true) {
                
            } else {
                if(this.removeAll) {
                    let this_ = this
                    this.onDevice.forEach(function(item) {
                        item.parentid = ''
                        let index = this_.allOnCurrentDevice.indexOf(item)
                        if (index >= 0) {
                            this_.allOnCurrentDevice.splice(index, 1)
                        }
                    })
                    this.onDevice.splice(0, this.onDevice.length)
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
                    this.selectedOnDevice.parentid = ''
                    let index = this.onDevice.indexOf(this.selectedOnDevice)
                    if(index >= 0){
                        this.onDevice.splice(index, 1)
                    }
                    index = this.allOnCurrentDevice.indexOf(this.selectedOnDevice)
                    if (index >= 0){
                        this.allOnCurrentDevice.splice(index, 1)
                    }
                    this.reason = ''
                    this.scrapRemark = ''
                }
            }
            this.showDialog = false
        },
        dialogClose () {
            this.showDialog = false
            if(this.underDeviceHasParent) {
                this.underDeviceHasParent = !this.underDeviceHasParent
            }
            if(this.addDeviceNoParent) {
                this.addDeviceNoParent = !this.addDeviceNoParent
            }
            if(this.addDeviceHasParent) {
                this.addDeviceHasParent = !this.addDeviceHasParent
            }

        },
        removeAllDevice () {
            this.showDialog = true
            this.removeAll = true
        },
        selectOnDevice (item) {
            this.selectedOnDevice = item
        },
        selectUnderDevice (item) {
            this.selectedUnderDevice = item
        }
    },
    created () {
        let this_ = this
        let onDeviceIndex = []
        this.$route.params.item.children.forEach(function(item) {
            onDeviceIndex.push(this_.deviceDataIndex[this_.$utils.trainsIdToKey(item)])
            this_.allOnCurrentDevice.push(this_.$store.state.deviceData[this_.deviceDataIndex[this_.$utils.trainsIdToKey(item)]])            
        })        
        this.$store.state.deviceData.forEach(function(item, index) {
            let falg = true
            onDeviceIndex.forEach(function(v) {
                if(index == v) {
                    falg = false                    
                }
            })
            if(falg) {
                this_.allUnderCurrentDevice.push(item)
            }
        })
        


    },    
    watch: {
        selectedPath: function (newValue, oldValue) {
            let typeid = ''
            if(newValue.length > 1){
                let children = this.typeData
                for(let i=0;i<newValue.length-1;i++) {
                    children = children[newValue[i]].children
                }
                typeid = children[newValue[newValue.length-1]].model.typeid
            } else {
                typeid = this.typeData[newValue].model.typeid
            }
            this.selectedNodeid = typeid
            this.onDevice = []
            this.underDevice = []
            this.searched = []
            let this_ = this
            this.allOnCurrentDevice.forEach(function(item) {
                if(typeid == item.devicetypeid){
                    this_.onDevice.push(item)
                }
            })
            this.allUnderCurrentDevice.forEach(function(item) {
                if(typeid == item.devicetypeid){
                    this_.underDevice.push(item)
                    this_.searched.push(item)                    
                }
            })
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
