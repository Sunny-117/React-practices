export default function(fun){
  let canRun = true;
  return function(... args){
    if(canRun){
      fun.apply(this, args)
      canRun = false;
      requestAnimationFrame(() => canRun = true)
    }
  }
}