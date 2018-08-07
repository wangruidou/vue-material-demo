<template>
  <tr class="custom-table-row" v-bind:class="{ selected: isSelected}" @click="onSelect">
    <div class="row-hover-div">
      <slot></slot>
    </div>
  </tr>
</template>

<script>

  export default {
    name: "custom-table-row",
    props:{
      item:{
        type:Object,
        default: null
      }
    },
    data:function(){
      return{
        table:null
      }
    },
    methods:{
      onSelect:function(){
        if (this.isSelected){
          if (this.table && this.table.onReject){
            this.table.onReject(this.item)
          }
        }else{
          if (this.table && this.table.onSelect){
            this.table.onSelect(this.item)
          }
        }
      }
    },
    created:function(){
      let vueNode = this;
      while(vueNode){
        if (vueNode.$options._componentTag==="custom-table"){
          this.table = vueNode
          break
        }
        vueNode = vueNode.$parent
      }
    },
    computed:{
      isSelected:function(){
        if (this.table){
          return this.table.selected.indexOf(this.item)>=0
        }else{
          return false
        }
      }
    }
  }
</script>

<style lang="sass" scoped>
  .selected
    background-color: #448AFF
  .custom-table-row
    overflow: hidden
    border-top: 1px solid #666666
    cursor: pointer

    .row-hover-div
      height: 100%
      width: 100%
      background-color: rgba(255,255,255,0)
      &:hover
        background-color: rgba(255,255,255,0.1)

</style>
