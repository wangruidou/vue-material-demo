export default {
  trainsIdToKey(id){
    return ("_" + id.replace(/-/g, '_'));
  },
  trainsKeyToId(key){
    return (key.replace(/_/g, '-').replace('-',''));
  },  
  isEmptyObject (e) { // 判断对象是否为空
    var t;  
    for (t in e)  
        return !1;  
    return !0  
  },
  getTypeTreeData(children,typeid){ // 通过typeid获取子
    for (let i=0;i<children.length;i++){
      let child = children[i]
      if (child.model.typeid===typeid){
        return child;
      }else{
        let childret = this.getTypeTreeData(child.children,typeid);
        if (childret){
          return childret
        }
      }
    }
  },
  getParentidByTypeid(children,typeid){
    for (let i=0;i<children.length;i++) {
      let child = children[i]
      if (child.model.typeid == typeid) {
        return child.model.parentid
      } else {
        let childret = this.getParentidByTypeid(child.children, typeid)
        if (childret) {
          return childret.model.parentid
        }
      }
    }
  },
  trainsDataBetweenNow(data){
    let between = Math.abs(new Date().getTime()-data);
    let year = parseInt(between/(1000*60*60*24*365))
    let day = parseInt(between%(1000*60*60*24*365)/(1000*60*60*24))
    return year+'年 '+day+'日'
  },
  trainsDeviceStatus(status_code){
    switch (status_code){
      case 0: return '废品'
      case 1: return '备品'
      case 2: return '待检修'
      case 3: return '检修'
      case 4: return '待交付'
      case 5: return '待发放'
      case 6: return '待运用'
      case 7: return '运用'
      case 31: return '普通检修'
      case 32: return '2年检'
      case 33: return '4年检'
      case 34: return '返厂修'
    }
  },
  // 删除某个节点与父层的关系
  clearParentRelation(devices,deviceindex,device){
    if (device.parentid!==''){
      let parent = devices[deviceindex[this.trainsIdToKey(device.parentid)]]
      let all = [device.deviceid,...device.children]
      while (parent){
        for (let i=0;i<all.length;i++){
          let index = parent.children.indexOf(all[i])
          if (index>=0)
            parent.children.splice(index,1)
        }
        if (parent.parentid!=='')
          parent = devices[deviceindex[this.trainsIdToKey(parent.parentid)]]
        else
          parent = null
      }
    }
  },
  // 删除某个节点与子层的关系
  clearChildrenRelation(devices,deviceindex,device){
    if (device.children.length>0){
      for (let i=0;i<device.children.length;i++){
        let child = devices[deviceindex[this.trainsIdToKey(device.children[i])]]
        if (child.parentid === device.deviceid){
          child.parentid = ''
        }
      }
    }
  },
  //将某个节点添加到某个父节点上
  addParentRelation(devices,deviceindex,device,parentid){
    if (parentid){
      let all = [device.deviceid,...device.children]
      let parent = devices[deviceindex[this.trainsIdToKey(parentid)]]
      while(parent){
        parent.children = parent.children.concat(all)
        if (parent.parentid!=='')
          parent = devices[deviceindex[this.trainsIdToKey(parent.parentid)]]
        else
          parent = null
      }
    }
  },
  createGuid(){
  //   var id = window.jsControler.getGuid()
  //   if(!id){
  //     for(var i=0;i<5;i++)
  //       id+=Math.floor(Math.random()*10);
  //   }
  //   return id;
  }
}

