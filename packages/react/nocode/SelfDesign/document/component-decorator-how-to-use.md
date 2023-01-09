# 如何使用抽象层

```vue
<script>
export default {
  data() {
    return {
      id: 1 /* 假设我当前选中组件ID为1 */
    }
  }
}
</script>

<template>
  <!-- 那么抽象层会根据这 id 去 vuex 中找到对应的组件数据 -->
  <ComponentDecorator
      :id="id"
      :transformer="/* 在这儿写转换函数，整个不写就是不转换 */"
      @click="/* 在这儿绑定点击组件后抽象层的工作 */"
      v-slot="{ data }"
    > <!-- 对应数据可以通过 v-slot="{ data }" 拿到 -->
      <ComponentA
        :data="data"
        @click="/* 在这儿绑定点击组件后组件本身的工作 */"
      />
    </ComponentDecorator>
</template>
```
