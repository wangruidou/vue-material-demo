<template>
    <div>
        <table style="width: 100%; padding: 15px;">
            <tr v-for="i in 5" :key="i">
                <td>
                    <p>设备编号:</p>
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
            initial: ''
        }
    }
}
</script>

<style>

</style>
