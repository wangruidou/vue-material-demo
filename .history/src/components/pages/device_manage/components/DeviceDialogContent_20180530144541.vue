<template>
    <div :points="points" :deviceKinds="deviceKinds" >
        <table class="tab-con">
            <tr v-for="(value, key) in tabTitle" :key="key">
                <td class="tab-title">
                    {{value}}
                </td>
                <td>
                    <md-field>
                        <md-input v-if="key=='devicecode'" v-model="filterKinds[key]" placeholder="请输入.."></md-input>
                        <md-select v-else-if="key=='devicetype'" v-model="filterKinds[key]" :name="key" :id="key" placeholder="请选择..">
                            <md-option v-for="item in deviceKinds" :value="item.name" :key="item.id">{{item.name}}</md-option>
                        </md-select>
                    </md-field>
                </td>
            </tr>            
        </table>
        <md-divider v-if="points.length > 0" style="margin-top: 10px"></md-divider>
        <table class="tab-con">
            <tr v-for="(item, key) in points" :key="key">
                <td class="tab-title">{{item.name}}</td>
                <td>
                    <md-field>
                        <md-select v-if="item.pointType == 'Select'" v-model="filterPoints[$utils.trainsIdToKey(item.id)]" 
                            :name="$utils.trainsIdToKey(item.id)" :id="$utils.trainsIdToKey(item.id)" placeholder="请选择..">
                            <md-option v-for="(v, k) in item.enable" :value="v" :key="k">{{v}}</md-option>
                        </md-select>
                        <md-select v-else-if="item.pointType == 'Boolean'" v-model="filterPoints[$utils.trainsIdToKey(item.id)]" 
                            :name="$utils.trainsIdToKey(item.id)" :id="$utils.trainsIdToKey(item.id)" placeholder="请选择..">
                            <md-option :value="item.falseValue">{{item.falseValue}}</md-option>
                            <md-option :value="item.trueValue">{{item.trueValue}}</md-option>                            
                        </md-select>

                        <md-input v-else-if="item.pointType == 'Number'" type="number" v-model="filterPoints[$utils.trainsIdToKey(item.id)]" 
                            :name="$utils.trainsIdToKey(item.id)" :id="$utils.trainsIdToKey(item.id)" :autocomplete="$utils.trainsIdToKey(item.id)" placeholder="请输入.."></md-input>

                        <md-input v-else v-model="filterPoints[$utils.trainsIdToKey(item.id)]" :name="$utils.trainsIdToKey(item.id)" 
                            :id="$utils.trainsIdToKey(item.id)" :autocomplete="$utils.trainsIdToKey(item.id)" placeholder="请输入.."></md-input>                    
                    </md-field>
                </td>
            </tr>
        </table>
        <div class="tab-btn">
            <md-button @click="closeDlg">关闭</md-button>
            <md-button class="md-raised md-primary" @click="saveDlg">保存</md-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'device-dialog',
    props: {
        params: {
            type: Array
        },
        points: {
            type: Array
        },
        deviceKinds: {
            type: Array
        }
    },
    data () {
        return {
            filterKinds: [],
            filterPoints: [],
            tabTitle: {
                devicecode: '设备编号',
                devicetype: '设备型号'
            }
        }
    },
    methods: {
        closeDlg () {
            this.$emit('closeDlg')
        },
        saveDlg () {
            this.$emit('saveDlg', Object.assign(this.filterKinds, this.filterPoints))
        }
    },
    computed: {

    },
    created() {
        
    }
}
</script>

<style scoped>
.tab-con{
    width: 100%;
    height: 100%;
    padding: 0 20px 0 20px;
}
.tab-title{
    width: 70px;
}
.tab-btn{
    margin-left: 400px;
}
.md-field{
    margin: -20px 0px 10px;
}
</style>
