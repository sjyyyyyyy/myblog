---
sidebar_position: 1
---

# 基础概念

概念知识理解

## eval

他的功能是把对应的字符串解析成js代码并运行，应该避免使用eval，不安全，十分耗能（一次解析成js语句，一次执行）

## CDN

内容分发网络。尽可能避开互联网上有可能影响数据传输速度和稳定性的瓶颈和环节，使内容传输的更快更稳定。

:::tip 实现方法
在网络各处设置节点服务器，根据各节点负载情况将用户请求重新导向离用户最近的服务节点上，使用户就近获取所需内容，解决网络拥挤，跨地域，跨运营商（镜像）访问的情况
:::

CDN基本工作流程

- 无CDN：DNS根据域名解析ip地址
- 有CDN：DNS根据用户ip地址，域名，解析成相应节点的缓存服务器ip地址

CDN基本组成

1. 内容缓存设备
2. 内容交换机
3. 内容路由器
4. CDN内容管理系统

## 负载均衡

多台服务器共同协作
- http重定向负载均衡： 
调度者根据策略选择服务器以302响应请求，缺点只有第一次有效果，后续操作维持在该服务器
- dns负载均衡： 
解析域名时，访问多个ip服务器中的一个，可监控性较弱
- 反向代理负载均衡： 
访问统一的服务器，由服务器进行调度访问实际的某个服务器，对统一服务器的要求大，性能受到服务器群的影响

## 假值对象

假值对象看起来和普通对象并无二致，但将他们强制类型转换为布尔值时结果为false 

**例子**：document.all：类数组对象，包含了页面上所有的元素


:::danger 已弃用
document.all在html5被弃用
:::

## JSON

基于文本的轻量级的数据交换格式，可以被任何的编程语言读取和作为数据格式来传递

:::caution
JSON中的对象格式更加严格，比如在JSON中属性不能为函数，不能出现NaN这样的属性值等
:::

- xml和json的区别：json的体积更小，传递的速度更快些，json和js的交互更加方便，json对数据的描述性较差
- 补充：xml和html的区别：xml区分大小写，xml必须有闭合标签，xml中所有属性必须带值，标签名和属性名必须小写，xml用于描述，存放数据，html用于显示数据

## JS

Javascript的用途是操作dom，解释性语言 

不需要编译，可以跨平台运行。是弱类型语言，不需要提前指定数据类型的单线程语言

## 主流浏览器内核私有属性的css前缀

Chrome: Blink -webkit- 

Safari: Webkit -webkit- 

Firefox: Gecko -moz- 

IE: Trident -ms- 

Opera: Blink -o-

## 浮动

浮动的元素会脱离文档流，空间释放

### 清除浮动

给父元素加上固定高度，触发bfc，用伪元素after加在父元素后面，content为空，display:block,clear:both

## 继承

### 可继承属性

所有元素可继承：visibility,opacity,cursor

内联元素可继承 ：字体相关属性，文本相关属性（除text-indent,text-align以外）

块级元素可继承 ：text-indent,text-align

:::caution
a标签的字体颜色不能被继承，h1-h6标签字体的大小也是不能被继承的因为他们都有一个默认值
:::

### line-height的继承

- 若父元素的line-height带单位，则子元素的 line-height = 父元素的 line-height * font-size （如果是 px 了就直接继承），若父元素的line-height不带单位，则继承的是倍数，子元素的 line-height = 子元素的 font-size * 继承的倍数
- 如果使用数值作为line-height的属性值，那么所有的子元素继承的都是这个值；但是，如果使用百分比值或者长度值作为属性值，那么所有的子元素继承的是最终的计算值。

## text-indent的特殊性

1. text-indent仅对第一行内联盒子内容有效。 
2. 非替换元素以外的display计算值为inline的内联元素设置text-indent值无效，如果计算值inline-block/inline-table则会生效。 
3. input标签按钮text-indent值无效。 
4. button标签按钮text-indent值有效。 
5. text-indent的百分比值是相对于当前元素的“包含块”计算的，而不是当前元素。

## letter-spacing的特殊性

1. 继承性。 
2. 默认值是normal而不是0。虽然说正常情况下，normal的计算值就是0，但两者还是有差别的，在有些场景下，letter-spacing会调整normal的计算值以实现更好的版面布局。 
3. 支持负值，且值足够大的时候，会让字符形成重叠，甚至反向排列。 
4. 和text-indent属性一样，无论值多大或多小，第一行一定会保留至少一个字符。 
5. 支持小数值，即使0.1px也是支持的。 
6. 暂不支持百分比值。 
注：word-spacing就是增加空格的间隙宽度

## white-space

声明了如何处理元素内的空白字符，这类空白字符包括Space（空格）键、Enter（回车）键、Tab（制表符）键产生的空白
- normal：合并空白字符和换行符。
- pre：空白字符不合并，并且内容只在有换行符的地方换行。
- nowrap：该值和normal一样会合并空白字符，但不允许换行。
- pre-wrap：空白字符不合并，并且内容只在有换行符的地方换行，同时允许文本环绕。
- pre-line：合并空白字符，但只在有换行符的地方换行，允许文本环绕。

