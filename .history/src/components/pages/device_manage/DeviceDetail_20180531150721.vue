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
        </div>
        <div class="detail-body">
            <div class="left" style="background-color: red">
                <p>11111</p>
            </div>
            <div class="right" style="background-color: blue">
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
    watch: {

    },
    created() {
        this.currentItem = this.$route.params.item
        console.log(this.currentItem)
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
