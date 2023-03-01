---
sidebar_position: 9
---

# React

18.2

基础知识相关

> 使用虚拟dom，可以进行服务端渲染，遵循单向数据流或数据绑定，JSX可读性更好

## 状态-State

状态是react组件的核心，是数据的来源，是决定组件呈现和行为的对象，他们是可变的，并创建动态和交互式组件，可以用this.setState({name:'Jaeha', id:'222'})更改状态

- 调用setState发生了什么？

1. react会将当前传入的参数对象和组件当前的状态合并成为新的state，生成新的虚拟dom树，计算出新树和老树的节点差异然后进行更新
2. 通过isBatchingUpdates 来判断setState 是先存进 state 队列还是直接更新，性能原因，会将 React 事件处理程序中的多次React 事件处理程序中的多次 setState 的状态修改合并成一次状态修改。
3. setState 的第二个参数是一个可选的回调函数。这个回调函数将在组件重新渲染后执行。等价于在 componentDidUpdate 生命周期内执行。通常建议使用 componentDidUpdate 来代替此方式。在这个回调函数中你可以拿到更新后state的值

:::caution 为什么不直接改变state，要用setState
- 如果直接改变组件的状态，React 将无法得知它需要重新渲染组件。
- this.state通常是用来初始化state的，this.setState是用来修改state值的。如果初始化了state之后再使用this.state，之前的state会被覆盖掉，如果使用this.setState，只会替换掉相应的state值。所以，如果想要修改state的值，就需要使用setState，而不能直接修改state，直接修改state之后页面是不会更新的。
- 通过使用setState()方法，React 可以更新组件的UI。如果需要基于另外一个状态更新组件的状态`this.setState((state, props) => ({
  counter: state.counter + props.increment
}));`
:::

## JSX

> JSX是javascript xml的简写，是react使用的一种文件，利用类似html的模板语法，使得html文件更利于理解，或者说，jsx是一种很像xml的js语法扩展,浏览器是无法读取JSX的：因为浏览器只能读取js对象，而不能读取js对象中的jsx，可以由babel将jsx转为js后浏览器再进行读取操作,JSX是React.createElement(component, props, ...children)的语法糖

## 虚拟Dom

虚拟dom相当于在js和真实dom之间加了一个缓存，利用diff算法避免了没有必要的dom操作，从而提高性能 ，用js对象结构表示dom树结构，用这个树构建一个真正的dom树，插到文档中，当状态变更的时候，重新构造一棵对象树，然后新树和旧树进行比较，记录差异，然后把差异应用在步骤1所构建的dom树上就完成视图更新了

:::tip diff
1. 把树形结构按层级分解，只在同级进行比较，给每个单元添加唯一的key属性，方便比较
2. 忽略节点跨层级操作场景，提升比对效率。（基于树进行对比）
3. 如果组件的 class 一致，则默认为相似的树结构，否则默认为不同的树结构。（基于组件进行对比）
4. 同一层级的子节点，可以通过标记 key 的方式进行列表对比。（基于节点进行对比）
5. 合并操作，调用component的setState方法时，React将其标记为dirty，到事件循环结束，React检查所有标记dirty的component重新绘制，选择性子树渲染，开发人员可以重写shouldComponentUpdate提高diff性能
:::

:::caution 与vue diff的比较
- vue和react的diff算法，都是忽略跨级比较，只做同级比较。vue diff时调动patch函数，参数是vnode和oldVnode，分别代表新旧节点。
- vue对比节点。当节点元素相同，但是classname不同，认为是不同类型的元素，删除重建，而react认为是同类型节点，只是修改节点属性。
- vue的列表对比，采用的是两端到中间比对的方式，而react采用的是从左到右依次对比的方式。当一个集合只是把最后一个节点移到了第一个，react会把前面的节点依次移动，而vue只会把最后一个节点移到第一个
:::

## 严格模式

