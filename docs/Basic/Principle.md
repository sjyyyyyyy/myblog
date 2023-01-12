---
sidebar_position: 6
---

# 原理

运行原理

## 浏览器架构

* 用户界面
   * 主进程
   * 内核
       * 渲染引擎
       * JS 引擎
           * 执行栈
       * 事件触发线程
           * 消息队列
               * 微任务
               * 宏任务
       * 网络异步线程
       * 定时器线程

## 操作系统内存

在操作系统中，内存被分为栈区和堆区，栈区内存由编译器自动分配释放，存放函数的参数值，局部变量的值等，堆区内存一般由程序员分配释放，若程序员不释放，程序结束时可由垃圾回收机制回收。

### 栈

原始数据类型

- 占据空间小，大小固定，属于被频繁调用数据，先进后出

```js
arr.push 
let value=arr.pop() 
arr.unshift() 
let value=arr.shift()
```

:::caution 队列
arr.push() 
let first=arr.shift()
:::

### 堆

引用数据类型

- 占据空间大，大小不固定

- 在栈中存储了指针，该指针指向堆中该实体的起始地址，当解释器寻找引用时会先检索其在栈中的地址，取得地址后从堆中获得实体

- 按优先级排序，完全二叉树是堆的一种实现形式

## 数据类型

### 基本数据类型

String,Number,Boolean,Null,Undefined,Symbol 

- Symbol

只允许显示强制类型转换成字符串，不允许转换成数字，可以强制类型转换为布尔值（true）

```js 
class Class2 {
  get [Symbol.toStringTag]() {
    return "Class2";
  }
}
Object.prototype.toString.call(new Class2()); // "[object Class2]"
```

:::caution
1. Symbol 函数前不能使用 new 命令，否则会报错。 
2. Symbol 函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。 
3. Symbol 作为属性名，该属性不会出现在 for...in、for...of 循环中，也不会被 Object.keys()、Object.getOwnPropertyNames()、JSON.stringify() 返回。 
4. Object.getOwnPropertySymbols 方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。 
5. Symbol.for 接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建并返回一个以该字符串为名称的 Symbol 值。 
6. Symbol.keyFor 方法返回一个已登记的 Symbol 类型值的 key。
:::

- undefined 

已在作用域汇总声明但还没有赋值的变量

:::caution 注意事项
undefined在js中不是一个保留字，这意味着我们可以使用undefined来作为一个变量名，这样的做法是非常危险的，他会影响我们对undefined值的判断，但是我们可以通过一些方法获得安全的undefined值，比如void 0
:::

- null

空对象，一般用于赋值给可能会返回变量的对象作为初始化

- 补充：还没有在作用域中声明的变量是undeclared
:::

### 引用数据类型

Object,Array,Function,RegExp,Date

:::caution 类型判断特殊情况
typeof(null)//"object"

typeof([1,2])//"object"

typeof(function(){})//"function"

- typeof是操作符，不是函数，可以添加括号使用，但括号的作用是进行分组而非函数的调用
:::

### 类型转换

### 隐式转换

只影响计算结果，不影响本值

- 除了加号以外，所有算数运算（加减乘除）和关系运算（大小于等于）都转换成number类型计算

- NaN和任何东西计算永远返回NaN

- som+""，+或者-som，if()，！！，for第二个条件，while相关，?:,||,&&(||&&返回的是他们其中一个操作数的值，而非条件判断的结果)

### 指定转换

```js
//转为字符串：
.toString()//不可以转null和undefined
String()//都可以转换
//toString
//对普通对象来说，除非自定义toString方法，否则会调用toString来返回内部属性class的值

//转为数字类型
Number()//若转换的字符串中有一个不是数字的字符则返回NaN
parseInt()//遇到非数字结束，如果第一个字符不是数字或者符号就返回NaN，自动忽略第一个空格，还可以设置要解析的数字的基数。当基数的值为0，或没有设置该参数时，parseInt() 会根据string来判断数字的基数。
parseFloat()//遇到第二个.或者非数字结束时结束，若为整数则解析为整数
//toNumber转换结果：undefined值转换为NaN，null转换为0，true为1，false为0，空字符串为0，若字符串中有非数字值则转换为NaN，对象（数组）会首先将值转换为相应的基本类型值（检查该值是否有valueOf方法，若没有就用toString的返回值来进行强制类型转换，若valueOf和toString均不返回基本类型值会产生TypeError错误）

//补充：
{}.valueOf()//{}
{}.toString()//"[object object]"
[].valueOf()//[]
[].toString()//""

//转为布尔值
Boolean()//只有五个值会被转换为false（"",0,NaN,null,undefined）
```

:::caution ==与===
- ==：
1. 比较两侧有数字：把非数字一方转换为数字比较 
2. 比较两侧有布尔值：把布尔值转换为数字比较 
3. 比较两侧是对象和非对象：对象先调用ToPrimitive抽象 操作 
4. 比较两侧都是对象：指向同一个对象则返回true 
5. null和undefined比较：返回true，其他值与这两个比较都返回false 
6. NaN与任何值比较都返回false
- ===：
相等条件：引用类型两个变量必须指向同一对象，基本类型两个变量除了类型必须相同，值还必须相等

- 使用 Object.is来进行相等判断时，一般情况下和三等号的判断相同，它处理了一些特殊的情况，比如 -0 和 +0不再相等，两个NaN认定为是相等的。
:::

