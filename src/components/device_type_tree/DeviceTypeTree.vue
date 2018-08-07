<template>
  <md-content class="device-type-tree">
    <slot name="tree-toolbar"></slot>
    <md-card class="md-scrollbar tree-content" >
      <span class="root-body" v-bind:class="{selected : rootSelected}" @click="rootClick">{{rootName}}</span>
      <ul class="root" v-for="(child, index) in children">
        <DeviceTypeTreeNode :value="child.value" :children="child.children" :nodeModel="child.model" :path="[index]" :selectedPath="selectedPath"
                            v-on:childClick="nodeClick" />
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
        default: 'root',
      },
      children: {
        type: Array
      },
      selectedPath: {
        type: Array,
        defaultValue: []
      }
    },
    data: function(){
      return {
        selected: null,
        rootSelected: false,

        types: {
          value: '设备种类',
          model: {}
        }
      }
    },
    methods:{
      nodeClick: function(node,path){
        this.$emit('onNodeSelectedChange',path);
        // this.$store.commit('setSelectedNode',path)
      },
      rootClick: function(){
        this.$emit('onNodeSelectedChange',[]);
        // this.$store.commit('setSelectedNode',[])
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