:::danger 
`<React.StrictMode> </React.StrictMode> `
1. 识别不安全的生命周期
2. 关于使用过时字符串 ref API 的警告
3. 关于使用废弃方法的警告
:::

## react路由

构建在react上的强大路由库，有助于向应用程序添加新的屏幕和流，使URL和页面上的数据同步

:::caution 与常规路由的差别
1. 常规路由一个视图对应一个新文件，而react一个路由对应单个html页面
2. url更改时，常规路由将http请求发送给服务器并接收相应的html页面，而react路由仅更改历史记录属性
:::

### 路由实现原理

实现原理分为两种，如果是切换 Hash 的方式，那么依靠浏览器 Hash 变化即可(通过监听hashchange来感知hash的变化)；如果是切换网址中的 Path，就要用到 HTML5 History API 中的 pushState、replaceState 等将url压入栈，同时能够应用history.go()等API。在使用这个方式时，还需要在服务端完成 historyApiFallback 配置。

### 路由配置

- 路由比较是通过比较route中的path和本地的pathname，没有路径的route将始终被匹配，一个`<Switch>` 会遍历其所有的子 `<Route>`元素，并仅渲染与当前地址匹配的第一个元素。

```js
<Switch>

    <Route exact path="/" component={Home} />

    <Route path="/about" component={About} />

    <Route path="/contact" component={Contact} />

</Switch>
```

- `<Link>` 的“跳转”行为只会触发相匹配的`<Route>`对应的页面内容更新，而不会刷新整个页面，没有默认事件执行，根据href，用history进行跳转，只是链接变了而页面没有变

```js
<Link to="/">Home</Link>
```

```js
<NavLink to="/react" activeClassName="hurray">
    React
</NavLink>
```

```js
<Switch>

  <Redirect from='/users/:id' to='/users/profile/:id'/>

  <Route path='/users/profile/:id' component={Profile}/>

</Switch>
```

:::tip 如何获取url中的参数和历史对象
1. get传值：路由配置还是普通的配置，如：'admin'，传参方式如：'admin?id='1111''。通过this.props.location.search获取url获取到一个字符串'?id='1111'
2. 路由需要配置成动态路由：如path='/admin/:id'，传参方式，如'admin/111'。通过this.props.match.params.id 取得url中的动态路由id部分的值
3. 传参方式如：在Link组件的to属性中可以传递对象{pathname:'/admin',query:'111',state:'111'};。通过this.props.location.state或this.props.location.query来获取即可，传递的参数可以是对象、数组等，但是存在缺点就是只要刷新页面，参数就会丢失。
4. 获取历史对象：
```js
import { useHistory } from "react-router-dom";
let history = useHistory();
let history = this.props.history;
```
:::


## Redux

单一状态树，只读状态，修改状态需要触发动作

react-redux 数据传输∶ view-->action-->reducer-->store-->view

- redux是应用数据流框架，主要解决了组件间状态共享的问题，集中式管理，主要有三个核心方法action(描述发生了什么,js对象，必须有一个type属性表明正在执行的action的类型)，store(整个程序的状态树，允许通过getState（）访问state，通过dispatch（action）改变state，通过subcribe（listener）注册listeners)，reducer(确定状态将如何变化，一个纯函数，传入曾经的state和action作为参数，返回一个新的state)。工作流程是view调用store的dispatch接收action传入store，reducer进行state操作，view通过store提供的getState获取最新数据。

- 新增state，对状态的管理更加明确，通过redux，流程更加规范了，减少手动编码量，提高了编码效率，同时缺点是当数据更新时有时候组件不需要但也要重新绘制，影响效率，一般情况下，只有在构建多交互，多数据流的复杂项目应用时才会使用他们。

- flux也是用来进行数据操作的，由action，dispatch，view，store组成，工作流程是view发出一个action，派发器接收action，让store进行数据更新，更新完后store发出change，view接受change更新视图。

