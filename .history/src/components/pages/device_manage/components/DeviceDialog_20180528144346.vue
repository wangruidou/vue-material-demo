<template>
    <md-dialog class="device-dialog-con" v-if="showDlg" :md-active.sync="showDialog">
        
    </md-dialog>
</template>

<script>
export default {
    name: 'device-dialog',
    props: {
        showDlg: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            showDialog: true
        }
    }
}
</script>

<style>
.device-dialog-con{
    width: 650px;
    height: 510px;;
}
.device-content{
    max-width: 650px;
    max-height: 510px;
    overflow: auto;
}
</style>