## overflow的特殊性

1. 一个设置了overflow:hidden声明的元素，当子元素内容超出容器宽度高度限制的时候，剪裁的边界是border box的内边缘
2. HTML中有两个标签是默认可以产生滚动条的，一个是根元素，另一个是文本域。
3. 滚动条会占用容器的可用宽度或高度。
4. 元素设置了overflow:hidden声明，里面内容高度溢出的时候，滚动依然存在，仅仅滚动条不存在

**绝对定位和overflow的关系:**

1. overflow元素和绝对定位元素之间有定位元素时，会被裁剪
2. overflow元素同时也是定位元素时，子元素会被裁剪
3. 中间不论隔多少层，只要不存在定位元素，那个定位祖先的 overflow 始终可以裁切 absolute 子元素，即使中间元素也添加了 overflow，也只会被定位祖先裁切
4. 当 overflow 在绝对定位元素及其定位包含块之间的时候不会被裁剪

## relative的特殊性

1. 相对定位元素的left/top/right/bottom的百分比值是相对于包含块计算的，而不是自身。
2. top和bottom这两个垂直方向的百分比值计算跟height的百分比值是一样的，都是相对高度计算的。同时，如果包含块的高度是auto，那么计算值是0，偏移无效，也就是说，如果父元素没有设定高度或者不是“格式化高度”，那么relative类似top:20%的代码等同于top:0。
3. top/bottom同时使用的时候，bottom失效；left/right同时使用的时候，right失效。

## border的特殊性

1. border-width不支持百分比
2. border-style的默认值是none
3. border-style:double的表现规则：双线宽度永远相等，中间间隔±1。
4. border-color默认颜色就是color色值。
5. 默认background背景图片是相对于padding box定位的。

## 关于“隐藏”元素

占位:

- visibility:hidden(不会响应绑定的监听事件) 
- margin-left:-100% 
- opacity:0(能够响应元素绑定的监听事件。) 
- transform:scale(0)

不占位:

- display:none;(不会响应绑定的监听事件。) 
- width:0;height:0;overflow:hidden;

隐藏块内文本元素：

- text-indent:-9999px 
- font-size:0

:::tip 通用方法
1. 通过使用绝对定位将元素移除可视区域内，以此来实现元素的隐藏。
2. 通过 z-index 负值，来使其他元素遮盖住该元素，以此来实现隐藏。
3. 通过 clip/clip-path 元素裁剪的方法来实现元素的隐藏，这种方法下，元素仍在页面中占据位置，但是不会响应绑定的监听事件。
4. 通过transform:scale(0,0)来将元素缩放为0，以此来实现元素的隐藏。这种方法下，元素仍在页面中占据位置，但是不会响应绑定的监听事件。
:::

## 空白节点

如span和span之间有看不见的空白间隔，这些间隔是由于代码中的回车换行引起的

:::tip 解决方案
可以将代码写成一行

父元素使用flex布局

父元素设置font-size：0，子元素再设置字体大小

span设置float：left
:::

## 外边距合并

父子：父元素加overflowhidden，父元素加边框，父或子浮动定位 

同级：单独给一个加margin

## html元素的显示优先级

1. 帧元素（frameset) 优先级最高 >>> 表单元素 > 非表单元素，即 input type="radio" 之类的表单控件 > 普通的如 a,div 等元素。
2. 从有窗口和无窗口元素来分，有窗口元素 > 无窗口元素。有窗口元素如 Select 元素、Object 元素。
3. z-index 属性也可以改变显示优先级，但只对同种类型的元素才有效。

## 行级块元素

img,button,input,textarea,label

## video和audio分别支持哪些格式

video: MP4、WebM、Ogg

audio: MP3、Wav、Ogg

## 三种viewport

- visual viewport：指的是移动设备上我们可见的区域的视口大小，一般为屏幕的分辨率的大小
- layout viewport：窗户外的风景
- ideal viewport：用户不用缩放和滚动就能够查看到整个页面，并且页面在不同分辨率西夏显示的内容大小相同

## h5新增标签特性

> canvas,svg,video,drag,语义化header,nav,section,article,footer,input_type,queryselectorAll,JSON.stringfy,history.pushState(),localStorage,sessionStorage

**html语义化的优点:**
便于理解、
浏览器读取方便、
有利于搜索引擎优化、
默认样式可以没有css就显示出来

## link和import的区别

- link是html标签而@import是css提供的
- link引入的样式页面加载时同时加载，而import引入的样式需要等页面加载完成后再加载
- link没有兼容性问题而import不兼容ie5以下
- link可以通过js操作dom动态引入样式而import不行

## a标签的target属性

- _self在自身所处的框架中打开

- _blank在新窗口打开

- _parent在父框架中打开并覆盖父的内容

- _top在最顶层打开

- _'任意字符'与_blank一致，只是如果打开就只会刷新已打开的窗口

## 浏览器内核

IE:Trident 

FireFox:Gecko 

Safari:Webkit 

