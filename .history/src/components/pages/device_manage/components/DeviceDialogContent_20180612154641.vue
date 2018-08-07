<template>
    <div :deviceKinds="deviceKinds" :defaultValue="defaultValue">
        <table class="tab-con">
            <tr v-for="(value, key) in tabTitle" :key="key">
                <td class="tab-title">
                    {{value}}
                </td>
                <td>
                    <md-field>
                        <md-input v-if="key=='devicecode'" v-model="filterparam[key]" placeholder="请输入.."></md-input>
                        <md-select v-else-if="key=='devicekindname'" v-model="filterparam[key]" :name="key" :id="key" placeholder="请选择..">
                            <md-option v-for="item in deviceKinds" :value="item.name" :key="item.id">{{item.name}}</md-option>
                        </md-select>
                    </md-field>
                </td>
            </tr>
        </table>
        <div class="tab-btn">
            <md-button class="md-dense" @click="closeDlg">关闭</md-button>
            <md-button class="md-dense md-raised md-primary" @click="saveDlg">保存</md-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'device-dialog',
    props: {
        params: {
            type: Array
        },
        deviceKinds: {
            type: Array
        },
        defaultValue: {
            type: Object
        }
    },
    data () {
        return {
            tabTitle: {
                devicecode: '设备编号',
                devicekindname: '设备型号'
            },
            defaultItem:{}
        }
    },
    methods: {
        closeDlg () {
            this.$emit('closeDlg')
        },
        saveDlg () {
            this.$emit('saveDlg', this.defaultItem)
        }
    },
    computed: {
        filterparam () {
            if(this.$utils.isEmptyObject(this.defaultValue)){
                return {}
            } else {
                return this.defaultItem
            }
        }
    },
    created() {
        // console.log(this.defaultValue)
    }
}
</script>

<style scoped>
.tab-con{
    width: 100%;
    height: 100%;
    padding: 0 20px 0 20px;
}
.tab-title{
    width: 70px;
}
.tab-btn{
    margin-left: 300px;
}
.md-field{
    margin: -20px 0px 10px;
}
</style>
