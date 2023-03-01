---
sidebar_position: 8
---

# Vue

基础知识相关

> 页面由HTML模板，JSON数据，Vue实例组成，单页面应用

:::caution 单页面应用优缺点
1. 优点：用户体验好，快，内容的改变不需要重新加载整个页面，基于这一点spa对服务器压力较小，前后端分离，页面效果会比较炫酷
2. 缺点：不利于seo，导航不可用，如果一定要导航需要自行实现前进、后退。（由于是单页面不能用浏览器的前进后退功能，所以需要自己建立堆栈管理），初次加载时耗时多，页面复杂度提高很多，第一次加载可能耗时间比较长
:::

:::tip 判断当前是开发环境、还是生产环境
```js
if (process.env.NODE_ENV === "development") {

alert("开发环境");

}else {

alert("生产环境");

}
```
:::

## MVVM

>MVVM模式，顾名思义即Model-View-ViewModel模式。将数据模型数据双向绑定的思想为核心，因此在View和Model之间没有联系，通过ViewModel进行交互，而且Model和ViewModel之间的交互是双向的，因此视图的数据变化会同时修改数据源，而数据源数据的变化也会立即反应到View上。MVC是比较直观的架构模式，用户模式->View（负责接收用户的输入操作）->Controller（业务逻辑处理）->Model（数据持久化）->View（将结果反馈给View）

## 模板运行编译过程

1. 将模板解析为 AST
2. 优化 AST
3. 将 AST 转换为 render 函数
4. 通过执⾏render 函数⽣成 Virtual DOM 最终映射为真实 DOM 

## 常见指令

- v-if：判断指令
- v-show：渲染指令，与v-if不同，无论v-show的值为true或false，元素都会存在于HTML代码中，而只有当v-if的值为true时，元素才会存在于THML代码中，v-show指令只是设置了元素CSS的style值
- v-else：可配合v-if使用，v-else指令必须紧邻v-if，否则该命令无法正常工作，v-else绑定的元素能否渲染在HTML中，取决于前面使用的v-if
- v-for：循环指令，基于一个数组渲染一个列表，与js遍历类似(v-for一般用在列表的渲染，渲染的时候会默认遵守就地复用策略。key属性可以用来提升v-for渲染DOM的效率。key属性必须是唯一不变的值（唯一标识），避免数据混乱的情况的出现。加了key之后，vue可以识别每组节点。如果节点之间内容一致，只是顺序发生变化，那么就没有必要进行增加删除操作了，而是直接进行顺序的更改即可。大大提升效率。这里我建议使用id，如果没有id的情况下使用index（下标），但是尽量不要用index，因为如果有元素被删除，就会导致index变化，从而会导致数据的混乱。)
- v-bind：给dom绑定元素属性，可以缩写为：符号
- v-on：用户监听dom事件，v-on指令可以缩写为@符号
- v-el：提供⼀个在⻚⾯上已存在的 DOM 元素作为 Vue 实例的挂载⽬标.可以是 CSS 选择器，也可以是⼀个 HTMLElement 实例

:::danger v-if和v-for同时使用的问题
v-for比v-if优先级高，所以使用的话，每次v-for都会执行v-if,造成不必要的计算，影响性能，尤其是当之需要渲染很小一部分的时候。
:::

:::caution vue中的key
key是为vue中的vnode标记的唯一id，通过这个key，我们的diff操作可以更准确更快速，diff算法的过程中，先会进行新旧节点的首尾交叉对比，当无法匹配的时候会用新节点的key与旧节点进行比对，然后超出差异，准确：如果不加key，那么vue会选择复用节点（vue的就地更新策略），导致之前的节点的状态被保留下来，会产生一系列的bug，快速：key的唯一性可以被Map数据结构充分利用，相比于遍历查找的时间复杂度o(n)，Map的时间复杂度仅仅为o(1)
:::

## 常见修饰符

- .prevent：提交事件不再重载页面
- .stop：阻止单击事件冒泡
- .self：当事件发生在该元素本身而不是子元素的时候会触发


## 生命周期

开始创建，初始化数据，编译模板，挂载dom->渲染、更新->渲染、卸载

