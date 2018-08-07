<template>
    <div>
        <table style="width: 100%; padding: 15px;">
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
        </table>
    </div>
</template>

<script>
export default {
    name: 'device-dialog',
    props: {

    },
    data () {
        return {
            initial: '',
            tabTitle: {
                devicecode: '设备编号',
                devicestatus: '设备状态',
                devicetype: '设备型号',
                devicekind: '设备种类',
                firstusedate: '首次使用日期'
            }
        }
    }
}
</script>

<style>

</style>
