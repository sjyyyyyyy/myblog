---
sidebar_position: 9
---

# React

18.2

基础知识相关

## 虚拟Dom

虚拟dom相当于在js和真实dom之间加了一个缓存，利用diff算法避免了没有必要的dom操作，从而提高性能 ，用js对象结构表示dom树结构，用这个树构建一个真正的dom树，插到文档中，当状态变更的时候，重新构造一棵对象树，然后新树和旧树进行比较，记录差异，然后把差异应用在步骤1所构建的dom树上就完成视图更新了

:::caution diff
1. 把树形结构按照层级分解，只比较同级元素
2. 给列表结构的每个单元添加唯一的key属性，方便比较
3. React只会匹配相同class的component
4. 合并操作，调用component的setState方法时，React将其标记为dirty，到事件循环结束，React检查所有标记dirty的component重新绘制
:::选择性子树渲染，开发人员可以重写shouldComponentUpdate提高diff性能

## Redux

- redux是应用数据流框架，主要解决了组件间状态共享的问题，集中式管理，主要有三个核心方法action，store，reducer。工作流程是view调用store的dispatch接收action传入store，reducer进行state操作，view通过store提供的getState获取最新数据。

新增state，对状态的管理更加明确，通过redux，流程更加规范了，减少手动编码量，提高了编码效率，同时缺点是当数据更新时有时候组件不需要但也要重新绘制，影响效率，一般情况下，只有在构建多交互，多数据流的复杂项目应用时才会使用他们。

- flux也是用来进行数据操作的，由action，dispatch，view，store组成，工作流程是view发出一个action，派发器接收action，让store进行数据更新，更新完后store发出change，view接受change更新视图。

:::caution
redux和flux很像，区别在于flux有多个可以改变应用状态的store，在flux中dispatcher被用来传递数据到注册的回调事件，但在redux中只能定义一个可更新状态的store，redux把store和dispatcher合并，结构更加简单清晰
:::

## 类组件和函数组件区别

类组件可以维护内部状态，利用一些生命周期方法，函数组件是无状态的，并返回要呈现的输出，他们渲染ui的首选只依赖于属性，相比类组件更简单，更具性能