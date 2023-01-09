# 如何使用

```javascript
import { tagToOptions } from './utils/tagToOptions';
const 对象 = tagToOptions('标签名');
```

传入标签名，函数会返回一个组件选项：

```typescript
// ?代表可能存在这个属性
{
  options: 组件自身的选项及其类型;
  subOptions?: 布局组件的子元素选项及其类型;
  values?: 组件特殊值及其类型;
  event?: 组件事件类型;
}
```

若标签名不存在，则返回 null

## 以横向布局为例：

会返回一个对象：

```javascript
{
  // 组件自身选项
  options: {
    width: ['string', 0], // 意思是 width 的类型可以是 string 或者数字 0
    height: ['string', 0],
    'box-shadow': 'string', // 意思是 box-shadow 的类型是 string
    'background-color': 'string',
    /** ...等等 */
  },
  // 布局组件可以放子组件，所以有 subOptions
  subOptions: {
    width: ['string', 0],
    'box-shadow': 'string',
    order: 'number' // 意思是 order 的类型是 number
  },
  // 布局组件没有组件特殊值 values 和组件事件 event
}
```

## 以按钮为例

```javascript
{
  // 组件自身选项
  options: {
    width: ['string', 0], // 意思是 width 的类型可以是 string 或者数字 0
    height: ['string', 0],
    'box-shadow': 'string', // 意思是 box-shadow 的类型是 string
    'font-size': 'string',
    'font-weight': ['number', 'string'] // 意思是 font-weight 的类型可以是 string 或 number
    /** ...等等 */
  },
  // 按钮没有子组件，所以没有有 subOptions
  // 组件特殊值 values
  values: {
    content: 'string'
  },
  // 组件事件 event，暂时是个数组
  event: [
    'click',
    'dbclick',
    'mousedown',
    'mouseup'
  ]
}
```