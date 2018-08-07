<template>
    <div class="detail-content">
        <div class="detail-header">
            <md-toolbar slot="tree-toolbar" class="md-dense" md-elevation="0">
                <md-button class="md-icon-button" @click="backToLastPage" title="返回">
                    <md-icon>keyboard_backspace</md-icon>
                </md-button>
                <div class="md-toolbar-section-start">
                    <span>设备详细信息</span>
                </div>
            </md-toolbar>
            <md-table v-model="currentItem" md-card>
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="设备编号">{{ item.devicecode }}</md-table-cell>
                </md-table-row>
            </md-table>
        </div>
        <div class="detail-body">
            <div class="left">
                <p>11111</p>
            </div>
            <div class="right">
                <p>22222</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'device-detail',
    data() {
        return {
            currentItem: null
        }
    },
    methods: {
        backToLastPage (){            
            this.$router.push({path: '/EditDistribution'})
        }
    },
    computed: {
        currentItem() {
            console.log($route.params.item)
            return $route.params.item
        }
    },
    created() {

    }
}
</script>

<style>
.detail-content{
    display: flex;
    flex-direction: column;
}
.detail-content div{
    flex: 1;
}
.detail-body{
    display: flex
}
.detail-body,.left,.right{
    flex: 0 0 50%
}
</style>
