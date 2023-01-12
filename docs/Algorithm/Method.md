---
sidebar_position: 1
---

# 基本处理

解决思路

## 数学类

### 质数

除了1和本身以外没有其他因数

:::tip
通过开平方限制因数最大值，从2开始到最大值循环判断是否可以整除

```js
Math.sqrt()
```
:::

### 回文

判断回文正整数

:::tip
判断边缘部分0，小于等于0或以0结尾（%10===0）为false，存储当前值x，初始化进位值，当大于等于10时进入循环，进位值为本身*10加上当前值末位，再更新当前值为切除末位值`Math.floor(rest/10)`，最外层最后一次拼装，进位值*10加上当前末位值，返回和初始值x比较
:::

非空字符串最多删除一个字符后能否成为回文字符串

双指针法

:::tip
找到第一个不同的，然后正常判断。记录字符串初始和末尾位置，当初始小于末尾且两者值相等时进入while循环，不断++--使初始和末尾指针靠近，跳出循环后，判断当前初始位和末尾位-1是否符合回文，当做参数传入drome函数，若为true则return true，初始位+1和末尾位同理，外层默认返回false，drome函数中当参数初始位小于末尾位时直接进入while，若值不相等则是false，继续++--，默认返回true
:::

判断回文字符串

:::tip
判断边缘，若长度为1则为true，先做替换+转换`s.replace(/[^a-zA-Z0-9]/g,'').toLowerCase()`，再常规split+reverse+join，最终判断相等
:::

### 完美数

对于一个正整数，如果他和除了自身以外的所有正因子之和相等，我们称它为完美数，判断

:::tip
判断边缘值，为1则false，设定初始值为1，进入循环从2到原数开平方或`for(let d=2;d*d<=num;++d)`，如果原数能整除d则将初始值加d，若d平方小于原数，则还要加上原数除以d的mathfloor，最终判断原数是否等于相加的和
:::

### 子序列

子序列为保持相对顺序不变，在原字符中删除某些得到的序列

判断s是否为t的子序列

:::tip
设置变量记录两个字符串长度，判断边缘为slen必然比tlen小，且若s为空则必然为子序列，设定初始步长为0，遍历s，当步长小于tlen时进入while循环，若当前步长索引位置的t值为s此处的值则步长+1，内部再次判断若当前遍历s的索引位置为slen-1，则直接return true，在外层判断里break，最后在while层里将步长+1，最外层返回false
:::

### 子串

任意个**连续**的字符组成的子序列称为该串的子串。

判断字符串是否能通过子串重复构成

:::tip
旋转拼接，进入循环从1位置到总长度一半的位置，创建变量为`var str1 = str.slice(i) + str.slice(0, i)`，若变量等于原字符串则返回true，最外层返回false
:::

:::caution 
function fn(s) {
          return (s + s).slice(1, -1).indexOf(s) >= 0
        }
:::

### 多数元素

给定一个大小为 n 的数组 nums ，返回其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。

:::tip
判断边缘，若长度为1则返回唯一元素，创建Map，遍历数组，若map中没有此元素则set该元素为键，值为1，若有此元素则将此键值+1，在此判断此键值是否大于数组长度的一半，若大于则return此元素
:::

## 原生api

基本都会有相匹配的手写方法

### 数据类型

:::tip
```js
Object.prototype.toString.call(obj).replace(/\[object\s|\]/g,'')
```
:::

:::caution 补充
先判断特殊情况是否为null，然后根据typeof区分引用类型和基本类型，基本类型直接返回typeof结果，引用类型继续判断区分数组和对象
:::

### 判断对象

:::tip
1. 利用 JSON 的 JSON.stringify() 方法。将空对象转化为字符串 '{}' 来进行判断。
2. getOwnPropertyNames 方法，获取所有属性名，这样就算是不可枚举属性依然能够获取到
3. 互补`return Object.keys(obj).length===0&&Object.getOwnPropertySymbols(obj).length===0)`
:::

## 数据结构

### 二叉树

树中每个节点最多只能有两个子节点的树

```js
class Node{
    constructor(data, left, right){
        this.data = data;
        this.left = left;
        this.right = right;
    }
}
```

