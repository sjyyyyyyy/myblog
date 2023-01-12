---
sidebar_position: 5
---

# 开发

实用方法

## 模式

### 单例模式

单例模式保证了全局只有一个实例来被访问。比如说常用的如弹框组件的实现和全局状态的实现。

### 代理模式

代理模式是为一个对象提供一个代用品或占位符，以便控制对它的访问。比如说常见的事件代理。

### 策略模式

策略模式主要是用来将方法的实现和方法的调用分离开，外部通过不同的参数可以调用不同的策略。主要在MVP模式解耦的时候用来将视图层的方法定义和方法调用分离。
  
### 中介者模式

中介者模式指的是，多个对象通过一个中介者进行交流，而不是直接进行交流，这样能够将通信的各个对象解耦。
  
### 适配器模式

适配器用来解决两个接口不兼容的情况，不需要改变已有的接口，通过包装一层的方式实现两个接口的正常协作。假如我们需要一种新的接口返回方式，但是老的接口由于在太多地方已经使用了，不能随意更改，这个时候就可以使用适配器模式。比如我们需要一种自定义的时间返回格式，但是我们又不能对 js 时间格式化的接口进行修改，这个时候就可以使用适配器模式。

### 观察者模式

在观察者模式中，观察者需要直接订阅目标事件。在目标发出内容改变的事件后，直接接收事件并作出响应。

### 发布者订阅者模式

发布订阅模式其实属于广义上的观察者模式,在发布订阅模式中，发布者和订阅者之间多了一个调度中心。调度中心一方面从发布者接收事件，另一方面向订阅者发布事件，订阅者需要在调度中心中订阅事件。通过调度中心实现了发布者和订阅者关系的解耦。使用发布订阅者模式更利于我们代码的可维护性。

## Polyfill

指的是实现浏览并不支持原生API的代码

## 异常监控

通常的办法是使⽤window.onerror拦截报错。该⽅法能拦截到⼤ 部分的详细报错信息，但是也有例外：
- 对于跨域的代码运⾏错误会显示 Script error . 对于这种情况我们需要给 script 标签 添加 crossorigin 属性 
- 对于某些浏览器可能不会显示调⽤栈信息，这种情况可以通过arguments.callee.caller 来做栈递归 对于异步代码来说，可以使⽤ catch 的⽅式捕获错误。⽐如Promise可以直接使⽤catch 函数， async await 可以使⽤ try catch但是要注意线上运⾏的代码都是压缩过的，需要在打包时⽣成 sourceMap ⽂件便于debug

对于捕获的错误需要上传给服务器，通常可以通过 img 标签的 src 发起⼀个请求。 另外接⼝异常就相对来说简单了，可以列举出出错的状态码。⼀旦出现此类的状态码就可 以⽴即上报出错。

## 性能优化

- 避免声明嵌套函数，造成函数的重复解析
- 图片优化 
  - 减少像素点，减少每个像素能够显示的颜色
  - 图片加载优化：小图使用base64格式，或将多个图片文件整合到一张图片中，图片格式尽量使用webp格式，它具有更好的图像压缩算法，图标使用svg，小图用png，照片用jpeg
  - 图片预加载，图片懒加载
  
```js title="图片加载优化"
//图片预加载
(1)多张图片
通过实例化Image对象 调用onload方法来实现(onload之后)
var oDiv = document.getElementsByClassName('div')[0],
    img = ['https://zza.jpg', 'https://zzb.jpg'];
    img.forEach(function(elem){
        var oImg = new Image();
        oImg.src = elem;
        oImg.style.width = '100%';
        oImg.onload = function(){
            oDiv.appendChild(oImg);
        }
    })
(2)单张照片
var oDiv = document.getElementsByTagName('div')[0],
var oImg = new Image();
oImg.src = 'https://zzz.jpg';
oImg.style.width = '100%';
oImg.onload = function(){
    oDiv.appendChild(oImg);
}
仅使用JavaScript实现预加载
<div class="hidden">
    <script type="text/javascript">
        <!--//--><![CDATA[//><!--
            var images = new Array()
            function preload() {
                for (i = 0; i < preload.arguments.length; i++) {
                    images[i] = new Image()
                    images[i].src = preload.arguments[i]
                }
            }
            preload(
                "http://domain.tld/gallery/image-001.jpg",
                "http://domain.tld/gallery/image-002.jpg",
                "http://domain.tld/gallery/image-003.jpg"
            )
        //--><!]]>
    </script>
</div>

//图片懒加载
window.innerHeight：浏览器可视区域高度
document.body.scrollTop || document.documentElement.scrollTop：浏览器滚动条滚过高度
img.offsetTop：元素距文档顶部的高度 
加载条件：
img.offsetTop < window.innerHeight + document.body.scrollTop;
    <script type="text/javascript">
        var imgs = document.querySelectorAll('img');
        var lazyload = function(){
            var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            var winTop = window.innerHeight;
            for(var i=0;i < imgs.length;i++){
                if(imgs[i].offsetTop < scrollTop + winTop ){
                    imgs[i].src = imgs[i].getAttribute('data-src');
                }
            }
        }
        function throttle(method,delay){
            var timer = null;
            return function(){
                var context = this, args=arguments;
                clearTimeout(timer);
                timer=setTimeout(function(){
                    method.apply(context,args);
                },delay);
            }
        }
        window.onscroll = throttle(lazyload,200);
    </script>
```

- 服务器优化：
使用CDN服务提高响应速度，启用Gzip等方式对于传输的资源进行压缩，减小文件体积，尽可能减小cookie大小，将静态资源分配到其他域名下避免对静态资源请求时携带不必要的cookie
- 渲染优化 
  - 禁止使用iframe
  - 用css动画代替js动画
  - 合理使用base64编码对小图标进行编码
  - 页面中空的href和src会阻塞页面资源的加载
  - 减少dom操作次数
  - 一次性操作classname修改样式
  - 少用全局变量
