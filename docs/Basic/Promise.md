---
sidebar_position: 7
---

# Promise

异步编程解决方案

- promise是一个构造函数，自己身上有all、reject、resolve这几个方法，原型上有then、catch等方法。

## 三种状态
- pending
- fulfilled
- rejected

> 只有异步操作的结果可以决定当前是哪一种状态，其他任何操作都无法改变这个状态,创造promise实例后，它会立即执行。

:::tip advantage
支持链式调用（传入then的函数必须有返回值），解决回调地狱，指定回调函数的方式更加灵活
:::
:::danger
创建即执行，无法取消，若不设置回调，内部的错误不会反映到外部
:::

```js title="一般回调"
function sleep(time, callback) {
    setTimeout(function () {
        callback();
    }, time);
}
sleep(5000, function () {
    console.log('我会在5秒后打印');
});

```

```js title="promise模式"
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
sleep(5000).then(() => console.log('我会在5秒后打印'));

```

```js title="链式操作"
let p = new Promise((resolve, reject) => {});
    p.then((data) => {
        console.log(data);
    })
    .then((data) => {
        console.log(data);
    })
    .then((data) => {
        console.log(data);
    });
```

```js title="reject"
 p.then((data) => {
        console.log(num);
    }, (err) => {
        console.log('rejected', err);
    });
```

```js title="catch"
//和reject区别：在执行resolve的回调（也就是上面then中的第一个参数）时，如果抛出异常了（代码出错了），那么并不会报错卡死，而是会进到这个catch方法中。
    p.then((data) => {
        console.log(data);
    }).catch((err) => {
        console.log('rejected', err);
    });
```

## Promise.all

`Promise.all（一个可迭代对象，如Array。）`

all接收一个数组参数，里面的值最终都算返回Promise对象，Promise的all方法提供了并行执行异步操作的能力，并且在所有异步操作执行完后才执行回调

```js title="all"
  let Promise1 = new Promise((resolve, reject) => {});
    let Promise2 = new Promise((resolve, reject) => {});
    let Promise3 = new Promise((resolve, reject) => {});
    let p = Promise.all([Promise1, Promise2, Promise3]);

    p.then(() => {
        //三个都成功，则成功  
    }, () => {
        //只要有失败，则失败
    });
```
:::caution
1. 如果传递的iterable为空，则是已经解决的Promise。
2. 异步解析的Promise（如果传递的Iterable不包含Promise）。 请注意，在这种情况下，Google Chrome 58返回已解决的承诺。
3. 当所有结果成功返回时按照请求顺序返回成功,当其中有一个失败方法时，则进入失败方法
```js
//当给定可迭代对象中的所有promise 已解决
let promise1 = new Promise((resolve,reject)=>{
    resolve(1)
})
let promise2 = new Promise((resolve,reject)=>{
    resolve(2)
})

Promise.all([promise1,promise2,3]).then(res=>{
    console.log(res)//[1,2,3]
})

//当给定可迭代对象中的任何promise被拒绝时
let promise1 = new Promise((resolve,reject)=>{
    resolve(1)
})
let promise2 = new Promise((resolve,reject)=>{
    reject(2)
})

Promise.all([promise1,promise2,3]).then(res=>{
    console.log(res)
}).catch(err=>{
    console.log(err)//2
})
```
:::

### 应用场景

1. 所有的请求都返回数据后再一起处理渲染

```js
//1.获取轮播数据列表
function getBannerList(){
    return new Promise((resolve,reject)=>{
        setTimeout(function(){
            resolve('轮播数据')
        },300)
    })
}

//2.获取店铺列表
function getStoreList(){
   return new Promise((resolve,reject)=>{
        setTimeout(function(){
            resolve('店铺数据')
        },500)
    })
}

//3.获取分类列表
function getCategoryList(){
   return new Promise((resolve,reject)=>{
        setTimeout(function(){
            resolve('分类数据')
        },700)
    })
}


function initLoad(){
    // loading.show() //加载loading
    Promise.all([getBannerList(),getStoreList(),getCategoryList()]).then(res=>{
        console.log(res)
        // loading.hide() //关闭loading
    }).catch(err=>{
        console.log(err)
        // loading.hide()//关闭loading
    })
}
//数据初始化    
initLoad()
```
2. 合并请求结果并处理错误

