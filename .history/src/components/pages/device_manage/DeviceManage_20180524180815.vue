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
                    <md-button class="md-raised md-primary" @mouseover="isShow = true">筛选数据</md-button>
                </div>
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
                <md-table-cell md-label="设备型号">{{ item.devicetype }}</md-table-cell>
                <md-table-cell md-label="设备种类">{{ item.devicekind }}</md-table-cell>
                <md-table-cell md-label="首次使用日期">{{ item.firstusedate }}</md-table-cell>
                <md-table-cell md-label="设备状态">{{ item.devicestatus }}</md-table-cell>
            </md-table-row>
        </md-table>
        
        <md-card class="screen-tab" v-show="isShow">
            <md-button class="md-icon-button reset-card" @click="resetCard" title="重置">
                <md-icon class="md-size-1x">refresh</md-icon>
            </md-button>
            <md-button class="md-icon-button close-card" @click="isShow = false" title="关闭">
                <md-icon class="md-size-1x">clear</md-icon>
            </md-button>
            <md-field class="screen-content">
                <label for="deviceModel">设备型号</label>
                <md-select v-model="deviceModel" name="deviceModel" id="deviceModel" @md-selected="handleSelected">
                    <md-option value="none">全部</md-option>
                    <md-option v-for="item in selectedItemKinds" :value="item.name" :key="item.id">{{item.name}}</md-option>
                </md-select>
            </md-field>
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
        
        <md-snackbar :md-position="position" :md-duration="2000" :md-active.sync="snackbarActive" md-persistent>
            <span>{{snackbarInfo}}</span>
        </md-snackbar>
      </div>
      <div>
        <md-dialog :md-active.sync="showDialog" class="device-dialog-con">
            <md-dialog-title>{{deviceDialogTitle}}</md-dialog-title>
            <md-content>
                <md-list>
                    <md-list-item>
                        
                    </md-list-item>
                </md-list>
            </md-content>
            <md-dialog-actions>
                <md-button class="md-primary" @click="showDialog = false">关闭</md-button>
                <md-button class="md-primary" @click="showDialog = false">保存</md-button>
            </md-dialog-actions>
        </md-dialog>
      </div>
  </div>
</template>

<script>
import TypeTree from "../../device_type_tree/DeviceTypeTree.vue";

const isEmptyObject = (e) => {  
    var t;  
    for (t in e)  
        return !1;  
    return !0  
}  

export default {
  name: "TableSearch",
  components: {
    TypeTree
  },
  data: () => ({
    position: 'center',
    snackbarActive: false,
    snackbarInfo: '',
    isShow: false,
    showDialog: false,
    searched: [],
    searched_: [],
    devices: [],
    filterParams: [],
    importInfos: '',
    deviceDialogTitle: '',
    selectedItem: null,
    deviceModel: 'none',
    selectedItemKinds: [],
    selectedItemParams: [],
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
        let params = []
        if(node){
            for (let i in node.model.params) {
                let k = this.$utils.trainsIdToKey(node.model.params[i].id)
                params[k] = 'none'
            }
            this.filterParams = params
        } else {
            this.filterParams = null
        }
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
    resetCard () {
        alert("重置")
    },
    addDevices () {
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
    handleSelected (value) {
        if (value == "none"){
            this.paramsObj['devicetype'] = ''
        } else{
            this.paramsObj['devicetype'] = value
        }
        this.screenData()
    },
    handleSelectedParams (value) {
        let this_ = this
        this.selectedItemParams.forEach(function (item) {
            let param = this_.$utils.trainsIdToKey(item.id) // key
            let selectValue = this_.filterParams[param] // value
            if(selectValue != "none"){
                this_.paramsObj[param] = selectValue
            } else {
                this_.paramsObj[param] = ''
            }
        })
        screenData()
    },
    screenData() {
        {
            let keys = []
            console.log(this.paramsObj)
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
                        if(values[k] == ""){
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
    }
  },
  watch: {
      selectedNode: function (newValue, oldValue) {
          let typeid = newValue.model.typeid
          let devices = []
          if (this.deviceData) {              
            this.deviceData.forEach(function (item) {
                if (typeid == item.typeid){
                    devices.push(item)
                }
            })
          }
          this.devices = devices
          this.searched = this.devices

          this.selectedItemKinds = newValue.model.kinds
          this.selectedItemParams = newValue.model.params
      },
      importInfos: function (newVal, oldVal) { // 上传文件
          console.log(newVal)
      }
  },
  created() {
    
    console.log(this.paramsObj)
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
.screen-tab{
    background-color: #595959;
    width: 420px;
    height: 350px;
    position: absolute;
    left: 265px;
    top: 135px;
    z-index: 999;
}
.close-card{
    position: absolute;
    right: 5px;
}
.reset-card{
    position: absolute;
    right: 40px;
}
.device-dialog-con{
    width: 650px;
    height: 510px;;
}
.screen-content{
    margin: 0;
    margin-left: 25px;
}
</style>