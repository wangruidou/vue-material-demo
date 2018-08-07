<template>
  <td class="custom-table-column" v-bind:style="{ width: width }">
    <div class="column-div">
      <slot></slot>
    </div>
  </td>
</template>

<script>
  export default {
    name: "custom-table-column",
    props:{
      width:{
        type:String,
        default:"auto"
      },
      title:{
        type:String,
        default:""
      },
      value:{
        type:String,
        default:""
      }
    },
    created:function(){
      let vueNode = this;
      while(vueNode){
        if (vueNode.$options._componentTag==="custom-table"){
          if (vueNode.appendWidth){
            vueNode.appendWidth(this.width)
          }
          break;
        }
        vueNode = vueNode.$parent
      }
    }
  }
</script>

<style lang="sass" scoped>
  .custom-table-column
    display: inline-block
    overflow: hidden
    text-overflow: ellipsis
    white-space: nowrap
    .column-div
      padding: 16px 0px 12px 16px
      color: #CCCCCC

</style>