```js
//1.获取轮播图数据列表
function getBannerList(){
    return new Promise((resolve,reject)=>{
        setTimeout(function(){
            // resolve('轮播图数据')
            reject('获取轮播图数据失败啦')
        },300)
    })
}

//2.获取店铺列表
function getStoreList(){
   return new Promise((resolve,reject)=>{
        setTimeout(function(){
            resolve('店铺数据')
        },500)
    })
}

//3.获取分类列表
function getCategoryList(){
    return new Promise((resolve,reject)=>{
        setTimeout(function(){
            resolve('分类数据')
        },700)
    })
}

function initLoad(){
    // loading.show()
    Promise.all([
        getBannerList().catch(err=>err),
        getStoreList().catch(err=>err),
        getCategoryList().catch(err=>err)
    ]).then(res=>{
        console.log(res) // ["获取轮播图数据失败啦", "店铺数据", "分类数据"]
        
        if(res[0] == '轮播图数据'){
            //渲染
        }else{
            //获取 轮播图数据 失败的逻辑
        }
        if(res[1] == '店铺数据'){
            //渲染
        }else{
            //获取 店铺列表数据 失败的逻辑
        }
        if(res[2] == '分类数据'){
            //渲染
        }else{
             //获取 分类列表数据 失败的逻辑
        }
        
        // loading.hide()
    })
}

initLoad()

```

3. 验证多个请求结果是否都是满足条件

表单有多7个字段需要验证，都是调用的一个 内容安全校验接口，全部验证通过则 可以 进行正常的提交

```js
function verify1(content){
    return new Promise((resolve,reject)=>{
        setTimeout(function(){
            resolve(true)
        },200)
    })
}

function verify2(content){
    return new Promise((resolve,reject)=>{
        setTimeout(function(){
            resolve(true)
        },700)
    })
}

function verify3(content){
    return new Promise((resolve,reject)=>{
        setTimeout(function(){
            resolve(true)
        },300)
    })
}



Promise.all([verify1('校验字段1的内容'),verify2('校验字段2的内容'),verify3('校验字段3的内容')]).then(result=>{
    console.log(result)//[true, true, true]

    let verifyResult = result.every(item=>item)
    //验证结果
    console.log(verifyResult?'通过验证':'未通过验证')// 通过验证
}).catch(err=>{
    console.log(err)
})
```

## Promise.race

`Promise.race（iterable）`

 Promise.race(iterable) 方法返回一个 promise，一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝

 如果传的迭代是空的，则返回的 promise 将永远等待。

```js title="race"
    Promise.race([Promise1, Promise2]).then((data) => {
        console.log(data);
    }).catch((err) => {
        console.log(err);
    });
```

### 应用场景

1. 图片请求超时

```js
//请求某个图片资源
function requestImg(){
    var p = new Promise(function(resolve, reject){
        var img = new Image();
        img.onload = function(){
           resolve(img);
        }
        //img.src = "https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-assets/v3/static/img/logo.a7995ad.svg~tplv-t2oaga2asx-image.image"; 正确的
        img.src = "https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-assets/v3/static/img/logo.a7995ad.svg1~tplv-t2oaga2asx-image.image";
    });
    return p;
}

//延时函数，用于给请求计时
function timeout(){
    var p = new Promise(function(resolve, reject){
        setTimeout(function(){
            reject('图片请求超时');
        }, 5000);
    });
    return p;
}

Promise
.race([requestImg(), timeout()])
.then(function(results){
    console.log(results);
})
.catch(function(reason){
    console.log(reason);
});
```

2. 请求超时提示

"网络不佳"

```js
//请求
function request(){
    return new Promise(function(resolve, reject){
       setTimeout(()=>{
            resolve('请求成功')
       },4000)
    })
}

//请求超时提醒
function timeout(){
    var p = new Promise(function(resolve, reject){
        setTimeout(function(){
            reject('网络不佳');
        }, 3000);
    });
    return p;
}

Promise.race([
    request(),
    timeout()
])
.then(res=>{
    console.log(res)
}).catch(err=>{
    console.log(err)//网络不佳
})

```

## Promise.prototype.then

### 应用场景

1. 请求依赖

```js
function A(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('B依赖的数据')
        },300)
    })
}
function B(prams){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(prams + 'C依赖的数据')
        },500)
    })
}
function C(prams){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(prams)
        },1000)
    })
}

//我们期望的是走 try ，由于A B C模拟的请求中都是没有reject，用 try catch 捕获错误
try{
    A().then( res=>B(res) ).then( res=>C(res) ).then( res=>{
        console.log(res)//B依赖的数据C依赖的数据
    })   
} catch(e){
    
}
```

2. 中间件功能使用

```js
//模拟后端返回的数据

let result = {
    bannerList:[
        {img:'轮播图地址'}
    //...
    ],
    storeList:[
        {name:'店铺列表'}
    //...
    ],
    categoryList:[
        {name:'分类列表'}
    //...
    ],
    //...
}

function getInfo(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(result)
        },500)
    })
}

getInfo().then(res=>{

    let { bannerList } = res
    //渲染轮播图
    console.log(bannerList)
    return res
}).then(res=>{
    
    let { storeList } = res
    //渲染店铺列表
    console.log(storeList)
    return res
}).then(res=>{
    let { categoryList } = res
    console.log(categoryList)
    //渲染分类列表
    
    return res
})
```