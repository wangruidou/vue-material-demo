<template>
    <div class="flex-content">
        <div class="flex-item device-type-tree">
            <md-button class="md-icon-button" @click="returnDeviceManage" title="返回">
                <md-icon>keyboard_backspace</md-icon>
            </md-button>
            <TypeTree class="type-tree-content" :rootName="rootName" :selectedPath="selectedPath" :children="typeData" v-on:onNodeSelectedChange="onNodeSelectedChange"></TypeTree>
        </div>
        <div class="flex-item flex-right">
            <div class="flex-item">
                <md-table-toolbar class="md-dense">
                    <div class="md-toolbar-section-end">
                        <md-button class="md-icon-button" title="更换设备" @click="changeDevice">
                            <md-icon>refresh</md-icon>
                        </md-button>
                        <md-button class="md-icon-button" title="卸载设备" @click="removeDevice">
                            <md-icon>reply</md-icon>
                        </md-button>
                        <md-button class="md-icon-button" title="卸载全部" @click="removeAllDevice">
                            <md-icon>reply_all</md-icon>
                        </md-button>
                    </div>
                </md-table-toolbar>
                <md-table v-model="devicesOnTrain" md-card style="height: 260px;margin: 0;" md-fixed-header @md-selected="selectOnTrain">                    
                    <md-table-row slot="md-table-row" slot-scope="{ item }" :class="getClass(item)" md-selectable="single"  >
                        <md-table-cell md-label="设备编号">{{ item.devicecode }}</md-table-cell>
                        <md-table-cell md-label="设备型号">{{ item.devicetype }}</md-table-cell>
                        <md-table-cell md-label="已使用时长">{{ $utils.trainsDataBetweenNow(item.firstusedate) }}</md-table-cell>
                        <md-table-cell md-label="设备状态">{{ item.devicestatus }}</md-table-cell>
                        <md-table-cell md-label="所属机车">{{ item.traintypename }} - {{item.trainid}}</md-table-cell>
                        <md-table-cell md-label="更多信息">
                            <md-button class="md-icon-button">
                                <md-icon>navigate_next</md-icon>
                            </md-button>
                        </md-table-cell>
                    </md-table-row>
                </md-table>
            </div>
            <div class="flex-item" style="margin-top: 5px;">                
                <md-table-toolbar class="md-dense">
                    <md-field md-clearable class="md-toolbar-section-start">
                        <md-input placeholder="搜索设备编号" v-model="search" @input="searchOnTable"/>
                    </md-field>
                    <div class="md-toolbar-section-end">
                        <md-button class="md-icon-button" title="配属" @click="addDevice">
                            <md-icon>add</md-icon>
                        </md-button>
                    </div>
                </md-table-toolbar>
                <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header style="height: 310px;margin: 0;" @md-selected="selectOffTrain">
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
            search: '',
            searched: [],
            rootName: '',
            parenttypeid: '',
            onTrainDevices: [],
            offTrainDevices: [],
            selectedPath: [],
            selectedNodeid: '',
            devicesOnTrain: [],
            devicesOffTrain: []
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
            if(this.$utils.isEmptyObject(this.onTrainDevices)){
                this.snackbarActive = true
                this.snackbarInfo = '请选择需要更换的设备'
                return false
            }
            if(this.$utils.isEmptyObject(this.offTrainDevices)){
                this.snackbarActive = true
                this.snackbarInfo = '请选择需要配属的设备'
                return false
            }
            console.log(this.onTrainDevices)
            console.log(this.offTrainDevices)
        },
        removeDevice () {
            if(this.$utils.isEmptyObject(this.onTrainDevices)) {
                this.snackbarActive = true
                this.snackbarInfo = '请选择需要卸载的设备'
                return false
            }
        },
        removeAllDevice () {
            alert("11")
        },
        addDevice () {
            if(this.$utils.isEmptyObject(this.offTrainDevices)) {
                this.snackbarActive = true
                this.snackbarInfo = '请选择需要配属的设备'
                return false
            }
        },
        selectOnTrain (item) {
            this.onTrainDevices = item
        },
        selectOffTrain (item) {
            this.offTrainDevices = item
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
            this.searched = this.localDevices[typeid].slice(0)
        }
    }
}
</script>

<style lang="sass" scoped>
.flex-content
    height: 100%
    display: flex
    flex-flow: row
    .device-type-tree
        width: 240px
        height: 100%
        .flex-right
            flex: 1
            padding-left: 10px
            display: flex
            
</style>
