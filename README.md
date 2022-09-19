# React-practices

React 30 秒速学

# 项目搭建 

create-react-app typescript

`yarn create react-app my-app --template typescript`

## 参考

https://github.com/30-seconds/30-seconds-of-react

https://juejin.cn/post/6844903846636945415

## React 30 秒速学：把数组数据渲染为列表、表格

RenderArrayDataIntoListsAndTables

- DataList渲染为列表

通过数组渲染元素列表。

`DataList`组件

prop：isOrdered, data

isOrdered: 有序列表，否则无序列表

data: 数据列表，data = ['John', 'Paul', 'Mary'];


- DataTable渲染为表格

`DataTable`组件

渲染一个带有两列(ID和Value)的<table>元素。

使用Array.prototype.map将data中的每个项目渲染为<tr>元素，由其索引和值组成，给它一个由两者串联产生的key。


- MappedTable渲染为映射表格

通过对象数组渲染表格，属性名称与列对应，动态创建每一行。

使用Object.keys()，Array.prototype.filter()，Array.prototype.includes()和Array.prototype.reduce()生成一个filteredData数组，包含所有对象 使用propertyNames中指定的键。
渲染一个<table>元素，其中一组列等于propertyNames中的值。
使用Array.prototype.map将propertyNames数组中的每个值渲染为<th>元素。
使用Array.prototype.map将filteredData数组中的每个对象渲染为<tr>元素，对象中的每个键包含一个<td>。
