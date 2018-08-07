export default {
  trainsIdToKey(id){
    return ("_" + id.replace(/-/g, '_'));
  },
  trainsKeyToId(key){
    return (key.replace(/_/g, '-').replace('-',''));
  }
}