1. 实例初始化后，数据观测之前，获取不到data：beforeCreate
2. 实例创建完后，可调methods，操作data：created
3. 组件挂载之前，相关渲染render函数首次调用：beforeMount
4. 挂载完成，可以通过DOM API获取到页面中的DOM元素，页面已渲染，可进行ajax操作，只会执行一次，截止到此是第一次页面加载会调的四个钩子：mounted
5. 数据更新之前，此时data中的数据是新的，页面未同步更新：beforeUpdate
6. 数据更改，虚拟dom重新渲染和打补丁，页面同步更新：updated
7. 组件或实例销毁前：beforeDestroy
8. 组件或实例销毁后：destroyed
9. 被keep-alive缓存的组件激活时调用：activated
10. 组件失活，使用了keep-alive就不会调用beforeDestory和destoryed钩子了，因为组件没有被销毁，而是被缓存起来了：deactivated

:::tip keep-alive
包裹动态组件时，会缓存不活动的组件实例，主要⽤于保留组件状态或避免重新渲染，⽐如有⼀个列表和⼀个详情，那么⽤户就会经常执⾏打开详情=>返回列表=> 打开详情…这样的话列表和详情都是⼀个频率很⾼的⻚⾯，那么就可以对列表组件使⽤此组件包裹进⾏缓存，这样⽤户每次返回列表的时候，都能从缓存中快速渲染，⽽不是重新渲染
:::

:::tip nexttick
nextTick 可以让我们在下次 DOM 更新循环结束之后执⾏延迟回调，⽤于获得更新后的 DOM
:::

## 组件

### data为什么用函数而不是对象

组件复⽤时所有组件实例都会共享 data ，如果 data 是对象的话，就会造成⼀个组件 修改 data 以后会影响到其他所有组件，所以需要将 data 写成函数，每次⽤到就调⽤ ⼀次函数获得新的数据。 当我们使⽤ new Vue() 的⽅式的时候，⽆论我们将 data 设置为对象还是函数都是可 以的，因为 new Vue() 的⽅式是⽣成⼀个根组件，该组件不会复⽤，也就不存在共享data 的情况了

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

### 组件通信

- 父子组件间通信

1. 子组件通过props属性来接收父组件的数据，父组件在子组件上注册监听事件，子组件通过emit触发事件来向父组件发送数据
2. 通过ref属性给子组件设置一个名字，父组件通过`$refs`组件名来获得子组件，子组件通过`$parent`获得父组件
3. 使用provider/inject，在父组件中通过provider提供变量，在子组件中通过inject来将变量注入到组件中，无论子组件有多深，只要调用了inject那么就可以注入provider中的数据

- 兄弟组件通信

1. 使用eventBus方法，它的本质是通过创建一个空的vue实例来作为消息传递的对象，通信的组件引入这个实例，通信的组件通过在这个实例上监听和触发事件，来实现消息的传递

```js
<!-- A.vue -->

<template>
    <button @click="sendMsg">发送MsgA</button>
</template>

<script> 
export default {
  data(){
  	return{
  		MsgA: 'A组件中的Msg'
  	}
  },
  methods: {
    sendMsg() {
      /*调用全局Vue实例中的$EventBus事件总线中的$emit属性，发送事件"aMsg",并携带A组件中的Msg*/
      this.$EventBus.$emit("aMsg", this.MsgA);
    }
  }
}; 
</script>


<!-- B.vue -->

<template>

  <!-- 展示msgB -->
  <p>{{msgB}}</p>
  
</template>

<script> 
export default {
  data(){
    return {
      //初始化一个msgB
      msgB: ''
    }
  },
  mounted() {
    /*调用全局Vue实例中的$EventBus事件总线中的$on属性,监听A组件发送到事件总线中的aMsg事件*/
    this.$EventBus.$on("aMsg", (data) => {
      //将A组件传递过来的参数data赋值给msgB
      this.msgB = data;
    });
  }
};
</script> 

```

2. 通过`$parent.$refs`来获取到兄弟组件，也可以进行通信

- 任意组件通信

1. 使用eventbus，其实就是创建一个事件中心，相当于中转站，可以用它来传递事件和接收事件
2. 如果业务逻辑复杂，很多组件之间需要同时处理一些公共的数据，可以用vuex将公共的数据抽离出来

:::caution css只在当前组件起作用
```html
<style scoped></style>
```
:::

## mixin和mixins

- mixin：用于全局混入，会影响到每个组件实例。
- mixins：应该是我们最常使用的扩展组件的方式了。如果多个组件中有相同的业务逻辑，就可以将这些逻辑剥离出来，通过 mixins 混入代码，比如上拉下拉加载数据这种逻辑等等。另外需要注意的是 mixins 混入的钩子函数会先于组件内的钩子函数执行，并且在遇到同名选项的时候也会有选择性的进行合并
- 可以用于全局混⼊封装好的 ajax 或者⼀些⼯具函数等等。

