<template>
  <div>
      <md-toolbar class="md-dense" md-elevation="0">
          <div class="md-toolbar-section-start">
              <span>厂家信息管理</span>
          </div>
          <div class="md-toolbar-section-end">
              <md-button class="md-icon-button" title="添加厂家" @click="addBtn">
                  <md-icon>add</md-icon>
              </md-button>
          </div>
      </md-toolbar>
      <md-content class="manufacturer">
        <md-table v-model="manufacturers">
        <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="厂家名称" md-sort-by="id">{{ item.name }}</md-table-cell>
            <md-table-cell md-label="备注信息" md-sort-by="name">{{ item.remark }}</md-table-cell>
            <md-table-cell md-label="操作" md-sort-by="email">
            <div class="cell-button-group">
                <md-button class="md-fab md-mini md-primary" @click="editLine(item)"><md-icon>edit</md-icon></md-button>
                 <md-button class="md-fab md-mini md-plain" @click="deleteLine(item)"><md-icon>remove</md-icon></md-button>
            </div>
            </md-table-cell>
        </md-table-row>
        </md-table>

         <md-dialog-confirm
            :md-active.sync="deleteDlgActive"
            md-title="请确认是否删除厂家信息？"
            md-confirm-text="确定"
            md-cancel-text="取消"
            @md-confirm="onDeleteConfirm"
            @md-cancel="onDeleteCancel"/>

        <md-dialog :md-active.sync="editDlgActive">

        <md-dialog-title>厂家信息</md-dialog-title>
        <md-content style="padding: 10px;">
            <md-field>
                <label>厂家名称</label>
                <md-input v-model.trim="manufacturerName"></md-input>
                </md-field>
                <md-field>
                <label>备注</label>
                <md-input v-model.trim="manufacturerReamrk"></md-input>
            </md-field>
        </md-content>
        <md-dialog-actions>
            <md-button class="md-primary" @click="editDlgClose">关闭</md-button>
            <md-button class="md-primary" @click="editDlgSave">保存</md-button>
        </md-dialog-actions>
        </md-dialog>

        <md-snackbar :md-position="position" :md-duration="3000" :md-active.sync="snackbarActive" md-persistent>
        <span>{{snackbarInfo}}</span>
        </md-snackbar>
    </md-content>
  </div>
</template>

<script>
  export default {
    name: "manufacturer",
    data: function(){
      return {
        title: '厂家管理',
        position: 'center',
        deleteDlgActive: false,
        editDlgActive: false,
        snackbarActive: false,
        snackbarInfo: '',
        selectedItem: null,
        manufacturerName: '',
        manufacturerReamrk: '',
        updatetime: null,
        msg: []
      }
    },
    methods: {
      deleteLine: function(item) {
        this.selectedItem = item
        this.deleteDlgActive = true
      },
      onDeleteConfirm: function() {
        if (this.selectedItem){
          const index = this.manufacturers.indexOf(this.selectedItem)
          let this_ = this
          if (index >= 0) {
            let item = {
              id: this.selectedItem.id,
              name: this.selectedItem.manufacturerName,
              remark: this.selectedItem.manufacturerReamrk,
              updatetime: this.selectedItem.updatetime
            }
            let data = {
              actioninfo: {
                name: "manufacturerData",
                type: "delete"
              },
              actiondata: item
            }
            this.msg = []
            this.msg.push(data)
            this.$ajax.post('data/handle', 'msg=' + JSON.stringify(this.msg))
              .then(function (response) {
                if (response.data.errorcode == 0) {
                  this_.$store.commit('deleteManufacturerData', item)
                  this_.snackbarInfo = '厂家删除成功'
                  this_.snackbarActive = true
                } else {
                  this_.snackbarInfo = '厂家删除失败，请先删除已配属该厂家的设备类型！'
                  this_.snackbarActive = true
                }
              })
              .catch(function (error) {
                this_.snackbarInfo = '厂家删除失败'
                this_.snackbarActive = true
                console.log(error)
              })
          }
        }
      },
      onDeleteCancel: function() {
        this.selectedItem = null
      },
      editLine (item) {
        this.selectedItem = item
        this.manufacturerName = item.name
        this.manufacturerReamrk = item.remark
        this.updatetime = item.updatetime
        this.editDlgActive = true
      },
      editDlgSave () {
        const index = this.manufacturers.indexOf(this.selectedItem)
        let this_ = this
        if (index >= 0){ // 修改厂家信息
          let item = {
            id: this.selectedItem.id,
            name: this.manufacturerName,
            remark: this.manufacturerReamrk,
            updatetime: this.updatetime
          }
          let data = {
            actioninfo : {
              name: "manufacturerData",
              type: "update"
            },
            actiondata: item
          }
          this.msg = []
          this.msg.push(data)
          this.$ajax.post('data/handle', 'msg=' + JSON.stringify(this.msg))
            .then(function (response) {
              if (response.data.errorcode == 0) {
                item.updatetime = response.data.updatetime
                this_.$store.commit('editManufacturerData', item)
                this_.snackbarInfo = '厂家信息修改成功'
                this_.snackbarActive = true
              } else {
                this_.snackbarInfo = '厂家信息修改失败'
                this_.snackbarActive = true
              }
            })
            .catch(function (error) {
              console.log(error)
              this_.snackbarInfo = '厂家信息修改失败'
              this_.snackbarActive = true
            })
          } else { // 添加厂家信息
            let ID = this.$utils.createGuid();
            let item = {
              id: ID,
              name: this.manufacturerName,
              remark: this.manufacturerReamrk
            }
            let data = {
              actioninfo : {
                name: "manufacturerData",
                type: "insert"
              },
              actiondata: item
            }
            this.msg = []
            this.msg.push(data)

            this.$ajax.post('data/handle', 'msg=' + JSON.stringify(this.msg))
            .then(function(response){
              if (response.data.errorcode == 0) {
                item.updatetime = response.data.updatetime
                this_.$store.commit('addManufacturerData', item)
                this_.snackbarInfo = '添加成功'
                this_.snackbarActive = true
              } else {
                this_.snackbarInfo = '添加失败'
                this_.snackbarActive = true
              }
            })
            .catch(function(error) {
              console.log(error)
              this_.snackbarInfo = '添加失败'
              this_.snackbarActive = true
            })
          }
          this.editDlgActive = false
          this.selectedItem = null
      },
      editDlgClose () {
        this.editDlgActive = false
        this.selectedItem = null
      },
      addBtn () {
        this.selectedItem = null
        this.manufacturerName = ''
        this.manufacturerReamrk = ''
        this.editDlgActive = true
      }
    },
    computed: {
      manufacturers: function(){
        return this.$store.getters.getManufacturerData
      }
    }
  }
</script>

<style lang="sass">
  .cell-button-group
    .md-button
      margin-left: 0px !important
</style>
