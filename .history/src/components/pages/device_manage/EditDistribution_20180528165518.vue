<template>
    <div class="flex-content">
        <div class="flex-item device-type-tree">
            <md-button class="md-icon-button md-dense md-raised md-primary btn-position" @click="returnDeviceManage" title="返回">
                <md-icon>replay</md-icon>
            </md-button>
            <TypeTree class="type-tree-content" :rootName="rootName" :selectedPath="selectedPath" :children="typeData"></TypeTree>
        </div>
        <div class="flex-item device-children">
            <md-table v-model="people" md-card @md-selected="onSelect">
                <md-table-toolbar>
                    
                </md-table-toolbar>

                <md-table-row slot="md-table-row" slot-scope="{ item }" :md-disabled="item.name.includes('Stave')" md-selectable="multiple" md-auto-select>
                    <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
                </md-table-row>
            </md-table>
        </div>
        <div class="flex-item">

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
            rootName: '',
            id: '',
            typeid: '',
            people: ''
        }
    },
    methods: {
        returnDeviceManage() {
            this.$router.push({path: '/DeviceManage'})
        },
        onSelect (items) {

        }
    },
    created () {
        this.id = this.$route.params.id
        this.typeid = this.$route.params.id
        console.log(this.$route.params.id + '--' + this.$route.params.typeid)
    }
}
</script>

<style>
.flex-content{
  display: flex;
  justify-content: flex-start;
  width: 100%;
}
.flex-item{
  width: 100%;  
}
.btn-position{
    margin-left: 15px;
    margin-bottom: 15px;
}
.device-type-tree{
  width: 240px;
  padding: 0;
}
.device-children{
    width: 500px;
}
</style>
