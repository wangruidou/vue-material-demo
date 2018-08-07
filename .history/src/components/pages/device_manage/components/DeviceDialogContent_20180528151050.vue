<template>
    <div>
        <table class="tab-con">
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
.device-type-tree{
  width: 240px;
  padding: 0;
}
</style>
