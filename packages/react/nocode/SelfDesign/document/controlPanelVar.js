let a = {
  text: false,  // true 文本样式
  textContent: false, // true 文本内容
  change: true,
  appearance: true,
  align: false,  // true 对其方式 当前布局 flex 
  order: false,  // true 父组件是flex布局就 
  position: false, // true 父组件 position 布局
  image: false, // true tag == image
  event: {
    mouse: true, //可以添加鼠标事件
    keydown: false,
    keyup: false,
  }
}
