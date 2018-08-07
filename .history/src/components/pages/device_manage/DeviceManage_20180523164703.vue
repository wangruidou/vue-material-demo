<template>
  <div class="flex-content">
      <div class="flex-item device-type-tree">
          <TypeTree class="type-tree-content" rootName="全部种类" :selectedPath="selectedPath" :children="typeData"></TypeTree>
      </div>
      <div class="flex-item">
        <md-table v-model="searched" md-card md-fixed-header @md-selected="onSelect">
            <md-table-toolbar>
                <div class="md-layout md-gutter">
                    <div class="md-layout-item">
                        <md-button class="md-raised" :class="screenBtnClass" @mouseover="handleMouseover">{{screenBtn}}</md-button>
                    </div>          
                    <div class="md-layout-item">
                        <md-button class="md-raised md-primary" @click="addDevices">新增设备</md-button>
                    </div>  
                    <div class="md-layout-item">
                        <md-button class="md-raised md-primary" @click="editDevices">修改设备</md-button>
                    </div>         
                    <div class="md-layout-item">
                        <md-field>
                            <label>导入设备信息</label>
                            <md-file v-model="importInfos" placeholder="请选择文件" @md-change="handleImportFile"/>
                        </md-field>
                    </div>

                    <div class="md-layout-item" title="导入设备信息">
                        <md-button class="md-fab md-mini md-primary" @click="importDevices">
                            <md-icon>cloud_upload</md-icon>
                        </md-button>
                    </div>
                    
                    <!-- <div class="md-layout-item" title="导出模版">
                        <a href="/static/file/test.xlsx" download="测试">
                            <md-button class="md-fab md-mini md-primary">
                                <md-icon>redo</md-icon>
                            </md-button>
                        </a>                    
                    </div> -->
                </div>
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
            <md-button class="md-icon-button close-card" @click="closeCard" title="关闭">
                <md-icon class="md-size-1x">clear</md-icon>
            </md-button>
            <md-field style="width: 160px; margin-left: 25px">
                <label for="type">设备型号</label>
                <md-select v-model="type" placeholder="请选择设备型号" @md-selected="handleSelected">
                    <md-option value="全部">全部</md-option>
                    <md-option v-for="(item, key) in deviceType" :value="item.typeValue" :key="key">{{item.typeValue}}</md-option>
                </md-select>
            </md-field>
            <md-field v-for="item in selectedItemParams">
                <label>{{item.name}}</label>
            </md-field>
        </md-card>
        
        <md-snackbar :md-position="position" :md-duration="2000" :md-active.sync="snackbarActive" md-persistent>
            <span>{{snackbarInfo}}</span>
        </md-snackbar>
      </div>
      <div>
        <md-dialog :md-active.sync="showDialog" class="device-dialog-con">
            <md-dialog-title>{{deviceDialogTitle}}</md-dialog-title>

            <md-dialog-actions>
                <md-button class="md-primary" @click="deviceDialogClose">关闭</md-button>
                <md-button class="md-primary" @click="deviceDialogSave">保存</md-button>
            </md-dialog-actions>
        </md-dialog>
      </div>
  </div>
</template>

<script>
import TypeTree from "../../device_type_tree/DeviceTypeTree.vue";

export default {
  name: "TableSearch",
  components: {
    TypeTree
  },
  data: () => ({
    searched: [],
    searched_: [],
    devices: [],
    type: '',
    deviceType: [],
    importInfos: '',
    position: 'center',
    screenBtn: '筛选数据',
    screenBtnClass: 'md-primary',
    snackbarActive: false,
    snackbarInfo: '',
    isShow: false,
    showDialog: false,
    deviceDialogTitle: '',
    selectedItem: null,
    selectedItemParams: []
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
        return this.$store.getters.getSelectedNode
    }
  },
  methods: {
    importDevices() {
        if (this.importInfos == "") {
            this.snackbarActive = true
            this.snackbarInfo = "请先选择文件！"
            return false
        } else {
            if (!(this.importInfos.endsWith('.xlsx') || this.importInfos.endsWith('.xls'))){
                this.snackbarActive = true
                this.snackbarInfo = "请选择正确格式的文件！"
                return false
            }
        }
        this.snackbarActive = true
        this.snackbarInfo = "上传成功！文件：" + this.importInfos
    },
    handleSelected (value) {
        if(value == "全部") {
            this.searched = this.devices
        } else {
            let devices = []
            this.devices.forEach(function(item) {
                if (item.devicetype == value) {
                    devices.push(item)
                }
            })
            this.searched = devices
        }
        this.searched_ = this.searched
    },
    handleMouseover () {
        this.isShow = true
    },
    closeCard () {
        if (this.type == '' || this.type == '全部') {
            this.screenBtn = '筛选数据'
            this.screenBtnClass = 'md-primary'
        } else {
            this.screenBtn = '已筛选'
            this.screenBtnClass = 'md-accent'
        }
        this.isShow = false
    },
    resetCard () {
        this.type = '全部'
        this.screenBtn = '筛选数据'
        this.screenBtnClass = 'md-primary'
        this.isShow = true
    },
    handleImportFile (files) { // 上传文件
        console.log(files[0])
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
    deviceDialogClose () {
        this.showDialog = false
    },
    deviceDialogSave () {
        this.showDialog = false
    },
    getClass: ({ typeid }) => ({
        'md-primary': typeid != ''
    }),
    onSelect (item) {
        this.selectedItem = item
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
          this.type = "全部"

          let kinds = newValue.model.kinds
          let deviceType = []
          kinds.forEach(function(item) {
              let devicetype = {
                  typeValue: ''
              }
              devicetype.typeValue = item.id
              deviceType.push(devicetype)
          })
          this.deviceType = deviceType
          this.selectedItemParams = newValue.model.params
      }
  },
  created() {
    console.log(this.deviceData)
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
    width: 500px;
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
</style>