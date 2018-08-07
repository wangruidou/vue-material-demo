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
                    <md-field>
                        <label for="type">设备型号</label>
                        <md-select v-model="type" placeholder="请选择设备型号" @md-selected="handleSelected">
                            <md-option value="全部">全部</md-option>
                            <md-option v-for="item in deviceType" :value="item.typeValue">{{item.typeValue}}</md-option>
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
                        <label>设备信息</label>
                        <md-file v-model="importInfos" placeholder="请选择设备信息表" />
                        <md-tooltip :md-active.sync="tooltipActive">Top</md-tooltip>
                    </md-field>
                </div>
                <div class="md-layout-item">
                    <md-button class="md-fab md-mini md-primary" @click="importDevices">
                        <md-icon>cloud_upload</md-icon>
                    </md-button>
                </div>
            </div>
        </md-table-toolbar>
        <md-table-empty-state md-label="未找到设备" :md-description="`未找到关于'${search}'的设备，请重新搜索.`"></md-table-empty-state>
        <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="设备编号">{{ item.devicecode }}</md-table-cell>
            <md-table-cell md-label="设备型号">{{ item.devicetype }}</md-table-cell>
            <md-table-cell md-label="设备种类">{{ item.devicekind }}</md-table-cell>
            <md-table-cell md-label="首次使用日期">{{ item.firstusedate }}</md-table-cell>
            <md-table-cell md-label="设备状态">{{ item.devicestatus }}</md-table-cell>
        </md-table-row>
        </md-table>
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

export default {
  name: "TableSearch",
  components: {
    TypeTree
  },
  data: () => ({
    search: null,
    searched: [],
    searched_: [],
    devices: [],
    deviceData: [],
    type: '全部',
    deviceType: [],
    importInfos: ''
  }),
  methods: {
    searchOnTable() {
      this.searched = searchByName(this.searched_, this.search);
    },
    importDevices() {
        if (this.importInfos == "") {
            
        } else {
            alert(this.importInfos)
        }
    },
    handleChangeNode (model) {
        alert(model)
    },
    handleSelected (value) {
        if(value == "全部") {
            this.searched = dmData.deviceManageData
        } else {
            let devices = []
            dmData.deviceManageData.forEach(function(item) {
                if (item.devicetype == value) {
                    devices.push(item)
                }
            })
            this.searched = devices
        }
        this.searched_ = this.searched
    }
  },
  created() {
    this.deviceType = dmData.deviceTypeData;
    this.deviceData = dmData.deviceManageTree;
    this.devices = dmData.deviceManageData;
    this.searched = this.devices;
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
  width: 350px;
}
</style>