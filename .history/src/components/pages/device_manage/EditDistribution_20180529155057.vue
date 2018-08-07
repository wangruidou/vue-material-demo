<template>
    <div class="flex-content">
        <div class="flex-item device-type-tree">
            <md-button class="md-icon-button md-dense md-raised md-primary btn-position" @click="returnDeviceManage" title="返回">
                <md-icon>keyboard_backspace</md-icon>
            </md-button>
            <TypeTree class="type-tree-content" :rootName="rootName" :selectedPath="selectedPath" :children="typeData"></TypeTree>
        </div>
        <div class="flex-item flex-right">
            <div class="flex-item">
                <md-table v-model="devicesOnTrain" md-card style="height: 260px;margin: 0;" @md-selected="selectOnTrain">
                    <md-table-toolbar>
                        <div class="md-toolbar-section-end">
                            <md-button class="md-fab md-mini md-primary" title="更换设备" @click="changeDevice">
                                <md-icon>refresh</md-icon>
                            </md-button>
                            <md-button class="md-fab md-mini md-plain" title="卸载设备" @click="removeDevice">
                                <md-icon>reply</md-icon>
                            </md-button>
                            <md-button class="md-fab md-mini md-plain" title="卸载全部" @click="removeAllDevice">
                                <md-icon>reply_all</md-icon>
                            </md-button>
                        </div>
                    </md-table-toolbar>
                    <md-table-row slot="md-table-row" slot-scope="{ item }" :class="getClass(item)" md-selectable="single"  >
                        <md-table-cell md-label="设备编号">{{ item.code }}</md-table-cell>
                        <md-table-cell md-label="设备名称">{{ item.name }}</md-table-cell>
                        <md-table-cell md-label="设备详情">
                            <md-button class="md-icon-button">
                                <md-icon>navigate_next</md-icon>
                            </md-button>
                        </md-table-cell>
                    </md-table-row>
                </md-table>
            </div>
            <div class="flex-item" style="margin-top: 5px;">                
                <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header style="height: 310px;margin: 0;" @md-selected="selectOffTrain">
                    <md-table-toolbar>
                        <md-field md-clearable class="md-toolbar-section-start">
                            <md-input placeholder="搜索设备编号" v-model="search" @input="searchOnTable"/>
                        </md-field>
                        <div class="md-toolbar-section-end">
                            <md-button class="md-icon-button md-raised md-primary" title="配属" @click="addDevice">
                                <md-icon>add</md-icon>
                            </md-button>
                        </div>
                    </md-table-toolbar>
                    <md-table-row slot="md-table-row" slot-scope="{ item }" :class="getClass(item)" md-selectable="single">
                        <md-table-cell md-label="设备编号">{{ item.code }}</md-table-cell>
                        <md-table-cell md-label="设备名称">{{ item.name }}</md-table-cell>
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
        return items.filter(item => item.code.includes(term))
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
            let typedata = this.$store.state.typeData
            typedata.for
            return typedata
        },
        deviceData () {
            return this.$store.state.deviceData
        },
        selectedPath (){
            return this.$store.getters.getSelectedNodePath
        },
        selectedNode () {
            return this.$store.getters.getSelectedNode
        },        
        devicesOnTrain () {
            return this.$store.state.devicesOnTrain
        },
        devicesOffTrain () {
            return this.$store.state.devicesOffTrain
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
            offTrainDevices: []
        }
    },
    methods: {
        getClass: ({ id }) => ({
            'md-primary': id != ''
        }),
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
        this.parenttypeid = this.$route.params.id
        this.rootName = this.$route.params.id
        this.searched = this.devicesOffTrain
    }
}
</script>

<style scoped>
.flex-content{
  display: flex;
  justify-content: flex-start;
  width: 100%;
}
.flex-item{
  width: 100%;
}
.flex-right{
    flex-direction: column;
}
.btn-position{
    margin-left: 15px;
    margin-bottom: 15px;
}
.device-type-tree{
  width: 240px;
  padding: 0;
}
.device-content{
    max-height: 450px;
    overflow: auto;
}
</style>
