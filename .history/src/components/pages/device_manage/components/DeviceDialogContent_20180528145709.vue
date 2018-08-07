<template>
    <div>
        <table style="width: 100%; padding: 15px;">
            <tr v-for="i in tabTitke" :key="i">
                <td>
                    <p>{{i}}</p>
                </td>
                <td>
                    <md-field>
                        <md-input v-model="initial" placeholder="请输入设备编号..."></md-input>
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
            tabTitke: [
                {
                    devicecode: '设备编号'
                },
                {
                    
                }
            ]
        }
    }
}
</script>

<style>

</style>