```js
Vue.mixin({
 beforeCreate() {
// ...逻辑
 // 这种⽅式会影响到每个组件的 beforeCreate 钩⼦函数
 } })
```

## 响应式原理

### 双向数据绑定

利用Object.defineProperty劫持对象的访问器（setter，getter），在属性值发生变化时我们可以获取变化，然后根据变化进行后续响应(在数据变动时发布消息给订阅者，触发相应监听回调)，在vue3中通过Proxy代理对象进行类似的操作

```js
<input id="input"/>
const data = {};
const input = document.getElementById('input');
Object.defineProperty(data, 'text', {
set(value) {
input.value = value;
this.value = value;
}
});
input.onChange = function(e) {
data.text = e.target.value;
}
```

:::danger 缺陷
如果通过下标⽅式修改数组数据或者给对象新增属性并不会触发组件的重新渲染，因为Object.defineProperty 不能拦截到这些操作
:::

## vue-router

```js title="index.js"
// 1. 导入路由并使用
import Vue from 'vue' // 导入vuerouter 
import VueRouter from 'vue-router';  
 
// 使用功能VueRouter插件
Vue.use(VueRouter)  


import Home from '../components/Home';
import List from '../components/List';
import About from '../components/About';

 
//  2. 创建路由实例,并配置路由映射
//  2.1 创建路径与组件的映射关系
let routes = [  
    {
    path:"/",
    // 路由重定向:
    // 虽然访问的是/根路由,但是自动重新转义到/home路由
    redirect: "/home"
    },       
    {             
        path:'/home',             
        component: Home         
    },        
    {             
        path:'/list',             
        component: List         
    },
    {             
        path:'/about',             
        component: About         
    }

] 
 
//  2.2 创建路由实例
var router = new VueRouter({     // 配置路由     
    routes,
}) 
 

export default router
```

### router-link

> 已经注册好的组件，可以直接使用，用于切换路由，通过to跳转，编译时会自动编译为a标签

- 路由跳转：

1. 声明式、标签跳转`<router-link :to="index">`
2. 编程式、js跳转router.push('index')

### router-view

> 用来指定当前路由所映射的组件显示的位置，占位符，为路由映射的组件占位,不同路由映射的组件通过替换显示

```js title="App.vue"
<template>
    <div id="app">
        <div class="content">
            <router-view></router-view>
        </div>
        <ul>
            <li>
                <router-link to="/home">首页</router-link>
            </li>
            <li>
                 <router-link to="/list">列表页</router-link>
            </li>
            <li>
                    <router-link to="/about">关于作者</router-link>
            </li>
        </ul>
 
    </div>
</template>
```

### 路由模式

默认使用hash，若想设置history

```js
//  2.2 创建路由实例
var router = new VueRouter({ // 配置路由     
   mode:"history",
    routes,
}) 
```

:::caution route和router的区别
- $route是路由信息对象，包括path，params，hash，query，fullPath，matched，name 等路由信息参数
- $router 是“路由实例”对象包括了路由的跳转方法，钩子函数等。
:::

#### hash

> url 中的 # 之后对应的是 hash 值, 其原理是通过hashChange() 事件监听hash值的变化, 根据路由表对应的hash值来判断加载对应的路由加载对应的组件，不太美观，但兼容性好，且不会向后端发送请求，完全属于前端路由，当url改变时，页面不会重新加载，#是url的锚点，单改变#后的部分，只能指导浏览器动作，根据不同的值渲染指定位置的不同数据，无法对服务器端产生作用，每次改变后会在浏览器的访问历史中增加一个记录，使用后退便可回到上一个位置

#### history

> 利用了h5history对象中pushState（可以改变url地址且不会发送请求）和replaceState（读取历史记录栈，并对其进行修改）方法，兼容性比较差，但比较美观，但在用户手动输入url或刷新页面时会发起url请求，后端需要配置index.html页面以防用户匹配不到静态资源，否则会出现404错误

:::caution
在当前已有的 back、forward、go 的基础之上，它们提供了对历史记录进行修改的功能。只是当它们执行修改时，虽然改变了当前的 URL，但浏览器不会立即向后端发送请求。
:::

### 导航钩子函数

- 全局的钩子函数beforeEach和afterEach

## vuex

vuex是一个公共状态管理，只⽤来读取的状态集中放在 store 中； 改变状态的⽅式是提交 mutations ，这是个同步的事物；异步逻辑应该封装在 action 中。

- state:

Vuex 使⽤单⼀状态树，即每个应⽤将仅仅包含⼀个 store 实例，但单⼀状态树和模块化并不冲突。存放的数据状态，不可以直接修改⾥⾯的数据。

