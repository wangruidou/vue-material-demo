<template>
    <div :params="params" :points="points" :deviceKinds="deviceKinds">
        <table class="tab-con">
            <tr v-for="(value, key) in tabTitle" :key="key">
                <td class="tab-title">
                    <p>{{value}}</p>
                </td>
                <td>
                    <md-field>
                        <md-input v-if="key=='devicecode'" :v-model="key" placeholder="请输入设备编号..."></md-input>
                        <md-select v-else-if="key=='devicetype'" v-model="filterKinds[key]" :name="key" :id="key" @md-selected="handleSelected">
                            <md-option v-for="item in deviceKinds" :value="item.name" :key="item.id">{{item.name}}</md-option>
                        </md-select>
                    </md-field>
                </td>
            </tr>            
        </table>
        <md-divider style="margin-top: 10px"></md-divider>
        <table class="tab-con">
            <tr v-for="(item, key) in params" :key="key">
                <td class="tab-title">{{item.name}}</td>
                <td>
                    <md-field>
                        <md-select v-model="filterParams[$utils.trainsIdToKey(item.id)]" :name="$utils.trainsIdToKey(item.id)" :id="$utils.trainsIdToKey(item.id)"
                            @md-selected="handleSelectedParams">
                            <md-option v-for="(v, k) in item.enable" :value="v" :key="k">{{v}}</md-option>
                        </md-select>
                    </md-field>
                </td>
            </tr>
        </table>
        <md-divider style="margin-top: 10px"></md-divider>
        <table class="tab-con">
            <tr v-for="(item, key) in points" :key="key">
                <td class="tab-title">{{item.name}}</td>
                <td>
                    <md-field>
                        <md-select v-if="item.pointType == 'Select'" v-model="filterParams[$utils.trainsIdToKey(item.id)]" :name="$utils.trainsIdToKey(item.id)" :id="$utils.trainsIdToKey(item.id)"
                            @md-selected="handleSelectedParams">
                            <md-option v-for="(v, k) in item.enable" :value="v" :key="k">{{v}}</md-option>
                        </md-select>
                        <md-select v-else-if="item.pointType == 'Boolean'" v-model="filterPoints[$utils.trainsIdToKey(item.id)]" :name="$utils.trainsIdToKey(item.id)" :id="$utils.trainsIdToKey(item.id)"
                            @md-selected="handleSelectedParams">
                            <md-option :value="item.falseValue">{{item.falseValue}}</md-option>
                            <md-option :value="item.trueValue">{{item.trueValue}}</md-option>                            
                        </md-select>

                        <md-input v-else-if="item.pointType == 'Number'" type="number" v-model="filterPoints[$utils.trainsIdToKey(item.id)]" :name="$utils.trainsIdToKey(item.id)" :id="$utils.trainsIdToKey(item.id)" :autocomplete="$utils.trainsIdToKey(item.id)"></md-input>

                        <md-input v-else v-model="filterPoints[$utils.trainsIdToKey(item.id)]" :name="$utils.trainsIdToKey(item.id)" :id="$utils.trainsIdToKey(item.id)" :autocomplete="$utils.trainsIdToKey(item.id)"></md-input>                    
                    </md-field>
                </td>
            </tr>
        </table>
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
            filterParams: [],
            filterPoints: [],
            tabTitle: {
                devicecode: '设备编号',
                devicetype: '设备型号'
            }
        }
    },
    methods: {
        handleSelected(value) {
            console.log(this.filterKinds)
            // this.$emit('', value)
        },
        handleSelectedParams(value) {
            console.log(this.filterParams)
        }
    },
    created() {
        console.log(this.deviceKinds)
    }
}
</script>

<style>
.tab-con{
    width: 100%;
    padding-left: 20px;
}
.tab-title{
    width: 166px;
}
</style>