#### 判断二叉树是否相同

:::tip
递归，两个根节点为参数，先判断边缘值null，再判断节点值，不相等则false，相等为true，最终return以各自的左节点和右节点比较的函数相&&`isSameTree(p.left,q.left)&&isSameTree(p.right,p.right);`
:::

#### 判断对称二叉树

:::tip
递归，先判断边缘根节点是否为null，return新compare函数传入当前根左右节点为参数，compare函数内判断：节点同时为null为true，不同时为null为false，节点值不相等为false，最终return ` compare(node1.left,node2.right)&&compare(node1.right,node2.left)`
:::

#### 二叉树最大深度

:::tip
递归，边缘判断当前节点是否存在，不存在则返回0（基数），返回`Math.max(maxDepth(root.left), maxDepth(root.right)) + 1`
:::

#### 二叉树广度优先遍历

:::tip
判断当前节点，若不存在则返回null，创建新队列，或用栈模拟，将根节点push进栈，进入while循环判断当前队列长度是否为0，将队首出队shift，若队首有左树则push队首的left，右侧同理
:::

#### 判断平衡二叉树

二叉树里面的左右子树相差不能超过1

:::tip
- 递归
- 判断最大深度：先判断边缘，当前节点值是否为null，设置左右变量为0.若当前节点左子树存在则左变量等于本函数传入当前节点左子树，右侧同理，最终返回left和right最大值+1（1为根）。
- 判断平衡：先判断边缘，若当前节点不存在或为空则返回true，设置左右变量，同上，得到左右深度值后若当前左右变量差绝对值（Math.abs）<=1，则返回` balanceTree(doubleTree.left)&&balanceTree(doubleTree.right)`若绝对值差大于1则直接返回false
:::

#### 判断二叉树路径固定总和路径是否存在

判断二叉树root中是否存在根节点到叶子结点的路径，这条路径上所有节点值相加等于sum

:::tip
先传入根节点和sum值，判断边缘当前节点为null则返回false，当前节点左右同时为null，则返回sum-当前节点值===0，最外层返回本函数传入当前左树和sum-当前节点值||右同理
:::


### 链表

- 元素：数据+到下一节点的指针

```js 
class Node {
  constructor(el) {
    this.el = el;
    this.next = null;
  }
}
```

- 分类：单链表、双链表、单向循环链表，双向循环链表

#### 判断链表入环节点

:::tip
创建空set集合，传入头结点开始遍历，has判断节点是否在集合中，在则直接返回当前节点，不在则add进集合中，head=head.next,外层返回null兜底
:::

#### 判断链表是否有环

:::tip
直接遍历head，设置flag值，若碰到flag值为true的则返回true，否则false
:::

#### 判断回文链表

:::tip
设置两个空数组，遍历头结点，将链表同步存入两个数组，再将数组reverse，遍历判断元素是否相等，不相等直接返回false
:::

#### 判断链表是否相交

并返回相交的起始节点

:::tip
遍历第一个头结点，设置flag为true，遍历第二个节点，若有flag为true的则返回当前节点，最外层return null
:::

## 排序

### 冒泡排序

冒泡排序的平均时间复杂度为 O(n²) ，最坏时间复杂度为 O(n²) ，空间复杂度为 O(1) ，是稳定排序。

每趟把当前最大值移到最后

:::tip 优化
判断边缘是否为数组，长度是否大于1，存储数组长度-1值last（最后交换元素位置），当last大于0进入循环，设置flag值true，再次存储last值为len，for遍历0到len进入循环，判断数组当前元素和后一个元素（条件小于len，空出后一个元素位置），若前大于后则flag为false，更新last值为当前index，交换元素，循环结束判断flag，若整个过程前都小于后则为true，证明已排好序，直接break退出。
:::

:::caution 常规
```js
function bubble(arr){
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
             [arr[i],arr[j]]=[arr[j],arr[i]]
            }
        }
    }
    return arr;
}

```
:::

### 选择排序

选择排序的平均时间复杂度为 O(n²) ，最坏时间复杂度为 O(n²) ，空间复杂度为 O(1) ，不是稳定排序。

每一趟把当前最小值移到开头

