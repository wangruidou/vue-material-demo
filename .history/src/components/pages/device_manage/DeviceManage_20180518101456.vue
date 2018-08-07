<template>
  <div>
      <div class="type-tree">
          <TypeTree v-model="deviceData" rootName="设备管理" @click="rootClick"></TypeTree>
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
    users: [],
    deviceData: []
  }),
  methods: {
    searchOnTable() {
      this.searched = searchByName(this.users, this.search);
    },
    importDevices() {

    },
    rootClick () {
        alert("!11111")
    }
  },
  created() {
    this.deviceData = dmData.deviceManageTree;
    this.users = dmData.deviceManageData;
    this.searched = this.users;
  }
};
</script>

<style lang="scss" scoped>
.md-field {
  max-width: 300px;
}
.type-tree {
  width: 350px;
}
</style>