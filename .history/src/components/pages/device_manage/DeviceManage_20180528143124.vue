<template>
  <div class="flex-content">
      <div class="flex-item device-type-tree">
          <TypeTree class="type-tree-content" rootName="全部种类" :selectedPath="selectedPath" :children="typeData"></TypeTree>
      </div>
      <div class="flex-item">
        <md-table v-model="searched" md-card md-fixed-header @md-selected="onSelect">
            <md-table-toolbar>
                <div class="md-toolbar-section-start">
                    <h3>设备列表</h3>
                    <md-button class="md-raised md-primary" @mouseover="handleScreen">筛选数据</md-button>
                </div>
                <md-button class="md-raised md-primary" @click="editChildren">修改配属</md-button>
                <md-button class="md-icon-button" title="添加" @click="addDevices">
                    <md-icon>add</md-icon>
                </md-button>
                <md-button class="md-icon-button" title="修改" @click="editDevices">
                    <md-icon>edit</md-icon>
                </md-button>
                <md-button class="md-icon-button" title="删除" @click="deleteDevices">
                    <md-icon>remove</md-icon>
                </md-button>
                <md-button class="md-icon-button" title="上传文件" @click="handleUploadFile">
                    <md-icon>publish</md-icon>
                </md-button>
                <md-field title="上传文件" style="display: none;">
                    <md-file v-model="importInfos" id="upload_file"/>
                </md-field>
            </md-table-toolbar>
            <md-table-empty-state md-label="未找到设备"></md-table-empty-state>

            <!-- <md-table-row v-for="(value, key) in devices">
                <template v-for="(v, k) in value">
                    <md-table-cell :md-label="k">{{v}}</md-table-cell>
                </template>
            </md-table-row> -->
            <md-table-row slot="md-table-row" slot-scope="{ item }" :class="getClass(item)" md-selectable="single">
                <md-table-cell md-label="设备编号">{{ item.devicecode }}</md-table-cell>
                <md-table-cell md-label="设备种类">{{ item.devicekind }}</md-table-cell>
                <md-table-cell md-label="首次使用日期">{{ item.firstusedate }}</md-table-cell>
                <md-table-cell md-label="设备型号">{{ item.devicetype }}</md-table-cell>
                <md-table-cell md-label="设备状态">{{ item.devicestatus }}</md-table-cell>
                <md-table-cell md-label="设备报废">
                    <md-button class="md-raised md-accent" @click="handleScrap">报废</md-button>
                </md-table-cell>
            </md-table-row>
        </md-table>
        
        <DeviceScreen :isShow="isShow" v-on:closeCard="closeCard" v-on:resetCard="resetCard" :kindsData="selectedItemKinds"
            v-on:handleSelected="handleSelected" :paramsData="selectedItemParams" :pointsData="selectedItemPoints" 
            v-on:handleSelectedParams="handleSelectedParams"></DeviceScreen>
        
        <md-snackbar :md-position="position" :md-duration="2000" :md-active.sync="snackbarActive" md-persistent>
            <span>{{snackbarInfo}}</span>
        </md-snackbar>
      </div>
      
  </div>
</template>

<script>
import TypeTree from "../../device_type_tree/DeviceTypeTree.vue";
import DeviceScreen from './components/DeviceScreen.vue'

const isEmptyObject = (e) => {  
    var t;  
    for (t in e)  
        return !1;  
    return !0  
}  