Chrome/Opera:Blink

## 图片格式

gif，小，支持动画，无兼容问题，适用于色彩简单的动图

jpg，小，有损压缩，色彩丰富，适合色彩丰富的图片以及渐变图像

png，小，无损压缩，支持透明，适合logo，透明图

webp，小，无损压缩，支持动画，透明，兼容性不好

## z-index

- 层叠顺序： 
  
> 正z-index>z-index:auto/0>行级>浮动>块级>负z-index>background/border

- 触发条件： 

1. 根元素html 
2. z-index不为auto的absolute/relative定位 
3. flex项（父元素display为flex/inline-flex） 
4. opacity小于1的元素 
5. transform不为none的元素 
6. mix-blend-mode不为normal的元素 
7. perspective不为none的元素 
8. filter:blur() 
9. isolation属性被设置为"isolate"的元素 
10. 在 will-change 中指定了任意 CSS 属性，即便你没有直接指定这些属性的值 
11. -webkit-overflow-scrolling 属性被设置 "touch"的元素

## iframe框架

- 优点： 
1. 可以实现**异步刷新**，单个iframe刷新不影响整体窗口的刷新
2. 可以实现**跨域**，每个iframe的源都可以不同，方便引入第三方内容 
3. 多页面应用时，共同的header，footer模块可以使用iframe加载，**拆分代码**
- 缺点： 
1. 每个iframe对应一个页面，引入响应的css，js等文件会增加请求的**开销** 
2. window.onload会在所有iframe加载完成后触发，会造成**页面阻塞** 
3. 搜索引擎无法解读，**不利于SEO** 
4. iframe和主页面共享连接池，浏览器对相同域的连接有限制，**会影响页面的并行加载**

## URI

URI 指的是统一资源标识符，用唯一的标识来确定一个资源

- URL 和 URN 是 URI 的子集，URL 可以理解为使用地址来标识资源，URN 可以理解为使用名称来标识资源。

## 文件离线存储

没有网络时可以浏览，加快资源的加载速度，减少服务器负载

```html 
<html manifest="example.appcache">
</html>
//appcache文件配置
1)CACHE MANIFEST放在第一行
2)CACHE:表示需要离线存储的资源列表,由于包含manifest文件的页面将被自动离线存储,所以不需要列出来
3)NETWORK:表示在线才能访问的资源列表,如果CACHE列表里也存在,则CACHE优先级更高
4)FALLBACK:表示如果访问第一个资源失败,那么使用第二个资源来替换它，规定当页面无法访问时的回退页面（比如 404 页面）
```

**浏览器如何解析manifest**: 
1. 在线情况:浏览器发现html头部有manifest属性,他会请求manifest文件,如果是第一次访问,那么浏览器会根据manifest文件的内容下载相应的资源并且进行离线存储.如果已经访问过并存储,那么浏览器使用离线资源,然后对比新的文件,如果没有发生改变就不做任何操作,如果文件改变了,那么就会重新下载文件中的资源并进行离线存储 
2. 离线情况:浏览器就直接使用离线存储资源

```md 
//状态 window.applicationCache对象的status属性
0:无缓存
1:闲置
2.检查中,正在下载描述文件并检查更新
3:下载中
4:更新完成
5:废弃,应用缓存的描述文件已经不存在了,因此页面无法再访问应用缓存
//事件 window.applicationCache对象的相关事件
1)oncached:当离线资源存储完成之后就触发这个事件
2)onchecking:当浏览器对离线存储资源进行更新检查的时候触发
3)ondownloading:当浏览器开始下载离线资源的时候会触发
4)onprogress:当浏览器在下载每一个资源的时候会触发
5)onupdateready:当浏览器对离线资源更新完成之后触发
6)onnoupdate:当浏览器检查更新之后发现没有这个资源时触发
```

:::caution 注意
1. 站点离线存储的容量限制是5M 
2. 如果manifest文件,或者内部列举的某一个文件不能正常下载,整个更新过程将视为失败,浏览器继续全部使用老的缓存 
3. 引用manifest的html必须与manifest文件同源,在同一个域下 
4. 在manifest中使用的相对路径,相对参照物为manifest文件
:::

## 关于npm

### npm install

```bash
1.首先检查.npmrc文件 

2.检查项目中有没有lock文件 

2.1若无lock文件，则从npm远程仓库获取包信息，根据package.json构建依赖树，然后在缓存中一次查找依赖树中的每个包，若存在缓存，则将缓存按照依赖结构解压到node_modules，若不存在缓存，则从npm远程仓库下载包，校验包的完整性，再将包复制到npm缓存目录，解压到node_modules后，生成lock文件。 

2.2若有lock文件 
检查package.json中的依赖版本是否和package-lock.json中的依赖有冲突，若没有冲突，则跳过获取包信息，构建依赖树过程，开始在缓存中查找包信息，后续过程相同 

结构层级：NPM在3.x版本将早先的嵌套结构改为扁平结构，即安装模块时不管其实直接依赖还是子依赖的依赖，优先将其安装在node_modules根目录

相同模块：当安装到相同模块时，判断已安装的模块版本是否符合新模块的版本范围，符合则跳过，不符合则在当前模块的node_modules下安装该模块

查找流程：在项目代码中引入了一个模块，首先在当前模块路径下搜索，然后在当前模块node_modules路径下搜索，然后在上级模块的node_modules路径下搜索，然后是全局
```

