<template>
  <div>
    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>

        <md-button class="md-raised md-primary" @click="importDevices">导入设备信息</md-button>
        <md-field md-clearable class="md-toolbar-section-end">
            <md-input placeholder="请输入设备名称" v-model="search" @input="searchOnTable" />
        </md-field>

      </md-table-toolbar>

      <md-table-empty-state
        md-label="未找到设备"
        :md-description="`未找到关于'${search}'的设备，请重新搜索.`">
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="设备编号" md-sort-by="device_number">{{ item.device_number }}</md-table-cell>
        <md-table-cell md-label="设备类型" md-sort-by="device_type">{{ item.device_type }}</md-table-cell>
        <md-table-cell md-label="设备种类" md-sort-by="device_kind">{{ item.device_kind }}</md-table-cell>
        <md-table-cell md-label="生产厂家" md-sort-by="manufacturer">{{ item.manufacturer }}</md-table-cell>
        <md-table-cell md-label="生产日期" md-sort-by="production_date">{{ item.production_date }}</md-table-cell>
        <md-table-cell md-label="报废日期" md-sort-by="expiry_date">{{ item.expiry_date }}</md-table-cell>
        <md-table-cell md-label="设备状态" md-sort-by="device_status">{{ item.device_status }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import dmData from './components/data.js'
import TypeTree from ''

const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => item.device_number.includes(term));
  }
  return items;
};

export default {
  name: "TableSearch",
  data: () => ({
    search: null,
    searched: [],
    users: []
  }),
  methods: {
    searchOnTable() {
      this.searched = searchByName(this.users, this.search);
    },
    importDevices () {

    }
  },
  created() {
    this.users = dmData.deviceManageData
    this.searched = this.users;
  }
};
</script>

<style lang="scss" scoped>
.md-field {
  max-width: 300px;
}
</style>