<template>
    <md-card class="screen-tab" v-if="isShow" :value="value">
        <md-button class="md-icon-button reset-card" v-on:click="resetCard" title="重置">
            <md-icon class="md-size-1x">refresh</md-icon>
        </md-button>
        <md-button class="md-icon-button close-card" v-on:click="closeCard" title="关闭">
            <md-icon class="md-size-1x">clear</md-icon>
        </md-button>
        <md-divider style="margin-top: 10px"></md-divider>
        <md-field class="screen-content" v-for="item in selectedItemParams">
            <label>{{item.name}}</label>
            <md-select v-model="filterParams[$utils.trainsIdToKey(item.id)]" :name="$utils.trainsIdToKey(item.id)" :id="$utils.trainsIdToKey(item.id)"
                @md-selected="handleSelectedParams">
                <md-option value="none">全部</md-option>
                <md-option v-for="v in item.enable" :value="v">{{v}}</md-option>
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
        value: {
            type: Array
        }
    },
    data () {
        return {
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
        handleSelectedParams (value){
            this.$emit('handleSelectedParams', value);
        }
    },
    created(){
        console.log(this.value)
        // this.selectedItemParams = this.value.model.params
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
