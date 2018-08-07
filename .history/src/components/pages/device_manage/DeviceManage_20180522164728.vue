<template>
  <div class="flex-content">
      <div class="flex-item device-type-tree">
          <TypeTree :children="deviceData" rootName="设备管理" @onNodeChange="handleChangeNode"></TypeTree>
      </div>
      <div class="flex-item">
        <md-table v-model="searched" md-card md-fixed-header>
            <md-table-toolbar>
                <div class="md-layout md-gutter">
                    <div class="md-layout-item">
                        <md-button @mouseover="handleMouseover">筛选数据</md-button>
                    </div>
                    <div class="md-layout-item">
                        <md-field>
                            <label for="type">设备型号</label>
                            <md-select v-model="type" placeholder="请选择设备型号" @md-selected="handleSelected">
                                <md-option value="全部">全部</md-option>
                                <md-option v-for="(item, key) in deviceType" :value="item.typeValue" :key="key">{{item.typeValue}}</md-option>
                            </md-select>
                        </md-field>
                    </div>
                    <div class="md-layout-item">
                        <md-field md-clearable class="md-toolbar-section-end">
                            <md-input placeholder="请输入设备编号" v-model="search" @input="searchOnTable" />
                        </md-field>
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
                    <div class="md-layout-item" title="导出模版">
                        <a href="/static/file/test.xlsx" download="测试">
                            <md-button class="md-fab md-mini md-primary">
                                <md-icon>redo</md-icon>
                            </md-button>
                        </a>                    
                    </div>
                </div>
            </md-table-toolbar>
            <md-table-empty-state md-label="未找到设备"></md-table-empty-state>

            <!-- <md-table-row v-for="(value, key) in devices">
                <template v-for="(v, k) in value">
                    <md-table-cell :md-label="k">{{v}}</md-table-cell>
                </template>
            </md-table-row> -->
            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="设备编号">{{ item.devicecode }}</md-table-cell>
                <md-table-cell md-label="设备型号">{{ item.devicetype }}</md-table-cell>
                <md-table-cell md-label="设备种类">{{ item.devicekind }}</md-table-cell>
                <md-table-cell md-label="首次使用日期">{{ item.firstusedate }}</md-table-cell>
                <md-table-cell md-label="设备状态">{{ item.devicestatus }}</md-table-cell>
            </md-table-row>
        </md-table>
        <md-card class="screen-tab" v-show="isShow">
            <md-button class="md-icon-button close-card" @click="closeCard">
                <md-icon class="md-size-1x">clear</md-icon>
            </md-button>
        </md-card>
        <md-snackbar :md-position="position" :md-duration="3000" :md-active.sync="snackbarActive" md-persistent>
            <span>{{snackbarInfo}}</span>
        </md-snackbar>
      </div>      
  </div>
</template>

<script>
import dmData from "./components/data.js";
import TypeTree from "../../device_type_tree/DeviceTypeTree.vue";

const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => item.devicecode.includes(term));
  }
  return items;
};

// 判断对象是否为空
const isEmptyObject = (e) => {  
    let t;  
    for (t in e)  
        return !1;  
    return !0;
}

export default {
  name: "TableSearch",
  components: {
    TypeTree
  },
  data: () => ({
    search: '',
    searched: [],
    searched_: [],
    devices: [],
    deviceData: [],
    type: '',
    deviceType: [],
    importInfos: '',
    position: 'center',
    snackbarActive: false,
    snackbarInfo: '',
    isShow: false
  }),
  methods: {
    searchOnTable() {
      this.searched = searchByName(this.searched_, this.search);
    },
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
    handleChangeNode (model) {
        let typeid = model.typeid
        let devices = []
        dmData.deviceManageData.forEach(function (item) {
            if (typeid == item.typeid){
                devices.push(item)
            }
        })
        this.devices = devices
        this.searched = this.devices
        
        this.type = "全部"
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
        this.isShow = false
    },
    handleImportFile (files) {
        console.log(files[0])

        var _this = this
        var rABS = false //是否将文件读取为二进制字符串  
        var file = files[0]
        FileReader.prototype.readAsBinaryString = function (f) {
            var binary = "";
            var rABS = false; //是否将文件读取为二进制字符串  
            var pt = this;
            var workbook; //读取完成的数据  
            // var excelData;  
            var reader = new FileReader();
            reader.onprogress = function (e) {
                let total = file.size;
                _this.progress = (e.loaded / total) * 100;
                console.log(_this.progress);
            };
            reader.onload = function (e) {
                try {
                    var bytes = new Uint8Array(reader.result);
                    var length = bytes.byteLength;
                    for (var i = 0; i < length; i++) {
                        binary += String.fromCharCode(bytes[i]);
                    }
                    if (rABS) {
                        workbook = XLSX.read(btoa(fixdata(binary)), { //手动转化  
                            type: 'base64'
                        });
                    } else {
                        workbook = XLSX.read(binary, {
                            type: 'binary'
                        });
                    }
                    // excelData = []; 
                } catch (e) {
                    console.log('文件类型不正确');
                    return;
                }
                var fromTo = '';
                for (var sheet in workbook.Sheets) {
                    if (workbook.Sheets.hasOwnProperty(sheet)) {
                        fromTo = workbook.Sheets[sheet]['!ref'];
                        _this.excelData = _this.excelData.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                    }
                }
                console.log(_this.excelData);
            };
            reader.readAsArrayBuffer(f);
        }
        var reader = new FileReader();
        if (rABS) {
            reader.readAsArrayBuffer(file);
        } else {
            reader.readAsBinaryString(file);
        }
    }
  },
  created() {
    this.deviceType = dmData.deviceTypeData;
    this.deviceData = dmData.deviceManageTree;
    this.devices = dmData.deviceManageData;
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
</style>