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
        <md-table v-model="users">
        <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="厂家名称" md-sort-by="id">{{ item.name }}</md-table-cell>
            <md-table-cell md-label="备注信息" md-sort-by="name">{{ item.note }}</md-table-cell>
            <md-table-cell md-label="操作" md-sort-by="email">
            <div class="cell-button-group">
                <md-button class="md-fab md-mini md-primary" @click="editLine(item)"><md-icon>edit</md-icon></md-button>
                <!-- <md-button class="md-fab md-mini md-plain" @click="deleteLine(item)"><md-icon>remove</md-icon></md-button> -->
            </div>
            </md-table-cell>
        </md-table-row>
        </md-table>

        <md-dialog-confirm
            :md-active.sync="deleteDlgActive"
            md-title="确定要删除此厂家信息？"
            md-content="如果删除厂家信息，可能会导致设备信息中的厂家信息丢失"
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
        addItem: {},
        users: [
          {
            id: 1,
            name: '厂家1',
            note: ''
          },
          {
            id: 2,
            name: '厂家2',
            note: ''
          },
          {
            id: 3,
            name: '厂家3',
            note: ''
          },
          {
            id: 4,
            name: '厂家4',
            note: ''
          },
          {
            id: 5,
            name: '厂家5',
            note: ''
          }
        ]
      }
    },
    methods: {
      // deleteLine: function(item) {
      //   this.selectedItem = item
      //   this.deleteDlgActive = true
      // },
      // onDeleteConfirm: function() {
      //   if (this.selectedItem){
      //     const index = this.users.indexOf(this.selectedItem)
      //     if(index>=0) {
      //       this.users.splice(index,1)
      //       this.snackbarInfo = '数据删除成功'
      //       this.snackbarActive = true
      //     }
      //     this.selectedItem = null
      //   }
      // },
      onDeleteCancel: function() {
        this.selectedItem = null
      },
      editLine (item) {
          this.selectedItem = item
          this.manufacturerName = item.name
          this.manufacturerReamrk = item.note
          this.editDlgActive = true
      },
      editDlgSave () {
          const index = this.users.indexOf(this.selectedItem)
          if (index >= 0){
            


            this.users[index].name = this.manufacturerName
            this.users[index].note = this.manufacturerReamrk
            this.snackbarInfo = '厂家信息修改成功'
            this.snackbarActive = true
          } else {
              this.addItem.id = this.users.length + 1
              this.addItem.name = this.manufacturerName
              this.addItem.note = this.manufacturerReamrk
              this.users.push(this.addItem)
              this.snackbarInfo = '添加成功'
              this.snackbarActive = true
          }
          this.editDlgActive = false
          this.selectedItem = null
      },
      editDlgClose () {
          this.editDlgActive = false
          this.selectedItem = null
      },
      addBtn () {
          this.manufacturerName = ''
          this.manufacturerReamrk = ''
          this.addItem = {
            id: '',
            name: '',
            note: ''
          }
          this.editDlgActive = true
      }
    }
  }
</script>

<style lang="sass">
  .cell-button-group
    .md-button
      margin-left: 0px !important
</style>
