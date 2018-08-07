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
                    <md-button class="md-raised md-primary" @mouseover="currentNodeid != '' ? (isShow = true) : (isShow = false)">筛选数据</md-button>
                </div>
                <md-button class="md-raised md-primary" @click="editChildren">修改配属</md-button>
                <md-button class="md-icon-button" title="添加" @click="addDevice">
                    <md-icon>add</md-icon>
                </md-button>
                <md-button class="md-icon-button" title="修改" @click="editDevice">
                    <md-icon>edit</md-icon>
                </md-button>
                <md-button class="md-icon-button" title="报废" @click="scrapDevice">
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
                <md-table-cell md-label="设备种类">{{ item.devicekindname }}</md-table-cell>
                <md-table-cell md-label="设备型号">{{ item.devicetypename }}</md-table-cell>
                <md-table-cell md-label="建档日期">{{ item.createdate }}</md-table-cell>
                <md-table-cell md-label="已使用时长">{{ $utils.trainsDataBetweenNow(item.firstusedate) }}</md-table-cell>
                <md-table-cell md-label="设备状态">{{ $utils.trainsDeviceStatus(item.devicestatus) }}</md-table-cell>
                <md-table-cell md-label="更多信息">
                    <md-button class="md-icon-button" @click="moreInfos(item)">
                        <md-icon>navigate_next</md-icon>
                    </md-button>
                </md-table-cell>
            </md-table-row>
        </md-table>
        
        <DeviceScreen :isShow="isShow" v-on:closeCard="isShow = false" v-on:resetCard="resetCard" :kindsData="selectedItemKinds"
            v-on:handleSelected="handleSelected" :paramsData="selectedItemParams" :pointsData="selectedItemPoints" 
            v-on:handleSelectedParams="handleSelectedParams"></DeviceScreen>
        
        <md-snackbar :md-position="position" :md-duration="2000" :md-active.sync="snackbarActive" md-persistent>
            <span>{{snackbarInfo}}</span>
        </md-snackbar>
      </div>

      <md-dialog :md-active.sync="showDialog" class="deviceinfo">
          <md-dialog-title>{{deviceDialogTitle}}</md-dialog-title>
          <md-content class="md-scrollbar device-content">
              <DeviceDialogContent :deviceKinds="selectedItemKinds" :defaultValue="defaultValue"
                v-on:closeDlg="showDialog = false" v-on:saveDlg="saveDlg"></DeviceDialogContent>
          </md-content>
      </md-dialog>

      <md-dialog-confirm :md-active.sync="active"        
        md-title="设备报废"
        :md-content="scrapinfo"
        md-confirm-text="是"
        md-cancel-text="否"
        @md-cancel="active = false"
        @md-confirm="onConfirm" />
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
    currentNodeid: '',
    currentModel: {},
    searched: [],
    devices: [],
    importInfos: '',
    deviceDialogTitle: '',
    selectedItem: null,
    selectedItemKinds: [],
    selectedItemParams: [],
    selectedItemPoints: [],
    paramsObj: {},
    defaultValue: [],
    active: false,
    scrapinfo: ''
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
    addDevice () {
        if(this.currentNodeid == ''){
            this.snackbarInfo = '请在左侧选择设备种类'
            this.snackbarActive = true
            return false
        }
        this.deviceDialogTitle = '添加设备'
        this.showDialog = true
        this.defaultValue = {}
    },
    editDevice () {
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
    scrapDevice () {
        if (this.selectedItem == null) {
            this.snackbarInfo = '请选择设备'
            this.snackbarActive = true
            return false
        }

        if (this.selectedItem.children.length > 0) {
            this.scrapinfo = '当前选择的设备含有子设备，是否一起报废？如果不需要报废子设备，请先卸载子设备再报废该设备。'
        } else {
            this.scrapinfo = '是否报废当前选择的设备？'
        }

        this.active = true
    },
    editChildren () {        
        if (this.selectedItem == null) {
            this.snackbarInfo = '请选择设备'
            this.snackbarActive = true
        } else {
            let typeid = this.selectedItem.devicetypeid
            
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
                    item: this.selectedItem,
                    dataObj: ary.children
                }
            })
        }
    },
    moreInfos (item) {
        this.$router.push({
            path: '/DeviceDetail',
            name: 'DeviceDetail',
            params: {
                item: item,
                model: this.currentModel
            }
        })
    },    
    handleSelected (value) {
        if (value == "none"){
            this.paramsObj['devicekindname'] = ''
        } else{
            this.paramsObj['devicekindname'] = value
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
                    item = Object.assign(item, item.params, item.points)
                    let flag = true
                    for(let k in keys){
                        if(values[k] == "" || values[k] == "none"){
                            continue
                        }                        
                        flag = item[keys[k]] == values[k] ? true : false
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
    resetCard () { // 重置
        
    },
    saveDlg (value) {
        if(this.$utils.isEmptyObject(this.defaultValue)){ // 添加

            console.log(value)
            let date = value.productiondate

            //value.productiondate = ''

            // let this_ = this
            // this.$ajax.post('device/add', 'msg=' + JSON.stringify(value)) 
            // .then(function (response) {
            //   if (response.data.errorcode == 0) {
            //     value.typeid = this_.currentNodeid
            //     this_.snackbarActive = true
            //     this_.snackbarInfo = '添加成功'
            //     this_.searched.push(value)

            //     this_.snackbarInfo = '设备添加成功'
            //     this_.snackbarActive = true
            //   } else {
            //     this_.snackbarInfo = '设备添加失败'
            //     this_.snackbarActive = true
            //   }
            // })
            // .catch(function (error) {
            //   console.log(error)
            // })            
        } else { // 修改
            let index = this.searched.indexOf(this.selectedItem)
            if (index >= 0){
                this.searched[index] = value
            }
            index = this.deviceData.indexOf(this.selectedItem)
            if (index >= 0){
                this.deviceData[index] = value
            }
            this.snackbarActive = true
            this.snackbarInfo = '修改成功'            
        }
        this.showDialog = false
    },
    onConfirm () {
        this.selectedItem.devicestatus = 0
        this.active = false
        let this_ = this
        let devices = []
        this.deviceData.forEach(function (item) {
            if (this_.currentNodeid == item.devicetypeid && item.devicestatus != 0){
                devices.push(item)
            }
        })
        this.devices = devices
        this.searched = this.devices
    }
  },
  watch: {
      selectedNode: function (newValue, oldValue) {
          this.selectedItem = null
          this.currentNodeid = newValue.model.typeid
          this.currentModel = newValue.model
          let this_ = this
          let devices = []
          if (this.deviceData) {
            this.deviceData.forEach(function (item) {
                if (this_.currentNodeid == item.devicetypeid && item.devicestatus != 0){
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
      importInfos: function (newVal, oldVal) {
          
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
.deviceinfo{
    max-width: 650px;
    max-height: 320px;
    height: 400px;
}
.device-content{
    max-width: 650px;
    max-height: 510px;
    overflow: auto;
}
</style>