- 预优化
  - DNS预解析：
  `<link rel="dns-prefetch" href="//blog.poetries.top"> `
  - 预加载:不需要马上用到，但希望尽早获取,预加载其实是声明式的fetch，强制浏览器请求资源，并且不会阻塞onload事件，可以使⽤以下代码开启预加载预加载可以⼀定程度上降低⾸屏的加载时间，因为可以将⼀些不影响⾸屏但重要的⽂件延后加载，唯⼀缺点就是兼容性 
  `<link rel="preload" href="http://blog.poetries.top">`
  - 预渲染:将下载的文件预先在后台渲染,预渲染虽然可以提⾼⻚⾯的加载速度，但是要确保该页面大概率会被⽤户在之后打开，否则就是白白浪费资源去渲染。
  `<link rel="prerender" href="http://blog.poetries.top">`
- js或css优化 
  - 使用位运算代替一些简单的四则运算
  - 避免使用过深的嵌套循环
  - 当需要多次访问一个值的时候，使用变量存起来
  - 样式表放在head标签中，减少页面首次渲染时间
  - 避免使用@import标签
  - 把js放在页面底部防止脚本加载阻塞页面加载
  - 通过对js和css文件进行压缩来减小文件体积
- 节流，防抖
- 懒执行，懒加载
- CDN
- 插入多个dom，实现不卡顿
  - 分批次循环插入dom，用requestanimationframe
  - 虚拟滚动，只渲染可视界面内容

## label

```html title="常见用法"
//解决不同浏览器原生button样式不同的问题
<input type="button" id="btn">
<label for="btn">Button</label>
<style>
input[type='button'] {
  display: none;
}
label {
  display: inline-block;
  padding: 10px 20px;
  background: #456;
  color: #fff;
  cursor: pointer;
  box-shadow: 2px 2px 4px 0 rgba(0,0,0,.3);
  border-radius: 2px;
}
</style>
//结合checkbox、radio表单元素实现纯CSS状态切换，这样的实例就太多了。比如控制CSS动画播放和停止。
<input type="checkbox" id="controller">
<label class="icon" for="controller">
  <div class="play"></div>
  <div class="pause"></div>
</label>
<div class="animation"></div>

<style>
...
#controller:checked ~ .animation {
  animation-play-state: paused;
}
...
</style>
//input的focus事件会触发锚点定位，我们可以利用label当触发器实现选项卡切换效果。
<div class="box">
  <div class="list"><input id="one" readonly>1</div>
  <div class="list"><input id="two" readonly>2</div>
  <div class="list"><input id="three" readonly>3</div>
  <div class="list"><input id="four" readonly>4</div>
</div>
<div class="link">
  <label class="click" for="one">1</label>
  <label class="click" for="two">2</label>
  <label class="click" for="three">3</label>
  <label class="click" for="four">4</label>
</div>
<style>
.box {
  width: 20em;
  height: 10em;
  border: 1px solid #ddd;
  overflow: hidden;
}
.list {
  height: 100%;
  background: #ddd;
  text-align: center;
  position: relative;
}
.list > input { 
  position: absolute; top:0; 
  height: 100%; width: 1px;
  border:0; padding: 0; margin: 0;
  clip: rect(0 0 0 0);
}
</style>
```

## 等高布局

1. 父元素overflow：hidden,子元素先浮动，然后设置margin-bottom:-9999px;padding-bottom: 9999px; 
2. flex布局默认 
3. 父元素设置display:table-row(当元素display设置为table-row后，再设置宽度就没有效果了，因此需要再包裹一层div，然后给它设置宽度);子元素设置table-cell

## 网页字体变清晰，变细

- font-weight来控制粗细还是需要看对应的字体有没有对应的变种字体。因此这就和font-family 相关。
- -webkit-font-smoothing:这个属性是Chrome 的抗锯齿属性。加上后会显得细一些，但是只针对 webkit 内核的浏览器才有效。

## 垂直水平居中

```css
//绝对定位
.parent {
    position: relative;
}
.child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
//flex
.parent {
    display: flex;
    justify-content: center;
    align-items: center;
}
//position:absolute四个方向都设置为0，然后将margin设置为auto
```

:::tip 如何垂直居中一个img
display:table-cell 

text-align:center 

vertical-align:middle 

flex布局
:::

## 单行多行省略号


```css
//单行
    white-space: nowrap;
    overflow:hidden;
    text-overflow: ellipsis;
//多行
    &::after{
        content: '...';
        height: 1.5rem;
        position: absolute;
        bottom: 5px;
        right: 5px;
    }
```

## css三角形

```css
.triangle:after{
    content: '';
    border: 35px solid transparent;
    border-bottom-color: lightgreen;
}
```

## 中间自适应三栏布局

两者都最好设置最小宽度

> 圣杯布局:
先写中间的div，为了中间div内容不被遮挡，将中间内容区域content设置了左右padding-left和padding-right后，让左中右都浮动，中的宽度设置为100%,然后将左边的块设置margin-left:-100%,右边的设置为-自身宽度，左右两个div用相对布局position: relative并分别配合right和left属性移动到padding出来的部分，以便左右两栏div移动后不遮挡中间div。

> 双飞翼布局:
中间的部分被标签单独包裹放在上面，只有左右两个浮动，中间的设置margin出左右的位置，宽度100%，将左边块margin-left设置为-100%右边为负的自身宽度

> flex布局:
如果是让中间的content在网页渲染的先渲染，需要把content写在第一个,因此需要给centerleftright增加一个order属性