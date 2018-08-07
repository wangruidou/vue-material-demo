<template>
    <div>
        <table class="tab-con" :params="params" :points="points">
            <tr v-for="(value, key) in tabTitle" :key="key">
                <td>
                    <p>{{value}}</p>
                </td>
                <td>
                    <md-field>
                        <md-input :v-model="key" placeholder="请输入设备编号..."></md-input>
                    </md-field>
                </td>
            </tr>
            <tr v-for="(value, key) in params" :key="key">
                <td>{{value}}</td>
                <td>
                    
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
        }
    },
    data () {
        return {
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
