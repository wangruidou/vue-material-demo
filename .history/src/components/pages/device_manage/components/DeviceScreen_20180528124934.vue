<template>
    <md-card class="screen-tab" v-if="isShow">
        <md-button class="md-icon-button close-card" v-on:click="closeCard" title="关闭">
            <md-icon class="md-size-1x">clear</md-icon>
        </md-button>
    </md-card>
</template>

<script>
export default {
    name: 'device-screen',
    props: {
        isShow: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            
        }
    },
    methods: {
        closeCard () {
            
        }
    }
}
</script>

<style>
.screen-tab{
    background-color: #595959;
    width: 420px;
    height: 380px;
    position: absolute;
    left: 265px;
    top: 135px;
    z-index: 999;
}
.md-content-screen {
    background-color: #595959;
    max-width: 420px;
    max-height: 380px;
    padding: 5px;
    overflow: auto;
}
.close-card{
    position: absolute;
    right: 5px;
}
.reset-card{
    position: absolute;
    right: 40px;
}
</style>
