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
          {value:'鼠标',children:[
            {
              value: '鼠标垫',
              children: [
                {
                  value: '面',
                  children: [],
                  model:{
                    typeid: '11111'
                  }
                }
              ],
              model: {
                typeid: '0111',
                typename: '鼠标垫',
                parentid: '0011',
                kinds: [
                  {id:'01110001',name:'罗技M585',manufacturername:'LOGI',manufacturerid:'1001',guaranteeDate:2,scrapDate:8,typeid:'0011',params: {
                    _136a3d6f_6f9d_4adc_830c_9b62498f45ec: '蓝色'
                  }},
                  {id:'01110002',name:'罗技M392',manufacturername:'LOGI',manufacturerid:'1001',guaranteeDate:2,scrapDate:8,typeid:'0011',params:{
                      _136a3d6f_6f9d_4adc_830c_9b62498f45ec: '黑色'
                  }}
                ],
                params: [
                  {id:'136a3d6f-6f9d-4adc-830c-9b62498f45ec',name:'颜色',enable:['黑色','灰色','蓝色'],defaultValue:'黑色'},
                ],
                points: [
                  {id:"fd6d9886-2a86-44e3-bcfe-ae84a32e46b1",name:"污损情况",pointType:"Select",enable: ["无污损","轻微污损","严重污损"],defaultValue:"无污损"}
                ]
              }
            },
            {
              value:'其他',
              children: [],
              model: {
                typeid: '12213'
              }
            }
          ],model:{
              typeid:'0011',
              typename:'鼠标',
              parentid:'0001',
              kinds:[
                {id:'00110001',name:'罗技M585',manufacturername:'LOGI',manufacturerid:'1001',guaranteeDate:2,scrapDate:8,typeid:'0011',params: {
                    _136a3d6f_6f9d_4adc_830c_9b62498f45ec: '蓝色',
                    _fd6d9886_2a86_44e3_bcfe_ae84a32e46b7: '3'
                  }},
                {id:'00110002',name:'罗技M392',manufacturername:'LOGI',manufacturerid:'1001',guaranteeDate:2,scrapDate:8,typeid:'0011',params:{
                    _136a3d6f_6f9d_4adc_830c_9b62498f45ec: '黑色',
                    _fd6d9886_2a86_44e3_bcfe_ae84a32e46b7: '3'
                }},
                {id:'00110003',name:'双飞燕M139',manufacturername:'双飞燕',manufacturerid:'1002',guaranteeDate:2,scrapDate:8,typeid:'0011',params:{
                    _136a3d6f_6f9d_4adc_830c_9b62498f45ec: '蓝色',
                    _fd6d9886_2a86_44e3_bcfe_ae84a32e46b7: '4'
                }},
                {id:'00110004',name:'双飞燕Z11',manufacturername:'双飞燕',manufacturerid:'1002',guaranteeDate:2,scrapDate:8,typeid:'0011',params:{
                    _136a3d6f_6f9d_4adc_830c_9b62498f45ec: '灰色',
                    _fd6d9886_2a86_44e3_bcfe_ae84a32e46b7: '5'
                }}
              ],
              params:[
                {id:'136a3d6f-6f9d-4adc-830c-9b62498f45ec',name:'颜色',enable:['黑色','灰色','蓝色'],defaultValue:'黑色'},
                {id:'fd6d9886-2a86-44e3-bcfe-ae84a32e46b7',name:'功能键数量',enable:['3','4','5'],defaultValue:'4'}
              ],
              points:[
                {id:"fd6d9886-2a86-44e3-bcfe-ae84a32e46b1",name:"污损情况",pointType:"Select",enable: ["无污损","轻微污损","严重污损"],defaultValue:"无污损"},
                {id:"fd6d9886-2a86-44e3-bcfe-ae84a32e46b2",name:"滚轮损坏",pointType:"Boolean",falseValue:"未损坏",trueValue:"损坏",defaultValue:false},
                {id:"fd6d9886-2a86-44e3-bcfe-ae84a32e46b3",name:"修理次数",pointType:"Number",defaultValue:"0",floatCount:"0",maxValue:"20",minValue:"0"},
                {id:"fd6d9886-2a86-44e3-bcfe-ae84a32e46b4",name:"修理备注",pointType:"None",defaultValue:""}
              ]
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
          kinds: [],   
          parentid:'',
          points:[],
          params:[]
        }},
    ],
    deviceDataIndex:{
      _001:0,
      _011:1,
      _022:2,
      _033:3,
      _233:4,
      _333:5,
    },
    deviceData:[
      {deviceid:'001',devicestatus:2,devicecode:'code001010',devicetypeid:'0001',devicetypename:'电脑',devicekindid:'1919219',devicekindname:'ThinkPad-T470P',createdate:'2017-01-01 02:11:12',firstusedate:1495956540000,parentid:'',parendcode:'',params:{},points:{}},
      {deviceid:'011',devicestatus:2,devicecode:'code011111',devicetypeid:'0011',devicetypename:'鼠标',devicekindid:'01',devicekindname:'罗技M585',createdate:'2017-01-01 02:11:12',firstusedate:1495956540000,parentid:'001',parendcode:'code001010',params:{_136a3d6f_6f9d_4adc_830c_9b62498f45ec:"黑色",_fd6d9886_2a86_44e3_bcfe_ae84a32e46b7:"3"},points:{_fd6d9886_2a86_44e3_bcfe_ae84a32e46b1:"无污损",_fd6d9886_2a86_44e3_bcfe_ae84a32e46b2:"未损坏",_fd6d9886_2a86_44e3_bcfe_ae84a32e46b3:"0",_fd6d9886_2a86_44e3_bcfe_ae84a32e46b4:""}},
      {deviceid:'022',devicestatus:2,devicecode:'code021212',devicetypeid:'0012',devicetypename:'键盘',devicekindid:'02',devicekindname:'普通键盘',createdate:'2017-01-01 02:11:12',firstusedate:1495956540000,parentid:'001',parendcode:'code001010',params:{},points:{}},
      {deviceid:'033',devicestatus:2,devicecode:'code001010',devicetypeid:'0013',devicetypename:'显示器',devicekindid:'03',devicekindname:'普通显示器',createdate:'2017-01-01 02:11:12',firstusedate:1495956540000,parentid:'001',parendcode:'code001010',params:{},points:{}},
      {deviceid:'233',devicestatus:2,devicecode:'code701010',devicetypeid:'0011',devicetypename:'鼠标',devicekindid:'01',devicekindname:'罗技M585',createdate:'2017-01-01 02:11:12',firstusedate:1495956540000,parentid:'',parendcode:'',params:{_136a3d6f_6f9d_4adc_830c_9b62498f45ec:"灰色",_fd6d9886_2a86_44e3_bcfe_ae84a32e46b7:"4"},points:{_fd6d9886_2a86_44e3_bcfe_ae84a32e46b1:"轻微污损",_fd6d9886_2a86_44e3_bcfe_ae84a32e46b2:"未损坏",_fd6d9886_2a86_44e3_bcfe_ae84a32e46b3:"2",_fd6d9886_2a86_44e3_bcfe_ae84a32e46b4:""}},
      {deviceid:'333',devicestatus:2,devicecode:'code771010',devicetypeid:'0011',devicetypename:'鼠标',devicekindid:'01',devicekindname:'罗技M392',createdate:'2017-01-01 02:11:12',firstusedate:1495956540000,parentid:'002',parendcode:'',params:{},points:{}},
      {deviceid:'1901',devicestatus:1,devicecode:'code701020',devicetypeid:'0011',devicetypename:'鼠标',devicekindid:'01',devicekindname:'双飞燕M139',createdate:'2017-01-01 02:11:12',firstusedate:1495956540000,parentid:'',parendcode:'',params:{},points:{}},
      {deviceid:'1902',devicestatus:1,devicecode:'code771021',devicetypeid:'0011',devicetypename:'鼠标',devicekindid:'01',devicekindname:'罗技M585',createdate:'2017-01-01 02:11:12',firstusedate:1495956540000,parentid:'',parendcode:'',params:{},points:{}},
      {deviceid:'1903',devicestatus:2,devicecode:'code701022',devicetypeid:'0011',devicetypename:'鼠标',devicekindid:'01',devicekindname:'罗技M392',createdate:'2017-01-01 02:11:12',firstusedate:1495956540000,parentid:'002',parendcode:'',params:{},points:{}},
      {deviceid:'1904',devicestatus:1,devicecode:'code771023',devicetypeid:'0011',devicetypename:'鼠标',devicekindid:'01',devicekindname:'罗技M585',createdate:'2017-01-01 02:11:12',firstusedate:1495956540000,parentid:'',parendcode:'',params:{},points:{}},
      {deviceid:'1905',devicestatus:1,devicecode:'code701024',devicetypeid:'0011',devicetypename:'鼠标',devicekindid:'01',devicekindname:'双飞燕Z11',createdate:'2017-01-01 02:11:12',firstusedate:1495956540000,parentid:'002',parendcode:'',params:{},points:{}},
      {deviceid:'4906',devicestatus:4,devicecode:'code771025',devicetypeid:'0011',devicetypename:'鼠标',devicekindid:'01',devicekindname:'双飞燕M139',createdate:'2017-01-01 02:11:12',firstusedate:1495956540000,parentid:'',parendcode:'',params:{},points:{}},
      {deviceid:'4801',devicestatus:1,devicecode:'code741020',devicetypeid:'0012',devicetypename:'键盘',devicekindid:'02',devicekindname:'罗技键盘',createdate:'2017-01-01 02:11:12',firstusedate:1495956540000,parentid:'',parendcode:'',params:{},points:{}},
      {deviceid:'4802',devicestatus:1,devicecode:'code741021',devicetypeid:'0012',devicetypename:'键盘',devicekindid:'02',devicekindname:'罗技键盘',createdate:'2017-01-01 02:11:12',firstusedate:1495956540000,parentid:'',parendcode:'',params:{},points:{}},
      {deviceid:'0111',devicestatus:1,devicecode:'code235312',devicetypeid:'0111',devicetypename:'鼠标垫',devicekindid:'001',devicekindname:'xxx鼠标垫',createdate:'2017-01-01 02:11:12',firstusedate:1495956540000,parentid:'',parendcode:'',params:{},points:{}},
    ]    
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