:::danger 易混淆类型
let str_one='first'//基本类型

let str_two=new String(second)//引用类型object

let str_three=String(third)//基本类型
:::

:::caution 包装类型
临时封装原始类型的数据，提供对数据操作的对象，自动使用，调用完函数包装类型自动释放 

三大包装类型：string,number,boolean(不能new)
:::

```js
let n=2121;
n.toString(2);
var t = new Boolean(false);//t是引用类型
!!t;// => true，非空对象转为boolean类型都是true
typeof t;// => object
t instanceof Boolean;// => true,instanceof用于判断是否是某对象的实例
//关于原始类型对instanceof的限制
var str = 'hello world'
str instanceof String // false
var str1 = new String('hello world')
str1 instanceof String // true
class PrimitiveString {
  static [Symbol.hasInstance](x) {
    return typeof x === 'string'
  }
}
console.log('hello world' instanceof PrimitiveString) // true
```

## 作用域

作用域是该上下文中声明的变量和声明的作用范围，可分为块级和函数作用域

### 执行上下文

三个重要属性：变量对象，作用域链（对于作⽤域链，可以把它理解成包含⾃身变量对象和上级变量对象的列表，通过[[Scope]]属性查找上级变量），this

### 变量提升

在⽣成执⾏上下⽂时，会有两个阶段。第⼀个阶段是创建的阶段（具体步骤是创建VO），JS解释器会找出需要提升的变量和函数，并且给他们提前在内存中开辟好空间，函数的话会将整个函数存⼊内存中，变量只声明并赋值为undefined

### 作用域链

本质上是一个指向变量对象的指针列表，通过作用域链我们可以访问到外层环境的变量和函数

> 作用域链的前端始终都是当前执行上下文的变量对象，全局执行上下文的变量（全局对象）始终是作用域链的最后一个对象，当我们查找一个变量时，如果当前执行环境中没有找到，我们可以沿着作用域链向后查找，[[scope]]属性:指向⽗级变量对象和作⽤域链，也就是包含了⽗级的 [[scope]] 和 AO（活动对象）

### 全局作用域

1. 最外层声明的变量 
2. 未定义直接赋值的变量 
3. window对象的内置属性都拥有全局作用域，例如window.name,window.location，弊端：如果我们写了很多行代码都没有用函数包裹，那么他们全部都在全局作用域中，这样就会污染全局命名空间，容易引起命名冲突

### 函数作用域

1. 函数参数 
2. 声明在函数内部的变量

### 块级作用域

1. 用let，const声明的函数内部 
2. 用let，const声明的代码块 

:::caution 注意
块语句，如if，switch，for，while等语句中的大括号不会创建一个新的作用域，但如果在代码块里面加上let或者const的话，就会变成块级作用域，注意这两者无变量提升，声明时尽量放在顶部。
:::

## 代码执行过程

1. 创建全局执行上下文，逐行自上而下执行
2. 遇到函数时，函数执行上下文被push到执行栈顶层，函数执行上下文被激活开始执行
3. 执行完成后，函数执行上下文被pop移除出执行栈
4. 控制权交还给全局执行上下文

### 执行栈

存储函数调用的栈结构，当开始执⾏JS代码时，⾸先会执⾏⼀个 main函数，然后执⾏我们的代码。根据先进后出的原则，后执⾏的函数会先弹出栈。

## AST

抽象语法树，将代码逐字母解析成树状对象的形式，这是语言之间的转换，代码语法检查，代码风格检查，格式化，高亮，代码错误提示，代码自动补全等等的基础

## ES6

### let const 箭头函数

- 不属于顶层对象window，不允许重复声明，无变量提升，暂时性死区，块级作用域
- const声明时就需要赋值，不能重复赋值基本数据类型
- 箭头函数不能用arguments和new构造函数，可以用rest，箭头函数的this指向定义它时所处的对象父作用域

## 闭包

函数嵌套函数，返回的内部函数要引用外部函数中的变量

- 好处： 
避免污染全局变量，留住一个变量不让其释放，私有成员

:::caution
 在函数外部访问到函数内部的变量，可以用这种方式来创建私有变量，也可以使已经运行结束的函数上下文变量对象继续留在内存中，因为闭包函数保留了这个变量对象的引用，所以这个变量对象不会被回收
:::

- 坏处： 
引发内存泄漏

:::caution
两次外层函数调用返回的闭包中，受保护的变量是各自独立的没有关系 
:::

:::tip 为什么let可以解决闭包？
- var声明的变量，在全局范围内都有效，所以全局只有一个变量，每一次循环，变量i的值都会发生改变 
- let声明的变量，紧紧在块级作用域内有效，当前的i只在本轮循环有效，所以每一次循环的i其实都是一个新的变量，而js引擎内部会记住上一轮循环的值，初始化本轮的变量i时，就在上一轮循环的基础上进行计算
:::

## 原型链

由各级父对象逐级继承形成的链式结构

- 自有属性：obj.hasOwnProperty("属性名")判断，对象本地的成员，构造函数中用this的方式添加的属性
- 共有属性：!obj.hasOwnProperty("属性名")&&obj.属性名!=undefined,原型链上的属性，必须通过原型对象访问，如果强行使用子对象修改共有属性，只会在子对象添加同名自有属性。

