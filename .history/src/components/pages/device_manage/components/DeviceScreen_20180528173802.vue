<template>
    <md-card class="screen-tab" v-if="isShow" :kindsData="kindsData" :paramsData="paramsData" :pointsData="pointsData">
        <md-button class="md-icon-button reset-card" v-on:click="resetCard" title="重置">
            <md-icon class="md-size-1x">refresh</md-icon>
        </md-button>
        <md-button class="md-icon-button close-card" v-on:click="closeCard" title="关闭">
            <md-icon class="md-size-1x">clear</md-icon>
        </md-button>
        <md-field class="screen-content">
            <label for="deviceModel">设备型号</label>
            <md-select v-model="deviceModel" name="deviceModel" id="deviceModel" @md-selected="handleSelected">
                <md-option value="none">全部</md-option>
                <md-option v-for="item in kindsData" :value="item.name" :key="item.id">{{item.name}}</md-option>
            </md-select>
        </md-field>

        <md-divider style="margin-top: 10px"></md-divider>

        <table>
            <tr v-for="item in paramsData" :key="item.id">
                <td>
                    {{item.name}}
                </td>
                <td>
                    <md-select v-model="filterParams[$utils.trainsIdToKey(item.id)]" :name="$utils.trainsIdToKey(item.id)" :id="$utils.trainsIdToKey(item.id)"
                        @md-selected="handleSelectedParams">
                        <md-option value="none">全部</md-option>
                        <md-option v-for="(v, k) in item.enable" :value="v" :key="k">{{v}}</md-option>
                    </md-select>
                </td>
            </tr>
        </table>
        <md-divider style="margin-top: 10px"></md-divider>
        <table>
            <tr v-for="item in pointsData" :key="item.id">
                <td>
                    {{item.name}}
                </td>
                <td>
                    <md-field>
                        <md-select v-if="item.pointType == 'Select'" v-model="filterPoints[$utils.trainsIdToKey(item.id)]" :name="$utils.trainsIdToKey(item.id)" :id="$utils.trainsIdToKey(item.id)"
                            @md-selected="handleSelectedParams">
                            <md-option value="none">全部</md-option>
                            <md-option v-for="(v, k) in item.enable" :value="v" :key="k">{{v}}</md-option>                            
                        </md-select>
                        <md-select v-else-if="item.pointType == 'Boolean'" v-model="filterPoints[$utils.trainsIdToKey(item.id)]" :name="$utils.trainsIdToKey(item.id)" :id="$utils.trainsIdToKey(item.id)"
                            @md-selected="handleSelectedParams">
                            <md-option value="none">全部</md-option>
                            <md-option :value="item.falseValue">{{item.falseValue}}</md-option>
                            <md-option :value="item.trueValue">{{item.trueValue}}</md-option>                            
                        </md-select>
                        <md-input v-else-if="item.pointType == 'Number'" type="number" v-model="filterPoints[$utils.trainsIdToKey(item.id)]" :name="$utils.trainsIdToKey(item.id)" 
                            :id="$utils.trainsIdToKey(item.id)" :autocomplete="$utils.trainsIdToKey(item.id)"></md-input>
                        <md-input v-else v-model="filterPoints[$utils.trainsIdToKey(item.id)]" :name="$utils.trainsIdToKey(item.id)" :id="$utils.trainsIdToKey(item.id)" :autocomplete="$utils.trainsIdToKey(item.id)"></md-input>                    
                    </md-field>
                </td>
            </tr>
        </table>
        
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
        kindsData: {
            type: Array
        },
        paramsData: {
            type: Array
        },
        pointsData: {
            type: Array
        }
    },
    data () {
        return {
            deviceModel: 'none',
            filterParams: [],
            filterPoints: []
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
        },
        handleSelectedParams (value) {
            this.$emit('handleSelectedParams', this.filterParams)
        }
    },
    created(){
        
    }
}
</script>

<style scoped>
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
    width: 310px;
}
.md-field{
    margin: -20px 0px 10px;
}
</style>