### package.json

项目所需要的模块以及配置信息 

dependencies 设置生产环境作为依赖安装的 npm 包的列表:`npm install -S `

devDependencies 设置开发依赖安装的 npm 包的列表:`npm install -D`

## Window

浏览器对象，宿主对象，代替了ECMASCRIPT标准中的global，充当全局对象，指代当前浏览器窗口，封装当前浏览器窗口的功能和属性

``` js api
//打开
window.open("url","name",config)
//滚动
window.onscroll=function(){
let top=document.documentElement.scrollTop||document.body.scrollTop
}
```

```js 定时器
let timer=setInterval(fn,interval)
clearInterval(timer);timer=null;
注：setTimeout调用同理
```

```js 大小设置读取
window.innerHeight文档显示区的高度
window.innerWidth文档显示区的宽度
window.outerHeight窗口整体高度
window.outerWidth窗口整体宽度
resizeTo(width,height)目标宽度和高度
resizeBy(width,height)宽度，高度的增量

//定位
moveTo(left,top)
moveBy(left,top)

//屏幕大小
screen.w/h
screen.availW/H
```

### Date对象

```js 
//1970.01.01.00:00
let now=new Date()
let date=new Date("yyyy/MM/dd hh:mm:ss")
let date=new Date(yyyy,MM-1,dd,hh,mm,ss)
let date2=new Date(date1[.getTime()])
//day没有set方法
```

### Math对象

```js 
Math.ceil(num)
Math.floor(num)
Math.round(num)
Math.pow(底，幂)
Math.sqrt(num)
Math.max()
Math.min()
Math.max.apply(Math,arr)
Math.floor(Math.random()*(max-min+1))+min
```

:::caution 生成随机数
```js
随机浮点数
生成 [ n, m ) 范围内的随机数（大于等于n，小于m）
Math.random()*(m-n)+n
生成 [n,m]、(n,m)、(n,m] 范围内的随机数
//取得[n,m]范围随机数
function fullClose(n,m) { 
   var result = Math.random()*(m+1-n)+n;
   while(result>m) {
       result = Math.random()*(m+1-n)+n;
   }
   return result;
}

//取得(n,m)范围随机数
function fullOpen(n,m) {
   var result = Math.random()*(m-n)+n;
   while(result == n) {
       result = Math.random()*(m-n)+n;
   }
   return result;
}

//取得(n,m]范围随机数
function leftOpen(n,m) {
   var result = Math.random()*(m-n+1)+n-1;
   while(result<n) {
       result = Math.random()*(m-n+1)+n-1;
   }
   return result;
}
随机整数
Math.round(num)：将 num 四舍五入取整
Math.floor(num)：将 num 向下取整，即返回 num 的整数部分。当然我们也可以使用 parseInt() 方法代替。
（1）下面这个方法可以随机获取 0 或 1，它们获取到的几率是比较均衡的。
Math.round(Math.random())
（2）比如下面生成几个 0 到 4 的随机整数（包括 0 和 4）。
var random1 = Math.floor(Math.random()*5);
（3）比如下面生成几个 1 到 5 的随机整数（包括 1 和 5）。
var random1 = Math.floor(Math.random()*5)+1;
（4）比如下面生成几个 5 到 10 的随机整数
var random1 = Math.floor(Math.random()*(10-5+1))+5;
```
:::

### Error对象

```md
Syntax Error//语法错误
Reference Error//引用错误
Type Error//类型错误
Range Error//范围错误（参数超范围）
Eval Error//错误的使用了Eval
URIError//URI错误
```

错误处理：在程序发生错误时保证程序不退出或者正常退出的机制

```js
try{
}catch(err){
//仅在错误时执行，一旦发生错误err中自动存入Error对象，记录显示错误信息并继续向使用者抛出异常
}[
finally{
//无论对错一定会执行，释放资源用
}
]

//创建错误
throw new Error("错误提示")
```

## Bom

获取、操作浏览器窗口，无标准

```js titled="history对象"
//保存当前窗口打开后成功访问过的url的历史记录栈，不对外开放，无法修改
history.go(1)//前进
history.go(-1)//后退
history.go(0)//刷新
//hash和history的区别：
Hash 模式只可以更改#后的内容， History 模式可以通过 API 设置任意的同源URL，添加任意类型的数据到历史记录中， Hash 模式只能更改哈希值，也就是字符串，Hash 模式⽆需后端配置，并且兼容性好。 History 模式在⽤户⼿动输入地址或者刷新页面的时候会发起 URL 请求，后端需要配置 index.html ⻚⾯⽤于匹配不到静态资源的时候
```