:::caution redux和flux
Flux是一种强制单向数据流的架构模式，使用数据权限中心store实现多个组件之间的通信，整个应用中的数据更新必须在此处进行，redux和flux很像，区别在于flux有多个可以改变应用状态的store，在flux中dispatcher被用来传递数据到注册的回调事件，但在redux中只能定义一个可更新状态的store，redux把store和dispatcher合并，结构更加简单清晰
:::

:::caution redux和mobx
- 相同：某一状态只有一个可信数据来源，操作更新状态方式统一
- 区别：
1. redux将数据保存在单一的store中，mobx将数据保存在分散的多个store中
2. redux通过plain object保存数据，需要手动处理变化后的操作，mobx使用observable保存数据，数据变化后自动处理响应后的数据
3. redux使用不可变状态，状态为只读，不能直接改变状态，而是应该返回一个新的状态，同时使用纯函数，mobx中的状态是可变的，可以直接对其修改
4. mobx相对来说比较简单，更多使用面向对象的编程思维，redux掌握起来不容易，使用的是函数式编程思维，需要借助一系列中间件来完成异步操作和副作用
5. mobx中有更多抽象和封装，调试会比较困难，同时结果也难以预测，而redux能够提供时间回溯的开发工具，其纯函数以及更少的抽象，让调试变得更加容易
:::

:::caution redux与vuex
1. vuex改进了redux中的action和reducer函数，以mutations变化函数取代reducer，无需switch，只需在对应的mutation函数里改变state值即可
2. vuex具有vue自动重新渲染的特性，无需订阅重新渲染函数，只要生成新的state即可
3. Vuex数据流的顺序是∶View调用store.commit提交对应的请求到Store中对应的mutation函数->store改变（vue检测到数据变化自动渲染）
:::

## 类组件和函数组件

React 框架的主要工作是把数据层面的描述映射到用户可见的 UI 变化中去。从原则上来讲，React 的数据应该总是紧紧地和渲染绑定在一起的，而类组件做不到这一点。函数组件就真正地将数据和渲染绑定到了一起。函数组件是一个更加匹配其设计理念、也更有利于逻辑拆分与重用的组件表达形式。

- 类组件和函数组件的区别

类组件可以维护内部状态，利用一些生命周期方法，函数组件是无状态的，并返回要呈现的输出，他们渲染ui的首选只依赖于属性，相比类组件更简单，更具性能，性能优化上，类组件主要依靠 shouldComponentUpdate 阻断渲染来提升性能，而函数组件依靠 React.memo 缓存渲染结果来提升性能。

### 类组件

:::caution 在构造函数调用 super 并将 props 作为参数传入的作用
在子构造函数中能够通过this.props来获取传入的props，子类必须在constructor方法中调用super方法；否则新建实例时会报错；因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法；子类就得不到this对象。
:::

### hooks

- 弥补了函数组件相对于类组件缺少的state状态属性和生命周期机制，解决了其他代码复用方案存在的问题
- 但只能在函数组件中使用，且只能在顶层使用hooks，而且不要在循环、条件或嵌套函数中调用 Hook(容易导致调用顺序的不一致，从而产生难以预料的后果，Hooks 的设计是基于数组实现。在调用时按顺序加入数组中，如果使用循环、条件或嵌套函数很有可能导致数组取值错位，执行错误的 Hook。当然，实质上 React 的源码里不是数组，是链表。)

#### useState

- 关于为什么使用数组形式：如果 useState 返回的是数组，那么使用者可以对数组中的元素命名，代码看起来也比较干净，如果 useState 返回的是对象，在解构对象的时候必须要和useState 内部实现返回的对象同名，想要使用多次的话，必须得设置别名才能使用返回值

:::danger useState直接改变数组的坑
```js
num.push(1)
setNums(num)
//无法成功改变，需要改成：
num=[...num,1]
setNums(num)
```
但class采用同样的方式是没有问题的
```js
 this.state.nums.push(1)
  this.setState({
   nums: this.state.nums
  })
  ```
