/** @type {import('..').Result} */
export default {
  text: true,  // true 文本样式
  textContent: true, // true 文本内容
  change: true, // true
  appearance: true, //
  align: false,  // true 对其方式 当前布局 flex 
  image: false, // true tag == image
  event: {
    mouse: true, //可以添加鼠标事件
    keydown: false,
    keyup: false,
  }
};