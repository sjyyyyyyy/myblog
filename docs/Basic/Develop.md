---
sidebar_position: 5
---

# 开发

实用方法

## 前端工程化

一些提高效率性能，提升开发体验的手段，主要从编码发布到运维的整个研发生命周期把软件工程的方法和思想引用到前端开发。编码阶段涉及: 模块化、组件化、规范化、模块打包工具、自动化。

- 模块化：避免命名冲突，按需加载，复用性、可维护性更高

- 组件化：提高代码复用性，在设计层面上对ui进行拆分（模块化只是在文件层面上，对代码或资源的拆分）
  
- 规范化：ts，eslint编码规范，严格模式，文档规范

### 前端工程化流程

开发阶段——打包阶段（如将vue转换为css+html+js静态形式）——打包之后的项目可以进行部署——先部署到测试环境

## 前端性能指标

- 白屏时间FP：输入URL开始，到页面开始有变化，只要有任意像素点变化，都算是白屏时间
- 首次内容绘制FCP：页面上绘制了第一个元素
- 首页时间：当onload事件触发的时候
- 最大内容绘制LCP：记录视窗内最大的元素绘制的时间，该时间会随着页面渲染变化而变化，因为页面中的最大元素在渲染过程中可能会发生改变，另外该指标会在用户第一次交互后停止记录。
- 首次输入延迟FID：测量用户第一次与页面交互（单击链接、点按按钮等等）到浏览器对交互作出响应，并实际能够开始处理事件处理程序所经过的时间。
- 累计位移偏移CLS：累积布局偏移，测量视觉稳定性



## 移动端适配

1. viewport适配

通过设置 initial-scale , 将所有设备布局视口的宽度调整为设计图的宽度。

```js
//获取meta节点
var metaNode = document.querySelector('meta[name=viewport]');

//定义设计稿宽度为375
var designWidth = 375;

//计算当前屏幕的宽度与设计稿比例
var scale = document.documentElement.clientWidth/designWidth;

//通过设置meta元素中content的initial-scale值达到移动端适配
meta.content="initial-scale="+scale+",minimum-scale="+scale+",maximum-scale="+scale+",user-scalable=no";
```

2. rem+vw

vw表示1%的屏幕宽度，若设计稿是750px，屏幕一共是100vw对应750px，那么1px就是0.1333vw，方便计算取html为100px，html{font-size:13.333vw}，防止字体过大可用媒体查询控制。

或将 html 节点的 font-size 设置为页面clientWidth(布局视口)的 1/10，即 1rem 就等于页面布局视口的 1/10，这就意味着我们后面使用的 rem 都是按照页面比例来计算的。

```js
var clientWidth = docEl.clientWidth;//获取设备的宽度
            if (!clientWidth) return;
            if (clientWidth >= 750) {//宽度>750 平板 或者桌面 
                docEl.style.fontSize = '100px';//根元素 
            } else {//移动端的适配 
                //设置：html根元素大小   100设计稿的html大小  750设计稿（根据设计稿变化）
                //测试设计稿大小：测量的值px  px转rem  测量的px/100=?rem  直接css里面写?rem
                docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
            }
```

3. 媒体查询@media

## 瀑布流+图片懒加载

:::tip
先创建50个img对象append进页面元素中，在页面加载完成后`window.onload`中给图片一一根据视图高度设置绝对定位的top和left，获取当前最后一排元素中距离顶部最远的元素计算距离，设置为父元素高度，绑定页面滚动事件，判断若滚动距离加浏览器页面高度若大于当前父元素高度则重新赋值total，并重新创建img元素，设置定位距离，重新赋值父元素高度，考虑页面伸缩可以加onresize事件，判断clientWidth若小于900则将num赋值为5，父元素宽度重新赋值，若大于则num为10，父元素宽度重新赋值，最终记得重新调用定位元素的函数
:::

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        body{
            background: #999;
        }
        *{
            margin: 0;
            padding:0;
        }
        .all{
            border:1px solid black;
            background-color: #fff;
            width: 1090px;
            margin: auto;
            font-size: 0;
            position: relative;
        }
        .smallimg {
            position: absolute;
            width: 100px;
        }
    </style>