```js
//判断对象是否属于某个类
instanceof
constructor
若是某个内置的引用类型可以用Object.prototype.toString()
//获取原型的方法
p.__proto__
p.constructor.prototype
Object.getPrototypeOf(p)
delete 对象.属性名//删除属性
father.isPrototypeOf(child)//判断child对象是否继承father对象（father是否在child的原型链上）
child instanceof 构造函数//判断child是否是构造函数创建出来的子对象
```

## 继承

面向对象三大特点：封装继承多态

```js title="es5中继承写法"
function Person(name,age){
this.name=name
this.age=age
}
Person.prototype.talking=function(){
console.log(this.name+"正在说话");
}
function Student(name,age,school){
//1
Person.call(this,name,age)
this.school=school
}
//2
Student.prototype=new Person();
//3
Student.prototype.constructor=Student;
let s1=new Student('aa',12,'ddd')
console.log(s1)
s1.talking()
```

```js title="es6中继承写法"
class Student extends Person{
constructor(name,age,school){
super(name,age)
this.school=school
}
eating(){
console.log(123);
}
}
let s1=new Student('aa',23,'dd');
console.log(s1)
s1.talking()
s1.eating()
```

### 继承实现方式

```js 

//寄生式组合继承
function Person(name) {
  this.name = name;
}
Person.prototype.sayName = function() {
  console.log("My name is " + this.name + ".");
};
function Student(name, grade) {
  Person.call(this, name);
  this.grade = grade;
}
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;
Student.prototype.sayMyGrade = function() {
  console.log("My grade is " + this.grade + ".");
};
```

### 自定义继承

```md 
1. 仅修改一个对象的父对象
obj._proto_=构造函数.prototype//会导致内部属性不能使用
解：obj.setPrototypeof(child,father)
2. 批量修改所有子对象的父对象(需要在刚刚定义完构造函数之后，创建第一个子对象之前)
构造函数.prototype=father
3. object.create()创建一个新对象，继承指定父对象，同时为新对象扩展新属性。基于一个现有的父对象创建子对象时使用，若省略第二个参数则完全继承父对象

let child=object.create(father,{新属性：四大特性})
```

## this

当前运行环境上下文

- 优先级：构造器调用模式（new）>applycallbind>方法调用模式>函数调用模式

```js title="定时器中的this指向"
var name = 'from window';
var obj = {
    name: 'from obj',
    func: function(){
        setInterval(function () {
            console.log(this.name)
        },1000)
    }
}
obj.func()
//输出结果："from window"

var name = 'from window';
var obj = {
    name: 'from obj',
    func: function(){
        var _this = this;
        setInterval(function () {
            console.log(_this.name)
        },1000)
    }
}

obj.func()
//输出结果： from obj

var name = 'from window';
var obj = {
    name: 'from obj',
    func: function(){
        setInterval(function () {
            console.log(this.name)
        }.bind(this),1000)
    }
}

obj.func()
//输出结果： from obj

var name = 'from window';
var obj = {
    name: 'from obj',
    func: function(){
        setInterval(()=>{
            console.log(this.name)
        },1000)
    }
}

obj.func()
//输出结果： from obj
```

- 对象事件方法中的this指向调用对象

```js title="改变方法"
方法.call(新对象，方法需要传的参数1,2,3...)
方法.apply(新对象，[参数1，2，3，...])
方法.bind(新对象，参数1，2，3，...)() 
```

### 构造函数

`Person.prototype.say=function(){}`

### new

:::tip new做的事情
1. 以构造器的prototype属性为原型，创建新对象 
2. 将this（新对象）和调用参数传给构造器，执行 
3. 如果构造器没有手动返回对象，则返回第一步创建的新对象，如果有，则舍弃掉第一步创建的新对象，返回手动return的对象 

new过程中会新建对象，此对象会继承构造器的原型与原型上的属性，最后它会被作为实例返回这样一个过程
:::

```js 
function newMethod(){
  //拿到传入的参数中的第一个参数，即构造函数名Func
  let constr = [].shift.call(arguments);//这行代码的意思：删除并拿到arguments的第一项
  // 1.以构造器的prototype属性为原型，创建新对象：             
  let obj = Object.create(constr.prototype);
 // 2.将this和调用参数传给构造器执行 (使用apply，将构造函数中的this指向新对象，这样新对象就可以访问构造函数中的属性和方法)：
  let result = constr.apply(obj, arguments);
  // 3.如果构造器没有手动返回对象，则返回第一步的对象(构造函数的一个实例对象)
  return typeof result === "object" ? result : obj;
}
```

## 浏览器攻击

### XSS攻击（跨站脚本攻击）

:::danger
攻击者在网站上注入恶意的客户端代码，通过恶意脚本对客户端网页进行篡改，从而在用户浏览网页时获取用户cookie等隐私信息
:::

> 攻击者对客户端网页注入的恶意脚本一般包括js，有时也会包含html和flash，他们的共同点是将隐私数据像cookie，session发送给攻击者，将受害者重定向到一个由攻击者控制的网站，在受害者的机器上进行一些恶意操作

### xss攻击分类

- 存储型： 
 把用户输入的数据存储在服务器端，当浏览器请求数据时，脚本从服务器上传回并执行，这种攻击具有很强的稳定性

