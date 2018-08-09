<template>
  <div class="flex-content">
    <div class="flex-item device-type-tree">
      <TypeTree :rootName="rootName" :selectedPath="selectedPath" :children="typeData" v-on:onNodeSelectedChange="onNodeSelectedChange">
        <md-toolbar slot="tree-toolbar" class="md-dense" md-elevation="0">
          <md-button class="md-icon-button" @click="backToLastPage" title="返回">
            <md-icon>keyboard_backspace</md-icon>
          </md-button>
          <div class="md-toolbar-section-end">
            <span>类型列表</span>
          </div>
        </md-toolbar>
      </TypeTree>
    </div>
    <div class="flex-item flex-right">
      <div class="flex-item">
        <md-toolbar class="md-dense" md-elevation="0">
          <div class="md-toolbar-section-start">
            <span>当前配属设备</span>
          </div>
          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button" title="更换设备" @click="changeDevice">
              <md-icon>swap_vert</md-icon>
            </md-button>
            <md-button class="md-icon-button" title="卸载设备" @click="removeDevice">
              <md-icon>remove</md-icon>
            </md-button>
          </div>
        </md-toolbar>
        <md-table v-model="onDevice" md-card style="height: 260px;margin: 0;" md-fixed-header
                  @md-selected="selectOnDevice">
          <md-table-row slot="md-table-row" slot-scope="{ item }" :class="getClass(item)" md-selectable="single">
            <md-table-cell md-label="设备编号">{{ item.devicecode }}</md-table-cell>
            <md-table-cell md-label="设备型号">{{ item.devicekindname }}</md-table-cell>
            <md-table-cell md-label="已使用时长">{{ item.firstusedate == 0 ? "无" : $utils.trainsDataBetweenNow(item.firstusedate) }}</md-table-cell>
            <md-table-cell md-label="设备状态">{{ $utils.trainsDeviceStatus(item.devicestatus) }}</md-table-cell>
            <md-table-cell md-label="所属机车">{{ item.traintypename }} - {{item.trainid}}</md-table-cell>
          </md-table-row>
        </md-table>
      </div>
      <div class="flex-item">
        <md-toolbar class="md-dense" md-elevation="0">
          <div class="md-toolbar-section-start">
            <span>其他设备</span>
          </div>
          <md-field md-clearable class="md-toolbar-section-start" style="margin: 0px;">
            <md-input placeholder="搜索设备编号" v-model="search" @input="searchOnTable"/>
          </md-field>
          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button" title="配属" @click="addDevice">
              <md-icon>add</md-icon>
            </md-button>
          </div>
        </md-toolbar>
        <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header
                  style="height: 310px;margin: 0;" @md-selected="selectUnderDevice">
          <md-table-row slot="md-table-row" slot-scope="{ item }" :class="getClass(item)" md-selectable="single">
            <md-table-cell md-label="设备编号">{{ item.devicecode }}</md-table-cell>
            <md-table-cell md-label="设备型号">{{ item.devicekindname }}</md-table-cell>
            <md-table-cell md-label="已使用时长">{{ item.firstusedate == 0 ? "无" : $utils.trainsDataBetweenNow(item.firstusedate) }}</md-table-cell>
          </md-table-row>
        </md-table>
      </div>
    </div>
    <md-snackbar :md-position="position" :md-duration="2000" :md-active.sync="snackbarActive" md-persistent>
      <span>{{snackbarInfo}}</span>
    </md-snackbar>
    <md-dialog :md-active.sync="showDialog" :md-click-outside-to-close="clickOutSide">
      <md-dialog-title>
        {{tiptitle}}
      </md-dialog-title>
      <md-content>
        <!-- 添加配属 -->
        <div v-if="distribution">
          <p>{{tipinfo}}</p>
        </div>
        <!-- 不可配属 -->
        <div v-else-if="undistribution">
          <p>{{tipinfo}}</p>
        </div>
        <!-- 卸载 -->
        <div v-else-if="uninstall">
          <table>
            <tr>
              <td>卸载原因：</td>
              <td>
                <md-field>
                  <md-select v-model="reason" name="reason" id="reason">
                    <md-option value="ordinary">良品卸载</md-option>
                    <md-option value="scrap">报废卸载</md-option>
                  </md-select>
                </md-field>
              </td>
            </tr>
          </table>
          <md-field v-if="reason == 'scrap'">
            <label>报废说明</label>
            <md-textarea v-model="scrapRemark"></md-textarea>
          </md-field>
        </div>
        <!-- 更换 -->
        <div v-else-if="replace">
          <p>{{tipinfo}}</p>
        </div>
        <div v-else-if="anyparents">
          <p>{{tipinfo}}</p>
          <md-field>
            <md-select v-model="singleselect" name="singleselect" id="singleselect" @md-selected="handleSelect">
              <md-option v-for="(v, k) in childrenItem" :value="v.deviceid" :key="k">{{v.devicecode}}</md-option>
            </md-select>
          </md-field>
        </div>
      </md-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="dialogClose">关闭</md-button>
        <md-button class="md-accent" @click="dialogConfirm">确定</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
  import TypeTree from "../../device_type_tree/DeviceTypeTree.vue";

  const searchDevice = (items, term) => {
    if (term) {
      return items.filter(item => item.devicecode.includes(term))
    }
    return items
  }
  /**
   * @param item1 数据1
   * @param itemType 数据类型(父：0；子：1)
   * @param handleType 操作类型(卸载：0；添加：1)
   * @param item2 数据2
   */
  const changeDeviceData = (item1, itemType, handleType, item2) => {
    let device = {
      id: null,
      devicecode: '',
      unitid: '',
      productiondate: 0,
      createdate: 0,
      firstusedate: 0,
      devicetypeid: '',
      devicekindid: '',
      devicestatus: null,
      devicekindname: '',
      unitname: '',
      traintypename: '',
      devicetypename: '',
      deviceid : '',
      parentid: "",
      children: null,
      updatetime: null
    }
    let children = item2.children
    if (itemType == 0) { // 父
      device.id = item1.id
      device.devicecode = item1.devicecode
      device.unitid = item1.unitid
      device.productiondate = item1.productiondate
      device.createdate = item1.createdate
      device.firstusedate = item1.firstusedate
      device.devicetypeid = item1.devicetypeid
      device.devicekindid = item1.devicekindid
      device.devicestatus = item1.devicestatus
      device.devicekindname = item1.devicekindname
      device.unitname = item1.unitname
      device.traintypename = item1.traintypename
      device.devicetypename = item1.devicetypename
      device.deviceid = item1.deviceid
      device.children = item1.children
      device.parentid = item1.parentid
      device.updatetime = item1.updatetime
      if (handleType == 0) { // 卸载
        for (let i=0;i<children.length;i++) {
          for (let j=0;j<device.children.length;j++) {
            if (device.children[j] == children[i]) {
              device.children.splice(j, 1);
            }
          }
        }
        let index = device.children.indexOf(item2.deviceid)
        if (index >= 0) {
          device.children.splice(index, 1)
        }
      } else { // 添加
        let newChildren = device.children.concat(children)
        newChildren.push(item2.deviceid)
        device.children = newChildren
      }
    } else { // 子
      device.id = item2.id
      device.devicecode = item2.devicecode
      device.unitid = item2.unitid
      device.productiondate = item2.productiondate
      device.createdate = item2.createdate
      device.firstusedate = item2.firstusedate
      device.devicetypeid = item2.devicetypeid
      device.devicekindid = item2.devicekindid
      device.devicestatus = item2.devicestatus
      device.devicekindname = item2.devicekindname
      device.unitname = item2.unitname
      device.traintypename = item2.traintypename
      device.devicetypename = item2.devicetypename
      device.deviceid = item2.deviceid
      device.children = item2.children
      device.updatetime = item2.updatetime
      if (handleType == 0) { // 卸载
        device.parentid = null
      } else { // 添加
        device.parentid = item1.deviceid
      }
    }
    return device
  }

  export default {
    name: 'EditDistribution',
    components: {
      TypeTree
    },
    computed: {
      typeData() {
        return this.$route.params.dataObj[0].children
      },
      rootName() {
        return this.$route.params.item.devicecode
      },
      deviceData() {
        return this.$store.state.deviceData
      },
      deviceDataIndex() {
        return this.$store.state.deviceDataIndex
      },
      selectedNode() {
        return this.$store.getters.getSelectedNode
      }
    },
    data() {
      return {
        position: 'center',
        snackbarActive: false,
        snackbarInfo: '',
        showDialog: false,
        clickOutSide: false, // 点击外部不关闭dialog
        search: '',
        searched: [],
        selectedOnDevice: null,
        selectedUnderDevice: null,
        selectedPath: [],
        selectedNodeid: '',
        onDevice: [],
        underDevice: [],
        allOnCurrentDevice: [],
        allUnderCurrentDevice: [],
        distribution: false, // 添加配属
        undistribution: false, // 不可添加
        uninstall: false, // 卸载
        replace: false, // 更换
        anyparents: false, // 多个父级
        reason: '',
        scrapRemark: '',
        tipinfo: '',
        tiptitle: '',
        childrenItem: [],
        singleselect: null,
        msg: []
      }
    },
    methods: {
      getClass: ({id}) => ({
        'md-primary': id != ''
      }),
      onNodeSelectedChange(path) {
        this.selectedPath = path
      },
      backToLastPage() {
        this.$router.push({path: '/DeviceManage'})
      },
      searchOnTable() {
        this.searched = searchDevice(this.underDevice, this.search)
      },
      changeDevice() {

      },
      removeDevice () {

      },
      addDevice() {
        let this_ = this
        if (this.selectedUnderDevice == null) {
          this.snackbarActive = true
          this.snackbarInfo = '请选择需要配属的设备'
          return false
        }
        this.tiptitle = '添加设备'
        this.childrenItem = []
        let childrenDevices = this.$route.params.item.children // 最顶级设备的children
        let selectTypeid = this.selectedUnderDevice.devicetypeid // 选择节点的typeid
        let selectNodeParenttypeid = this.$utils.getParentidByTypeid(this.typeData, selectTypeid) // 选择节点的父级typeid
        if (selectNodeParenttypeid == this.$route.params.item.devicetypeid) {
          this.distribution = true
          this.tiptitle = '添加配属'
          this.tipinfo = '确定配属该设备？'
        } else {
          childrenDevices.forEach(function (item) {
            let itemIndex = this_.deviceDataIndex[item]
            let deviceItem = this_.$store.state.deviceData[itemIndex]
            if (deviceItem.devicetypeid == selectNodeParenttypeid) {
              this_.childrenItem.push(deviceItem)
            }
          })
          if (this.childrenItem.length > 0) {
            this.anyparents = true
            this.tiptitle = "添加配属"
            this.tipinfo = '请选择要添加配属的设备'
          } else {
            this.undistribution = true
            this.tiptitle = "添加配属"
            this.tipinfo = '当前没有可添加配属的设备，请先添加父级设备'
          }
        }
        this.showDialog = true
      },
      dialogConfirm() {
        let this_ = this
        let actiondata = []
        let parentItem = null
        let childItem = null
        if (this.uninstall) {

        } else if (this.replace) {

        } else {
          if (this.distribution) {
            parentItem = changeDeviceData(this.$route.params.item, 0, 1, this.selectedUnderDevice)
            childItem = changeDeviceData(this.$route.params.item, 1, 1, this.selectedUnderDevice)
            actiondata.push(parentItem)
            actiondata.push(childItem)
          } else {
            
          }

          let data = {
            actioninfo : {
              name: "deviceData",
              type: "update"
            },
            actiondata: actiondata
          }

          this.msg = []
          this.msg.push(data)
          this.$ajax.post('data/handle', 'msg=' + JSON.stringify(this.msg))
            .then(function (response) {
              if (response.data.errorcode == 0) {
                parentItem.updatetime = response.data.updatetime
                childItem.updatetime = response.data.updatetime
                this_.$store.commit('updateDeviceData', parentItem)
                this_.$store.commit('updateDeviceData', childItem)

                if (this_.distribution) {
                  let index = this_.searched.indexOf(this_.selectedUnderDevice)
                  if (index >= 0){
                    this_.searched.splice(index, 1)
                  }
                  index = this_.allUnderCurrentDevice.indexOf(this_.selectedUnderDevice)
                  if (index >= 0) {
                    this_.allUnderCurrentDevice.splice(index, 1)
                  }
                  this_.onDevice.push(this_.selectedUnderDevice)
                  this_.allOnCurrentDevice.push(this_.selectedUnderDevice)
                }

                this_.snackbarInfo = '操作成功'
                this_.snackbarActive = true
              } else {
                this_.snackbarInfo = '操作失败'
                this_.snackbarActive = true
              }
            })
            .catch(function (error) {
              console.log(error)
              this_.snackbarInfo = '操作失败'
              this_.snackbarActive = true
            })

          this.showDialog = false

        }
      },
      dialogClose() {
        this.distribution = false
        this.undistribution = false
        this.uninstall = false
        this.replace = false
        this.anyparents = false
        this.showDialog = false
      },
      selectOnDevice(item) {
        this.selectedOnDevice = item
      },
      selectUnderDevice(item) {
        this.selectedUnderDevice = item
      },
      handleSelect(item) {
        this.singleselect = item
      }
    },
    created() {
      let this_ = this
      this.$store.state.deviceData.forEach(function (item) {
        if (item.devicestatus != 0) { // 设备状态为0：报废
          if (item.children.length > 0) { // 有子，即有配属的设备
            item.children.forEach(function (id) {
              this_.allOnCurrentDevice.push(this_.$store.state.deviceData[this_.deviceDataIndex[id]])
            })
          }else {
            if (item.parentid == "") { // 只显示未配属的设备
              this_.allUnderCurrentDevice.push(this_.$store.state.deviceData[this_.deviceDataIndex[item.id]])
            }
          }
        }
      })
    },
    watch: {
      selectedPath: function (newValue, oldValue) {
        this.selectedOnDevice = null
        this.selectedUnderDevice = null
        if (newValue.length == 0) { // 最顶层父节点(设备号)
          return;
        }
        let typeid = ''
        if (newValue.length > 1) { // 有多层子节点，父->子->孙子->...
          let children = this.typeData
          for (let i = 0; i < newValue.length - 1; i++) {
            children = children[newValue[i]].children
          }
          typeid = children[newValue[newValue.length - 1]].model.typeid
        } else { // 只有一层子，父->子
          typeid = this.typeData[newValue].model.typeid
        }
        this.selectedNodeid = typeid
        this.onDevice = []
        this.underDevice = []
        this.searched = []
        let this_ = this
        this.allOnCurrentDevice.forEach(function (item) {
          if (typeid == item.devicetypeid) {
            this_.onDevice.push(item)
          }
        })
        this.allUnderCurrentDevice.forEach(function (item) {
          if (typeid == item.devicetypeid) {
            this_.underDevice.push(item)
            this_.searched.push(item)
          }
        })
      }
    }
  }
</script>

<style scoped>
  .flex-content {
    height: 100%;
    display: flex;
    flex-flow: row;
  }

  .flex-item {
    width: 100%;
  }

  .flex-right {
    flex: 1;
    padding-left: 10px;
    display: flex;
    flex-flow: column;
  }

  .device-type-tree {
    width: 240px;
    height: 100%;
  }

  .md-dialog {
    width: 400px;
    padding: 0 20px 0 20px;
  }
</style>
