---
sidebar_position: 2
---

# Set

ES6提供，允许你存储任何类型的唯一值，无论是原始值或者是对象引用。

- 对象

- 值的集合，可以按插入的顺序迭代他的元素

- 传入一个数组或者具有iterable接口的其他数据结构

```js
const set = new Set([1,2])
const set = new Set('aaa')
```

- 实例属性和方法

1. 添加

```js
const s = new Set()
// add 方法返回Set实例本身，所以可以执行链式操作
const ret = s.add(1).add('one').add({1:'one'})
```

2. 删除

```js
const s = new Set([1,2,3,4,5])
// delete 方法返回被删除元素是否删除成功
const flag = s.delete(1) // true
const flag = s.delete('2') // false
```

3. 查找

```js
const s = new Set([1,2,4,5,6,7])
const flag = s.has(2)
```

4. 清空

```js
const s = new Set([12,324,1])
//clear 方法没有返回值，返回undefined
s.clear()
```

5. 两个实例属性

```js
const s = new Set()
// 实例还有两个属性
s.size //返回当前集合中元素个数
s.constructor // 返回实例构造器，也就是Set
```

6. 遍历

```js
const s = new Set(['javascript','html','css'])

for(let key of s.keys()){
    console.log(key)
}
//javascript
//html
//css
//遍历顺序就是插入顺序，利用这个特性可以储存一些需要按顺序调用的函数

const s = new Set(['javascript','html','css'])

for(let value of s.values()){
    console.log(value)
}
//Set不存在键名，只有键值，也可以认为键名和键值是同一个，所以keys和values返回的值是一样的

const s = new Set(['javascript','html','css'])

for(let entry of s.entries()){
    console.log(entry)
}
//['javascript', 'javascript']
//['html', 'html']
//['css', 'css']
//遍历的每一对都是一个包括键名和键值的数组

const s = new Set(['javascript','html','css'])
s.forEach(function(value,key,s) {
    // 回调函数接受三个参数，键值，键名，set本身
    console.log(`键值：${value}；键名${key}；集合大小${s.size}；${this.thisName}`)
},{thisName:'改变回调函数this'})
// forEach函数还接受第二个参数，可以绑定处理函数的this

//Set实例默认是可以迭代的，因为它的遍历器生成函数其实调用的就是values方法，这意味着我们可以直接省略values()方法直接遍历
const s = new Set(['javascript','html','css'])

for(let value of s){
    console.log(value)
}
```

7. 去重

```js title="去重"
	let arr = [1, 2, {name:'a'}, {name:'b'}, {name:'a'}, 2]   //有重复值的数组
    let set = new Set(arr)       							  //set重构去重
    let newarr = Array.from(set)  							  //转化数组
    console.log(newarr)           //[1, 2, {name:'a'}, {name:'b'}, {name:'a'}]
```

:::caution Set去重原理
Set集合去重主要是调用 add 方法时，使用了 hashCode 方法和 equals 方法：如果在 Set集合 中找不到与该元素 hashCode 值相同的元素，则说明该元素是新元素，会被添加到 Set 集合中；如果两个元素的 hashCode 值相同，并且使用 equals 方法比较后，返回值为 true，那么就说明两个元素相同，新元素不会被添加到 Set 集合中；如果 hashCode 值相同，但是 equals 方法比较后，返回值为 false ，则两个元素不相同，新元素会被添加到 Set 集合中。
:::