<template>
  <div>
      <div class="type-tree">
          <TypeTree rootName="{{rootName}}"></TypeTree>
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
    rootName: '设备管理',
    search: null,
    searched: [],
    users: [],
    deviceData: [
        {
            children: ''
        }
    ]
  }),
  methods: {
    searchOnTable() {
      this.searched = searchByName(this.users, this.search);
    },
    importDevices() {

    },
    onNodeChange () {
        
    },
    rootClick () {
        alert("11")
    }
  },
  created() {
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