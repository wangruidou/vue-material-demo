<template>
  <md-content class="custom-table md-scrollbar">
      <md-content class="table-header table-content-part" v-bind:style="{minWidth: minWidth+'px'}">
        <table>
          <slot name="column"></slot>
        </table>
      </md-content>
      <md-content class="table-body table-content-part md-scrollbar" v-bind:style="{minWidth: minWidth+'px'}">
        <table>
          <slot v-for="(item, index) in value" v-bind="item"></slot>
        </table>
      </md-content>
      <md-content class="table-footer table-content-part" v-bind:style="{minWidth: minWidth+'px'}">
        <table>
          <slot name="footer"></slot>
        </table>
      </md-content>
  </md-content>
</template>
<script>
  export default {
    name: "custom-table",
    props: {
      'value':{
        type: Array,
        default: []
      },
      'minWidth':{
        type: Number,
        default: 1000,
      },
      'single':{
        type:Boolean,
        default: true
      }

    },
    data:function(){
      return {
        columnWidth:[],
        selected:[],
      }
    },
    methods:{
      appendWidth:function(width){
        this.columnWidth.push(width);
      },
      onSelect:function(item){
        if (this.single){
          this.selected.splice(0, 1);
          this.selected.push(item)
        }else{
          this.selected.push(item)
        }
      },
      onReject:function(item){
        let index = this.selected.indexOf(item);
        if(index>=0) {
          this.selected.splice(index, 1);
        }
      }
    }
  }
</script>

<style lang="sass" scoped>
  table
    width: 100%
    border-collapse: collapse
    td
      display: inline-block
      overflow: hidden
      text-overflow: ellipsis
      white-space: nowrap


  .custom-table
    height: 100%
    display: flex
    flex-flow: column
    overflow-x: auto
    .table-content-part
      width: 100%
    .table-body
      overflow-y: scroll
      flex: 1




</style>