</head>
<body>
<div class="all">

</div>
<script>
    var img = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg"];
    var all = document.getElementsByClassName("all")[0];
    var num = 10;
    var total = 50;
	//初始创建50张图片
    createEle(total);
    window.onload = function (ev) {
  	//给50张图片设置定位
        setPosition(0)
 	//获取页面的高并赋值
        var maxHeight = getMaxHeight(total);
        all.style.height = maxHeight+"px";
    }
    function createEle(newTotal) {
	//创建对象函数
        for(var i=newTotal-50;i<newTotal;i++){
            var image = document.createElement("img");
            image.src = "img/"+img[Math.floor((Math.random()*num))];
            image.setAttribute("class","smallimg");//image.className = "smalling"
            all.appendChild(image);
        }
    }
    window.onresize = function(){
    //页面伸缩事件
        if(document.documentElement.clientWidth<=900){
            num=5;
            all.style.width = "540px";
        }
        else{
            num=10;
            all.style.width = "1090px";
        }
        setPosition(0)
    }

    function setPosition(start) {
  //设置图片定位函数
        for(var i=start;i<all.children.length;i++){
            console.log(all.children[i].offsetHeight+"....");
            all.children[i].style.left = ((i%num)*110)+"px";
            if(i>=num){
                all.children[i].style.top = (all.children[(i-num)].offsetHeight+10+all.children[(i-num)].offsetTop)+"px";
            }
            else{
                all.children[i].style.top= "0px";
            }
        }
    }
    function getMaxHeight(newTotal) {
    //在创建完所有图片后获取all的最后十个子元素，并比较其自身高与距离顶部的高
        var max=0
        for(var i=newTotal-10;i<newTotal;i++){
           var temp = all.children[i].offsetTop+all.children[i].offsetHeight
            if(temp>max){
                max = temp
            }
        }
        console.log(max)
        return max
    }
    this.addEventListener("scroll",function (evt) {
        if(document.documentElement.clientHeight+this.scrollY>=document.body.offsetHeight-20){
            total = total+50;
            createEle(total);
            setPosition(total-50)
            all.style.height = getMaxHeight(total)+"px";
        }
      
    })
</script>
</body>
</html>

```

## 渲染多条数据

:::tip
1. requestAnimationFrame()：与屏幕刷新次数相匹配，不会丢帧，setTimeout可能会与之不匹配，其次窗口未激活时，动画将停止，节省资源，浏览器提供的api，优化更流畅
2. 虚拟节点减少重排

```js
<script>
  const total = 10000,
  // 每次处理20条
  each = 20,
  // 需要处理次数
  needTimes = Math.ceil(total / each),
  content = document.querySelector('.list')
  // 当前处理次数
  let currentTime = 0
  function add() {
     // 创建一个虚拟的节点对象
     const fragment = document.createDocumentFragment()
     // 分批处理
     for (let i = 0; i < each; i++) {
       const li = document.createElement('li')
       li.innerText = Math.floor(i+currentTime*each)
       fragment.appendChild(li)
     }
     把虚拟的节点对象添加到主节点中
     content.appendChild(fragment)
     currentTime++;
     // 循环处理
     if (currentTime < needTimes) window.requestAnimationFrame(add);
  }
  window.requestAnimationFrame(add)
</script>
```
:::

## 埋点

> 为了搜集产品数据，上报相关行为数据，相关人员以数据为依据进行分析产品在用户端的使用情况

## 国际化

:::tip
```js
//1.
import { useIntl } from "react-intl";
//2.
export default {
 'pages.welcome.alertMessage': '更快更强的重型组件，已经发布。',
};
//3.
const { formatMessage } = useIntl();
    {formatMessage({ id: "pages.welcome.alertMessage" })}
