<template>
    <div>
        <table class="tab-con" :params="params" :points="points">
            <tr v-for="(value, key) in tabTitle" :key="key">
                <td>
                    <p>{{value}}</p>
                </td>
                <td>
                    <md-field>
                        <md-input v-if="key==devicecode" :v-model="key" placeholder="请输入设备编号..."></md-input>
                        <md-select v-else-if="key==devicetype" v-model="deviceModel" name="deviceModel" id="deviceModel" @md-selected="handleSelected">
                            <md-option v-for="item in kindsData" :value="item.name" :key="item.id">{{item.name}}</md-option>
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
        }
    },
    data () {
        return {
            deviceModel: '',
            tabTitle: {
                devicecode: '设备编号',
                devicetype: '设备型号',
                devicekind: '设备种类'
            }
        }
    }
}
</script>

<style>
.tab-con{
    width: 100%; 
    padding: 15px;
}
</style>
