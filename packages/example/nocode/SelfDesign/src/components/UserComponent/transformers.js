import { provide } from 'vue';

const userText = (raw) => {
  return {
    value: raw.values.content
  };
};

const userButton = (raw) => {
  return {
    text: raw.values.content
  };
};

const userImage = (raw) => {
  return {
    alt: raw.values.alt,
    src: raw.values.url,
    width: raw.style.width,
    height: raw.style.height,
  };
};

const userLayoutHorizontal = (raw) => {
  return {
    componentId: raw.id,
    myChildren: raw.children,
    width: raw.style.width,
    height: raw.style.height,
    justifyContent: raw.style.justifyContent ? raw.style.justifyContent : raw.style['justify-content'],
    alignItems: raw.style.alignItems ? raw.style.alignItems : raw.style['align-items']
  };
};

const userLayoutVertical = (raw) => {
  return {
    componentId: raw.id,
    myChildren: raw.children,
    width: raw.style.width,
    height: raw.style.height,
    justifyContent: raw.style.justifyContent ? raw.style.justifyContent : raw.style['justify-content'],
    alignItems: raw.style.alignItems ? raw.style.alignItems : raw.style['align-items']
  };
};

const userLayoutPosition = (raw) => {
  return {
    componentId: raw.id,
    myChildren: raw.children,
    width: raw.style.width,
    height: raw.style.height
  };
}



/**
 * 在用到ComponentDecorator的那个组件setup里执行
 * 之后直接把ComponentDecorator v-slot里的{ data }
 * 使用v-bind传到子组件（\<component\>）
 */
const useUserComponentTransformer = () => {
  provide(
    '__userComponentTransformers',
    new Map([
      ['Image', userImage],
      ['Text', userText],
      ['Button', userButton],
      ['HorizontalLayout',userLayoutHorizontal],
      ['VerticalLayout', userLayoutVertical],
      ['PositionLayout', userLayoutPosition]
    ])
  );
};

export default useUserComponentTransformer;