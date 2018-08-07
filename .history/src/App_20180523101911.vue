<template>
  <div id="app" class="page-container">
    <!-- <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary md-medium">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <span class="md-title">基础数据管理</span>
            <md-tabs class="md-primary" md-sync-route>
              <md-tab id="tab-home" md-label="厂家管理" to="/Manufacturer"></md-tab>
              <md-tab id="tab-pages" md-label="设备种类" to="/DeviceKind"></md-tab>
              <md-tab id="tab-posts" md-label="设备类型" to="/DeviceType"></md-tab>
              <md-tab id="tab-favorites" md-label="设备管理" to="/DeviceManage"></md-tab>
              <md-tab id="tab-test" md-label="测试上传EXCEL" to="/Test"></md-tab>
            </md-tabs>
          </div>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
              <md-icon>menu</md-icon>
            </md-button>
          </div>
        </div>
      </md-app-toolbar>

      <md-app-drawer class="md-right" :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">Inbox</span>
          </md-list-item>

          <md-list-item>
            <md-icon>send</md-icon>
            <span class="md-list-item-text">Sent Mail</span>
          </md-list-item>

          <md-list-item>
            <md-icon>delete</md-icon>
            <span class="md-list-item-text">Trash</span>
          </md-list-item>

          <md-list-item>
            <md-icon>error</md-icon>
            <span class="md-list-item-text">Spam</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>



      <md-app-content>
        <router-view/>
      </md-app-content>
    </md-app> -->

    <button @click="add">add</button>
    <button @click="decrease">decrease</button>
    <button @click="oddAdd">oddAdd</button>
    <div>{{count}}</div>
    <div>{{getOdd}}</div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function() {
    return {
      menuVisible: false
    }
  },
  // 得到计算后的值
  computed:mapGetters(['count','getOdd']),
  // 发生点击事件触发不同函数
  methods:mapActions(['add','decrease','oddAdd'])
}
</script>

<style lang="sass" scoped>
  .md-app
    width: 100%
    height: 100vh

    .md-app-toolbar
      min-height: 64px
      .md-title
        color: #000
        font-size: 26px

    .md-drawer
      width: 230px
      max-width: calc(100vw - 125px)

    .md-app-content
      overflow: hidden
</style>