- 反射型：
  （我们会发现用户将一段含有恶意代码的请求提交给 Web服务器，Web服务器接收到请求时，又将恶意代码反射给了浏览器端）把用户输入的数据”反射“给浏览器，这种攻击方式往往需要攻击者诱导用户点击一个恶意链接，或者提交一个表单，或者进入一个恶意网站时，注入脚本进入被攻击者的网站 

:::caution 注意
 web服务器不会存储反射型xss攻击的恶意脚本，这是和存储型xss攻击不同的地方
:::

- 基于dom的xss攻击： 
 这种攻击不涉及页面web服务器，简单来说就是黑客通过各种手段将恶意脚本注入用户的页面中，在web资源传输过程中或者在用户使用页面的过程中修改web页面的数据。

### xss防御

> 他们的共同点是首先往浏览器中注入恶意脚本，然后通过恶意脚本将用户信息发送至黑客部署的恶意服务器上，所以要阻止xss攻击，我们可以通过阻止恶意js脚本的注入和恶意消息的发送来实现

:::tip 解决措施
1. 服务器或者浏览器端对输入脚本进行过滤或转码
2. 充分利用csp，限制加载其他域下的资源文件（即使黑客插入了一个js文件，这个js文件也是无法被加载的），禁止向第三方域提交数据，这样用户数据也不会外泄，禁止执行内联脚本和未授权的脚本，可以使用Content-Security-Policy HTTP 头部 来指定你的策略，像这样：Content-Security-Policy:policy（policy参数是一个包含了各种描述你的CSP策略指令的字符串。）
3. 使用HttpOnly属性： 
由于许多xss攻击都是来盗用cookie的，因此还可以通过向http响应返回的set-cookie设置HttpOnly属性来保护cookie的安全（无法通过js来读取cookie）
:::

### CSRF攻击

:::danger
跨站请求伪造，已登录用户访问攻击者网站，攻击网站向被攻击网站发起恶意请求（利用浏览器会自动携带cookie）
:::

### CSRF攻击方式

```html title="当用户访问了攻击者的网站时，黑客有三种方式去实施csrf攻击"

//1.自动发起get请求
<img src="https://time.geekbang.org/sendcoin?user=hacker&number=100"> 
//黑客将转账的请求接口隐藏在img标签内，欺骗浏览器这是一张图片资源，当该页面被加载时，浏览器会自动发起img的资源请求。如果服务器没有对该请求进行判断的话，那么服务器就会认为该请求是一个转账请求，于是用户账户上的100极客币就被转移到黑客的账户上去了
//2.自动发起post请求
<html>
  <body>
    <h1>黑客的站点: CSRF攻击演示</h1>
    <form id= 'hacker-form' action="https://time.geekbang.org/sendcoin" method=POST>
      <input type="hidden" name="userll" value="hacker" />
      <input type="hidden" name="numberll" value="100" />
    </form>
    <script> document.getElementById ('hacker-form').submit(); </script> 
  </body>
</html>
//黑客在他的页面中构建了一个隐藏的表单，该表单的内容就是极客时间的转账接口，当用户打开该站点之后，这个表单就会被自动执行提交，当表单被提交之后，服务器就会执行转账操作，因此使用构建自动提交表单这种方式，就可以自动实现跨站点post数据提交
//3.引诱用户点击链接
```

:::caution
与xss攻击不同的是，csrf攻击不需要将恶意代码注入用户的页面，仅仅是利用服务器的漏洞和用户的登录状态来实施攻击，所以黑客是无法通过csrf攻击来获取用户页面的数据的
:::

### CSRF防御

:::tip 防御方式
1. 设置set-cookie的SameSite属性（strict：完全禁止第三方cookie，lax：第三方站点使用post或img、iframe标签时禁止携带cookie，none：任何情况下都会发送cookie）：从第三方站点发送请求时禁止cookie的发送。
2. 在服务器验证请求的来源站点：Referer是http请求头中的一个字段，记录了该http请求的来源地址，Origin在xmlhttprequest和fetch跨站请求或post方法发送请求时都会带上origin属性。（不同于referer，origin不包含具体的url路径，只包含域名信息，优先级更高）
3. CSRF Token：在浏览器向服务器发起请求时，服务器生成一个csrf token，他是浏览器生成的字符串，然后将该字符串植入到返回的页面中，在浏览器端如果要发起转账的请求，那么需要带上页面中的csrf token，然后服务器会进行验证token是否合法，如果是从第三方站点发出的请求，那么将无法获取到csrf token的值，服务器会因为csrf token不正确而拒绝请求
:::

### 点击劫持

:::danger
攻击者将需要攻击的网站通过iframe嵌套的方式嵌入自己的网页中，并将iframe设置为透明，在页面中透出一个按钮诱导用户点击
:::

:::tip 防御
1. X-FRAME-OPTIONS，http响应头，可以防止用iframe嵌套的点击劫持攻击，该响应头有三个值可选，分别是deny，表示页面不允许通过iframe的方式展示，sameorigin，表示页面可以在相同域名下通过iframe的方式展示，allow-from，表示页面可以在指定来源的iframe中显示
2. js方式，当通过iframe的方式加载页面时，攻击者的网页不显示所有内容了
3. samesite
:::

## 跨域

> 浏览器的同源策略：一个域下的js脚本在未经允许的情况下不能够访问另一个域的内容（当前域下的js脚本不能够访问其他域下的cookie，localStorage，indexDB，不能操作访问其他域下的dom，当前域下的ajax无法发送跨域请求），这里的同源指的是两个域的协议，域名，端口号必须相同

