<template>
    <md-card class="screen-tab" v-if="isShow" :paramsData="paramsData">
        <md-button class="md-icon-button reset-card" v-on:click="resetCard" title="重置">
            <md-icon class="md-size-1x">refresh</md-icon>
        </md-button>
        <md-button class="md-icon-button close-card" v-on:click="closeCard" title="关闭">
            <md-icon class="md-size-1x">clear</md-icon>
        </md-button>
        <md-divider style="margin-top: 10px"></md-divider>
        <md-field class="screen-content">
            <label for="deviceModel">设备型号</label>
            <md-select v-model="deviceModel" name="deviceModel" id="deviceModel" @md-selected="handleSelected">
                <md-option value="none">全部</md-option>
                <md-option v-for="item in paramsData" :value="item.name" :key="item.id">{{item.name}}</md-option>
            </md-select>
        </md-field>
    </md-card>
</template>

<script>
export default {
    name: 'device-screen',
    props: {
        isShow: {
            type: Boolean,
            default: false
        },
        paramsData: {
            type: Array
        }
    },
    data () {
        return {
            deviceModel: 'none',
            filterParams: [],
            selectedItemKinds: [],
            selectedItemParams: [],
            selectedItemPoints: [],
        }
    },
    methods: {
        closeCard () {
            this.$emit('closeCard');
        },
        resetCard () {
            this.$emit('resetCard');
        },
        handleSelected (value){
            this.$emit('handleSelected', value)
        }
    },
    created(){
        
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
.screen-content{
    margin: 0;
    margin-left: 25px;
}
</style>