```
:::


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

通常的办法是使⽤window.onerror拦截报错。该方法能拦截到大部分的详细报错信息，但是也有例外：
- 对于跨域的代码运⾏错误会显示 Script error . 对于这种情况我们需要给 script 标签 添加 crossorigin 属性 
- 对于某些浏览器可能不会显示调⽤栈信息，这种情况可以通过arguments.callee.caller 来做栈递归 对于异步代码来说，可以使⽤ catch 的⽅式捕获错误。⽐如Promise可以直接使⽤catch 函数， async await 可以使⽤ try catch

对于捕获的错误需要上传给服务器，通常可以通过 img 标签的 src 发起⼀个请求。 另外接⼝异常就相对来说简单了，可以列举出出错的状态码。⼀旦出现此类的状态码就可以礼金上报出错。

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

适用于所有类型的input标签，select标签以及textarea标签

- 关联方式

1. 通过label标签的for属性与指定表单元素的id绑定来实现关联表单
2. 直接将表单控件放到label标签内，这种情况下，label标签只能包含一个表单元素，如果包含多个只对第一个有效
```html
<label >点击获取input焦点
    <input type="text">
</label>
```

## 等高布局

1. 父元素overflow：hidden,子元素先浮动，然后设置margin-bottom:-9999px;padding-bottom: 9999px;（底部边框会被父元素的overflow: hidden切割掉） 
2. flex布局默认 
3. 父元素设置display:table-row(当元素display设置为table-row后，再设置宽度就没有效果了，因此需要再包裹一层div，然后给它设置宽度);子元素设置table-cell

:::caution
可以用将align-items设为 flex-start,或者align-items属性的其他值，子项就会保持自身的高度了
:::

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
先写中间的div，为了中间div内容不被遮挡，将内容区域content设置了左右padding-left和padding-right后，让左中右都浮动，中的宽度设置为100%,然后将左边的块设置margin-left:-100%,右边的设置为-自身宽度，左右两个div用相对布局position: relative并分别配合right和left属性移动到padding出来的部分，以便左右两栏div移动后不遮挡中间div。

:::caution
当有浮动时，left应该是紧靠着center的右边的，就是因为center的宽度100%，才会挤以margin-left:100%;
就可以将left元素移到center那行的开头
:::


```js title="示例"
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style type="text/css">
			.container{
				padding-left:200px;
				padding-right: 150px;
			}
			#center{
				background-color: yellow;
				width: 100%;
				
			}
			#left{
				position:relative;
				right: 200px;
				background-color: #008000;
				width: 200px;
				/* height: 100px; */
				margin-left: -100%;
				/* 当有浮动时，left应该是紧靠着center的右边的，
				就是因为center的宽度100%，才会挤下去，所以margin-left:100%;
				就可以将left元素移到center那行的开头*/
			}
			#right{
				background-color: skyblue;
				width: 150px;
				margin-right: -150px;
				/* 当设置margin-right为负值时，会减少自身的宽度，所以此时right盒子是没有宽度的 */		
						/* 如果设置margin-left为负值，会占据center的宽度 */
			}

		
			.float-left{
				float: left;
			}
		</style>
	</head>
	<body>
			<div class="container">
		<div id="center" class="float-left">
			center
		</div>
			<div id="left" class="float-left">
				left
			</div>
			<div id="right" class="float-left">
				right
			</div>
				</div>
	</body>
</html>
```

> 双飞翼布局:
中间的部分(内)被标签(外)单独包裹放在上面，外左右浮动，中间的内设置margin出左右的位置，外宽度100%，将左边块margin-left设置为-100%右边为负的自身宽度

```js title="示例"
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style type="text/css">
			#center{
				background-color: yellow;
				width: 100%;
				height: 100px;
			}
			#center #center-wrap{
				margin: 0 150px 0 200px;
			}
			#left{

				background-color: #008000;
				width: 200px;
				height: 100px;
				margin-left: -100%;
				
			}
			#right{
				background-color: skyblue;
				width: 150px;
				height: 100px;
				margin-left: -150px;
				
			}
	
			.float-left{
				float: left;
			}
		</style>
	</head>
	<body>
		
		
		<div id="center" class="float-left">
			<div id="center-wrap">
				center
			</div>
		</div>
			<div id="left" class="float-left">
				left
			</div>
			
			<div id="right" class="float-left">
				right
			</div>
	
	
	</body>
</html>
```

> flex布局:
如果是让中间的content在网页渲染的先渲染，需要把content写在第一个,因此需要给centerleftright增加一个order属性,再用flex:1撑开中间部分就可以