:::caution
同源策略的目的主要是为了保证用户的信息安全，它只是对 js 脚本的一种限制，并不是对浏览器的限制，对于一般的img、或者script脚本请求都不会有跨域的限制，这是因为这些操作都不会通过响应结果来进行可能出现安全问题的操作。
:::

```js title="跨域实现方式"
//实现主域名下的不同子域名的跨域操作
document.domain这种方式只能用于二级域名相同的情况下，比如a.test.com和b.test.com,只需要给⻚⾯添加 document.domain='test.com'表示⼆级域名都相同就可以实现跨域，主域名下的cookie就能被子域名所访问
//不同跨域窗口间的通信（如页面想要和页面中不同源的iframe进行通信）
location.hash

window.name

postMessage：
这种⽅式通常用于获取嵌入页面中的第三方页面数据。一个页面发送消息，另一个页面判断来源并接收消息
// 发送消息端
window.parent.postMessage('message', 'http://blog.poetries.com');
// 接收消息端
var mc = new MessageChannel();
mc.addEventListener('message', (event) => {
 var origin = event.origin || event.originalEvent.origin;
 if (origin === 'http://blog.poetries.com') {
 console.log('验证通过')
 } });

//解决ajax无法提交跨域请求
//方案一
jsonp（仅限于get请求），动态构建script标签，因为浏览器对script标签的引入没有跨域的访问限制 。通过在请求的 url 后指定一个回调函数，然后服务器在返回数据的时候，构建一个 json 数据的包装，这个包装就是回调函数，然后返回给前端，前端接收到数据后，因为请求的是脚本文件，所以会直接执行，这样我们先前定义好的回调函数就可以被调用，从而实现了跨域请求的处理。这种方式只能用于 get 请求。
//方案二
cors设置'Access-Control-Allow-Origin=*'，cors需要浏览器和后端同时支持，浏览器会自动实现cors通信，浏览器将 CORS 请求分成两类：简单请求和非简单请求。
对于简单请求，浏览器直接发出 CORS 请求。具体来说，就是会在头信息之中，增加一个 Origin 字段。Origin字段用来说明本次请求来自哪个源。服务器根据这个值，决定是否同意这次请求。对于如果 Origin指定的源，不在许可范围内，服务器会返回一个正常的HTTP回应。浏览器发现，这个回应的头信息没有包含 Access-Control-Allow-Origin 字段，就知道出错了，从而抛出一个错误，ajax 不会收到响应信息。如果成功的话会包含一些以 Access-Control- 开头的字段。
非简单请求，浏览器会先发出一次预检请求，来判断该域名是否在服务器的白名单中，如果收到肯定回复后才会发起请求。
//方案三
服务器代理
//方案四
使用 websocket 协议，这个协议没有同源限制。
```

## 内存泄漏

:::caution 产生原因
1. 使用未声明的变量意外创建了全局变量
2. 不合理的使用闭包
3. setInterval没有被清除，如果循环函数有对外部变量的引用的话那么变量会一直在内存中无法被回收
4. 定时器的第一个参数使用字符串而非函数
5. 获取一个dom元素的引用而后面这个元素被删除，由于我们一直保留了对这个元素的引用所以他也无法被回收
:::

## 事件循环

事件循环是让js做到既是单线程，又绝对不会阻塞的核心机制，也是js并发模型的基础，用来协调各种事件，用户交互，脚本执行，ui渲染，网络请求的一种机制。

### 事件循环过程

1. js主线程按顺序解析代码，遇到函数调用，入栈，若是同步函数调用，直接执行得到结果，然后将其弹出栈
如果是异步函数调用分发给辅助线程，异步函数弹出栈
异步函数在辅助线程中处理完成后，如果该异步函数是宏任务则入宏任务消息队列，如果是微任务，则入微任务消息队列
2. 执行检查，如果主线程调用栈为空时，就把微任务消息队列中的第一个任务推入栈开始执行，直到微任务消息队列为空，然后去宏任务消息队列中取第一个宏任务推入栈执行，当该宏任务执行完成后，下一个宏任务执行前，再依次取出微任务消息队列中的所有微任务入栈执行。

:::tip 执行顺序
Call Stack清空-->执行当前的微任务-->尝试DOM渲染-->触发Event Loop
:::

### 宏任务

1. script 
2. setTimeout 
3. setInterval 
4. I/O 
5. UI交互 
6. postMessage 
7. MessageChannel 
8. SetImmediate(node环境)

### 微任务

1. Promise.then 
2. object.observe 
3. MutationObserver 
4. process.nextTick(node环境)

## JS加载顺序

- script： 
浏览器在解析html的时候，如果遇到一个没有任何属性的script标签就会暂停解析，先发送网络请求获取js脚本的代码内容，然后让js引擎执行该代码，该代码执行完毕后恢复解析
- async script： 
async表示异步，当浏览器遇到async script时，请求该脚本的网络请求是异步的，不会阻塞浏览器解析html，而一旦网络请求回来之后，如果此时的html没有解析完，那么浏览器会暂停解析，先让js引擎执行代码，执行完毕后再进行解析。由于不知道html是否解析完毕，所以async是不可控的，执行时间不确定（如果在异步js脚本中获取某个dom元素，有可能获取不到，如果存在多个async的话，他们之间的执行顺序也不确定，完全依赖于网络传输结果，谁先到先执行谁。）
- defer script： 
defer表示延迟，当浏览器遇到defer script时，获取该脚本的网络请求也是异步的，不会阻塞浏览器解析html，当网络请求回来之后，若此时html没有解析完，那么浏览器会等待html解析完毕再执行js代码。（如果存在多个defer script标签，浏览器会保证他们按照在html中出现的顺序执行，不会破坏js脚本之间的依赖关系）

