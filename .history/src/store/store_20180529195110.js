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
                {id:'00110001',name:'罗技M585',manufacturername:'LOGI',manufacturerid:'1001',guaranteeDate:2,scrapDate:8,typeid:'0011',params: {
                    _136a3d6f_6f9d_4adc_830c_9b62498f45ec: '红色',
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
    deviceData: [
        {
            devicecode: "09920403290",
            devicetype: '罗技M585',
            typeid: '0013',
            devicekind: '鼠标',
            firstusedate: "2018-01-01 00:00:00",
            devicestatus: "入所",
            parentid: '22222222',
            _136a3d6f_6f9d_4adc_830c_9b62498f45ec: '黑色',
            _fd6d9886_2a86_44e3_bcfe_ae84a32e46b7: 3
        },
        {
            devicecode: "835929521421",
            devicetype: '罗技M585',
            typeid:'0012',
            devicekind: '鼠标',
            firstusedate: "2018-01-02 00:00:00",
            devicestatus: "入所",
            parentid: '22222222',
            _136a3d6f_6f9d_4adc_830c_9b62498f45ec: '红色',
            _fd6d9886_2a86_44e3_bcfe_ae84a32e46b7: 5
        },
        {
            devicecode: "29741912752",
            devicetype: '罗技M392',
            typeid: '0013',
            devicekind: '鼠标',
            firstusedate: "2018-01-03 00:00:00",
            devicestatus: "入所",
            parentid: '22222222',
            _136a3d6f_6f9d_4adc_830c_9b62498f45ec: '灰色',
            _fd6d9886_2a86_44e3_bcfe_ae84a32e46b7: 3
        },
        {
            devicecode: "3757828621841",
            devicetype: '罗技M585',
            typeid:'0012',
            devicekind: '鼠标',
            firstusedate: "2018-01-04 00:00:00",
            devicestatus: "入所",
            parentid: '22222222',
            _136a3d6f_6f9d_4adc_830c_9b62498f45ec: '蓝色',
            _fd6d9886_2a86_44e3_bcfe_ae84a32e46b7: 5
        },
        {
            devicecode: "810248072124",
            devicetype: '罗技M585',
            typeid:'0012',
            devicekind: '鼠标',
            firstusedate: "2018-01-05 00:00:00",
            devicestatus: "入所",
            parentid: '22222222',
            _136a3d6f_6f9d_4adc_830c_9b62498f45ec: '蓝色',
            _fd6d9886_2a86_44e3_bcfe_ae84a32e46b7: 3
        },
        {
            devicecode: "082057291311",
            devicetype: '罗技M392',
            typeid: '0011',
            devicekind: '鼠标',
            firstusedate: "2018-01-06 00:00:00",
            devicestatus: "入所",
            parentid: '22222222',
            _136a3d6f_6f9d_4adc_830c_9b62498f45ec: '灰色',
            _fd6d9886_2a86_44e3_bcfe_ae84a32e46b7: 3
        },
        {
            devicecode: "375871984201",
            devicetype: '双飞燕M139',
            typeid: '0011',
            devicekind: '鼠标',
            firstusedate: "2018-01-07 00:00:00",
            devicestatus: "入所",
            parentid: '22222222',
            _136a3d6f_6f9d_4adc_830c_9b62498f45ec: '蓝色',
            _fd6d9886_2a86_44e3_bcfe_ae84a32e46b7: 4
        },
        {
            devicecode: "923597917241",
            devicetype: '罗技M585',
            typeid: '0012',
            devicekind: '鼠标',
            firstusedate: "2018-01-08 00:00:00",
            devicestatus: "入所",
            parentid: '22222222',
            _136a3d6f_6f9d_4adc_830c_9b62498f45ec: '黑色',
            _fd6d9886_2a86_44e3_bcfe_ae84a32e46b7: 4
        },
        {
            devicecode: "7329579691624",
            devicetype: '双飞燕Z11',
            typeid: '0011',
            devicekind: '鼠标',
            firstusedate: "2018-01-09 00:00:00",
            devicestatus: "入所",        
            parentid: '22222222',
            _136a3d6f_6f9d_4adc_830c_9b62498f45ec: '灰色',
            _fd6d9886_2a86_44e3_bcfe_ae84a32e46b7: 5
        },
        {
            devicecode: "231235332123",
            devicetype: '联想ThinkPad',
            typeid: '0001',
            devicekind: '电脑',
            firstusedate: "2018-01-09 00:00:00",
            devicestatus: "入所",        
            parentid: ''
        }
    ],
    devicesOnTrain: [
      {
        typeid:"0011",
        typename:"鼠标",
        array:[
          {
            devicecode:"241251",
            devicetype:"罗技M585",
            firstusedate: 1517223237000,
            devicestatus:"备品",
            traintypename:"HXD3C",
            trainid:"1234"
          },
          {
            devicecode:"235235",
            devicetype:"双飞燕M139",
            firstusedate: 1519901637000,
            devicestatus:"备品",
            traintypename:"HXD3C",
            trainid:"1234"
          }
        ]
      },
      {
        typeid:"0012",
        typename:"键盘",
        array:[
          {
            devicecode:"124532",
            devicetype:"2q53532ds",
            firstusedate: 1524999237000,
            devicestatus:"备品",
            traintypename:"HXD3C",
            trainid:"1234"
          }
        ]
      },
      {
        typeid:"0013",
        typename:"显示器",
        array:[]
      }
    ],
    localDevices: {
      '0011':[
        {deviceid:'111',devicecode:'code111111',devicetypeid:'0011',deivcekindname:'双飞燕M139',productiondate:'2017-01-01 02:11:12',firstusedate:1495956540000,parentid:'',parendcode:''},
        {deviceid:'211',devicecode:'code211111',devicetypeid:'0011',deivcekindname:'罗技M392',productiondate:'2017-01-01 02:11:12',firstusedate:1495956540000,parentid:'',parendcode:''}
      ],
      '0012':[
        {deviceid:'122',devicecode:'code121212',devicetypeid:'0012',deivcekindname:'普通键盘',productiondate:'2017-01-01 02:11:12',firstusedate:1495956540000,parentid:'',parendcode:''},
        {deviceid:'222',devicecode:'code221212',devicetypeid:'0012',deivcekindname:'普通键盘',productiondate:'2017-01-01 02:11:12',firstusedate:1495956540000,parentid:'',parendcode:''},
      ],
      '0013':[
        {deviceid:'133',devicecode:'code101010',devicetypeid:'0013',deivcekindname:'普通显示器',productiondate:'2017-01-01 02:11:12',firstusedate:1495956540000,parentid:'',parendcode:''},
        {deviceid:'233',devicecode:'code201010',devicetypeid:'0013',deivcekindname:'普通显示器',productiondate:'2017-01-01 02:11:12',firstusedate:1495956540000,parentid:'',parendcode:''}
      ]
    }
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

