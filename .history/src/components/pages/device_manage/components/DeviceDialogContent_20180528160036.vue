<template>
    <div>
        <table class="tab-con" :params="params" :points="points" :deviceKinds="deviceKinds">
            <tr v-for="(value, key) in tabTitle" :key="key">
                <td>
                    <p>{{value}}</p>
                </td>
                <td>
                    <md-field>
                        <md-input v-if="key=='devicecode'" :v-model="key" placeholder="请输入设备编号..."></md-input>
                        <md-select v-else-if="key=='devicetype'" v-model="filterPoints[$utils.trainsIdToKey(item.id)]" :name="$utils.trainsIdToKey(item.id)" :id="$utils.trainsIdToKey(item.id)" @md-selected="handleSelected">
                            <md-option v-for="item in deviceKinds" :value="item.name" :key="item.id">{{item.name}}</md-option>
                        </md-select>
                    </md-field>
                </td>
            </tr>
            <!-- <tr v-for="(value, key) in params" :key="key">
                <td>{{value}}</td>
                <td>
                    <md-select v-model="filterParams[$utils.trainsIdToKey(item.id)]" :name="$utils.trainsIdToKey(item.id)" :id="$utils.trainsIdToKey(item.id)"
                        @md-selected="handleSelectedParams">
                        <md-option v-for="(v, k) in item.enable" :value="v" :key="k">{{v}}</md-option>
                    </md-select>
                </td>
            </tr> -->
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
            filterPoints: [],
            tabTitle: {
                devicecode: '设备编号',
                devicetype: '设备型号'
            }
        }
    },
    methods: {
        handleSelected(value) {
            console.log(this.filterPoints)
            // this.$emit('', value)
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
    padding: 15px;
}
</style>
