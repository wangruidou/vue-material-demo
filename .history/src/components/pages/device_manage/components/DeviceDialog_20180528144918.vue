<template>
    <div v-if="showDlg">
        <md-dialog class="device-dialog-con" :md-active.sync="showDialog">

        </md-dialog>
    </div>
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
.device-content{
    max-width: 650px;
    max-height: 510px;
    overflow: auto;
}
</style>
