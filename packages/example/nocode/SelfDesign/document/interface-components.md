# **组件操作接口**

## 添加节点

```js

// 拿到后端返回节点模板
componentsTemplate = [
      {
        tag: 'Button',
        children: [],
        style: {},
        events: [],
        values:{}
      },
      {
        tag: 'Text',
        children: [],
        style: {},
        events: [],
        values:{}
      }, 
      {
        tag: 'Image',
        children: [],
        style: {},
        events: [],
        values:{}
      },
      {
        tag: 'HorizontalLayout',
        children: [],
        style: {},
        events: [],
      },
      {
        tag: 'VerticalLayout',
        children: [],
        style: {},
        events: [],
      },
    ]

// 向 vuex 提交 addComponent, 传入 对象 {node: nodeTemplate[i]} 作为参数

store.commit('editPage/addComponent', {node: nodeTemplate[i]})

```

## 画板中使用根节点组件

```html
<!-- 画板.vue -->

<template>
  <div v-if="!loading">
    <!-- 根组件， 必须加载数据成功才渲染-->
    <the-root-component :root-node = "root"/>
  </div>
</template>

<script>

export default {
  data() {
    return { 
      // 后端返回的根节点
      root:{
        id: 1,
        tag: 'VerticalLayout',
        style: {
          width:'100%',
          height:'100%'
        },
        children:[]
      }
    }
  }
}
</script>
```

## 取消选中节点

```js
store.commit('editPage/resetActiveComponent')
```

## 获取被选中节点对象

```js
  store.getters['editPage/activeComponent']
  // 有组件被选中时返回节点对象
  // 无组件被选中时返回 null
```

## 获取被选中节点的样式

```js
  store.getters['editPage/activeComponent'].style
  // 注意返回节点是否为 null
```

## 获取被选中节点的事件

```js
  store.getters['editPage/activeComponent'].events
  // 注意返回节点是否为 null
```

## 获取被选中节点的 values

```js
  store.getters['editPage/activeComponent'].values
  // 注意返回节点是否为 null，且注意 非 Button, Image, Text 的节点没有 values 为 空对象 {}  
```

## 修改被选中节点的样式

```js
  store.commit('editPage/setActiveComponentStyle', {
    // 想更新啥就写啥属性和值
    color: 'red'
  })

```

## 修改被选中节点的事件

```js
  store.commit('editPage/setActiveComponentEvent', {
    events: [
      // 想添加或更新啥事件就写啥对象
      {

      }
    ]
  })

```

## 修改被选中节点的 values

```js
  store.commit('editPage/setActiveComponentValues', {
    // 想更新啥就写啥属性和值
    content: '按钮2'
  })

```

## 获取所有组件 id

```js
  store.getters['editPage/componentsId']
  // 不包含活动组件id和根组件id 
```

## 获取发布时需要的 json 对象，返回 根节点对象

```js

 // 比较耗时，执行函数期间最好禁止用户发起其他操作
 // 两条语句一起操作，且不能互换次序
  store.commit("editPage/slimComponents");
  const json = store.state.editPage.fileContent;
 
```
