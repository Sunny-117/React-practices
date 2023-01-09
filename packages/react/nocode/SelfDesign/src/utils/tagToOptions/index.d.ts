export type Result = {
  text: boolean;  // true 文本样式
  textContent: boolean; // true 文本内容
  change: boolean;
  appearance: boolean;
  align: boolean;  // true 对其方式 当前布局 flex
  image: boolean; // true tag == image
  event: {
    mouse: boolean; //可以添加鼠标事件
    keydown: boolean;
    keyup: boolean;
  }
};
/**
 * 根据标签名返回组件选项
 * @see 用法见 src/utils/tagToOptions/README.md
 * @param tag 标签名
 * @return 一个标签对应的选项的对象；如果标签名不存在，则返回 null
 */
export function tagToOptions(tag: string): Result | null;
