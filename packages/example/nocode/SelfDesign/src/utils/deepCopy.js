function deepCopy (source){
  if(Array.isArray(source)){
    const res = [];
    source.forEach(element => {
      res.push(deepCopy(element))
    });
    return res;
  }else if(source && typeof source === 'object'){
    const res = {};
    for(let key in source){
      res[key] = deepCopy(source[key])
    }
    return res;
  }else{
    return source;
  }
}

export default deepCopy