```js title="location对象"
//保存当前窗口正在打开的url对象，可以实现页面跳转，只能在当前窗口打开
location.href=""
location.assign=""
location=""
location.reload(force)重新加载当前页面，force取值true或false表示是否从服务器硬盘上获取最新文档
location.replace()方法以给定的url来替换当前资源，与assign方法不同的是，调用replace当前页面不会保存到history历史中，用户点击回退时不会再跳转到该页面
location.protocal协议
location.host主机名+端口号
location.hostname主机名
location.port端口号
location.pathname路径相对路径
location.search?之后的查询条件
location.hash锚点名
```

```js title="navigator"
//包含了所有浏览器的配置信息
navigator.cookieEnabled判断cookie是否启用
navigator.plugins判断是否安装了指定插件
navigator.userAgent判断浏览器名称和版本号，但userAgent的值可以被改写，不可靠，可以用每个浏览器独有的特性来判断，如独有的ActiveXObject
```

## Dom

文档对象，以html形式展示，属于window对象，专门用来访问和操作html文档的标准API，有标准

> 每一个载入浏览器的html文档都会成为document对象,网页的所有内容在内存单元中以树形存储，构建好dom树之后，网页上一切内容都是dom树上的节点对象，而Node类型是所有节点对象的父类型

```js title="节点通用属性"
elem.nodeType
//9---Document
//1---元素节点
//2---属性节点
//3---文本节点
elem.nodeName
//#document
//全大写标签名
//属性名
//#text
elem.nodeValue
//属性节点返回属性值
//文本节点返回文本内容
```

```js title="节点关系"
elem.parentNode
elem.childNodes//所有直接子节点
elem.firstChild/elem.lastChild
elem.previousSibling
elem.nextSibling
```

```js title="查找"
let elem=document.getElementById("id值")
let elems=document.getElementsByTagName("标签名")
let elems=parent.getElementsByTagName("标签名")
let elems=parent.getElementsByClassName("class值")
let elems=parent.getElementsByName("name")//表单
let elem=parent.querySelector("选择器")
let elems=parent.querySelectorAll("选择器")
//get效率比selector高，返回动态集合，但可能导致反复遍历dom树
```

```js title="方法"
//获取滚动高度
let top=document.documentElement.scrollTop||document.body.scrollTop

//遍历
//创建迭代器对象
let iterator=document.createNodeIterator(parent,NodeFilter.SHOW_ALL节点树/SHOW_ELEMENT元素树,null,false)
//调用
let curNode=iterator.nextNode()

//修改/获取
//获取或修改html内容
elem.innerHTML
//获取或修改文本内容
elem.textContent/elem.innerText(ie8)
//获取某个节点指定属性
let value=elem.getAttribute("属性名")
//获取某个节点属性节点
elem.attributes
elem.attributes[i/"属性名"]
elem.attributes[i/"属性名"].value
//设置某个节点的指定属性值
elem.setAttribute("属性名","属性值")
//移除某个节点指定属性
elem.removeAttribute("属性名")
//判断节点是否包含指定属性
elem.hasAttribute("属性名")/elem.属性名
//注意：不包含则返回""
//获取自定义属性
elem.dataset
//获取节点完整样式对象
let style=getComputedStyle(elem)
//获取修改样式表中的样式
let sheet=document.styleSheets[i]
let cssRules=sheet.cssRules[i]
cssRules.style."css属性名"

//添加删除
//单个
let elem=document.createElement("标签名")
elem.innerHTML="..."
parent.appendChild(elem)
parent.insertBefore(elem,oldchild)
removeChild(node)
replaceChild(new,old)
//单个文本同理createTextNode(text)
//多个
let frag=document.createDocumentFragment()
frag.appendChild(child)//重复多次
//重复上面的步骤，将文档片段整体添加到页面上，片段不会成为页面上的元素，添加后自动释放
```

:::caution 关于HTMLDOM
提供了专门操作网页内容的简化版API，仅对部分复杂元素进行了简化

image、select、option、table、form

```js
//创建方式
let img=new Image()
//相当于document.createElement("img")
```
:::

VIP元素：

无需查找直接获取

```md 
<body> document.body
<head> document.head
<html> document.documentElement
```

## 数组

声明：[]/new Array() 

属性：length（可以用以添加元素，也可以用以删除元素）

:::caution 注意
一维数组的下标越界不会报错，自动赋值undefined，二维数组的下标不能越界（因为不存在undefined[0]）
:::

```js title="判断一个对象是否为数组类型"
1.obj instanceof Array
2.Array.prototype.isPrototypeOf(obj)
3.Array.isArray(obj)
4.obj.constructor==Array
5.function _getClass(obj){
if(obj==null) return 'Null';
if(obj==undefined) return 'undefined';
return Object.prototype.toString.call(obj).slice(8,-1)
}
```

### 类数组对象

- 特点：
1. 可以用下标访问，有length属性和索引属性，可以用for遍历
2. 类型不同，无法使用数组API

:::tip 类数组对象转数组
1. [...arguments]
2. Array.from(arguments)
3. Array.prototype.slice.call(arguments)
4. Array.prototype.splice.call(arguments,0)
5. Array.prototype.concat.apply([],arguments)
:::