export default {
  name: "TableSearch",
  components: {
    TypeTree,
    DeviceScreen
  },
  data: () => ({
      initial: '',
    position: 'center',
    snackbarActive: false,
    snackbarInfo: '',
    isShow: false,
    showDialog: false,
    currendNodeid: '',
    searched: [],
    devices: [],
    importInfos: '',
    deviceDialogTitle: '',
    selectedItem: null,
    selectedItemKinds: [],
    selectedItemParams: [],
    selectedItemPoints: [],
    paramsObj: {},
  }),
  computed: {      
    typeData () {
        return this.$store.state.typeData
    },
    deviceData () {
        return this.$store.state.deviceData
    },
    selectedPath (){
        return this.$store.getters.getSelectedNodePath
    },
    selectedNode () {
        let node = this.$store.getters.getSelectedNode
        return node
    }
  },
  methods: {
    getClass: ({ typeid }) => ({
        'md-primary': typeid != ''
    }),
    onSelect (item) {
        this.selectedItem = item
    },
    handleUploadFile () {
        document.getElementById("upload_file").click()
    },
    addDevices () {
        if(this.currendNodeid == ''){
            this.snackbarInfo = '请在左侧选择设备种类'
            this.snackbarActive = true
            return false
        }
        this.deviceDialogTitle = '添加设备'
        this.showDialog = true
    },
    editDevices () {
        if (this.selectedItem == null) {
            this.snackbarInfo = '请选择设备'
            this.snackbarActive = true
        } else {
            this.deviceDialogTitle = '修改设备'
            this.showDialog = true
        }
    },
    deleteDevices () {
        if (this.selectedItem == null) {
            this.snackbarInfo = '请选择设备'
            this.snackbarActive = true
            return false
        }
        alert('删除设备')
    },
    editChildren () {        
        if (this.selectedItem == null) {
            this.snackbarInfo = '请选择设备'
            this.snackbarActive = true
        } else {
            let id = this.selectedItem.devicecode
            this.$router.push({path: '/EditDistribution/' + id})
        }
    },
    handleScrap () {
        alert("设备报废")
    },
    handleScreen () {
        if(this.currendNodeid != ''){
            this.isShow = true
        } else {
            this.isShow = false
        }
    },
    handleSelected (value) {
        if (value == "none"){
            this.paramsObj['devicetype'] = ''
        } else{
            this.paramsObj['devicetype'] = value
        }
        this.screenData()
    },
    handleSelectedParams (value) {
        this.paramsObj = value
        this.screenData()
    },
    screenData() {
        if(!isEmptyObject(this.paramsObj)){
            let keys = []
            for(let k in this.paramsObj){
                this.paramsObj.hasOwnProperty(k)
                keys.push(k)
            }
            let values = []
            let this_ = this
            keys.forEach(function(v) {
                values.push(this_.paramsObj[v])
            })
            let selectData = []
            if(!isEmptyObject(keys)) {
                this.devices.forEach(function(item) {
                    let flag = true
                    for(let k in keys){
                        if(values[k] == "" || values[k] == "none"){
                            continue
                        }
                        if(item[keys[k]] == values[k]){
                            flag = true
                        } else{
                            flag = false
                        }
                        if(!flag){
                            break
                        }
                    }
                    if(flag){
                        selectData.push(item)
                    }
                })
            }
            this.searched = selectData
        }
    },
    closeCard () {
        this.isShow = false
    },
    resetCard () {
        alert("重置")
    }
  },
  watch: {
      selectedNode: function (newValue, oldValue) {
          this.currendNodeid = newValue.model.typeid
          let this_ = this
          let devices = []
          if (this.deviceData) {
            this.deviceData.forEach(function (item) {
                if (this_.currendNodeid == item.typeid){
                    devices.push(item)
                }
            })
          }
          this.devices = devices
          this.searched = this.devices

          this.selectedItemKinds = newValue.model.kinds
          this.selectedItemParams = newValue.model.params
          this.selectedItemPoints = newValue.model.points
      },
      importInfos: function (newVal, oldVal) { // 上传文件
          console.log(newVal)
      }
  },
  created() {

  }
};
</script>

<style lang="scss" scoped>
.md-field {
  max-width: 300px;
}
.flex-content{
  display: flex;
  justify-content: flex-start;
  width: 100%;
}
.flex-item{
  width: 100%;  
}
.device-type-tree{
  width: 240px;
  padding: 0;
}
</style>