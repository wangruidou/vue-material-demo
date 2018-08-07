<template>
  <div class="flex-content">
      <div class="flex-item device-type-tree">
          <TypeTree class="type-tree-content" rootName="全部种类" :selectedPath="selectedPath" :children="typeData" v-on:onNodeSelectedChange="onNodeSelectedChange"></TypeTree>
      </div>
      <div class="flex-item">
        <md-table v-model="searched" md-card md-fixed-header @md-selected="onSelect">
            <md-table-toolbar>
                <div class="md-toolbar-section-start">
                    <h3>设备列表</h3>
                    <md-button class="md-raised md-primary" @mouseover="currendNodeid != '' ? (isShow = true) : (isShow = false)">筛选数据</md-button>
                </div>
                <md-button class="md-raised md-primary" @click="editChildren">修改配属</md-button>
                <md-button class="md-icon-button" title="添加" @click="addDevices">
                    <md-icon>add</md-icon>
                </md-button>
                <md-button class="md-icon-button" title="修改" @click="editDevices">
                    <md-icon>edit</md-icon>
                </md-button>
                <md-button class="md-icon-button" title="报废" @click="deleteDevices">
                    <md-icon>delete</md-icon>
                </md-button>
                <md-button class="md-icon-button" title="上传文件" @click="handleUploadFile">
                    <md-icon>publish</md-icon>
                </md-button>
                <md-field title="上传文件" style="display: none;">
                    <md-file v-model="importInfos" id="upload_file"/>
                </md-field>
            </md-table-toolbar>
            <md-table-empty-state md-label="未找到设备"></md-table-empty-state>

            <md-table-row slot="md-table-row" slot-scope="{ item }" :class="getClass(item)" md-selectable="single">
                <md-table-cell md-label="设备编号">{{ item.devicecode }}</md-table-cell>
                <md-table-cell md-label="设备种类">{{ item.devicekind }}</md-table-cell>
                <md-table-cell md-label="首次使用日期">{{ item.firstusedate }}</md-table-cell>
                <md-table-cell md-label="设备型号">{{ item.devicetype }}</md-table-cell>
                <md-table-cell md-label="设备状态">{{ item.devicestatus }}</md-table-cell>
            </md-table-row>
        </md-table>
        
        <DeviceScreen :isShow="isShow" v-on:closeCard="isShow = false" v-on:resetCard="resetCard" :kindsData="selectedItemKinds"
            v-on:handleSelected="handleSelected" :paramsData="selectedItemParams" :pointsData="selectedItemPoints" 
            v-on:handleSelectedParams="handleSelectedParams"></DeviceScreen>
        
        <md-snackbar :md-position="position" :md-duration="2000" :md-active.sync="snackbarActive" md-persistent>
            <span>{{snackbarInfo}}</span>
        </md-snackbar>
      </div>

      <md-dialog :md-active.sync="showDialog">
          <md-dialog-title>{{deviceDialogTitle}}</md-dialog-title>
          <md-content class="md-scrollbar device-content">
              <DeviceDialogContent :deviceKinds="selectedItemKinds" :points="selectedItemPoints" :defaultValue="defaultValue"
                v-on:closeDlg="showDialog = false" v-on:saveDlg="saveDlg"></DeviceDialogContent>
          </md-content>
      </md-dialog>
  </div>
</template>

<script>
import TypeTree from "../../device_type_tree/DeviceTypeTree.vue";
import DeviceScreen from './components/DeviceScreen.vue'
import DeviceDialogContent from './components/DeviceDialogContent.vue'

export default {
  name: "TableSearch",
  components: {
    TypeTree,
    DeviceScreen,
    DeviceDialogContent
  },
  data: () => ({
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
    defaultValue: []
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
    onNodeSelectedChange (path) {
        this.$store.commit('setSelectedNode',path)
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
        this.defaultValue = {}
    },
    editDevices () {
        if (this.selectedItem == null) {
            this.snackbarInfo = '请选择设备'
            this.snackbarActive = true
            return false
        } else {
            this.deviceDialogTitle = '修改设备'
            this.showDialog = true
        }
        this.defaultValue = this.selectedItem
    },
    deleteDevices () {
        if (this.selectedItem == null) {
            this.snackbarInfo = '请选择设备'
            this.snackbarActive = true
            return false
        }
        alert('设备报废！')
    },
    editChildren () {        
        if (this.selectedItem == null) {
            this.snackbarInfo = '请选择设备'
            this.snackbarActive = true
        } else {
            let id = this.selectedItem.devicecode
            let typeid = this.selectedItem.typeid
            
            let ary = this.$utils.getTypeTreeData(this.typeData, typeid)
            if ((!'children' in ary) || ary.children.length == 0) {                
                this.snackbarInfo = '该设备没有子级设备，不需要配属'
                this.snackbarActive = true
                return false
            }
            this.$router.push({
                path: '/EditDistribution',
                name: 'EditDistribution',
                params: {
                    name: id,
                    dataObj: ary.children
                }
            })
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
        if(!this.$utils.isEmptyObject(this.paramsObj)){
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
            if(!this.$utils.isEmptyObject(keys)) {
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
    resetCard () {
        alert("重置")
    },
    saveDlg (value) {
        this.snackbarActive = true
        this.snackbarInfo = '添加成功'
        this.showDialog = false
        this.searched.push(value)
        console.log(value)
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
.md-dialog{
    max-width: 650px;
    max-height: 400px;
    height: 400px;
}
.device-content{
    max-width: 650px;
    max-height: 510px;
    overflow: auto;
}
</style>