```js title="数组API方法"
//[]-->""
arr.join("")
String(arr)等于arr.join()

//拼接，返回的是拼接好的内容不影响原数组
let ans=arr.concat(1,2,3,...)

//截取内容
let ans=arr.slice(start,end)
//含头不含尾，可以接负值，接单个正值表示当前到最后，负值表示截取最后n个元素

//删除/插入内容
arr.splice(start,n)
arr.splice(start,0,1,2,...)//在start前添加新元素
arr.splice(start,n,1,2,...)

//颠倒数组
arr.reverse()

//排序
arr.sort()
//默认按照字符串升序排列

//条件满足判断
//every
let resultBool=arr.every(function(val,index,arr){return 判断条件})
//some

//遍历
arr.forEach(function(val,index,arr){})
//forEach会改变原数组
//forEach方法无法提前结束
//forEach会跳过空值
//循环次数由数组初始长度决定
//⽆法 break ，可以⽤ try/catch 中 throw new Error 来停⽌，要在forEach里面改变数组，需要用array[index]的方法来改变数组本身。

new Array(5).fill(0)
let newArr=arr.map()用法同上
let newArr=arr.filter()
var newArr = arr.filter( function(item,index){
return item> 2&&item< 5;
})
let result=arr.reduce(function(prev,cur,index,arr){},initialValue)
//prev为上次化简函数的return值,cur为当前值(从第⼆项开始)
```

## 正则表达式

```md title="常用字符集"
[0-9]或者\d 一位数字
[a-z] 一位小写字母
[A-Za-z] 一位字母
[\u4e00-\u9fa5] 一位汉字
[0-9A-Za-z_]或者\w 一位字母数字或下划线
\s 一位空字符
. 一位任意字符（除回车换行外）
{min,max} 字符集最少出现min次，最多不超过max次，{min,}最少出现min次多了不限，{n}字符集必须是n个
? 最多一个
* 多了不限
+ 至少一个
[^xxx] 除了xxx之外
^xxx 必须以xxx开头
xxx$ 必须以xxx结尾
\b 单词边界
```

```js title="正则表达式对象regExp"
//贪婪模式：正则表达式默认匹配最长的符合条件的字符串
1.let reg=//ig
2.let reg=new regExp("","ig")
查找：
let arr=reg.exec(str)
返回结果：
（1）result
result[0]：匹配值。
result[1],…[n]：根据正则表达式中对应捕获组，在匹配值中出现的值。
index：匹配值中第一个字符在整个字符串中的索引。
input：整个字符串。
（2）* result
lastIndex：下一次匹配执行起点的索引，也就是本次匹配值的最后一个字符索引+1。如果没有g修饰符，lastIndex永远是0。
ignoreCase正则表达式中是否有i修饰符。
global：正则表达式中是否有g修饰符。
multiline：正则表达式中是否有m修饰符。
source：正则表达式文本。
验证：
let bool=reg.test(str)
```

```js title="常用正则"
// （1）匹配 16 进制颜色值
var regex = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/g;
// （2）匹配日期，如 yyyy-mm-dd 格式
var regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
// （3）匹配 qq 号
var regex = /^[1-9][0-9]{4,10}$/g;
// （4）手机号码正则
var regex = /^1[34578]\d{9}$/g;
// （5）用户名正则
var regex = /^[a-zA-Z$][a-zA-Z0-9_$]{4,16}$/;
```


## String

```js title="基本用法"
str.toUpper/LowerCase()//大小写转换
str.chatAt(i)/str[i]//获取指定位置字符
str.charCodeAt(i)//获取指定位置unicode号
str.slice(start,end)//支持负数参数
str.subString(start,end)//不支持负数参数
str.substr(starti,n)//从starti开始截取n个
str.indexOf("",fromi)//从fromi位置开始找下一个关键词所咋位置，没有则返回-1，省略fromi表示从0开始
str.lastIndexOf("",fromi)//同上相反
str.search(//i)//在str中查找第一个和正则表达式匹配的关键词的位置，没找到返回-1
let kwords=str.match(//ig)//加g则表示获取str中所有与正则匹配的关键词，将完整的关键词放在数组的第0个元素，若包含分组，则继续将子内容放入数组的后续元素中，没有则返回null，问题是无法得知关键词位置：解决：reg.exec
let newStr=str.replace(//ig,function(kwords,$1,$2..){return "替换值"})
let str=replace(/\s/g,'')
let parts=str.split(""或//)
```

:::caution 转义字符\
当字符串中的内容和程序的特殊字符或包含功能字符时使用
:::

## Object

js中一切对象都是关联数组

