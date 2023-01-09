/**
 * 
 * @param {*} target dom 组件，组件上有 id=component{{id}}, 如果是 容器还会有一个 container 类名 
 * 缺点：需要 id 属性和 class 属性，具有一定的耦合性
 */
export default function(target){
  // 判断是否是画板里的组件
  if(target.id.indexOf('component') === -1){
    return -1;
  }
  //  判断是否是容器
  // className 返回一个字符串，多个类型用空格分隔了
  let activeContainerId = -1;
  if(target.className.indexOf('container') !== -1){
    activeContainerId =  Number(target.id.slice(9)); // 去掉前面的 components 前缀
  }else{
    activeContainerId =  Number(target.parentNode.id.slice(9));
  }
  return activeContainerId
}