<template>
    <div class="flex-content">
        <div class="flex-item device-type-tree">
            <md-button class="md-icon-button md-dense md-raised md-primary btn-position" @click="returnDeviceManage" title="返回">
                <md-icon>keyboard_backspace</md-icon>
            </md-button>
            <TypeTree class="type-tree-content" :rootName="rootName" :selectedPath="selectedPath" :children="typeData"></TypeTree>
        </div>
        <div class="flex-item flex-right">
            <div class="flex-item" style="margin:0 400px 5px;">
                <md-avatar class="md-avatar-icon md-primary" title="更换设备">
                    <md-button>
                        <md-icon>refresh</md-icon>
                    </md-button>
                </md-avatar>

                <md-avatar class="md-avatar-icon md-accent" title="卸载设备">
                    <md-button>
                        <md-icon>reply</md-icon>
                    </md-button>
                </md-avatar>

                <md-avatar class="md-avatar-icon md-accent" title="卸载所以设备">
                    <md-button>
                        <md-icon>reply_all</md-icon>
                    </md-button>
                </md-avatar>
            </div>
            <div class="flex-item">
                <md-table v-model="devicesOnTrain" md-card style="height: 250px;">
                    <md-table-toolbar>
                        <div class="md-toolbar-section-start">
                            <md-button class="md-icon-button md-raised md-accent" title="卸载">
                                <md-icon>remove</md-icon>
                            </md-button>
                        </div>
                    </md-table-toolbar>
                    <md-table-row slot="md-table-row" slot-scope="{ item }" :class="getClass(item)" md-selectable="single"  >
                        <md-table-cell md-label="设备名称">{{ item.name }}</md-table-cell>
                        <md-table-cell md-label="设备编号">{{ item.code }}</md-table-cell>
                    </md-table-row>
                </md-table>
            </div>
            <div class="flex-item" style="margin-top: 5px;">
                <md-table v-model="devicesOffTrain" md-sort="name" md-sort-order="asc" md-card md-fixed-header style="height: 275px;">
                    <md-table-toolbar>
                        <div class="md-toolbar-section-start">
                            <md-button class="md-icon-button md-raised md-primary" title="配属">
                                <md-icon>add</md-icon>
                            </md-button>
                        </div>

                        <md-field md-clearable class="md-toolbar-section-end">
                            <md-input placeholder="Search by name..." v-model="search"  />
                        </md-field>
                    </md-table-toolbar>
                    <md-table-row slot="md-table-row" slot-scope="{ item }" :class="getClass(item)" md-selectable="single">
                        <md-table-cell md-label="设备名称">{{ item.name }}</md-table-cell>
                        <md-table-cell md-label="设备编号">{{ item.code }}</md-table-cell>
                    </md-table-row>
                </md-table>
            </div>
        </div>
    </div>
</template>

<script>
import TypeTree from "../../device_type_tree/DeviceTypeTree.vue";

export default {
    name: 'EditDistribution',    
    components: {
        TypeTree
    },
    computed: {      
        typeData () {
            return this.$store.state.typeData
        },
        deviceData () {
            return this.$store.state.deviceData
        },
        selectedPath (){
            return this.$store.getters.getSelectedNodePath
        },
        selectedNode () {
            return this.$store.getters.getSelectedNode
        }
    },
    data() {
        return {
            search: '',
            rootName: '',
            id: '',
            typeid: '',
            devicesOnTrain: [],
            devicesOffTrain: []
        }
    },
    computed: {
        devicesOnTrain () {
            return this.$store.state.devicesOnTrain
        },
        devicesOffTrain () {
            return this.$store.state.devicesOffTrain
        }
    },
    methods: {
        returnDeviceManage() {
            this.$router.push({path: '/DeviceManage'})
        },
        getClass: ({ id }) => ({
            'md-primary': id != ''
        }),
    },
    created () {
        this.id = this.$route.params.id
        this.typeid = this.$route.params.id
        console.log(this.$route.params.id + '--' + this.$route.params.typeid)
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