```js title="创建对象的方式"
//直接创建
let obj={}等同于let obj=new Object()
//工厂模式：可创建多个相似对象，但无法识别对象类型
function createObj(name,age){
let obj={};
obj.name=name;
obj.age=age;
return obj;
}
//构造函数：可创建特定类型的对象，但多个实例重复创建方法
function Person(name,age){
this.name=name
this.age=age
this.sayName=function(){alert(this.name)}
}
//（构造函数+原型）组合模式:多个实例引用一个原型上的方法
function Person(name,age){
this.name=name
this.age=age
Person.prototype.sayName=function(){alert(this.name)}
}
//动态原型
function Person(name,age){
this.name=name
this.age=age
if(typeof this.sayName!='function'){
Person.prototype.sayName=function(){alert(this.name)}
}
}
//寄生构造函数
function Person(name,age,job){
    let o=new Object();
    o.name=name;
    o.age=age;
    o.job=job;
    o.sayName=function(){
        console.log(this.name)
    }
    return o;
}
```

:::caution 判断两个对象相等
转换为字符串来判断:JSON.stringify(obj)==JSON.stringify(obj2)
:::

### 对象四大特性

默认值都为true

- 读取方式：object.getOwnPropertyDescriptor(obj,"属性名") 

- 设置方式：object,defineProperty(obj,"属性名",{特性：值}) 

value：实际存储的值

writable：当前属性是否可写

enumerable：当前属性是否可遍历

configurable：可否修改或删除其他属性（一旦设置就不可逆）

```js title="用法"
//用object.defineProperty定义
        let person = {
            name:'张三',
            sex:'男',
        }
        Object.defineProperty(person,'age',{
             value:18,
            // enumerable:true,//控制属性是否可以枚举（遍历），默认为false
            // writable:true,//控制属性是否可以被修改，默认为false
            // configurable:true,//控制属性是否可以被删除，默认为false
            //当有人读取person的age属性时，get函数(getter)就会被调用，且返回值就是age的值，所以必须要有return
     get() {
            console.log('有人读取了age属性')
            return number
            },
            //当有人修改person的age属性时，set函数(setter)就会被调用，且会受到修改的具体值
     set(value){              
             console.log('有人修改了age属性,且值是',value)
             number = value
            }
        })
```

:::caution 关于用object.defineProperty添加新的属性
```js
var obj = {
name:"xiaowang"
}
// 我们在对象obj.name上使用defineProperty方法，修改name的value
Object.defineProperty(obj, "name", {
value: "Change xiaowang"
});
// 上面我们并没有指定Configurable、Enumerable和Writable，那是不是这三个都被赋值为false了呢？我们在修改一下试试：
obj.name = "Change again";
// 我们发现obj.name依旧可以修改，也就是说name的Writable值并不是false
var obj2 = {};
Object.defineProperty(obj2, "name", {
value: "xiaowang"
});
// 上面我们只定义了value的值，并没有指定Configurable、Enumerable和Writable，
// 所以他们的值都是false，这时候再重新赋值给obj.name就会无效了：
obj.name = "Change xiaowang"; // 无效，严格模式报错
```
:::

### 防篡改

禁止添加和删除对象的属性

- 防扩展（阻止对obj对象的一切扩展，但只限制添加新属性，不限制删除旧属性）:Extensible:false或object.preventExtensions(obj)
- 密封（在防扩展的基础上修改所有属性的configurable为false，限制了修改和删除属性）：obect.seal(obj)
- 冻结（在密封的基础上禁止修改所有属性的值，限制了修改属性值）：object.freeze(obj)

## Function(函数)

> 函数是引用类型的对象，函数名是指向函数对象的变量，函数只负责返回值，不负责保存返回值，调用之后释放所有局部变量，包括参数,定义声明函数时，window中创建了函数名变量，window外创建了函数定义的对象

### 参数

- arguments(类数组对象)：

```js 
function fn(a, b) {
    console.log(a, b, arguments[2]) //1 2 3
}
fn(1, 2, 3)
```

- rest（数组）：用于获取函数多余的参数（rest后不能再有其他参数）

```js
function fn(a, b, ...args) {
    //扩展运算符--原地展开可迭代的对象(数组、字符串等)
    console.log(a, b, ...args) //1 2 3 4 5
      console.log(a, b, args) //1 2 [3,4,5]
}
fn(1, 2, 3, 4, 5)
```

:::caution arguments.callee
```js
function f(num) {
    if (num <= 1) {
        return 1
    } else {
        return num * arguments.callee(num - 1)
        // 通过 arguments.callee 代替函数名，可以保证不会出问题
    }
}

var a = f
f = null
a(4)    // 24
```
:::

### 回调函数

把函数交给别人调用：绑定给事件的函数、放入定时器任务的函数

### 匿名函数、IIFE

- 节约内存，在定义函数时，不使用任何变量引用的函数，创建完立即执行，执行后释放
- 可以充当临时作用域，避免在全局创建不必要的变量

```js
(function (str){

    console.log(str);

})("hello!")
```
  
**何时使用：** 
1. 事件
   
```js
 obj.onclick=function(){
    }
```

2. 对象

```js
 fn:function(){
        return this.name
    }
```

3. 函数表达式赋值

```js
var fn=function(){
}
```

4. 回调函数

```js
setInterval(function(){
},1000);
```

5. 返回值

```js
 return function(){
    }
```

6. 块级作用域

```js
(function(){
    //块级作用域（私有作用域）
})();
```

