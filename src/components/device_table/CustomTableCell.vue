<template>
  <td class="custom-table-cell" v-bind:style="{ width: width }" @click="rowClick">
    <div class="cell-div" >
      <slot></slot>
    </div>
  </td>
</template>

<script>
  export default {
    name: "custom-table-cell",
    data:function(){
      return {
        width:"auto"
      }
    },
    methods:{
      rowClick:function(){

      }
    },
    created:function(){
      let vueNode = this;
      let index = this.$parent.$children.length-1
      while(vueNode){
        if (vueNode.$options._componentTag==="custom-table-row"){
          let table = vueNode.table;
          if (table && table.columnWidth.length>index){
            this.width = table.columnWidth[index]
          }
          break;
        }
        vueNode = vueNode.$parent
      }
    }
  }
</script>

<style lang="sass" scoped>
  .custom-table-cell
    display: inline-block
    overflow: hidden
    text-overflow: ellipsis
    white-space: nowrap
    opacity: 1
    .cell-div
      display: inline-block
      padding: 14px 0px 10px 16px
      color: #FFFFFF

</style>
