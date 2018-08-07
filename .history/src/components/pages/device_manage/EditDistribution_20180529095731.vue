<template>
    <div class="flex-content">
        <div class="flex-item device-type-tree">
            <md-button class="md-icon-button md-dense md-raised md-primary btn-position" @click="returnDeviceManage" title="返回">
                <md-icon>replay</md-icon>
            </md-button>
            <TypeTree class="type-tree-content" :rootName="rootName" :selectedPath="selectedPath" :children="typeData"></TypeTree>
        </div>
        <div class="flex-item flex-right">
            <div class="flex-item">
                <p>111</p>
            </div>
            <div class="flex-item">
                <p>222</p>
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
            devicesOnTrain: [
                {
                    name: '罗技M585',
                    code: '12412535'
                },
                {
                    name: '罗技M585',
                    code: '2324124'
                },
                {
                    name: '双飞燕M139',
                    code: '2542121'
                },
            ],
            devicesOffTrain: [
                {
                    name: '罗技M585',
                    code: '12435'
                },
                {
                    name: '罗技M392',
                    code: '232444'
                },
                {
                    name: '双飞燕M139',
                    code: '5462'
                },
                {
                    name: '双飞燕Z11',
                    code: '676432'
                },
                {
                    name: '罗技M392',
                    code: '34511'
                },
            ]
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
    max-height: 550px;
    overflow: auto;
}
</style>
