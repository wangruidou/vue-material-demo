<template>
    <md-card class="screen-tab" v-show="showCard">
        <p>
            这里是内容
        </p>
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
        showCard () {
            if(isShow) {
                
            }
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
</style>
