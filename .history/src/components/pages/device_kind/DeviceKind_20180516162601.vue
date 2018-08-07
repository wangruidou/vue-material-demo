<template>
    <Tree :data="data5" :render="renderContent"></Tree>
</template>

<script>
  export default {
    name: "device-kind",
    data: function() {
      return {
        title: '设备种类'
      }
    }
  }
</script>

<style scoped>

</style>
