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
                {{tiptitle}}
            </md-dialog-title>
            <md-content>
                <div v-if="cannotadd">
                    <p>{{tipinfo}}</p>
                </div>
                <div v-else-if="changeOnUnder">
                    <p>{{tipinfo}}</p>
                </div>
                <div v-else-if="remove">
                    <table>
                        <tr>
                            <td>
                                卸载原因：
                            </td>
                            <td>
                                <md-field>
                                    <md-select v-model="reason" name="reason" id="reason">
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
                </div>
                <div v-else>
                    {{tipinfo}}
                    <div v-if="anyparents">
                        请选择需要配属的设备
                        <md-field>
                            <md-select v-model="singleselect" name="singleselect" id="singleselect" @md-selected="handleSelect">
                                <md-option v-for="(v, k) in childrenItem" :value="v.devicecode" :key="k">{{v.devicecode}}</md-option>
                            </md-select>
                        </md-field> 
                    </div>
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
            remove: false,
            allOnCurrentDevice: [],
            allUnderCurrentDevice: [],
            tipinfo: '',
            tiptitle: '',
            underDeviceHasParent: false,
            changeOnUnder: false,
            addDeviceNoParent: false,
            addDeviceHasParent: false,
            cannotadd: false, // 不能添加
            anyparents: false, // 有多个父级设备，选择给哪个设备添加子
            childrenItem: [],
            singleselect: null
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
            this.tiptitle = '更换设备'
            this.changeOnUnder = true
            if (this.selectedUnderDevice.parentid != '') {
                this.tipinfo = '当前选择的“其他设备”已经配属在别的设备上，是否卸载并且更换？'
                this.underDeviceHasParent = true
            }else{
                this.tipinfo = '是否更换设备？'
            }
            this.showDialog = true
        },
        removeDevice () {
            if(this.$utils.isEmptyObject(this.selectedOnDevice)) {
                this.snackbarActive = true
                this.snackbarInfo = '请选择需要卸载的设备'
                return false
            }
            this.remove = true
            this.tiptitle = '卸载设备'
            this.showDialog = true
        },
        addDevice () {
            if(this.$utils.isEmptyObject(this.selectedUnderDevice)) {
                this.snackbarActive = true
                this.snackbarInfo = '请选择需要配属的设备'
                return false
            }
            this.tiptitle = '添加设备'
            this.addDeviceNoParent = true
            if (this.selectedUnderDevice.parentid != ''){
                this.tipinfo = '当前选择设备已经配属在别的设备上，是否卸载并且添加？'
                this.addDeviceHasParent = true
            } else {
                this.tipinfo = '是否添加设备？'
            }
            let typeid = this.selectedUnderDevice.devicetypeid
            let ptypeid = this.$utils.getParentidByTypeid(this.typeData, typeid)
            let this_ = this
            let childrenItem = this.allOnCurrentDevice
            this.childrenItem = []
            for (let i=0;i<childrenItem.length;i++) {
                if (childrenItem[i].devicetypeid == ptypeid) {
                    this_.childrenItem.push(childrenItem[i])
                }
            }
            if (this.$route.params.item.devicetypeid != ptypeid && this.childrenItem.length == 0) { // 为空不可添加子
                this.tipinfo = '当前不可添加设备，请先添加上一级设备！'
                this.cannotadd = true
            } else if (this.childrenItem.length > 1) { // 有多个出现下拉框选择给哪一个添加子
                this.anyparents = true
                this.tipinfo = ''
            }
            this.showDialog = true
        },
        dialogConfirm () {
            if(this.changeOnUnder) {
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
                this.allOnCurrentDevice.push(this.selectedUnderDevice)
                this.allUnderCurrentDevice.push(this.selectedOnDevice)
                this.selectedOnDevice = null
                this.selectedUnderDevice = null
            } else if (this.addDeviceNoParent) {
                if(this.underDeviceHasParent) {
                    this.$utils.clearParentRelation(this.deviceData, this.deviceDataIndex, this.selectedUnderDevice)
                }
                let deviceid = this.$route.params.item.deviceid
                this.$utils.addParentRelation(this.deviceData, this.deviceDataIndex, this.selectedUnderDevice, this.$route.params.item.deviceid)
                if (this.anyparents) {
                    if (this.singleselect == null) {
                        this.snackbarActive = true
                        this.snackbarInfo = '请选择需要配属的设备'
                        return false
                    } else {
                        
                    }
                }

                let index = this.underDevice.indexOf(this.selectedUnderDevice)
                if (index >= 0){
                    this.underDevice.splice(index, 1)
                }
                index = this.allUnderCurrentDevice.indexOf(this.selectedUnderDevice)
                if (index >= 0){
                    this.allUnderCurrentDevice.splice(index, 1)
                } 
                this.onDevice.push(this.selectedUnderDevice)
                this.searched = this.underDevice
                this.allOnCurrentDevice.push(this.selectedUnderDevice)
                this.selectedUnderDevice = null
                this.singleselect = null
            }else if(this.remove) {
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
                this.allUnderCurrentDevice.push(this.selectedOnDevice)
                this.reason = ''
                this.scrapRemark = ''
            }

            console.log(this.allOnCurrentDevice)
            console.log(this.allUnderCurrentDevice)

            this.underDeviceHasParent = false
            this.addDeviceNoParent = false
            this.addDeviceHasParent = false
            this.changeOnUnder = false
            this.cannotadd = false
            this.remove = false
            this.anyparents = false
            this.showDialog = false
        },
        dialogClose () {
            this.showDialog = false
            this.underDeviceHasParent = false
            this.addDeviceNoParent = false
            this.addDeviceHasParent = false
            this.changeOnUnder = false
            this.cannotadd = false
            this.remove = false
            this.anyparents = false
        },
        selectOnDevice (item) {
            this.selectedOnDevice = item
        },
        selectUnderDevice (item) {
            this.selectedUnderDevice = item
        },
        handleSelect (item) {
            this.singleselect = item
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
