<template>
  <li class="device-type-tree-node" >

    <div class="extendsButton" @click="nodeExtends = !nodeExtends">
      <md-icon v-if="children.length===0"></md-icon>
      <md-icon v-else-if="nodeExtends">remove</md-icon>
      <md-icon v-else>add</md-icon>
    </div>
    <span class="node-body" @click="nodeClick" v-bind:class="{ selected: selected }">{{value}}</span>
    <ul v-if="nodeExtends && children.length>0 " v-for="(child, index) in children">
      <device-type-tree-node :value="child.value" :children="child.children" :model="child.model"  v-on:childClick="childClick" v-on:deleteChild="deleteChild" :index="index"/>
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
      'index'
    ],
    data: function() {
      return {
        level: 0,
        nodeExtends: false,
        selected: false
      }
    },
    methods:{
      nodeClick: function(){
        this.$emit('childClick',this);
      },
      childClick: function(node){
        this.$emit('childClick',node);
      },
      deleteSelf: function(){
        this.$emit('deleteChild',this.index);
      },
      deleteChild: function(index){
        if (this.children.length>index){
          this.children.splice(index,1)
        }
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