:::tip 推荐方法
1. 将js放在文档底部，使js脚本尽可能在最后来加载执行
2. 动态创建DOM标签，对文档的加载事件进行监听，当文档加载完成后再动态的创建script标签来引入js脚本
:::

## 浏览器存储

- localStorage

> 5M，不手动删除永远存在，值类型为string

```js
localStorage.xxx="xxx"
localStorage.setItem('hobby','sleep')
localStorage.getItem('hobby')
```

- sessionStorage

> 5M，当前会话窗口内关闭即过期

- cookie

> 4KB，cookie在生成时会被指定一个Expire值，在这个生存周期内cookie有效，超出周期则清除，若生命周期设置为0，或如果Cookie不设定失效时间，就表示它的生命周期就为浏览器会话的期间，只要关闭浏览器，Cookie 就会自动消失。 这种 Cookie 被称为会话Cookie，一般不保存在硬盘上，而是保存在内存中。

```js
//cookie是服务器提供的一种用于维护会话状态信息的数据，通过服务器发送到浏览器，浏览器保存在本地，当下一次有同源的请求时，将保存的cookie值添加到请求头部，发送给服务端。服务端可以通过set-cookie的响应头部来配置cookie信息。跨域请求不会携带cookie除非进行其他设置。
document.cookie = name + "=" + escape(val) + ";expires=" + oDate;
```

:::caution cookie和token的区别 
Cookie 由于存储的内存空间只有 4kb，因此存储的主要是一个用户 id，其他的用户信息都存储在服务器的 Session 中，而 Token 没有内存限制，用户信息可以存储 Token 中，返回给用户自行存储，因此可以看出，采用 Cookie 的话，由于所有用户都需要在服务器的 Session 中存储相对应的用户信息，所以如果用户量非常大，这对于服务器来说，将是非常大的性能压力，而Token 将用户信息返回给客户端各自存储，也就完全避开这个问题了。
:::

:::caution 三种常见存储的同异
- 同：都是保存在浏览器端，且同源的。 
- 异： 
1. cookie数据始终在同源的http请求中携带（即使不需要），即cookie在浏览器和服务器间来回传递。而sessionStorage和localStorage不会⾃动把数据发给服务器，仅在本地保存。 cookie数据还有路径（path）的概念，可以限制cookie只属于某个路径下。 
2. 存储⼤⼩限制也不同，cookie数据不能超过4k，同时因为每次http请求都会携带cookie，所以cookie只适合保存很⼩的数据，如会话标识。sessionStorage和localStorage虽然也有存储⼤⼩的限制，但⽐cookie⼤得多，可以达到5M或更⼤。 
3. ⽣命周期不同 
4. 作⽤域不同， sessionStorage不在不同的浏览器窗⼝中共享，即使是同⼀个⻚⾯；localStorage在所有同源窗口中都是共享的；
:::

- indexDB

- Service Worker

> 可以作为离线存储，充当 Web端程序和浏览器之间代理服务器，也可以在网络可用时作为浏览器和网络间的代理。它们的作用是创建有效的离线体验，拦截网络请求并基于网络是否可用以及更新的资源是否驻留在服务器上来采取适当的动作，同时，还运行推送通知和后台同步 API。一般用于缓存文件，从而提高首屏时间。

- Token

> 用户身份的验证方式，令牌，组成:uid(用户唯一的身份标识)、time(当前时间的时间戳)、sign(签名，由 token 的前几位 + 加密算法压缩成一定长的十六进制字符串，可以防止恶意第三方拼接token请求服务器)。还可以把不变的参数也放进token，避免多次查库。只要涉及到登陆等用户身份验证的场景，都会用到token。

:::tip token运用例子
A：当用户首次登录成功（注册也是一种可以适用的场景）之后, 服务器端就会生成一个 token 值，这个值，会在服务器保存token值(保存在数据库中)，再将这个token值返回给客户端

B：客户端拿到 token 值之后,进行本地保存。（SP存储是大家能够比较支持和易于理解操作的存储）

C：当客户端再次发送网络请求(一般不是登录请求)的时候,就会将这个 token 值附带到参数中发送给服务器

D：服务器接收到客户端的请求之后,会取出token值与保存在本地(数据库)中的token值做对比

对比一：如果两个 token 值相同， 说明用户登录成功过!当前用户处于登录状态

对比二：如果没有这个 token 值, 则说明没有登录成功

对比三：如果 token 值不同: 说明原来的登录信息已经失效,让用户重新登录
:::

## 缓存

> 浏览器对之前请求过的文件进行缓存，以便下一次访问时重复使用，节省带宽。通常浏览器缓存策略分为两种：强缓存和协商缓存，并且缓存策略都是通过设置 HTTP Header 来实现的，http缓存机制主要在http响应头中设定，Expires,Cache-Control,Last-Modified,Etag。

## 缓存位置

