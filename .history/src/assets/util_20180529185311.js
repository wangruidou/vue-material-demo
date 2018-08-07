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
  getTypeTreeData(children,typeid){
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
  trainsDataBetweenNow(data){
    let between = Math.abs(new Date().getTime()-data);
    let year = parseInt(between/(1000*60*60*24*365))
    let day = parseInt(between%(1000*60*60*24*365)/(1000*60*60*24))
    return year+'年 '+day+'日'
  }
}

