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
  }  
}