从缓存位置上来说分为四种，并且各有优先级，当依次查找缓存且都没有命中的时候，才会去请求网络

- Memory Cache: 
内存中的缓存，容量小于磁盘，读取速度大于磁盘，但是持续性很短，会随着进程的释放而释放，一旦关闭页面，内存中的缓存也就被释放了

- Disk Cache： 
硬盘中的缓存，读取速度相对来说慢一些，容量大，会根据http header中的字段判断哪些资源需要缓存，哪些资源可以不请求直接使用，哪些资源已经过期需要重新请求，即便是跨站点的情况下，相同地址的资源一旦被硬盘缓存下来，就不会再去请求数据。

- Service Worker： 
运行在浏览器背后的独立线程，一般可以用来实现缓存功能，传输协议必须为 HTTPS。他的缓存机制与其他浏览器内建的缓存机制不同，他可以让我们自由控制缓存哪些文件，如何匹配缓存，而且缓存是持续性的，当没有命中缓存时，需要调用fetch函数获取数据。

> 也就是说，如果没有在Service Worker命中缓存的话，会根据缓存查找优先级去查找数据，但是不管我们是从memory cache中还是在网络请求中获取的数据，浏览器都会显示我们是从service worker中获取的内容。

- Push Cache： 
推送缓存，当三种缓存都没有命中时他才会被使用，是HTTP/2中的内容，它只在会话（Session）中存在，一旦会话结束就被释放，并且缓存时间也很短暂

根据是否需要向服务器重新发起HTTP请求将缓存过程分为两个部分，分别是强缓存和协商缓存。

### 强缓存

浏览器不会向服务器发送任何请求，直接从本地缓存中读取文件并返回200

**头部参数：**

- Expires: 
Wed, 22 Oct 2018 08:41:00 GMT Expires 是 HTTP/1 的产物，表示资源会在 Wed, 22 Oct 2018 08:41:00 GMT后过期，需要再次请求。

:::caution 注意
Expires受限于本地时间，如果修改了本地时间，可能会造成缓存失效。
:::

- （优先级高）Cache-Control:max-age=300代表请求正确返回的五分钟（300s）内再次加载资源则会命中缓存. 
  - 其他参数中no-store优先级最高 
  - public：表明其他用户也可以利用缓存。 
  - private：表明缓存服务器只对特定用户提供资源缓存的服务，对于其他的用户，缓存服务器不会做出响应。 
  - no-cache：表明不缓存过期资源，其实是为了防止拿到过期的资源。 
  - no-store：暗示请求或响应中包含机密信息，是真正的禁用缓存。 
  - max-age：max-age = 秒，HTTP 1.1版本，资源在本地缓存多少秒。

### 协商缓存

向服务器发送请求，服务器会根据这个请求的请求头参数来判断是否命中协商缓存，命中则返回304状态码并带上新的响应头通知浏览器从缓存中读取资源，并更新浏览器缓存有效期 

**头部参数：**

- （优先级高，更精确）Etag/If-None-Match: 
Etag由服务器产生返回给浏览器，浏览器接收到后再次向服务器请求时带上If-None-Match:（Etag值），服务器收到后进行比对，决定返回200或304
- Last-Modified/If-Modified-Since: 
当资源过期时（cache-control的max-age过期），浏览器接收响应头中的Last-Modified（本地文件最后的修改日期），再次向服务器请求时带上If-Modified-Since，If-Modified-Since会将Last-Modified的值发送给服务器，服务器收到请求后则与被请求资源的最后修改时间对比，若资源被改过，则返回最新资源，200ok，反之则资源无修改，返回缓存，304
:::caution
但是Last-Modified存在一些弊端，如果本地打开缓存⽂件，即使没有对⽂件进⾏修改，但还是会造成 Last-Modified被修改，服务端不能命中缓存导致发送相同的资源因为Last-Modified只能以秒计时，如果在不可感知的时间内修改完成⽂件，那么服务端会认为资源还是命中了，不会返回正确的资源
:::

### 请求网页使用缓存过程

