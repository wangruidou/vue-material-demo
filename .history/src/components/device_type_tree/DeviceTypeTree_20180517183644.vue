<template>
  <md-content class="device-type-tree">
    <slot name="tree-toolbar"></slot>
    <md-card class="md-scrollbar tree-content" >
      <span class="root-body" v-bind:class="{selected : rootSelected}" @click="rootClick">{{rootName}}</span>
      <ul class="root" v-for="(child, index) in children">
        <DeviceTypeTreeNode :value="child.value" :children="child.children" :nodeModel="child.model" :index="index" v-on:childClick="nodeClick" v-on:deleteChild="deleteChild"/>
      </ul>
    </md-card>
  </md-content>
</template>

<script>
  import DeviceTypeTreeNode from '@/components/device_type_tree/DeviceTypeTreeNode'
  export default {
    name: "device-type-tree",
    components: {
      DeviceTypeTreeNode
    },
    props: {
      rootName: {
        type: String,
        default: 'root'
      },
      children: {
        type: Array
      }
    },
    data: function(){
      return {
        selectedNode: null,
        rootSelected: false,


        types: {
          value: '设备种类',
          model: {}
        }
      }
    },
    methods:{
      nodeClick: function(node){
        this.rootSelected = false
        if (this.selectedNode){
          this.selectedNode.selected = false
        }
        this.selectedNode = node ;
        this.selectedNode.selected = true
      },
      rootClick: function(){
        if(this.selectedNode){
          this.selectedNode.selected = false
        }
        this.selectedNode = null
        this.rootSelected = true
      },
      addNode: function(nodedata){
        if (this.selectedNode || this.rootSelected){
          if(this.selectedNode) {
            this.selectedNode.children.push(nodedata)
          }else{
            this.children.push(nodedata)
          }
          return true
        }else{
          return false
        }
      },
      deleteNode: function(){
        if (this.selectedNode){
          this.selectedNode.deleteSelf()
          return true
        }else{
          return false
        }
      },
      deleteChild: function(index){
        if (this.children.length>index){
          this.children.splice(index,1)
        }
      },
      nodeClick: function(node){
        this.rootSelected = false
        if (this.selectedNode){
          this.selectedNode.selected = false
        }
        let change = this.selectedNode!=node
        this.selectedNode = node ;
        this.selectedNode.selected = true
        if (change){
          this.$emit('onNodeChange',node.model);
        }
      }
    }
  }
</script>

<style lang="sass" scoped>
  .device-type-tree
    font-size: 16px
    display: flex
    flex-flow: column

    .tree-content
      flex: 1
      overflow: auto
      padding-left: 10px
    .root-body
      cursor: pointer
      font-size: 20px
      display: block
      padding: 5px
    ul
      list-style: none
    .selected
      background-color: red
      color: #fff

</style>
