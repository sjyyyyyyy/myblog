---
sidebar_position: 8
---

# Vue

基础知识相关

## 生命周期

1. 实例初始化后，数据观测之前：beforeCreate
2. 实例创建完后，可调methods操作data：created
3. 组件挂载之前，相关渲染函数首次调用：beforeMount
4. 挂载完成，页面已渲染，可进行ajax操作，只会执行一次：mounted
5. 数据更新之前，此时data中的数据是新的，页面未同步更新：beforeUpdate
6. 数据更改，虚拟dom重新渲染和打补丁，页面同步更新：updated
7. 组件或实例销毁前：beforeDestroy
8. 组件或实例销毁后：destroyed
9. 被keep-alive缓存的组件激活时调用：activated
10. 组件失活，使用了keep-alive就不会调用beforeDestory和destoryed钩子了，因为组件没有被销毁，而是被缓存起来了：deactivated

## 组件执行顺序，更新顺序，销毁顺序

### 执行顺序：

1. 父组件beforeCreate
2. 父组件created
3. 父组件beforeMount
4. 子组件beforeCreate
5. 子组件created
6. 子组件beforeMount
7. 子组件mounted
8. 父组件mounted

### 更新顺序：

1. 父组件beforeUpdate
2. 子组件beforeUpdate
3. 子组件updated
4. 父组件updated

### 销毁顺序：

1. 父组件beforeCreate
2. 父组件created
3. 父组件beforeMount
4. 子组件beforeCreate
5. 子组件created
6. 子组件beforeMount
7. 子组件mounted
8. 父组件mounted
9. 父组件beforeUpdate
10. 子组件beforeDestroy
11. 子组件destroyed
12. 父组件updated

## 响应式原理



## computed 计算属性

> 默认走缓存，依赖数据(data中或props中)发生改变才会重新进行计算，如果computed属性属性值是函数，那么默认会走get方法；函数的返回值就是属性的属性值；在computed中的，属性都有一个get和一个set方法，当数据变化时，调用set方法

:::caution 注意
当computed中有异步操作时无效，无法监听数据变化
:::

## watch 侦听属性

> 支持异步，监听的函数接收两个参数，第一个参数是最新的值；第二个参数是输入之前的值，监听数据(data中或props中)

:::caution
不支持缓存，数据改变直接会触发，无法监听数组变动和对象新增
:::

:::tip 源码
1. immediate：组件加载立即触发回调函数执行，
2. deep: 深度监听，为了发现对象内部值的变化，复杂类型的数据时使用，例如数组中的对象内容的改变，注意监听数组的变动不需要这么做。注意：deep无法监听到数组的变动和对象的新增，参考vue数组变异,只有以响应式的方式触发才会被监听到。
:::