```md
1.浏览器请求网页
2.有缓存
 已过期:
  2.1若有Etag：
    向web服务器请求带If-None-Match，服务器决策200（请求+缓存）或者304（从缓存获取）
  2.2若有Last-Modified:
    向web服务器请求带If-Modified-Since,服务器决策200（请求+缓存）或者304（从缓存获取）
  2.3若以上两者都没有，则直接向web服务器（请求+缓存）
 未过期：
  从缓存读取
```
```md title="实际场景应用缓存策略"
1. 浏览器首先会根据请求的信息判断，强缓存是否命中，如果命中则直接使用资源。如果不命中则根据头信息向服务器发起请求，使用协商缓存，如果协商缓存命中的话，则服务器不返回资源，浏览器直接使用本地资源的副本，如果协商缓存不命中，则浏览器返回最新的资源给浏览器。
2. 对于频繁变动的资源，首先需要使用Cache-Control：no-cache使浏览器每次都请求服务器，然后配合Etag或者Last-Modified来验证资源是否有效，这样的做法虽然不能节省请求数量，但是能显著减少响应数据大小。代码⽂件这⾥特指除了HTML外的代码⽂件，因为HTML文件⼀般不缓存或者缓存时间很短。
3. ⼀般来说，现在都会使⽤⼯具来打包代码，那么我们就可以对⽂件名进⾏哈希处理，只有当代码修改后才会⽣成新的⽂件名。基于此，我们就可以给代码⽂件设置缓存有效期⼀年Cache Control:max-age=31536000，这样只有当HTML⽂件中引⼊的⽂件名发⽣了改变才会去下载最新的代码⽂件，否则就⼀直使⽤缓存
```
:::caution ajax解决浏览器缓存问题
只要我们没有刷新页面，这些数据就会一直被缓存在内存中，当我们提交 的URL与历史的URL一致时，就不需要提交给服务器，也就是不需要从服务器上面去获取数据，虽然这样降低了服务器的负载提高了用户的体验，但是我们不能获取最新的数据。为了保证我们读取的信息都是最新的，我们就需要禁止他的缓存功能。
```md
1.在 ajax 发送请求前加上 anyAjaxObj.setRequestHeader("If-Modified-Since","0")。

2.在 ajax 发送请求前加上 anyAjaxObj.setRequestHeader("Cache-Control","no-cache")。

3.在 URL 后面加上一个随机数： "fresh=" + Math.random();。

4.在 URL 后面加上时间戳："nowtime=" + new Date().getTime();。

5.如果是使用 jQuery，直接这样就可以了$.ajaxSetup({cache:false})。这样页面的所有ajax都会执行这条语句就是不需要保存缓存记录。
```
:::

## 网页跳转

1. 在地址栏输入url
2. 浏览器查看缓存，若已缓存则判断是否新鲜（Expires和Cache-Control），新鲜则直接提供给客户端，否则就与服务器进行验证
3. 浏览器解析URL获取协议，主机端口，路径，并组装一个HTTP（get）报文
4. 浏览器获取主机ip地址（浏览器/本机/路由器/DNS缓存/DNS查询）
5. 打开一个socket与目标ip地址端口建立tcp链接，三次握手
6. tcp链接建立后发送HTTP请求
7. 服务器接收请求解析，若检查发现HTTP请求头包含缓存验证信息而且缓存新鲜则返回304等对应状态码
8. 服务器将响应报文通过tcp链接发送回浏览器，浏览器接收后四次挥手关闭tcp链接
9. 浏览器检验状态码，检验是否可缓存，然后对响应进行解码
10. 解析html文档，构建dom树，下载资源，构建cssom树，构建渲染树，执行js脚本
11. 显示页面

## 渲染

### 浏览器渲染原理

dom+cssom=渲染树

**为什么渲染dom慢？**

因为dom是渲染引擎中的东西，js是js引擎中的东西，当我们通过js操作dom的时候，这个操作涉及到了两个线程之间的通信，那么势必会带来性能上的损耗，而且操作dom还可能会造成重绘回流的操作。

:::tip 频繁重绘回流的节点解决办法
⼀般来说，可以把普通⽂档流看成⼀个图层。特定的属性可以⽣成⼀个新的图层。不同的图层渲染互不影响，所以对于某些频繁需要渲染的建议单独⽣成⼀个新图层，提高性能。但也不能⽣成过多的图层，会引起反作⽤。
- will-change
- video 、 iframe 标签
- 3D 变换： translate3d 、 translateZ
- 通过动画实现的 opacity 动画转换
- position: fixed
:::

- 浏览器刷新的一帧中可能做的事情

1. 事件循环中执行完微任务后，会判断document是否需要刷新（浏览器是60hz的刷新率，每16.6ms会更新一次）
2. 然后会判断是否有resize或者scroll事件，有的话会去触发事件，所以resize和scroll事件至少16ms才会触发一次，并且自带节流功能
3. 然后判断是否触发了媒体查询，更新动画，判断是否有全屏操作事件
4. 然后执行requestAnimationFrame回调，执行intersectionObserver回调
5. 然后更新页面
6. 如果在一帧中有空闲时间，就会去执行requestldleCallback回调
   
:::tip requestanimationframe
浏览器内部元素如果有动画的存在,浏览器是需要刷新的。
每刷新一次就叫做一帧，如果能有一个时机,在每次刷新下一帧之前,就把动画元素的变化执行完毕.而不是不管时机胡乱的执行,那么动画效果肯定会更流畅,于是requestAnimationFrame函数就应运而生了.
:::

## IFC

> 行级格式化上下文，盒子高度由其包含行内元素中最高的实际高度计算而来，不受到竖直方向的padding/margin影响

IFC中的line box一般左右都贴紧整个IFC，但是会因为float元素而扰乱，float元素会位于IFC与linebox之间，使得line box宽度缩短，同个ifc下的多个line box高度会不同，ifc中是不可能有块级元素的，当插入块级元素时会产生两个匿名块与div分开，即产生两个IFC，每个IFC对外表现为块级元素，与div垂直排列

**用法：**
1. 水平居中：设置其为inline-block会在外层产生IFC，通过text-align则可以使其水平居中 
2. 垂直居中：创建一个IFC，用其中一个元素撑开父元素的高度，然后设置其vertical-align：middle，其他行内元素则可以在此父元素下垂直居中

## BFC

块级格式化上下文

### 触发条件

html,float不为none,绝对或固定定位，display为inline-block,table-cell,table-caption,flex,inline-flex,overflow:hidden

## 盒模型

- 标准盒模型content-box:元素的宽度=content 
- 怪异盒模型border-box:元素的宽度=2*border+2*padding+content