- mutations(参数一：state,参数二：传递的参数):mutations 定义的方法动态修改 Vuex 的 store 中的状态或数据

- getters ：类似 vue 的计算属性，主要⽤来过滤⼀些数据。

- action ：actions 可以理解为通过将 mutations ⾥⾯处理数据的⽅法变成可异步的处理数据的⽅法，简单的说就是异步操作数据。 view 层通过 store.dispatch 来分发

- modules ：项⽬特别复杂的时候，可以让每⼀个模块拥有⾃⼰的 state 、mutation 、 action 、getters ，使得结构⾮常清晰，⽅便管理

- 使用：

```js title="store/index.js"
 import Vue from "vue";
            import Vuex from "vuex";
            Vue.use(Vuex);

            const store=new Vuex.Store({
                state:{
                    n:10
                },
                actions:{
                    handleActionsAdd({commit},params){
                        commit("handleMutationsAdd",params);
                    }
                },
                mutations:{
                    handleMutationsAdd(state,params){
                        state.n++;
                        console.log(params)
                    }
                }
            });

            export default store;
```

```js title="main.js"
 import store from './store';

            new Vue({
                store,
                render: h => h(App) 
            }).$mount('#app');
```

```js title="组件中"
  methods: {
                handleAdd(){
                    this.$store.dispatch("handleActionsAdd","wql");
                }
            }
```

## computed 计算属性

> 是计算属性，计算属性内部this指向vm实例，它更多用于计算值的场景，默认走缓存，依赖数据(data中或props中)发生改变才会重新进行计算，数据更新，处理结果自动更新，如果computed属性属性值是函数，那么默认会走get方法；函数的返回值就是属性的属性值；在computed中的，属性都有一个get和一个set方法，当数据变化时，调用set方法

:::caution 注意
当computed中有异步操作时无效，无法监听数据变化，如果要进行数值计算，而且依赖于其他数据，那么把这个数据设计为computed，如果需要在某个数据变化时做一些事情，使用watch来观察这个数据变化
:::

## watch 侦听属性

> 更多的是观察的作用，类似于某些数据的监听回调，用于观察props行回调进行后续操作，支持异步，监听的函数接收两个参数，第一个参数是最新的值；第二个参数是输入之前的值，监听数据(data中或props中)

:::caution
不支持缓存，数据改变直接会触发，无法监听数组变动和对象新增，页面重新渲染时值不变化也会执行
:::

:::tip 源码
1. immediate：组件加载立即触发回调函数执行，
2. deep: 深度监听，为了发现对象内部值的变化，复杂类型的数据时使用，例如数组中的对象内容的改变，注意监听数组的变动不需要这么做。注意：deep无法监听到数组的变动和对象的新增，参考vue数组变异,只有以响应式的方式触发才会被监听到。
:::

## 虚拟dom

虚拟DOM中，在DOM的状态发生变化时，虚拟DOM会进行Diff运算，来更新只需要被替换的DOM，而不是全部重绘。 在Diff算法中，只平层的比较前后两棵DOM树的节点，没有进行深度的遍历。

1. 如果节点类型改变，直接将旧节点卸载，替换为新节点，旧节点包括下面的子节点都将被卸载，如果新节点和旧节点仅仅是类型不同，但下面的所有子节点都一样时，这样做也是效率不高的一个地方。
2. 节点类型不变，属性或者属性值改变，不会卸载节点，执行节点更新的操作。
3. 文本改变，直接修改文字内容。
4. 移动，增加，删除子节点时：


## vue状态持久化


> 在login登陆页面，如果账户验证成功，但是页面逻辑没有发生跳转（URL没有发生变化），vuex里的isLogin已经变成true，同时持久化localStorage里的isLogin也变成true（默认是false），那么只要这个页面没有跳转和重载，它获取到的localStorage里的isLogin还是false，简单一句话，localStorage不是实时最新的，localStorage值，如果在页面没有跳转或重载的情况下 Storage的值发生变化，页面不会及时发生变化。我们平常会用到 持久化手段把vuex、redux或mobX里的state放在cookie或localStorage里去，方便作一些逻辑处理，方便做页面缓存。比如默认的token是放在cookie里的，当你授权（登录）一个程序时，他就是个依据，判断你是否已经授权该软件；cookie就是写在客户端的一个txt文件，里面包括你登录信息之类的，这样你下次在登录某个网站，就会自动调用cookie自动登录用户名。我们将类似的数据放进cookie等里，不仅仅是token，用户名或玩家等级等等。持久化的目的：刷新不丢数据，有些状态仍可维持