7. 闭包

闭包是指有权访问另一个函数作用域中的变量的函数。

```js
function c(p) {
    retrun function(o1,o2){
        // var v1 = o1[p]
        // var v2 = o2[p]
        
        if (v1 < v2) {
            return -1
        } else if (v1 > v2) {
            retrun 1
        }else {
            retrun 0
        }
    }
}

```
   
:::caution 补充说明
*非匿名的立即执行函数：因为当 JS 解释器在遇到⾮匿名的⽴即执⾏函数时，会创建⼀个辅助的特定对象，然后将函数名称作为这个对象的属性，因此函数内部才可以访问到foo，但是这个值⼜是只读的，所以对它的赋值并不⽣效，所以打印的结果 还是这个函数，并且外部的值也没有发生更改
:::

### 函数柯里化

```js
function impartial(x, y, z) {
  return x + y + z;
}
const partialFn = impartial.bind(this, 1, 2);
partialFn(10); // 13
```

## 事件

事件是用户操作网页时发生的交互动作，除了用户触发之外还可以是文档加载，窗口滚动和大小调整，事件被封装成一个event对象，包含了该事件发生时的所有相关信息以及可以进行的操作

### 事件模型

> - 第一种事件流是最早的DOM0模型： 
这种模型不会传播，所以没有事件流的概念，但是现在有的浏览器支持以冒泡的方式实现，他可以在网页中直接定义监听函数，也可以通过js属性来指定监听函数，这种方式是所有浏览器都兼容的
- 第二种事件模型是IE事件模型： 
在该事件模型中，一次事件共有两个过程，事件处理阶段，和事件冒泡阶段。事件处理阶段会首先执行目标元素绑定的监听事件。然后是事件冒泡阶段，冒泡指的是事件从目标元素冒泡到document，依次检查经过的节点是否绑定了事件监听函数，如果有则执行。这种模型通过attachEvent来添加监听函数，可以添加多个监听函数，会按顺序依次执行。
- 第三种是 DOM2级事件模型： 
在该事件模型中，一次事件共有三个过程，第一个过程是事件捕获阶段。捕获指的是事件从document一直向下传播到目标元素，依次检查经过的节点是否绑定了事件监听函数，如果有则执行。后面两个阶段和IE事件模型的两个阶段相同。这种事件模型，事件绑定的函数是addEventListener，其中第三个参数可以指定事件是否在捕获阶段执行。

:::caution 补充说明
- focus，blur之类的事件本身没有事件冒泡机制所以无法进行事件委托，⼀般来说，我们只希望事件只触发在⽬标上，这时候可以使⽤stopPropagation 来阻⽌事件的进⼀步传播。通常我们认为 stopPropagation是⽤来阻⽌事件冒泡的，其实该函数也可以阻⽌捕获事件。stopImmediatePropagation同样也能实现阻⽌事件，但是还能阻⽌该事件目标执行别的注册事件
- addEventListener和attachEvent的区别: 
addEventListener()⽀持事件冒泡和事件捕获;而attachEvent()只⽀持事件冒泡。addEventListener() 的第⼀个参数中,事件类型不需要添加on;attachEvent()需要添加'on'，如果为同⼀个元素绑定多个事件,addEventListener()会按照事件绑定的顺序依次执⾏,attachEvent()会按照事件绑定的顺序倒序执⾏
:::

```js title="事件委托举例"
//事件委托举例
<button id="btn">click</button>
<ul>
<li>111</li>
<li>222</li>
<li>333</li>
</ul>
var obtn = document.getElementById('btn');
var oUl = document.getElementsByTagName('ul')[0];
oUl.onclick = function(e){
e = e || window.event;
// 判断当你点击的是li执⾏输出 ->获取事件源
if(e.target.tagName == "LI"){
console.log(e.target.innerHTML)
}
}
obtn.onclick = function(){
var oLi = document.createElement('li');
oLi.innerHTML = Math.random();
oUl.appendChild(oLi)
}
```

### 事件坐标

e.screenX/Y鼠标相对于屏幕左上角的位置

e.clientX/Y鼠标相对于文档显示区

e.offsetX/Y鼠标相对于所在父元素的左上角

## 拷贝

### 深拷贝

深拷贝相对浅拷贝而言，如果遇到属性值为引用类型的时候，它新建一个引用类型并将对应的值复制给它，因此对象获得的一个新的引用类型而不是一个原有类型的引用。深拷贝对于一些对象可以使用 JSON 的两个函数来实现，但是由于JSON的对象格式比js的对象格式更加严格，所以如果属性值里边出现函数或者Symbol类型的值时，会转换失败。

### 浅拷贝

浅拷贝指的是将一个对象的属性值复制到另一个对象，如果有的属性的值为引用类型的话，那么会将这个引用的地址复制给对象，因此两个对象会有同一个引用类型的引用。浅拷贝可以使用Object.assign()和展开运算符来实现。Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。

## 严格模式

严格运行模式，对js的使用添加了一些限制，比如说禁止this指向全局对象，还有禁止使用with语句等

