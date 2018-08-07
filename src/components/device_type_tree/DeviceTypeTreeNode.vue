<template>
  <li class="device-type-tree-node" >

    <div class="extendsButton" @click="nodeExtends = !nodeExtends">
      <md-icon v-if="children.length===0"></md-icon>
      <md-icon v-else-if="nodeExtends">remove</md-icon>
      <md-icon v-else>add</md-icon>
    </div>
    <span class="node-body" @click="nodeClick" v-bind:class="{ selected: isSelected }">{{value}}</span>
    <ul v-show="nodeExtends && children.length>0 " v-for="(child, index) in children">
      <device-type-tree-node :value="child.value" :children="child.children" :model="child.model" :path="[...path,index]"  :selectedPath="selectedPath"
                             v-on:childClick="childClick" />
    </ul>
  </li>
</template>

<script>
  export default {
    name: "device-type-tree-node",
    props: [
      'value',
      'model',
      'children',
      'path',
      'selectedPath'
    ],
    data: function() {
      return {
        level: 0,
        nodeExtends: false
      }
    },
    methods:{
      nodeClick: function(){
        this.$emit('childClick',this,this.path);
      },
      childClick: function(node,path){
        this.$emit('childClick',node,path);
      },
      comparePath: function(storePath){
        if (!storePath || !storePath.length || storePath.length!==this.path.length){
          return false
        }else{
          for(var i=0;i<this.path.length;i++){
            if (storePath[i]!==this.path[i]){
              return false
            }
          }
          return true
        }
      }
    },
    computed: {
      isSelected () {
        return this.comparePath(this.selectedPath)
      }
    }
  }
</script>

<style lang="sass" scoped>
  .device-type-tree-node
    .extendsButton
      display: inline-block
    .node-body
      cursor: pointer
    .selected
      background-color: red
      color: #fff
    ul
      list-style: none
</style>
