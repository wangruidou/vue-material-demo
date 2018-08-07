import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedNodePath: [],
    selectedNode: null,

    typeData:[
      {
        value:'电脑',
        children:[
          {value:'鼠标',children:[],model:{
              typeid:'0011',
              typename:'鼠标',
              parentid:'0001',
              kinds:[
                {id:'00110001',name:'罗技M585',manufacturername:'LOGI',manufacturerid:'1001',proviteyear:2,destoryyear:8},
                {id:'00110002',name:'罗技M392',manufacturername:'LOGI',manufacturerid:'1001',proviteyear:2,destoryyear:8},
                {id:'00110003',name:'双飞燕M139',manufacturername:'双飞燕',manufacturerid:'1002',proviteyear:2,destoryyear:8},
                {id:'00110004',name:'双飞燕Z11',manufacturername:'双飞燕',manufacturerid:'1002',proviteyear:2,destoryyear:8}
              ],
              params:[
                {id:'p1',name:'a',enable:['a'],defaultValue:'a'},
                {id:'p2',name:'b',enable:['b'],defaultValue:'b'}
              ],
              points:[]
            }},
          {value:'键盘',children:[],model:{
              typeid:'0012',
              typename:'键盘',
              parentid:'0001',
              kinds:[],
              params:[
                {id:'01111',name:'a1',enable:['a'],defaultValue:'a'},
                {id:'01112',name:'b1',enable:['b'],defaultValue:'b'}
              ],
              points:[],
            }},
          {value:'显示器',children:[],model:{
              typeid:'0013',
              typename:'显示器',
              parentid:'0001',
              kinds:[],
              params:[],
              points:[],
            }}
        ],
        model:{
          typeid:'0001',
          typename:'电脑',
          parentid:'',
          points:[],
          params:[]
        }},
    ],
    
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
    }
  }
})