:::

#### useEffect

- useEffect 与 useLayoutEffect 的区别
  
useeffect在react的渲染过程中是异步调用的,用于大部分场景，而useLayoutEffect会在所有的dom变更之后同步调用，主要用于处理DOM操作，调整样式，避免样式闪烁等问题,useeffect是按照顺序执行代码的，改变屏幕像素之后执行，当改变内容时屏幕可能会闪烁，useLayoutEffect是改变屏幕像素之前就执行了（会推迟页面显示的事件，先改变DOM后渲染），不会闪烁，
useLayoutEffect总会比useeffect先执行

## 生命周期

1. 挂载阶段，首先执行constructor构造方法，来创建组件
2. 创建完成之后，就会执行render方法，该方法会返回需要渲染的内容，随后，React会将需要渲染的内容挂载到DOM树上
3. 挂载完成之后就会执行componentDidMount生命周期函数（第一次渲染后）
4. 如果我们给组件创建一个props（用于组件通信）、调用setState（更改state中的数据）、调用forceUpdate（强制更新组件）时，在父组件接受到props参数并且在调用另一个渲染器之前调用getDerivedStateFromProps(在props发生变化时执行，而当初始化render的时候不执行)，shoulComponentUpdate() 根据条件返回true或者false，代表是否希望更新组件，默认将返回true，当 props 或 state 发生变化时，shouldComponentUpdate() 会在渲染执行之前被调用判断是否需要更新，可以省去虚拟dom的生成和对比过程。若为true则会重新调用render函数，render函数重新执行之后，就会重新进行DOM树的挂载
5. 挂载完成之后就会执行componentDidUpdate生命周期函数
6. 当移除组件时，就会执行componentWillUnmount生命周期函数

:::tip 小建议
- componentDidMount适合发送网络请求，执行依赖于DOM的操作，添加订阅消息（会在componentWillUnmount取消订阅），尽量不要调用setState，会触发一次额外的渲染
- 卸载阶段可以清除 timer，取消网络请求或清除，取消在 componentDidMount() 中创建的订阅，不应该再这个方法中使用 setState，因为组件一旦被卸载，就不会再装载，也就不会重新渲染。
:::

### 触发重新渲染的操作

> 重新渲染会执行diff算法，让新旧两棵树进行对比（进行深度优先遍历，每遍历到一个节点的时候就进行对比，如果有所改变就存入对象中）根据差异的类型，对应规则更新vnode

1. setState（）传入的参数不为null时触发render重新渲染
2. 只要父组件重新渲染了，那么子组件中传入的props无论是否改变都会重新渲染

## 组件通信方式

1. 通过props：只能一层一层传递
2. redux：集中式管理多个组件共享的状态，可以实现任意组件之间的通信

## react和vue的同异

### 相同

1. 都有自己的构建工具create react App/vue-cli
2. 都有虚拟dom
3. 有props概念，组件间数据传递
4. 组件化应用，将功能拆分为明确模块
5. 路由和全局状态管理交给其他库完成

### 异处

1. vue双向数据绑定，react单向数据流
2. vue宣称可以更快的计算出虚拟dom的差异，跟踪每一个组件的依赖关系，对于react而言，每当应用的状态被改变时，全部子组件都会重新渲染，当然这个可以通过PureComponent/shouldComponentUpdate的生命周期方法来优化
3. react中import的组件在render中可以直接调用，而vue中由于模板的数据必须在this上进行一次中转，所以import完组件之后还需要在components中声明一下
4. vue通过gettersetter以及一些函数的劫持，能精确的知道数据的变化，react是默认通过比较引用的方式进行的，可能导致大量不必要的vDOM的重新渲染，vue使用的是可变数据而react更强调数据的不可变
5. react可以通过高阶组件来扩展，vue需要通过mixins来扩展