:::tip
判断边缘，存储数组长度len，进入空出后一个元素遍历（0到len-1），存储当前索引index，进入下一层循环为当前索引之后i+1到最终位置len，若当前元素小于index处的值，则更新index为当前位置，结束当前循环后交换i和当前index位置的值（更新最小值）
:::

### 插入排序

插入排序的平均时间复杂度为 O(n²) ，最坏时间复杂度为 O(n²) ，空间复杂度为 O(1) ，是稳定排序。

抓扑克牌思想，利用j寻找当前元素在之前已排序数组中的合适位置，最后插入

:::tip
判断边缘，存储数组长度len，从1开始循环到最后，存储当前元素，存储当前位置j，进入while循环，当j-1>=0且j-1处的值大于当前元素时，j位置的值替换为j-1位置的值，j--，退出while循环后将j位置值替换为当前元素值
:::

### 希尔排序

希尔排序的平均时间复杂度为 O(nlogn) ，最坏时间复杂度为 O(n^s) ，空间复杂度为 O(1) ，不是稳定排序。

分组插入排序思想

:::tip
先判断边缘，是否为数组且长度大于1，以数组长度>>1（一半）作为初始值，值大于等于1时不断将值>>1,进入for循环，初始值为当前已经劈半的值，小于数组长度时i++进入下一层for，存储当前值temp，当前位置为j，进入while循环，当当前位置j减去劈半值（前一分组同一位置）>=0且以减完结果为索引位的数组值大于temp时当前数组j位置的值替换为刚刚的数组值，且j-=劈半值，while循环结束后将j位置值替换为temp
:::

## 常见问题

### 扑克牌顺子

判断5张顺子

:::tip 
- 先判断边缘情况，***change**转换数组值，然后sort排序调整，***zero**判断是否有除0（王）以外的重复值，有则不是顺子，没有则arr.filter筛选出0的数量len，根据0的数量判断。若为0个且len和尾差为4、为1个且len和尾差为3或4，为2个且len和尾差为2/3/4，以上情况是顺子，除此之外不是。
- change转换AJQK大小王
- zero先遍历一遍记录0的数量，再用set去重原数组赋值给新数组，将两者的长度比较看是否差0的数量-1
:::

### 找零

每一杯奶茶的售价为5美元，顾客会付5,10,20美元，一开始手头没有任何零钱，给定数组bill，bill[i]是第i位顾客付的账，判断能否找零

:::tip
零钱只有5元和10元档，设置变量存储两个初始值，遍历数组，分三大类讨论，元素为5时，零钱5变量+1，元素为10时，若无5零钱则return false，若有则零钱5变量-1，零钱10变量+1，若元素为20，则可以找一张10一张5，相应变量-1，也可以三张5，相应变量-3，或return false，最外层返回true
:::

### 矩形重叠

矩形以列表[x1,y1,x2,y2]的形式表示，分别为左下角和右上角的坐标，判断是否重叠

:::tip
传入两个数组，every遍历任意一个，重叠条件为当前矩形左下角值对应小于另一个矩形的右上角值，当前矩形右上角值大于另一个矩形左下角值，整体采用三元运算符index<2，左右上角根据index变化+-2判断，最终返回every返回值
:::


## Polyfill

### 实现call

 1. 将调用call的函数的this指向call函数的第一个参数
 2. 将call()第一个参数后的参数作为调用call函数的形参

:::tip Function.prototype.myCall=
判断边缘，typeof调用者this类型是否为function，判断是否有传入的新this指向对象，没有则指向window（||），将新对象赋予fn属性为this，剩余参数`[...arguments].slice(1)`当做context.fn()的参数，执行函数并用result保存结果，`delete context.fn`后return result
:::

### 实现apply

和call的区别就是参数处理

:::tip Function.prototype.myApply=
处理参数和执行函数时有差异于call:
```js
if (arguments[1]) {
 result = context.fn(...arguments[1])
 } else {
 result = context.fn()
 }
```
:::

### 实现bind

bind返回了一个函数，并未执行，涉及参数拼接

:::tip Function.prototype.myBind=
1. 用apply实现：参数处理为`(context,...args)`
   that存储this，return函数内`that.apply(context,args)`
:::




