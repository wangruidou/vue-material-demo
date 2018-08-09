import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedNodePath: [],
    selectedNode: null,
    typeData:[],
    deviceDataIndex:{},
    deviceData:[],
    manufacturerData: []
  },
  mutations: {
    /**
     * Node Control Functions
     **/
    setSelectedNode (state,path) {
      if (path){
        let ret = null
        for (let i=0;i<path.length;i++){
          if (i===0){
            ret = state.typeData[path[i]]
          }else{
            ret = ret.children[path[i]]
          }
        }
        state.selectedNode = ret
        state.selectedNodePath = path.slice(0)
      }else{
        state.selectedNodePath = []
        state.selectedNode = null
      }
    },
    addTreeNode (state,typename){
      var data = {value:typename,
        children:[],
        model:{
          typeid:'0001',
          typename: typename,
          parentid:'',
          points:[],
          kinds: [],
          params:[]
        }}
        if (state.selectedNode){
          data.model.parentid = state.selectedNode.model.typeid
          state.selectedNode.children.push(data)
        }else{
          state.typeData.push(data)
        }
    },
    deleteTreeNode (state) {
      if (state.selectedNodePath && state.selectedNodePath.length > 0) {
        let ret = null
        for (let i = 0; i < state.selectedNodePath.length - 1; i++) {
          if (i === 0) {
            ret = state.typeData[state.selectedNodePath[i]]
          } else {
            ret = ret.children[state.selectedNodePath[i]]
          }
        }
        let index = state.selectedNodePath[state.selectedNodePath.length - 1]
        if (ret) {
          ret.children.splice(index,1)
        } else {
          state.typeData.splice(index,1)
        }
        state.selectedNodePath = []
      }
    },

    /**
     * Param Control Functions
     **/
    addTypeParam (state,param_data) {
      if (state.selectedNode) {
        state.selectedNode.model.params.push(param_data)
      }
    },
    deleteTypeParam (state,paramid) {
      if (state.selectedNode) {
        for (let i in state.selectedNode.model.params){
          if (state.selectedNode.model.params[i].id === paramid){
            state.selectedNode.model.params.splice(i,1)
            break;
          }
        }
      }
    },
    changeTypeParam (state,param_data){
      for (let i in state.selectedNode.model.params){
        if (state.selectedNode.model.params[i].id === param_data.id){
          state.selectedNode.model.params.splice(i,1,param_data)
        }
      }
    },

    /**
     * Point Control Functions
     **/
    addTypePoint (state,point_data) {
      if (state.selectedNode) {
        state.selectedNode.model.points.push(point_data)
      }
    },
    deleteTypePoint (state,pointid){
      if (state.selectedNode) {
        for (let i in state.selectedNode.model.points){
          if (state.selectedNode.model.points[i].id === pointid){
            state.selectedNode.model.points.splice(i,1)
            break;
          }
        }
      }
    },
    changeTypePoint (state,point_data){
      for (let i in state.selectedNode.model.points){
        if (state.selectedNode.model.points[i].id === point_data.id){
          state.selectedNode.model.points.splice(i,1,point_data)
        }
      }
    },
    test(state) {
      for(let i=0,len=state.deviceData.length;i<len;i++) {
        state.deviceData[i].firstusedate += 1000
      }
    },
    setManufacturerData(state, data) {
      state.manufacturerData = data
    },
    editManufacturerData(state, data) {
      state.manufacturerData.forEach(function(item, index){
        if(item.id == data.id){
          state.manufacturerData[index] = data
        }
      })
    },
    deleteManufacturerData(state, data) {
      state.manufacturerData.forEach(function(item, index){
        if(item.id == data.id){
          state.manufacturerData.splice(index, 1)
        }
      })
    },
    addManufacturerData(state, data) {
      state.manufacturerData.push(data)
    },
    setTypeData(state, data) {
      state.typeData = data
    },
    setDeviceData(state, data) {
      let dataIndex = {}
      data.forEach(function(item, index){
        dataIndex[item.deviceid] = index
      })
      state.deviceDataIndex = dataIndex
      state.deviceData = data
    },
    updateDeviceData(state, data) {
      let index = state.deviceDataIndex[data.deviceid]
      state.deviceData[index] = data
    }
  },
  getters:{
    getSelectedNodePath: (state)=> {
      return state.selectedNodePath
    },
    getSelectedNode: (state)=> {
      return state.selectedNode
    },
    selectedParam: (state)=> {
      return null
    },
    getManufacturerData: (state) => {
      return state.manufacturerData
    }
  }
})

