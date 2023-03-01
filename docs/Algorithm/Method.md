---
sidebar_position: 1
---

# 基本处理

解决思路

## 设计模式

### 工厂模式

:::tip
1. 简单工厂模式：传入参数，生成对象后返回
2. 工厂方法模式：将实际创建对象的工作推迟到子类中，这样核心类就变成了抽象类
```js
class User{
constructor(name='',viewPage=[]){
if(new.target===User){
throw new Error('抽象类不能实例化');
}
this.name=name;
this.viewPage=viewPage;
}
}
class UserFactory extends User{
constructor(name,viewPage){
super(name,viewPage);
}
create(role){
switch(role){
case 'superAdmin':
return new UserFactory('超级管理员',['首页','通讯录','发现页'])；
break;
.......
default:
throw new Error('参数错误')
}
}
}
```
:::

### 策略模式

:::tip
```js
const calcPrice=(function(){
const sale={
'100_10':function (price){ return price-=10},
'200_25':function(price){return price-=25},
'80%':function (price){return price*=0.8}
}
function calcPrice(price,type){
if(!sale[type]) return'没有这个折扣'
return sale[type](price)
}
calcPrice.add=function(type,fn){
if(sale[type]) return '该折扣已存在'
sale[type]=fn;
return '添加成功'
}
calcPrice.del=function(type){
delete sale[type];
}
return calcPrice;
})()
```
:::

### 发布者订阅者模式

:::tip
```js
class Observer{
constructor(){
this.message={}
}
on(type,fn){
if(!this.message[type]){
this.message[type]=[];
}
this.message[type].push(fn);
}
off(type,fn){
if(!fn){
delete this.message[type]
return ;
}
if(!this.message[type]) return;
this.message[type]=this.message[type].filter(item=>item!==fn)
}
trigger(type){
if(!this.meesage[type]) return;
this.message[type].forEach(item=>{
item();
})
}
}
const person1=new Observer();
person1.on('a',handlerA)
person1.on('a',handlerB)
person1.trigger('a');
function handlerA....
function handlerB....
```
:::

### 观察者模式

:::tip
```js
class Observer{
constructor (name,fn){
this.name=name;
this.fn=fn;
}
}
let bzr=new Observer('班主任',(state)=>{console.log(''因为：'+state+',说你')})
let xz=new Observer('校长',(state)=>{console.log('因为：'+state+'说你')})
class Subject{
constructor(state){
this.state=state;
this.observers=[];
}
setState(val){
this.state=val;
this.observers.forEach(item=>{
item.fn(this.state);
})
}
delObserver(obs){
this.observers=this.observers.filter(item=>item!==obs)
}
addObserver(obs){
this.observers=this.observers.filter(item=>item!==obs)
this.observers.push(obs)
}
}
```
:::

### 单例模式

:::tip
```js
const Person=(function (){
function Person(name,age,gender){
this.name=name;
this.age=age;
this.gender=gender;
}
Person.prototype.sayHi=function(){
console.log('hello world')
}
let instance=null;
return function singleTon(...arg){
if(!instance) instance=new Person(...arg);
return instance
}
})()
```
:::

## 数学类

### 质数

指在大于1的自然数中，除了1和该数自身外，无法被其他自然数整除的数

:::tip
通过开平方限制因数最大值，从2开始到最大值循环判断是否可以整除

```js
Math.sqrt()
```
:::

小于n的质数的数量

给定整数n，返回所有小于非负整数n的质数的数量。

:::tip
count函数：设定初始sum为0，2到n进入循环，`sum+=isPrime(i)`，最外层return sum
isPrime函数(x)：从2开始到x的开平方（或者i*i<=x）进入循环，如果`x%i==0`则返回false，最外层返回true
:::

### 两数最大公约数

传入参数a,b

:::tip
a为大数，b为小数，若b等于0则返回a，最终返回递归调用传入b和a%b
:::

### 两数最小公倍数

:::tip
返回`a*b/最大公约数函数(a,b)`
:::

### 大数相加

传入两个number，转为字符串

:::tip
声明result空字符串，carry为false保存进位，将参数转为数组，arr1，arr2，当两者长度有一个存在或carry存在时进入while循环，carry+=arr1，arr2分别pop出的值并~~转数字取整想加，result更新为carry对10取余加上result，将carry更新为carry是否大于9的布尔结果
:::

### 阶乘后0的数量

给定一个整数 n ，返回 n! 结果中尾随零的数量。

:::tip
```js title="5规律"
function trailingZeroes(n){
let ans=0;
for(let i=5;i<=n;i+=5){
for(let x=i;x%5==0;x/=5){
++ans;
}
}
return ans;
}
```
:::

### 二进制1的个数

编写一个函数，输入是一个无符号整数（以二进制串的形式），返回其二进制表达式中数字位数为'1'的个数（也被称为汉明重量）。

:::tip
设置result为0，从0到32进入遍历，若`(n&(1<<i))!==0`，则result++，最终返回result
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
//正则可替换为 /[\W_]/g，匹配所有非单词的字符以及下划线
:::

### 完美数

对于一个正整数，如果他和除了自身以外的所有正因子之和相等，我们称它为完美数，判断

:::tip
判断边缘值，为1则false，设定初始值为1，进入循环从2到原数开平方或`for(let d=2;d*d<=num;++d)`，如果原数能整除d则将初始值加d，若d平方小于原数，则还要加上原数除以d的mathfloor，最终判断原数是否等于相加的和
:::

### 子序列

子序列为保持相对顺序不变，在原字符中删除某些得到的序列

穷举子序列

参数为arr

:::tip
设置包含空字符串的数组let list=['']，0到len进入循环，内部forEach遍历list，每次在里面`list.push(val+arr[i])`，最外层返回list.sort()
:::

判断s是否为t的子序列

:::tip
设置变量记录两个字符串长度，判断边缘为slen必然比tlen小，且若s为空则必然为子序列，设定初始步长为0，遍历s，当步长小于tlen时进入while循环，若当前步长索引位置的t值为s此处的值则步长+1，内部再次判断若当前遍历s的索引位置为slen-1，则直接return true，在外层判断里break，最后在while层里将步长+1，最外层返回false
:::

最长公共子序列

参数为x，y

:::tip
记录xlen，ylen，声明result为空数组，0到xlen进入循环result[i]=[]，0到ylen进入内层循环result[i][j]=''，退出两层循环后进入1到xlen内层1到ylen循环，判断若x[i-1]==y[i-1]则`result[i][j]=result[i-1][j-1]+x[i-1]`若不相等则将a赋值为result[i-1][j].length,b为result[i][j-1].length，`result[i][j]=a>b?result[i-1][j]:result[i][j-1]`，最外层返回result[m][n].length
:::

最长递增子序列

参数为arr

:::tip
若arr长度为0则直接返回0，设置`dp=new Array(arr.length).fill(1)`，设置max初始为dp[0]，0到arrlen进入循环，0到i进入内层循环，若`arr[j]<arr[i]`则dp[i]赋值为`Math.max(dp[j]+1,dp[i])`，max赋值为`Math.max(max,dp[i])`，最终返回max
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

最长不重复子串

参数为s

:::tip
创建set集合，记录slen，初始化右指针-1，result为0，0到n进入循环，若i不为0，则`set.delete(s.charAt(i-1))`(左指针向右移动，移除一个字符)，当右指针r+1小于slen且`!set.has(s.charAt(r+1))`时进入while循环，不断的移动右指针，`set.add(s.charAt(r+1))`，`++r`，此时i到r个字符是一个极长的无重复子串，记录result=`Math.max(ans,r-i+1)`，最终在最外层返回result
:::

最长回文子串

参数为s，中心水滴法

:::tip
声明max为''，0到slen进入循环，调用`maxStr(i,i);maxStr(i,i+1)`，声明maxStr函数传入l，r，当l大于等于0且r小于slen且`s[l]===s[r]`时进入while，l--,r++，声明str=`s.slice(l+1,r)`，判断若strlen大于max.length则赋值给max，最外层返回max
:::

最长公共子串

参数为str1，str2

:::tip
判断若len1大于len2则交换两者，始终保持str为小，从len1到0进入循环，从0到len1-i进入内层循环，设置current为str1.substr(j,i)，若str2中有current则返回current
:::

最大子串和

参数为arr

:::tip
设置current，sum初始都为0，0到length遍历，若current大于0则current+=arr[i]，否则current=arr[i]，下个判断若current大于sum则sum=current，最终返回sum
:::

### 多数元素

给定一个大小为 n 的数组 nums ，返回其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。

:::tip
判断边缘，若长度为1则返回唯一元素，创建Map，遍历数组，若map中没有此元素则set该元素为键，值为1，若有此元素则将此键值+1，在此判断此键值是否大于数组长度的一半，若大于则return此元素
:::

### 字母异位词

给定两个字符串s和t，编写一个函数来判断t是否是s的字母异位词（若s和t中每个字符出现的次数都相同，则称s和t互为字母异位词）

:::tip
判断长度相等且规范后（[...s].sort().join(""）的两字符串相等
:::

### 外观数列

输出外观数列的第 n 项。「外观数列」是一个整数序列，从数字 1 开始，序列中的每一项都是对前一项的描述。 
1. 1 
2. 11 
3. 21 
4. 1211 
5. 111221

:::tip
设置初始值str为1，2到n进入循环，设置空数组，设置双指针pq都为0，当q小于str的长度时进入while，当q小于str长度且`str[q]===str[p]`再次进入while，q++，记录相同元素的极限位置（q-p即为相同元素长度），跳出此循环后向空数组中`push(''+(q-p)+str[p])`并调成p为q，跳出此循环后到达for层，最终将str初始值变化为数组.join("")，最外层返回str
:::

### 1 比特字符与 2 比特字符

有两种特殊字符： 
第一种字符可以用一比特0表示 
第二种字符可以用两比特（10或11）表示 
给你一个以0结尾的二进制数组bits，如果最后一个字符必须是一个一比特字符，则返回 true 。

 bits = [1, 1, 1, 0]
 输出: False

:::tip
设置初始i=0，n=数组长度，当i<n-1时候进入while循环，进行检索，如果检索到0，走一步；检索到1，走两步。`i+=bits[i]+1`,最后判断i是否走到了最后一个索引，最外层return i===n-1
:::

### 杨辉三角

生成「杨辉三角」的前n行。

:::tip
```js
function combination(m,n){
    if(n == 0) return 1;//第一个数为1
    else if(m == n) return 1; //最后一个数为1
    else return combination(m-1,n-1)+combination(m-1,n);//中间的数为前一行的两个数相加
}
function Print(n){ 
    for( var i = 0 ; i < n ; i++ ){ 
        let arr=[];//用来放第i行的数
        for ( var j = 0 ; j <= i ; j++ ) {
            arr.push(combination(i,j));
        }
            console.log(arr.join(' '));//字符串形式输出
}
```
:::

### 平方根

给你一个非负整数x，计算并返回x的 算术平方根。由于返回类型是整数，结果只保留整数部分，小数部分将被舍去。

:::tip
判断边缘，若x为0或1则返回本身，设置两个指针p为0，q为x，当q-p不等于1时进入while循环，设置mid为`Math.floor((p+q)/2)`，若`mid*mid`为x则直接return mid，若`mid*mid`大于x则让q等于mid，若小于x则让p等于mid，最终返回p
:::

### 整数反转

给你一个 32 位的有符号整数 x ，返回将 x 中的数字部分反转后的结果。如果反转后整数超过32位的有符号整数的范围[−2^31, 2^31− 1] ，就返回 0。

:::tip
设置result为0，当x不等于0时进入while循环，用digit存储当前个位数x%10,x值重新赋值为`~~(x/10)`，result值为`result*10+digit`，若result值小于最小值`Math.pow(-2,31)`或大于最大值`Math.pow(2,31)-1)`，则直接return 0
:::

### 斐波那契数列

:::tip
设置空数组result，0位为0，1位为1，2到n进入循环，`f[i] = f[i - 1] + f[i - 2]`，最后返回result
:::

## 原生api

基本都会有相匹配的手写方法

### 判断类型

:::tip
1. `Object.prototype.toString.call(obj).replace(/\[object\s|\]/g,'')`
2. 封装函数，先判断边缘是否为null，然后区分是否为引用类型，若是则将`Object.prototype.toString.call(value).split(" ")[1].split("")`结果pop出']'后return x.join("").toLowerCase，若是基本类型则直接返回typeof
   

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

### 数字千位符

:::tip
1. number.toLocaleString('en')
2. Intl.NumberFormat().format(number)
3. `return number && number.replace(/(?!^)(?=(\d{3})+\.)/g, ",")`
4. 判断多种情况下
:::

## 数据结构

### 数组

数组去重

:::tip
1. 判断边缘，声明result空数组，遍历arr，判断result内是否有当前元素，没有则将itempush进result内，最终返回result。
2. 或者判断边缘后直接返回[...new Set(arr)]
:::


数组和相等的三部分

给你一个整数数组arr，只有可以将其划分为三个和相等的 非空部分时才返回true，否则返回false。

:::tip
reduce计算数组内元素总和sum，若sum和3取余不为0则直接返回false，计算sum/3平均数avg，设置step为0，flag为0，0到len进入循环，step+=arr[i]，若flag为2，则返回true，若step等于avg则将step赋值为0，flag++，最外层返回false
:::

数组中和为0的三个元素

和为0且不重复的三元组

:::tip
设置result为空数组，若arr为null或len小于3则返回result，低到高排序sort，0到len进入循环，若arr[i]大于0则break，若i大于0且arr[i]==arr[i-1]则continue，设置left为i+1，right为len-1，当left小于right时进入while循环，设置sum为arr[i]+arr[left]+arr[right]，判断若sum为0则将三个值push进result中，当left小于right且arr[left]==arr[left+1]时循环将left++，当left小于right且arr[right]==arr[right-1]时循环将right--，然后正常将left++，right--。若sum小于0，则将left++，若sum大于0，则将right--，最外层返回result
:::

数组中第三大的数

先sort后reverse，从i=1，diff=1到i小于len进入循环，判断若arr[i]不等于arr[i-1]且++diff等于3则直接返回arr[i]，最外层返回arr[0]

数组出现次数过半的数字

:::tip
1. 统计，遍历
2. 摩尔投票法：在每一轮投票过程中，从数组中找出一对不同的元素，将其从数组中删除。这样不断的删除直到无法再进行投票，如果数组为空，则没有任何元素出现的次数超过该数组长度的一半。如果只存在一种元素，那么这个元素则可能为目标元素。

```js
var majorityElement = function(nums) {
   var count = 0;
   var num = nums[0];
   var len = nums.length;
   for(let i = 1; i < len; i ++){
       if(num != nums[i]){
           count--;
           if(count<0){
               count = 0;
               num = nums[i];
           }
       }else{
           count ++;
       }
   }
   return num;
};
```
:::

合并有序数组

A，B

:::tip
设置arr为长度为两者长度之和(m+n)的新数组，设置i为0，p1为0，p2为0，当p1小于m且p2小于n时进入while循环，arr[i++]赋值为`A[p1]<B[p2]?A[p1++]:B[p2++]`，当p1小于m时进入while循环，arr[i++]赋值为A[p1++]，当p2小于n时进入循环，arr[i++]赋值为B[p2++]，最外层返回arr
:::

数组的所有0移动到末尾

:::tip
设置left为0，right为0，当right小于len时进入while循环，判断当arr[right]不为0时交换arr[left]和arr[right]，并将left++，此外层将right++
:::

连续子数组的最大和

:::tip
设置temp为0，result为arr[0]，0到len遍历数组，temp赋值为`=Math.max(arr[i],temp+arr[i])`，result赋值为`Math.max(temp,result)`，最外层返回result
:::

数组中三个数最大乘积

:::tip
判断边缘，先对数组进行排序，设置result为arr[len-1]，若result小于0（全负序列），判断arr[len-2]*arr[len-3]是否小于arr[0]*arr[1]，若小于则将temp设置为arr[len-2]*arr[len-3]，否则将temp设置为nums[0] * nums[1]，然后将result值更新为result*temp，若不是全负序列，判断arr[len-2]*arr[len-3]是否大于arr[0]*arr[1]，若大于则将temp设置为arr[len-2]*arr[len-3]，否则将temp设置为nums[0] * nums[1]，然后将result值更新为result*temp，最外层返回result
```js title="优化排序找最大三个和最小两个"
var maximumProduct = function(nums) {
    const len = nums.length;
    if (len === 3) {
        return nums[0]*nums[1]*nums[2];
    }
    let min1=1001, min2=1001;
    let max1=-1001, max2=-1001, max3=-1001;
    for(let i = 0; i < len; i++) {
        if (nums[i] < min1) {
            min2 = min1;
            min1 = nums[i];
        } else if (nums[i] < min2) {
            min2 = nums[i];
        }
        if (nums[i] > max1) {
            max3 = max2;
            max2 = max1;
            max1 = nums[i];
        } else if (nums[i] > max2) {
            max3 = max2;
            max2 = nums[i];
        } else if (nums[i] > max3) {
            max3 = nums[i];
        }
    }
    return Math.max(max1*max2*max3, max1*min2*min1);
};
```
:::


旋转数组最小数字

:::tip
设置left为0，right为len-1，当left小于right时进入while循环，设置mid为(left+right)>>>1，判断若arr[mid]大于arr[right]则将left赋值为mid+1，若arr[mid]小于arr[right]则将right赋值为mid，否则right--，最外层返回arr[left]
:::

旋转数组找target

升序排列，不重复

:::tip
先判断边缘，声明start为0，end为len-1，声明mid。当start小于等于end时进入while循环，mid赋值为start加`((end-start)>>>1)`，若arr[mid]等于target，则返回mid，若arr[start]小于等于arr[mid]（若旋转点在右侧，左侧正常升序排列）则继续判断若target在arr[start]和arr[mid]之间则将end赋值为mid-1，否则将start赋值为mid+1，若旋转点在左侧，右侧正常升序(else状况)，则继续判断若target在arr[mid]和arr[end]之间，则start赋值为mid+1，否则end赋值为mid-1，最外层返回-1
:::

数组扁平化

:::tip
先判断边缘，声明result空数组，arr.reduce遍历，返回pre.concat内容为判断当前item是否为数组，是则递归调用传入item，不是数组则直接为item，初始值传入空数组，将reduce结果赋值给result，最终返回result
:::

数组第k大元素

arr,k

:::tip
判断边缘，记录第k大的索引位置arr.length-k，调用quickSort(arr,0,arr.length-1)，最终return arr[k]
- quickSort(arr,start,end)：若start大于等于end则直接return，设置temp为arr[start]，设置i为start，j为end，若i小于j进入循环，循环内若i小于j且temp小于等于arr[j]则进入循环j--，循环外将arr[i]赋值为arr[j]，当i小于j且temp大于等于arr[i]时进入循环将i++，循环外将arr[j]赋值为arr[i]，外部循环外将temp赋值给arr[i]，判断当前i是否等于k，若等于则return，若i大于k则递归quickSort(arr,start,i-1)，否则递归进入(arr,i+1,end)
:::

数组中最小k个数

给定一个长度为n的可能有重复值的数组，找出其中不去重的最小的 k 个数。

:::tip
判断边缘，设置left为0，right为len-1，设置index为partition(arr,left,right)，当index不等于k时进入while循环，若index小于k则left赋值为index+1，index为partition(arr,left,right)，若index大于k则right等于index-1，index为partition(arr,left,right)，最终返回arr.slice(0,k)
```js
function partition(array, start, end) {

  let pivot = array[start]; // 取第一个值为枢纽值，获取枢纽值的大小


  // 当 start 等于 end 指针时结束循环
  while (start < end) {

    // 当 end 指针指向的值大等于枢纽值时，end 指针向前移动
    while (array[end] >= pivot && start < end) {
      end--;
    }

    // 将比枢纽值小的值交换到 start 位置
    array[start] = array[end];

    // 移动 start 值，当 start 指针指向的值小于枢纽值时，start 指针向后移动
    while (array[start] < pivot && start < end) {
      start++;
    }

    // 将比枢纽值大的值交换到 end 位置，进入下一次循环
    array[end] = array[start];
  }

  // 将枢纽值交换到中间点
  array[start] = pivot;

  // 返回中间索引值
  return start;}
```
:::

二维数组查找指定数

每行递增

matrix，target

:::tip
判断边缘，设置height为matrix.length，width为matrix[0].length，返回helper(0,width-1)

- helper(x,y):若x等于height或y小于0，则返回false，若matrix[x][y]等于target则返回true，若小于target则返回helper(x+1，y)，否则往左走返回helper(x，y-1)
:::

字符串数组的最长公共前缀

:::tip
判断边缘，0到str[0].length遍历(i)，记录当前字符`const char =strs[0].charAt(i)`，从1到str.length遍历(j)若i等于str[j].length或者str[j].charAt(i)不等于char则证明公共前缀到i-1为止，返回`str[0].substring(0,i)`，最外层返回str[0]
:::

数组中和为target的两个数

:::tip
判断边缘，声明map为new Map()，0到len进入循环，声明result为target-arr[i]，若map中存在result，则直接返回[map.get(result),i]，若不存在result则`map.set(arr[i],i)`
:::

删除有序数组中的重复项

给定一个升序数组，请原地删除重复的元素，使每个元素只出现一次，返回删除后数组的新长度

:::tip
判断边缘，设置fast为1，slow为1，当fast小于len时进入while循环，判断若arr[fast]不等于arr[fast-1]则将arr[slow]赋值为arr[fast]，并将slow++，在循环外层将fast++，最外层返回slow
:::

找出数组中任意一个重复的数字

:::tip
设置obj为空对象，result为null，0到len进入循环，设置temp为arr[i]，并判断若对象中有此值obj[temp]则将result赋值为temp并break，若没有此值则将obj[temp]赋值为1，最终返回result
:::

数组搜索插入位置

给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

:::tip
设置left为0，right为len-1，result为len，当left小于等于right时进入循环，设置mid为`((right-left)>>1)+left`，若target小于等于arr[mid]，则result等于mid，让right等于mid-1，否则让left等于mid+1，最终返回result
:::

调整数组顺序使奇数位于数组前半部分

:::tip
设置left为0，right为len-1，当left小于right时进入while循环，判断若arr[left]为偶数且arr[right]为奇数时调换两者位置，退出判断后继续判断若arr[left]为奇数则left++，若arr[right]为偶数则right--，最终返回arr
:::

合并重叠区间

:::tip
判断边缘，并按首位大小给数组sort排序`(a,b)=>{
return a[0]-b[0];
}`，声明result空数组，设置temp为arr[0]，forof遍历arr，判断若item[0]小于等于temp[1]可合并，则temp重新赋值为`[tmp[0],Math.max(interval[1],tmp[1])]`否则不能合并，将result中push进合并后的值`[].concat(temp)`,并将temp重新赋值为item，循环结束后记得把最后一个temp push进result中，再返回result
:::

数组最大数

:::tip
1. 判断边缘，`return list.reduce((x, y) => x > y ? x : y)`
2. Math.max.apply(null,arr)
:::

:::caution maxBy:指定条件查找最大值
```js
const maxBy=(list,keyBy)=>
list.reduce((x,y)=>keyBy(x)>keyBy(y)?x:y)
```
:::

数组最大两个值

:::tip
first，second存储两个极小值`-Infinity`，遍历数组，if判断当当前元素大于first时，second=first，first=当前元素，else if判断当前元素大于second时候，second=x，最终返回first，second
:::

求递增数组中固定和的两个数

参数：nums,target

:::tip
1. 创建new Map()，for遍历nums，若`map.has(target-nums[i])`则返回`[nums[i],target-nums[i]`，否则 `map.set(nums[i],i)`(存储当前值为键，值为索引)
2. 双指针：left为0,right为len-1，当`left<right`进入while，计算sum为`nums[left]+nums[right]`，若sum等于target则return相应的值，若sum小于target则将left++，若sum大于target则将right--，最外层return null
:::

求数组中指定和的n个数的所有可能

参数：arr，n，sum

:::tip
设置result为空数组，`generatorAll(0,[],arr.slice(0))`，最终返回result
- generatorAll(index,collection,arr):先判断collection的len是否为n，若为n则创建s为collection每项值的累加和，若s等于sum，则将collection push进result里，否则退出函数return。跳出判断后，从0到arr.length进入循环，`generatorAll(index+1,collection.concat(arr[i]),arr.slice(i+1))`

- [牛批的方法](https://blog.csdn.net/weixin_34130269/article/details/91382220)
:::

### 字符串

统计字符串中出现次数最多的字符

:::tip
设置空对象obj，声明` let maxChar = ['', 0]`遍历字符串（const item of str），`obj[item] = (obj[item] || 0) + 1`若obj[item]大于maxChar[1]则`maxChar = [item, obj[item]]`
:::

生成随机字符串

:::tip
toString(36)小数点后的数字转为0·9a·z的值，`Math.random().toString(36).slice(2)`
:::

删除字符串中最后一个指定的字符

:::tip
1. `[...str].reverse().join().replace(target,'').split(',').reverse().join('')`
2. lastIndexOf+splice方法(splice方法得转为数组用)
:::

字符串大小写转换

:::tip
```js
function caseConvert(str){
		return str.replace(/([a-z]*)([A-Z]*)/g, (m, s1, s2)=>{
		return `${s1.toUpperCase()}${s2.toLowerCase()}`
		})
	}
```
:::

删除字符串相邻重复项

:::tip
设置空数组result，const val of s遍历s，若result有长度且最后一个元素值等于val则`result.pop()`，否则push，最终return result.join("")
:::

反转字符串中的单词

:::tip
split+数组遍历+map遍历+逐个反转+返回result
`return s.split(" ").map(element => element.split('').reverse().join('')).join(' ')`
:::

:::caution 反转大小写
```js
//val为获取到的每位s.charCodeAt(i)，部分主要代码
if(val>=65&&val<97){
arr.push(String.fromCharCode(val+32));
}
if(val>=97&&val<129){
arr.push(String.fromCharCode(val-32));
}
//或者
 if (newStr[i] >= 'A' && newStr[i] <= 'Z'){//字母是大写的时候
newStr[i] = newStr[i].toLowerCase()//转换成小写
} else if (newStr[i] >= 'a' && newStr[i] <= 'z') {//字母是小写的时候
newStr[i] = newStr[i].toUpperCase();//转换成大写
}
```
:::

删除字符串中最后一个指定的元素

:::tip
1. lastIndexof+splice
2. `let reg=new RegExp(`${target}(?=([^${target}]*)$)`)`，返回`str.replace(reg,'')`
:::

生成长度为n随机字符串

:::tip
`Math.random().toString(36).slice(2,2+n)`
:::

统计字符串中出现次数最多的字符

:::tip
设置空对象count，设置maxChar=['',0]，for of遍历str，`count[item]=(count[item]||0)+1`，判断若count[item]大于maxChar[1]，则将maxChar设置为[item,count[item]]，最终返回maxChar
:::

有效括号序列

:::tip
设置result为空数组，遍历s，设置当前字符为temp(s.charAt(i))，若temp等于左括号(所有类型或判断)，则将temp push进result中，若不等于左括号则先判断result.length若为0则返回false，若不为0则设置result pop出来的值为right，判断若temp为'('且right不等于')'则返回false，其他两种括号同理，最终返回result.length===0
:::

:::caution 其他方法
```js
var isValid = function (s) {
 let map = {
 '(': -1,
 ')': 1,
 '[': -2,
 ']': 2,
 '{': -3,
 '}': 3
 }
 let stack = []
 for (let i = 0; i < s.length; i++) {
 if (map[s[i]] < 0) {
 stack.push(s[i])
 } else {
 let last = stack.pop()
 if (map[last] + map[s[i]] != 0) return false
 }
 }
 if (stack.length > 0) return false
 return true
};
```
:::

求一个字符串的字节长度

一个英文字符占用一个字节，一个中文字符占用两个字节

:::tip
记录字符串长度为bytes，遍历字符串，判断当前字符若`str.charCodeAt(i)>255` 则为中文字符，bytes++，最终return bytes
:::

### 二叉树

树中每个节点最多只能有两个子节点的树

```js
class Node{
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
```

#### 二叉树所有路径

root

:::tip
声明result为空数组，调用paths函数传入(root，"")，最终返回result
- paths(root，path):判断若root存在则将path+=root.val.toString()，继续判断若当前节点为叶子节点则将path值push进result，若非叶子节点则path += "->"，继续递归paths(root.left,path)，paths(root.right,path)
:::

#### 二叉树层序遍历

:::tip 
声明result为空数组，判断传入root是否存在，声明queue为空数组，并push进root，当queue的长度存在时进入while循环，声明currentlen为当前queue长度，并将result中push一个空数组，0到currentlen进入循环，设置queue.shift()值为node，将result末尾位置的数组push进node.val，判断若node.left存在则将其push进queue中，right同理，最外层返回result
:::

#### 二叉树锯齿形层序遍历

:::tip
声明result为空数组，判断传入root是否存在，声明queue为空数组，并push进root，设置flag值为true，当queue的长度存在时进入while循环，声明currentlen为当前queue长度，并将result中push一个空数组，0到currentlen进入循环，设置queue.shift()值为node，判断若flag为true则将node.val push进result末尾数组元素中，若flag为false则将node.val unshift进末尾数组元素中，判断若node.left存在则将其push进queue中，right同理，内层循环结束后在while循环层末尾将flag倒置，最外层返回result
:::

#### 二叉树最近公共祖先

root,p,q

:::tip
判断若root不存在则返回null，若root等于p则返回p，root等于q则返回q，设置x为递归调用此函数传入root.left，p，q，y为递归调用此函数传入right...，判断若x&&y都存在则返回root，否则返回x||y
:::

#### 二叉树的右视图

root

:::tip
判断边缘，声明result空数组，queue为[root]，声明now，len，当queue长度不为0时进入while循环，设置len为queue.length,设置now为空数组，0到len进入循环，声明nowVal为`queue.shift()`，并将nowVal.val值push进now中，判断若nowVal.left存在，则将其push进queue中，nowVal同理，在此循环外将now[now.length-1]值push进result中，最外层返回result
:::

#### 判断二叉树是否相同

:::tip
递归，两个根节点为参数，先判断边缘值null，再判断节点值，不相等则false，相等为true，最终return以各自的左节点和右节点比较的函数相&&`isSameTree(p.left,q.left)&&isSameTree(p.right,p.right);`
:::

#### 判断对称二叉树

:::tip
递归，先判断边缘根节点是否为null，return新compare函数传入当前根左右节点为参数，compare函数内判断：节点同时为null为true，不同时为null为false，节点值不相等为false，最终return ` compare(node1.left,node2.right)&&compare(node1.right,node2.left)`
:::

#### 二叉树最小深度

:::tip
minDepth()：判断若root为null则返回0，若root为叶子结点则返回1，声明result为`Number.Max_SAFE_INTEGER`，判断若root.left存在则将result赋值为`Math.min(minDepth(root.left),result)`，判断若root.right存在则将result赋值为`Math.min(minDepth(root.right),result)`，最终返回result+1
:::

#### 二叉树直径

一棵二叉树的直径长度是任意两个结点路径长度中的最大值。这条路径可能穿过也可能不穿过根结点。

:::tip
设置result为0，调用dfs(root)，并返回result
- dfs(root):判断若root为null则返回0，设置leftMax为dfs(root.left)，rightMax为dfs(root.right)，result为`Math.max(result,leftMax+rightMax)`，最终返回`Math.max(leftMax,rightMax)+1`
:::

#### 合并二叉树

t1,t2

:::tip
若t1，t2都存在，则t1.val为`t1.val+t2.val`，t1.left为递归调用传入(t1.left,t2.left)，right同理，最外层返回`t1||t2`
:::

#### 二叉树镜像翻转

:::tip
判断若root不存在则返回null，设置root.mid为root.left，root.left为root.right，root.right为root.mid，递归调用传入root.left,再次调用传入root.right，最终返回root
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

### 二叉搜索树

```js
class BinarySearchTree {
  constructor() {
    this.root = null
  }
  //功能如下
}
```

#### 节点插入（二叉搜索树）

:::tip 
1. insert(value)：先创建新节点newNode(值为value)，然后判断this.root是否为空，若为空则this.root=newNode，否则调用this.insertNode(this.root,newNode)
2. insertNode(node,newNode)：
```js
if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
```
:::

#### 先序、中序、后序遍历

:::tip 先序遍历
1. 先调用
```js
  preOrderTraverse() {
    this.preOrderTraverseNode(this.root);
  }
```
2. preOrderTraverseNode(node)：
先判断node是否为null，若不为null则先打印当前节点`node.show()`，在依次递归打印左子和右子`      this.preOrderTraverseNode(node.left);
      this.preOrderTraverseNode(node.right);`
:::

:::tip 中序遍历
同上，只是调用顺序为先左子再打印当前再右子
:::

:::tip 后序遍历
同上，只是调用顺序为先左子，右子，再当前节点
:::

:::caution 循环
1. 先序遍历：
   声明空数组stack，将this.root入栈，当stack.length大于0时开始while循环，设置node为当前pop出来的节点，执行show，若node.right存在则将右节点push进stack中，若left同理
2. 中序遍历：
   设置空数组stack，记录node为this.root，当length大于0或者node存在时进入while循环，判断若node存在，则将nodepush进stack中，node=node.left，若node不存在则设置当前pop出的节点为node，执行show，`node=node.right`
3. 后序遍历：
   设置两个空数组stack1，stack2，node为null，先将this.root根节点push进stack1中，当stack1.length大于0时进入while循环，设置node为当前pop值，将node节点push进stack2中，判断若node.left存在，则将node.left节点push进stack1中，若node.right存在，则将node.right节点push进stack2中，最终当stack2.length大于0时候，一个一个pop出来，依次执行show
:::

#### 二叉搜索树节点最小距离

给定一个二叉搜索树的根节点root，返回树中任意两不同节点值之间的最小差值，其数值等于两值之差的绝对值

:::tip
设置result为`Number.Max_SAFE_INTEGER`，pre为-1，调用dfs(root)，最终返回result
- dfs(root)：判断若root等于null则直接返回，递归调用dfs(root.left)，若pre等于-1，则将pre赋值为root.val，否则将result赋值为`Math.min(result,root.val-pre)`，并将pre赋值为root.val，最外层递归调用dfs(root.right)
:::

#### 二叉搜索树搜索指定值子树

root,val

:::tip
- searchBST()：判断若root不存在则返回null，若val等于root.val则返回root，最终返回`searchBST(val<root.val?root.left:root.right,val)`
:::

#### 二叉搜索树众数

给定一个含重复值的二叉搜索树的根节点root，找出并返回BST中的所有众数，若不只有一个众数，可以按任意顺序返回

:::tip
设置base为0，countWie0，maxCount为0，result为空数组，调用dfs(root)，最终返回result
- dfs(root)：判断若root不存在则直接return，调用dfs(root.left)，update(root.val)，dfs(root.right)
- update(val)：判断若val等于base则将count++，否则设置count为1，base为val，判断若count等于maxCount则将base值push进result中，若count大于maxCount则将maxCount赋值为count，并将result覆盖为[base]。
:::

#### 二叉搜索树第k大节点

root，k

:::tip
声明result，中序遍历的倒序，右中左，可以得到递减数组，调用inorder函数传入root，最终return result
- inorder(root):若root不存在return null，递归inorder(root.right)，k--，判断若k为0则将result赋值为root.val，递归inorder(root.left)
:::

#### 寻找最大最小节点值

:::tip 最小值
1. 先调用，传入this.root
2. findMinNode(root)：
将root转存为node变量，当node存在且node.left存在时进入while循环，最终返回node
3. 最大值同理
:::

#### 寻找特定大小节点值

:::tip
1. 先调用，传入this.root,value
2. findNode(node, value)：
判断node，若为null则直接返回node，判断若value小于node.value，`return this.findNode(node.left,value)`，若value大于node.value则`return this.findNode(node.right,value)`，若相等则直接返回node
:::

#### 移除节点值

:::tip
1. 先调用，传入this.root,value
2. removeNode(node,value)：
判断若当前node为null则直接返回node，接下来寻找指定节点，若value小于node.value则在左边，设置` node.left = this.removeNode(node.left, value);`然后return node，若value大于node.value则在右边`node.right = this.removeNode(node.right, value);`，然后return node，若两者相等代表找到了节点，继续判断节点情况，若该节点没有叶节点则将node赋值null并返回node，若有左节点无右节点则将node赋值为node.left并返回node，右节点同理，若左右节点都有则调用函数找到右子树中最小节点`let minNode = this.findMinNode(node.right);`将node.value的值变化为最小的值minNode.value，且再次调用函数删除右节点中最小值完成覆盖`node.right = this.removeNode(node.right,minNode);`，然后return node
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
1. 遍历第一个头结点，设置flag为true，遍历第二个节点，若有flag为true的则返回当前节点，最外层return null
2. 双指针法
:::

#### 反转链表

:::tip
传入head，判断边缘，设置pre为null，current为head，next为null，当current存在时进入while循环，首先将current.next赋值为next当做下次操作的值，然后将pre赋值给current.next颠倒，再将pre设置为current当做下个操作值的前，最后讲过next赋值给current，最外层返回pre
:::

#### 指定范围反转链表

给定单链表的头指针head和两个整数left和right，其中left<=right，反转位置left到位置right的链表节点，返回反转后的链表

:::tip
设置dummyNode创建新listNode传入-1，设置dummyNode.next为head，设置pre为dummyNode，0到left-1进入循环，pre设置为pre.next（将pre位置调到left-1位置），设置rightNode为pre（准备记录右侧切割位置），0到right-left+1进入循环，rightNode设置为rightNode.next（将rightNode调到right位置），设置leftNode为pre.next，curr为rightNode.next（存储起来等待反转并拼接），然后将pre.next置空，将rightNode.next置空。调用反转函数传入leftNode

- leftNode(head)：设置pre为null，cur为head，当cur存在时进入while循环，设置next为cur.next，设置cur.next为pre，设置pre为cur，设置cur为next
:::

#### 两链表公共结点

:::tip
1. 判断边缘，设置p1，p2分别等于head1，head2，当p1不等于p2时进入while循环，判断p1是否等于null，若等于null则将p1赋值为head2，若不等于则将p1赋值为p1.next，判断若p2等于null则将p2赋值为head1，若不等于null则将p2赋值为p2.next，最外层返回p1
2. 遍历head1用set存储，然后遍历head2判断set中有则返回
:::

#### 删除有序链表重复元素

:::tip
设置current为head，当current存在时进入while循环，判断若current.next存在且current.val等于next的val则继续判断若current.next.next存在则将其覆盖，若不存在则将current.next赋值为null，若值不相等或next不存在则继续遍历current为current.next，最外层返回head
:::

#### 合并链表

输入两个递增的链表，合并这两个链表并使新链表中的节点仍然是递增排序的。

:::tip
判断若p1不存在则返回p2，若p2不存在则返回p1，判断若p1.val小于等于p2.val则将p1.next赋值为递归调用传入(p1.next,p2)，然后返回p1，若p1.val大于p2.val则将p2.next赋值为递归调用传入(p2.next,p1)，然后返回p2
:::

#### 链表中间节点

给定一个头结点为head的非空单链表，返回链表的中间结点。如果有两个中间结点，则返回第二个中间结点。

:::tip
设置arr初始为[head]，当arr[arr.length-1].next不为null时进入while循环，将arr中push进arr[arr.length-1].next，最终返回arr[Math.truc(arr.length/2)]
- Math.trunc() 方法会将数字的小数部分去掉，只保留整数部分。
:::

#### 删除链表倒数第n个节点

head,n

:::tip
设置result为head，index为0，temp为null，当head存在时进入while循环，index++，判断若index等于n+1，则将temp赋值为result，若index大于n+1则将temp赋值为temp.next，循环最外层将head赋值为head.next，退出循环后，判断若index小于n则直接返回result，若index等于n则返回result.next，若index大于n则将temp.next赋值为temp.next.next，然后返回result
:::

#### 链表倒数第k个结点

输入一个长度为n的链表，返回该链表中倒数第k个节点，如果该链表长度小于k，请返回一个长度为0的链表。

:::tip
设置head.next为pHead，设置arr为空数组，当head.next存在时进入while循环，向arr中push进head，head赋值为head.next退出循环后判断若arr长度大于等于k则返回arr[arr.length-k].next，否则返回null
:::

#### 单链表重新排列

给定一个单链表 L 的头节点 head ，单链表 L 表示为：L0 → L1 → … → Ln - 1 → Ln 
请将其重新排列后变为：L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …

:::tip
设置p为head，判断边缘，设置p.prev为null，当p.next存在时进入while循环，设置p.next.prev为p，p为p.next，退出循环后设置h为head，设置pp为p，whiletrue进入循环，若pp等于h则将h.next设置为null，并break，退出判断后声明next为h.next，将h.next设置为pp，将h设置为next，判断若pp等于h则将pp.next赋值为null，并break，退出判断后，将pp.next赋值为h，pp赋值为pp.prev
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
判断边缘，存储数组长度len，进入空出后一个元素遍历（0到len-1），存储当前索引i为index，进入下一层循环为当前索引之后i+1到最终位置len，若当前元素小于index处的值，则更新index为当前位置，结束当前循环后交换i和当前index位置的值（更新最小值）
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

### 归并排序

归并排序的平均时间复杂度为 O(nlogn) ，最坏时间复杂度为 O(nlogn) ，空间复杂度为 O(n) ，是稳定排序。

两两分开然后排序合并

:::tip
1. 分开：mergeSort(arr)，记录arr的length，判断边缘，若length等于1则return arr，获取arr中间索引值mid为`parseInt(length>>1)`，设置left为`arr.slice(0,mid)`，right为slice剩下的，返回`merge(mergeSort(left),mergeSort(right))`
2. 排序合并：merge(leftarr,rightarr)，声明result空数组，leftlen，rightlen为参数各自长度，il=0，ir=0，当il小于leftlen且ir..进入第一个while，若`leftarr[il]<rightarr[ir]`，将leftarr[il++] push到result中，反之将rightpush，退出当前while，若左边数组有剩余则当il小于leftlen时进入while，将leftarr[il++] push到result里，反之则pushright，最终return result
:::

### 递归式快速排序

快速排序的平均时间复杂度为 O(nlogn) ，最坏时间复杂度为 O(n²) ，空间复杂度为 O(logn) ，不是稳定排序。

标记点分割

:::tip
1. quickSort(arr,start,end)，记录len，判断边缘（是否是数组，len是否大于1，start是否小于end）return;记录index值为partition(arr,start,end)，调用`quickSort(arr,start,index-1)`，`quickSort(arr,index+1,end)`
2. partition(arr,start,end)，记录arr[start]值为temp，当start小于end时进入while循环，当arr[end]大于等于temp且start小于end时进入while end--，退出当前while后将比temp更小的值交换到start位置`arr[start]=arr[end]`，当arr[start]小于等于temp且start小于end时进入while循环，start++，退出循环后将比temp更大的值交换到end位置`array[end] = array[start]`，退出所有while循环后，将temp值给到中间节点`array[start] = pivot`，并返回中间索引值start
:::

### 非递归式快速排序

同上，差别在quickSort函数

:::tip
quickSort(arr,start,end)，设置stack空数组，将start入栈，然后将end入栈，当stack.length大于0时进入while循环，首先pop出的值赋值给新变量right，其次pop的值赋值给left，设置index值为partition(arr,left,right)，若left小于index-1则将依次将left，index-1 push进stack，然后判断若right大于index+1则依次将index+1和rightpush进stack，最终返回arr
:::

### 堆排序

堆排序的平均时间复杂度为 O(nlogn) ，最坏时间复杂度为 O(nlogn) ，空间复杂度为 O(1) ，不是稳定排序。

构成大顶堆，与末尾元素交换

:::tip
1. 主函数：记录len，判断边缘，将传入数组构建为大顶堆buildMaxHeap(arr)，从len-1开始到i>0为止i--进入循环，每次循环将最大值和末尾元素交换(0和i位置的arr相应值交换)，然后重新构建大顶堆调用adjustMaxHeap(arr,0,i)，最终return arr
2. adjustMaxHeap(arr,index,heapSize)：声明三个空变量iMax，iLeft，iRight。while true循环，将index保存在iMax中，并获取左右子元素的索引`iLeft = 2 * index + 1`，`iRight = 2 * index + 2`，判断如果左子树存在(`iLeft<heapSize`)且左子元素大于最大值(`arr[iMax]<arr[iLeft]`)，则更新最大值索引(`iMax=iLeft`)，右子元素同理，判断若最大元素索引被更新了(iMax!==index)则交换位置(arr[index]和arr[iMax])并将索引值更新`index=iMax`，若最大元素索引没被更新则说明该子树满足最大堆要求，直接break
3. buildMaxHeap(arr)：记录len，最后一个非叶子节点的元素(iParent=parseInt(length>>1)-1)，从iParent到i>=0 i--进入循环，调用adjustMaxHeap(arr,i,len)调整每一个子树，使其变成大根堆
:::

### 基数排序

基数排序的平均时间复杂度为 O(nk)，k 为最大元素的长度，最坏时间复杂度为 O(nk)，空间复杂度为 O(n) ，是稳定排序。

将所有待比较数值（正整数）统一为同样的数位长度，数位较短的数前面补零。然后，从最低位开始，依次进行一次排序。

:::tip
```js
function radixSort(array) {

  let length = array.length;

  // 如果不是数组或者数组长度小于等于1，直接返回，不需要排序 
  if (!Array.isArray(array) || length <= 1) return;

  let bucket = [],
    max = array[0],
    loop;

  // 确定排序数组中的最大值
  for (let i = 1; i < length; i++) {
    if (array[i] > max) {
      max = array[i];
    }
  }

  // 确定最大值的位数
  loop = (max + '').length;


  // 初始化桶
  for (let i = 0; i < 10; i++) {
    bucket[i] = [];
  }

  for (let i = 0; i < loop; i++) {
    for (let j = 0; j < length; j++) {
      let str = array[j] + '';

      if (str.length >= i + 1) {
        let k = parseInt(str[str.length - 1 - i]); // 获取当前位的值，作为插入的索引
        bucket[k].push(array[j]);
      } else {
        // 处理位数不够的情况，高位默认为 0
        bucket[0].push(array[j]);
      }
    }

    array.splice(0, length); // 清空旧的数组

    // 使用桶重新初始化数组
    for (let i = 0; i < 10; i++) {
      let t = bucket[i].length;

      for (let j = 0; j < t; j++) {
        array.push(bucket[i][j]);
      }

      bucket[i] = [];
    }
  }

  return array;
}
```
:::

## 常见问题

### 网格岛屿

给定一个由1陆地和0水组成的二维网络，请你计算网格中岛屿的数量，岛屿总是被水包围，并且每座岛屿只能由水平方向和竖直方向上相邻的陆地连接而成

:::tip
设置result为0，从0到grid.length遍历，内部0到grid[0].length遍历，判断若grid[i][j]等于1则将result++，并调用dfs(i,j)，然后返回result
- dfs(row,col)：判断若row小于0或row大于等于gridlen或col小于0或col大于等于gird[0]len或grid[row][col]等于0，直接返回，退出判断后将grid[row][col]赋值为0，调用dfs(row-1,col)，dfs(row+1,col)，dfs(row,col-1)，dfs(row,col+1)
:::

### 矩阵顺时针螺旋

matrix

:::tip
1. 判断边缘，设置rows为matrix.length，columns为matrix[0].length，设置visited为`new Array(rows).fill(0).map(()=>{
return new Array(columns).fill(false);
})`，设置total为row*columns，设置result为长度为total的空数组fill(0)，设置directionIndex为0，row为0，col为0，directions数组设置为`[[0,1],[1,0],[0,-1],[-1,0]]`，0到total进入循环，设置result[i]为matirx[row][col]且将visited[row][col]设置为true，设置nextRow为`row+directions[directionIndex][0]`，nextCol为`col+directions[directionIndex][1]`，判断边界更换directionIndex若`!(nextRow>=0&&nextRow<rows&&nextColumn>=0&&nextColumn<columns&&!(visited[nextRow][nextColumn]))`更新directionIndex为`(directionIndex+1)%4`，将row+=`=directions[directionIndex][0]`，将col+=`directions[directionIndex][1]`最外层返回result
2. const directions=[[1,0],[0,1],[-1,0],[0,-1]]则为逆时针
:::

### 接雨水

height

:::tip
设置result为0，0到len遍历，设置leftMax为0，rightMax为0，从i-1到等于0遍历(j)，设置leftMax为`(height[j]>=leftMax)?height[j]:leftMax`，同理从i+1到len遍历，获取rightMax为`(height[k]>=rightMax)?height[k]:rightMax`，设置min为leftMax和rightMax最小值，判断若min大于height[i]，则result+=min-height[i]，最外层返回result
:::

### 二分查找

```md
假设数组中共有n个元素，那么查找过程为：
第1次折半： 还剩 n/2 个元素
第2次折半： 还剩 n/4 个元素
第3次折半： 还剩 n/8 个元素
…
第k次折半： 还剩 n/2k 个元素
最坏的情况下，最后还剩一个元素，令 n/2k=1，则得k=logn
那么这个T(n)，小于等于且接近于函数fn=logn，时间复杂度为O()=O(logn)
```

返回target在数组中索引值

:::tip
1. 递归：输出search(arr,target,0,arr.length)
- search(arr,target,mix,max)：判断若min大于max则返回-1，设置mid为parseInt((min+max)/2)，判断target若等于arr[mid]则返回mid，若target大于mid则在右边，min=mid+1，返回递归调用传入(arr,target,min,max)，否则则在左边，max=mid-1，返回递归调用(arr,target,min,max)，否则返回-1
2. 非递归(arr,target)：设置left为0，right为arr.length-1，当left小于等于right时进入while循环，设置mid为`Math.floor((left + right) / 2)`，判断若target等于arr[mid]则返回mid，若target小于arr[mid]则将right赋值为mid-1，否则将left赋值为mid+1，最外层返回-1
:::

### 动态规划

自底向上分解子问题，通过变量存储已经计算过的值

#### 斐波那契

n

:::tip
创建数组arr为`new Array(n+1).fill(null)`，将0和1项设置为0,1。从2到等于n进入循环，arr[i]=arr[i-1]+arr[i-2]，最终返回arr[n]
:::

#### 01背包问题

该问题可以描述为：给定⼀组物品，每种物品都有⾃⼰的重量和价格，在限定 的总重量内，我们如何选择，才能使得物品的总价格最高。每个物品只能放入至多⼀次。

w，arrw，arrv

:::tip
设置n为arrw长度-1，设置空二维数组为result，只有一个物品时：从0到等于w进入循环，若arrw[0]大于i(装不进去)，则将result[0][i]赋值为0，若arrw[0]小于等于i，则将result[0][i]赋值为arrv[0]，有多个物品时：0到等于w进入循环(j)，内层1到等于n进入循环(i)，若result[i]不存在则将其赋值为空数组，若arrw[i]大于j(装不进去)，则result[i][j]设置为result[i-1][j]，若能装进去则将result[i][j]赋值为` Math.max(result[i-1][j], result[i-1][j-arrw[i]]+arrv[i])`，最外层输出result[n][w]
:::

### 按字母顺序排序

:::tip 数字+字母排序
```js
arr.sort(function(a,b)){
return a===b?0:a<b?-1:1;
}
```
:::

:::caution 数字排序
```js
arr.sort((a,b)=>{return a-b})
//参数空为字母排序
```
:::

### 任务队列1，3，4秒打印1，2，3

```js
 class Queue {
    _tasks = [];
    constructor() {}
    ...
 }
 const startTime = Date.now();
new Queue()
  .task(1000, () => {
    console.log(1);
    console.log(Date.now() - startTime);
  })
  .task(2000, () => {
    console.log(2);
    console.log(Date.now() - startTime);
  })
  .task(1000, () => {
    console.log(3);
    console.log(Date.now() - startTime);
  })
  .start();
  // 1 1001  // 2 3003  // 3 4003

```

:::tip
1. task(time,cb)：注册任务，`this._tasks.push({ time, cb })`，然后返回this(链式调用)
2. start()：开启执行，若this._task.length存在则取出第一个`const { time, cb } = this._tasks[0]`，进入定时器setTimeout执行sb.apply(this)，并且踢出第一项this._tasks.shift()，判断若this._tasks.length依然存在则递归调用this.start()，定时器传入时间为time
:::

### 出现频率最高单词

article

:::tip
判断边缘，规范传入字符串，去收尾空trim并转小写toLowerCase()，声明list为article.match(/[a-z]+/g)，设置visited为空数组，maxNum为0，maxWord为空字符串，重新设置article为" " + list.join(" ") + " "，forEach遍历list，判断若visited中没有item，则设置word为new RegExp(" "+item+" ","g")，设置num为article.match(word).length，若num大于maxNum，则设置maxNum为num，maxWord为item，然后将item push进visited，最外层返回maxWord和maxNum
:::

### 按照二进制1的数量排序

如果存在多个数字二进制中1的数目相同，则必须将它们按照数值大小升序排列。

:::tip
```js
return arr.sort((a,b)=>{
return (bitCount(a)-bitCount(b))||(a-b)
})
```
- bitCount(n)：设置count为0，当n存在时进入while循环，逐渐清除最低位的1，`n&=(n-1)`，将count++，在循环外返回count

:::

### 爬楼梯问题

每跨一步只能向上1级或者2级台阶

时间复杂度可以近似的看为 O(2^n)，空间复杂度为递归的深度 O(logn)

:::tip
```js
function getClimbingWays(n) {

  if (n < 1) {
    return 0;
  }

  if (n === 1) {
    return 1;
  }

  if (n === 2) {
    return 2;
  }

  return getClimbingWays(n - 1) + getClimbingWays(n - 2);}
```
:::

### 备忘录方法

保存重复值

 时间复杂度降低为O(n)，但是增加空间复杂度为 O(n)

:::tip
```js
let map = new Map();
function getClimbingWays(n) {

  if (n < 1) {
    return 0;
  }

  if (n === 1) {
    return 1;
  }

  if (n === 2) {
    return 2;
  }

  if (map.has(n)) {
    return map.get(n);
  } else {
    let value = getClimbingWays(n - 1) + getClimbingWays(n - 2);
    map.set(n, value);
    return value;
  }}
```
:::

### 迭代法

:::tip
```js
function getClimbingWays(n) {

  if (n < 1) {
    return 0;
  }

  if (n === 1) {
    return 1;
  }

  if (n === 2) {
    return 2;
  }

  let a = 1,
    b = 2,
    temp = 0;

  for (let i = 3; i <= n; i++) {
    temp = a + b;
    a = b;
    b = temp;
  }

  return temp;
  }
```
:::

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

### 顺时针遍历矩阵

:::tip
传入一个二维数组matrix，判断边缘，设置rows为行数，columns为列数，设置空二维数组visited为`new Array(rows).fill(0).map(() => new Array(columns).fill(false))`，设置元素总数为`total = rows * columns`，设置一维空数组result为`new Array(total).fill(0)`，设置index为0，row为0，col为0，设置挪移数组directions为四个方向值`[[0, 1], [1, 0], [0, -1], [-1, 0]]`，从0到total遍历，`result[i]=matrix[row][col]`，且`visited[row][column] = true`，设置nextrow变量为`row + directions[index][0]`，nextcol变量为` column + directions[index][1]`，，然后进行预判断，看是否需要改变index值，index范围为0~3，当nextrow和nextcol之一超过各自范围（如0~rows）或当`visited[nextRow][nextColumn]==true`时，index值改变为`(index+1)%4`，在循环的最后将`row+=directions[index][0]`将`column += directions[index][1]`，最终返回result
:::

:::caution
```js
var spiralOrder = function(matrix) {
    if (!matrix.length || !matrix[0].length) {
        return [];
    }
    const rows = matrix.length, columns = matrix[0].length;
    const visited = new Array(rows).fill(0).map(() => new Array(columns).fill(false));
    const total = rows * columns;
    const order = new Array(total).fill(0);

let directionIndex = 0, row = 0, column = 0;

    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    for (let i = 0; i < total; i++) { 
        order[i] = matrix[row][column];
        visited[row][column] = true;
        const nextRow = row + directions[directionIndex][0], nextColumn = column + directions[directionIndex][1];
        if (!(0 <= nextRow && nextRow < rows && 0 <= nextColumn && nextColumn < columns && !(visited[nextRow][nextColumn]))) {
            directionIndex = (directionIndex + 1) % 4;
        }
        row += directions[directionIndex][0];
        column += directions[directionIndex][1];
    }
    return order;
};
```
:::

### 换酒问题

小区便利店正在促销，用numExchange 个空酒瓶可以兑换1瓶新酒。你购入了numBottles瓶酒。最多能喝到多少瓶酒

:::tip
设置两个变量a（可兑酒数量）,b（可喝到数量）存储当前购入的酒数量，当a>=numExchange时进入while。a-=numExchange,a和b都++,最外层返回b
:::

### sum+add异步累加

请实现一个 sum 函数，接收一个数组 arr 进行累加，并且只能使用add异步方法,add 函数已实现，模拟异步请求后端返回一个相加后的值

:::tip
递归，设定数组长度为0或1时的返回值，将a，b设置为数组pop两次后各自的值，异步计算好后push到arr中，return sum(arr)继续计算下一轮
```js
function add(a, b) {
  return Promise.resolve(a + b);
  }

async function sum(arr){
    let res = 0;
    if(arr.length === 0) return res;
    if(arr.length === 1) return arr[0];
    let a = arr.pop();
    let b = arr.pop();
    arr.push(await add(a, b));
    return sum(arr)}

sum([2,2,2,2]).then(res=>{console.log(res)})
```
:::

### 累加函数sum

:::tip
```js
function sum(...args) {
  const f = (...rest) => sum(...args, ...rest);
  f.valueOf = () => args.reduce((x, y) => x + y, 0);
  return f;
}
```
:::

### 约瑟夫环

将n个人围成一个圈，每次去掉第m个人，计算一圈人中哪个人会剩下

:::tip
设置一个空数组players，遍历n后将元素存入players，设置flag为0，当players的length大于1时进入while，设置出局人num为0,len为players长度，从0到len进入for遍历，每次将flag++，若flag为m则将flag置0，此时踢出此人`players.splice(i-num,1)`(因为实际数组已经减少元素而遍历值不变，所以多出了被踢掉的那些)且将num
++，最终剩下players的唯一元素
:::

### 传递信息

有 n 名玩家，所有玩家编号分别为 0 ～ n-1，其中小朋友 A 的编号为0,每个玩家都有固定的若干个可传信息的其他玩家（也可能没有）。传信息的关系是单向的（比如 A 可以向 B 传信息，但 B 不能向 A 传信息）。每轮信息必须需要传递给另一个人，且信息可重复经过同一个人，给定总玩家数 n，以及按 [玩家编号,对应可传递玩家编号] 关系组成的二维数组relation。返回信息从小 A (编号 0 ) 经过 k 轮传递到编号为 n-1 的小伙伴处的方案数；若不能到达，返回 0。

输入：n = 5, relation = [[0,2],[2,1],[3,4],[2,3],[1,4],[2,0],[0,4]], k = 3 
输出：3

:::tip
设置result为0，创建二维空数组empty:`new Array(n).fill(0).map(()=>new Array())`，遍历二维数组参数并push处理进empty
```js
for(const [src,dst] of relation){
empty[src].push(dst);
}
```
创建dfs函数，参数为index,steps，判断若steps等于k，若index为n-1则result++，然后退出当前函数，外层将empty[index]赋值给list，遍历list，递归执行dfs函数，传入当前元素和steps+1
执行dfs(0,0)，return result
:::

### 罗马数字转整数

:::tip
创建map=new Map()
```js
map.set('I',1);
map.set('V',5);
map.set('X',10);
map.set('L',50);
map.set('C',100);
map.set('D',500);
map.set('M',1000);
```
创建ans=0，len记录字符串长度，遍历字符串s
```js
if(i<len-1&&map.get(s[i])<map.get(s[i+1])){
ans-=map.get(s[i]);
}else{
ans+=map.get(s[i]);
}
```
最外层return ans
:::

### 买卖股票最佳时机

假设你有一个数组prices，长度为n，其中prices[i]是股票在第i天的价格，请根据这个价格数组，返回买卖股票能获得的最大收益 
1. 你可以买入一次股票和卖出一次股票，并非每天都可以买入或卖出一次，总共只能买入和卖出一次，且买入必须在卖出的前面的某一天 
2. 如果不能获取到任何利润，请返回0 
3. 假设买入卖出均无手续费


:::tip
记录数组长度len，判断边缘，将数组第一个值设置为minValue，最大值maxValue初始设置为0，遍历数组，每次记录minValue为minValue和prices[i]比较的最小值，maxValue为maxValue和price[i]-minValue比较的最大值，最终返回maxValue
:::

### 兑换零钱

给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。

:::tip

:::

### 棋盘不同路径总数目

一个机器人在m×n大小的地图的左上角（起点）。机器人每次可以向下或向右移动。机器人要到达地图的右下角（终点）。可以有多少种不同的路径从起点走到终点？

:::tip
创建一个空二维数组dp，0开始遍历行数，`dp[i][0]=1`，0开始遍历列数，`dp[0][i]=1`，1开始遍历两层，`dp[i][j]=dp[i-1][j]+dp[i][j-1]`，最终返回dp[m-1][n-1]
:::

### 最小花费爬楼梯

给定一个整数数组cost，其中cost[i]是从楼梯第i个台阶向上爬需要支付的费用，下标从0开始，一旦支付费用，就可以选择向上爬一个或者两个台阶

:::tip
设置空数组dp[0,0]，从2到cost.length(=)开始遍历数组，`dp[i]=Math.min(dp[i-1]+cost[i-1],dp[i-2]+cost[i-2])`，最终返回dp[cost.length]
:::


### 数字编码压缩

encode('aaab')--> "a3b1"

:::tip
创建空数组arr，设置初始i为0，遍历str，记录arr长度len，`const lastChar = len > 0 ? arr[len - 1][0] : undefined`，若lastChar===s，则将arr[len-1][1]++，否则将[s,1]push进l中，最终`return arr.map(x => x.join('')).join('')}`
:::

### 对象类型解码编码

```js title="示例"

const data = {
  a: 3,
  b: 4,
  c: 5,
};
// 对 data 编码后得到 querystring 如下
//=> 'a=3&b=4&c=5'
// a=3&b=4
stringify({ a: 3, b: 4 });
// a=3&b=
stringify({ a: 3, b: null });
// a=3&%E5%B1%B1=%E6%9C%88
stringify({ a: 3, 山: "月" });
```

:::tip
```js
function stringify(data) {
  const pairs = Object.entries(data);
  const qs = pairs
    .map(([k, v]) => {
      let noValue = false;
      if (v === null || v === undefined || typeof v === "object") {
        noValue = true;
      }
      return `${encodeURIComponent(k)}=${noValue ? "" : encodeURIComponent(v)}`;
    })
    .join("&");
  return qs;
}
```
:::

### jsonp跨域

:::tip
```js
function jsonp(url, params, callback) {
  // 判断是否含有参数
  let queryString = url.indexOf("?") === -1 ? "?" : "&";

  // 添加参数
  for (var k in params) {
    if (params.hasOwnProperty(k)) {
      queryString += k + "=" + params[k] + "&";
    }
  }

  // 处理回调函数名
  let random = Math.random()
      .toString()
      .replace(".", ""),
    callbackName = "myJsonp" + random;

  // 添加回调函数
  queryString += "callback=" + callbackName;

  // 构建请求
  let scriptNode = document.createElement("script");
  scriptNode.src = url + queryString;

  window[callbackName] = function() {
    // 调用回调函数
    callback(...arguments);

    // 删除这个引入的脚本
    document.getElementsByTagName("head")[0].removeChild(scriptNode);
  };

  // 发起请求
  document.getElementsByTagName("head")[0].appendChild(scriptNode);
}
```
:::

### Excel列名称查找列序号

```md
给你一个字符串s ，表示 Excel 表格中的列名称。返回 该列名称对应的列序号。 
A -> 1 
B -> 2 
C -> 3 
... 
Z -> 26 
AA -> 27 
AB -> 28
```

:::tip
声明result为0，遍历字符串，`result=result*26+(s[i].charCodeAt()-64)`，最终return result
:::

### excel表列序号查找列名称

给你一个整数n ，返回它在 Excel 表中相对应的列名称。

:::tip
设置空字符串str，n--,边缘判断若n为0则str为A，若n>0则进入while循环，设置temp为n%26余下的值，str为`String.fromCharCode(temp+65)+str`，n重新赋值为`Math.floor(n/26)-1`，特殊情况为n若为0则直接执行拼接 `str="A"+str`，最终返回str
:::

### topk问题

:::tip
1. sort后slice（0，k）————O(n^2)
2. 只遍历0到k的选择排序，最后slice（0，k）————O(k*n)
3. 基于快排
4. 基于大顶堆
:::



## 位运算

- “<<”运算符执行左移位运算。在移位运算过程中，符号位始终保持不变。如果右侧空出位置，则自动填充为 0；超出 32 位的值，则自动丢弃。

- >>：带符号右移。正数右移高位补0，负数右移高位补1

- >>>：无符号右移。无论是正数还是负数，高位通通补0
- 按位与(AND) & ：组合操作二进制数中对应的位，如果对应的位都为1，那么结果就是1， 如果任意一个位是0 则结果就是0。
- 按位或(OR) |：对应的位中任一个操作数为1 那么结果就是1。
- 按位异或(XOR) ^：两个操作位有且仅有一个1时结果为1，其他都是0。
- 按位非(NOT) ~：~ 运算符是对位求反，1变0, 0变1，也就是求二进制的反码。

- 位运算符的运用：

1. 使用&运算符判断一个数的奇偶

```js
console.log(2 & 1)    // 0
console.log(3 & 1)    // 1
```
2. 使用~, >>, <<, >>>, |来取整

```js
console.log(~~ 6.83)    // 6
console.log(6.83 >> 0)  // 6
console.log(6.83 << 0)  // 6
console.log(6.83 | 0)   // 6
// >>>不可对负数取整
console.log(6.83 >>> 0)   // 6
```
3. 使用^来完成值交换

```js
var a = 5
var b = 8
a ^= b
b ^= a
a ^= b
console.log(a)   // 8
console.log(b)   // 5
```

4. 使用&, >>, |来完成rgb值和16进制颜色值之间的转换

```js
 function hexToRGB(hex) {
    var hexx = hex.replace('#', '0x')
    var r = hexx >> 16
    var g = hexx >> 8 & 0xff
    var b = hexx & 0xff
    return `rgb(${r}, ${g}, ${b})`
}

/**
 * RGB颜色转16进制颜色
 * @param  {String} rgb RGB进制颜色字符串
 * @return {String}     16进制颜色字符串
 */
function RGBToHex(rgb) {
    var rgbArr = rgb.split(/[^\d]+/)
    var color = rgbArr[1]<<16 | rgbArr[2]<<8 | rgbArr[3]
    return '#'+ color.toString(16)
}
// -------------------------------------------------
hexToRGB('#ffffff')               // 'rgb(255,255,255)'
RGBToHex('rgb(255,255,255)')      // '#ffffff'

```

5. `n&(n-1)`，如果为0，说明n是2的整数幂

查找只出现一次的数字

:::tip
设置ans为0，forof遍历arr，`ans^=item`，最外层返回ans
:::

两数位运算求和

:::tip
sum(a,b)：判断若a为0则返回b，b为0则返回a，声明newA为a^b，newB为(a&b)<<1，返回sum(newA,newB)
:::

计算2的n次方

:::tip
`1<<n`
:::

二进制字符串求和

给定两个二进制字符串，返回他们的和，用二进制表示

参数为a,b

:::tip
设置result为''，设置pro为0，`let i=a.length-1,j=b.length-1;i>=0||j>=0;i--,j--`进入循环，设置sum=pro，若i大于等于0，则将a[i]转换为parseInt并sum+=，若j大于等于0同理b[j]转换并sum+=，然后用`result+=sum%2`，`pro=Math.floor(sum/2)`，跳出循环后判断pro是否等于1，若等于1则result+=pro，最终返回处理结果反转
:::

颠倒二进制位

颠倒给定的32位无符号整数的二进制位

:::tip
先用`n.toString(2)`将其转换为二进制表示的字符串，再将值split("")变为数组，如果len小于32则进入while，往数组前面unshift(0)，最终将数组reverse再join，最后返回`parseInt(result,2)`
:::

4的幂

判断整数是否是4的幂次方。

:::tip
1. 判断边缘是否为0，然后不断地除4，只要中间有一步4无法被整除，它就不是4的幂。如果这个整数除到最后是1，说明它是4的幂。
2. 4、16、64…这样的数。他们的二进制数为100、10000、1000000这样的形式，我们可以发现第一位为1，其它位都为0，且0的个数是偶数个。判断一个数只有最高位是1： `(n&(n-1)) == 0`判断一个数其它偶数个数都是0 => 这个数的1出现在偶数二进制位上（10000的1在第4位）=> 这个数和10101010101010101010101010101010的与，必然为0：` (n&0xAAAAAAAA ) == 0`于是结果为 `return n>0 && (n&(n-1))==0 && (n&0xAAAAAAAA)==0`
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
   用apply实现：参数处理为`(context,...args)`
   that存储this，return函数内`that.apply(context,args)`
:::

:::caution 实现Softbind
```js
Function.prototype.softBind=function(obj,...rest){
    const fn=this;
    const bound=function(...args){
        const o=!this || this===(window || global) ? obj : this;
        return fn.apply(o,[...rest,...args]);
    }
    bound.prototype=Object.create(fn.prototype);
    return bound;

}
```

### 实现栈

```js
class Stack {
 constructor() {
 this.stack = []
 }
}
```

:::tip
1. push(item)：`this.stack.push(item)`
2. pop：`this.stack.pop()`
3. getCount：`return stack.length`
4. peek：`return this.stack[this.getCount()-1]`
5. isEmpty：`return this.getCount()===0`
:::

### 实现单链队列

```js
class Queue {
 constructor() {
 this.queue = []
 }
}
```

:::tip
1. enQueue(item)：`this.queue.push(item)`
2. deQueue：`return this.queue.shift()`
3. getHeader：`return this.queue[0]`
4. getLength：`return this.queue.length`
5. isEmpty：`return this.getLength()===0`
:::

### 两个栈实现队列

:::tip
设置stack1和stack2位空数组
- push(node)：将node push进stack1中
- pop()：判断若stack2长度为0，则在stack1长度不为0的情况下进入while循环，将stack2中push进stack1.pop()值，最外层返回stack2.pop()
:::

### 实现包含min函数的栈

:::tip
设置stack为空数组，stackMin为空数组
- push(node)：判断若stack长度为0则将node push进stackMin中，若stack长度不为零则判断若node小于等于stackMin末尾的值则将node push到stackMin中，否则重复将stackMin中push进stackMin末尾值，最外层将node push进stack
- pop()：判断若stack长度为0则返回null，否则将stackMin.pop()，并返回stack.pop()
- top()：判断若stack长度为0则返回null，否则返回stack末尾值
- min()：返回stackMin末尾值
:::

### 实现Sample

从数组中随机取出一个元素

:::tip Array.prototype.sample
返回this[`Math.floor(Math.random()*this.length)`]
:::

### 实现SampleSize

从数组中随机取出n个元素

:::tip
1. 先调用sort传入`Math.random()-0.5`
2. 然后在slice(0,n)
:::

### 实现chunk

数组分组

传入list,size

:::tip
记录len，判断边缘size和len若不存在则返回空，若size大于len则返回[list]，设置result为空数组，设置`len/size`向下取整结果为integer，`len%size`取余结果为rest，0到integer进入循环，将`list.splice(0,size)`值push进result中，循环结束若rest存在则将`list.splice(0,rest)`值push进result。最终返回result
:::

### 实现once，记忆返回结果只执行一次

once(fn)

:::tip
声明result，设置flag为false，return 函数传入...args，若flag为true则返回result，否则声明r为fn(...args)，flag置为true，result置为r，最终返回r
:::

### 实现intersection，取数组交集

:::tip
```js
const intersection=(...list)=>{
const result=list.reduce((x,y)=>x.filter(i=>y.includes(i)))
return [...new Set(result)]
}
```
:::

### 实现indexof

传入arr和value

:::tip
判断边缘，记录数组长度为len，0到len遍历，若arr[i]等于value，返回i，最外层返回-1
:::

### 实现generator

### 实现instanceof

:::tip
设置proto为`Object.getPrototypeOf(obj)`，设置prototype为`fn.prototype`，while(true)进入循环，若proto不存在则返回false，若`proto===prototype`则返回true，若两者都没中，proto赋值为`Object.getPrototypeOf(proto)`
:::

### 实现new

:::tip
创建一个空对象obj，获取参数中的构造函数，`[].shift.call(arguments)`，`obj.__proto__=Con.prototype`，改变构造函数的this指向并执行函数`Con.apply(obj,arguments)`，用若是对象则返回对象`return result instanceof Object?result:obj`
:::

### 实现strStr()

给你两个字符串ss 和 str ，请你在 ss 字符串中找出 str 字符串出现的第一个位置（下标从 0 开始）。如果不存在，则返回 -1 。

:::tip
记录slen和strlen，i从0开始，当i+strlen小于等于slen时i++进入循环，设置flag为true，0到strlen进入内层循环，若ss[i+j]不等于str[j]，则设置flag为false，并且break，退出内层循环后，判断flag若为true则返回i，最外层返回-1
:::

### 实现延时函数sleep/delay

:::tip
```js
const sleep=(seconds)=>{
return new Promise(resolve=>setTimeout(resolve,seconds))
}
function delay(func,seconds,...args){
return new Promise((resolve,reject)=>{
setTimeout(()=>{
Promise.resolve(func(...args)).then(resolve)
},seconds)
})
}
```
:::

### LRU缓存

设计并实现一个满足LRU（最近最少使用）缓存约束的数据结构，实现LRUCache类

:::tip
- this.map为存储数据Map结构
- LRUCache.prototype.get=function(key){}：
判断this.map是否有key，有则get存储到value中，在this.map中delete掉，并重新给`this.map.set(key,value)`，然后返回value，最外层return -1
- ....put(key,value)：判断this.map是否有key，有则delete掉，判断完后调用set，然后判断当前this.map的长度size是否大于this.capacity，若大于则delete掉map第一个元素`this.map.keys().next().value`
:::

### 实现trim

:::tip
`return str.replace(/^\s+/,"").replace(/\s+$/,"");`或`str.replace(/^\s+|\s+$/g,'')`
:::

### EventEmitter

是事件触发与事件监听器功能的封装，EventEmitter是Node.js中提供的一个监听器类，类似于前端vue中的eventBus事件总线，原理主要是发布订阅者模式。

```js
function EventEmitter() {
    this.listeners = {};
    this.maxListener = 10;
}
//listeners：
{
  "event1": [f1,f2,f3]，
  "event2": [f4,f5]，
  ...
}
```

:::tip EventEmitter.prototype.on=function(event,listener)
设置listeners为this.listeners，若listeners[event]存在且listeners[event].length大于等于this.maxListener则抛出错误`  throw console.error('监听器的最大数量是%d,您已超出限制')`，判断若`listeners[event] instanceof Array`，则继续判断listeners[event]中不存在listener(indexOf)，则在其中push，若并未初始化(不是数组类型)，则将listeners[event]设置为[].concat(listener)，最终`EventEmitter.prototype.addListener = EventEmitter.prototype.on;`
:::

:::tip EventEmitter.prototype.emit=function (event)
用`Array.prototype.slice.call(arguments)·取出方法的参数列表赋值给args，并shift掉首位，forEach遍历this.listeners[event]，执行item.apply(null,args)
:::

:::tip EventEmitter.prototype.removeListener=function (event, listener)
设置listeners为this.listeners，设置arr为`listeners[event]||[]`，通过indexOf确定listener在arr中的位置i，若i大于等于0，则用splice(i,1)去除listeners[event]相应位置的值
:::

:::tip EventEmitter.prototype.once = function (event, listener)
设置that为this，声明函数fn，调用this.on(event,fn)
- fn：浅拷贝arguments到args` Array.prototype.slice.call(arguments)`，执行listener.apply(null,args)，执行完则调用that.removeListener(event,fn)
:::

:::tip EventEmitter.prototype.removeAllListener = function (event)
`this.listeners[event]=[]`
:::

:::tip EventEmitter.prototype.listeners = function (event)
` return this.listeners[event]`
:::

:::tip EventEmitter.prototype.setMaxListeners = function (num)
`this.maxListener = num`
:::

### 用setTimeout实现setInterval

fn,time

:::tip
声明timer对象中flag属性为true，setTimeout(interval,time)，最终return timer
- interval()：
判断timer.flag若为true则调用fn，并setTimeout(interval,time)
:::

### 实现reduce

list,fn,...init

:::tip
```js
const reduce=(list,fn,...init)=>{
let next=init.length?init[0]:list[0];
for(let i=init.length?0:1;i<list.length;i++){
next=fn(next,list[i],i)
}
return next;
}
```
:::

### 用reduce实现forEach,map,filter

:::tip
1. forEach：自定义函数名传入arr,handler，调用arr.reduce，参数为(pre,item,index)，函数内部调用handler(item,index)，传入初始值为null
2. map：自定义函数名传入arr,handler，设置result空数组，然后调用arr.reduce，参数为(pre,item,index)，函数内部声明变量mapItem赋值为handler(item,index)，然后将此变量push进result中，最外层返回result
3. filter：自定义函数名传入arr,handler，设置result空数组，然后调用arr.reduce，参数为(pre,item,index)，判断若handler(item,index)为true则将item push进result中，初始值传入null，最外层返回result
:::

### 实现promise.all

传入参数为_promises

:::tip
return new Promise传入resolve和reject，设置promises为Array.from(_promises)，声明空数组result，记录promises长度为len，设置count为0，0到len遍历，首先确保把所有数据转化为promise，调用
```js
Promise.resolve(promises[i]).then(res=>{
result[i]=res
if(++count===len){
  resolve(result)
}
}).catch(e=>reject(e))
```
:::

## 开发常见

### 深度优先遍历

node,nodeList=[]

:::tip
1. 递归：
若node存在，将其push进nodeList中，将node.children存储为children，0到children.length遍历，递归调用传入(children[i],nodeList)，最外层返回nodeList
2. 非递归：
若node存在，先设置stack为空数组，将node push进stack中，当stack.length不为0时进入while循环，将stack中末位pop出来存储为item，再将item存入nodeList，声明children为item.children，len-1到i大于等于0进入循环，将children[i] push进stack中，最外层返回nodeList
:::

### 广度优先遍历

node,nodeList=[]

:::tip
1. 递归：
声明i为0，若node存在则将node push进nodeList中，递归调用传入node.nextElementSibling，node赋值为nodeList[i++]，递归调用传入node.firstElemenChild，最外层返回nodeList
2. 非递归：
若node存在，声明queue为空数组，并unshift(node)，当queue.length存在时，声明item为queue.shift出的值，并将item push进nodeList中，声明children为item.children，0到len遍历children，将children[i] push进queue中
:::

### 累加函数（柯里化）

add(1)(2)(3) = 6; 
add(1,2,3)(4) = 10;

:::tip
- add()：
浅拷贝一个arguments到args，`Array.prototype.slice.call(arguments)`，最终return inner
 - 内inner()：
将...arguments push进args中，并返回inner
 - inner.toString()：
```js
return args.reduce(function(prev,cur){
  return prev+cur
})
```
:::

### xss转义

```js
function escape(str) {
 str = str.replace(/&/g, '&amp;')
 str = str.replace(/</g, '&lt;')
 str = str.replace(/>/g, '&gt;')
 str = str.replace(/"/g, '&quto;')
 str = str.replace(/'/g, '&#39;')
 str = str.replace(/`/g, '&#96;')
 str = str.replace(/\//g, '&#x2F;')
 return str
}
```

### 图片预加载

:::tip
用数组存储img，遍历数组，创建image对象，设置src为当前元素，设置style.width，设置img.onload中将图片元素appendChild进当前页面元素
:::

### 图片懒加载

:::tip
存储当前`document.documentElement.scrollTop`值为scrollTop，`window.innerdHeight`为winTop，获取当前页面img元素，遍历数组，判断当前元素的offsetTop值若小于`winTop+scrollTop`，则将当前元素的src设置为当前元素getAttribute('data-src')
:::

### 防抖节流

传入参数为fn，interval

:::tip
1. 节流：
   设置lastTime为0，return函数参数为...args，获取当前时间nowTime为`new Date().getTime()`，获取剩余时间remainTime为`nowTime-lastTime`，若剩余时间大于等于interval，则证明可以执行，执行函数`fn.apply(this,args)`，重新设置lastTime为nowTime
2. 防抖：
   设置time为null，return函数参数...args，若time不为null，则说明当前有定时器存在，将该定时器清除clearTimeout(time)，time设置为定时器` setTimeout(() => {
            fn()
        }, delay)`
:::

### 提取url中get参数

:::tip
设置空对象result，先取url.split("?")[1]，再继续split("&")存储为map，遍历map，`result[map[i].split("=")[0]]=map[i].split("=")[1]`，最终返回result
:::

### 定义log方法代理console.log()

:::tip
```js
console.log.apply(console,arguments)
```
:::

### 版本号比较

:::tip
1. 先将两个字符串都split分别存入数组arr1,arr2，记录两者长度len1,len2，记录两者最小值minlen，在外层先记录i等于0，进入for遍历minlen，将每个元素parseInt转成数字比较，若a>b则return 1，否则return -1，直到遍历结束
2. 现在说明两者最短木桶部分都对齐，判断len值，若len1>len2，则j以当前i值为初始值到len1进入循环，若当前元素转数字后不等于0，则最后return 1，否则return 0
3. 若len2大，则对len2进行相同处理，要么返回-1，要么返回0
4. 最外层为return 0，为两者长度相等且值相等的情况
:::

### dom转json格式

:::tip
首先通过querySelector或getElementsByClassName等方法获取到最外层元素root，然后创建一个空对象obj，将对象属性tagName设置为root.tagName，className设置为root.className，childs设置为getChilds(root)，最终返回JSON.stringfy(obj)
-  getChilds(node):将node.children存储到变量childs中，创建空数组result，判断边缘若无childs则返回result，for of 遍历childs，当前元素为child，创建空对象childobj，属性tagName，className分别设置为child的相应对象，属性childs设置为getChilds(child)，将当前childobj对象push进result中
   
最终返回result
:::

### 深比较

x,y

:::tip
先判断x===y若为true则返回true，若判断x为对象且不为null，且y同，则获取`Object.keys(x)`，若keysx的length不等于keysy的length，则返回false，若不然则遍历`const key of keysx`，判断`isEqual(x[key],y[key])`，若为false则返回false，若都没进入判断则返回true，最终的else返回false
:::

### 深克隆/深拷贝

参数为obj

:::tip
声明result，判断obj是否为引用类型，若为引用类型则继续判断是否为数组，是数组的话将result赋值为[]，for of遍历obj，将deepClone(val)的值push到result中，若判断为对象，则将result赋值为{}，for in遍历obj，`result[item]=deepClone(obj[item])`，最终return result，若判断并不是引用类型则直接return obj。
:::

### Ajax创建

:::tip
```js
//ajax-get
let xhr=new XMLHttpRequest();
xhr.open("get","validata.php?username="+name);
xhr.send(null);
xhr.onreadystatechange=function(){
if(xhr.status==200&&xhr.readyState==4){
console.log(xhr.responseText);
document.querySelector(".showmsg").innerHTML=xhr.responseText;
}
}
//ajax-post
let xhr=new XMLHttpRequest();
xhr.open("post","validate.php");
xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
xhr.send("username="+name);
xhr.onreadystatechange=function(){
if(xhr.status==200&&xhr.readyState==4){
...
}
}
```
:::

### Promise封装ajax

:::tip
- sendAjax():传统方式创建promise，在里面写ajax请求，创建，open，send，onreadystatechange，当readyState为4，当status>=200且<300时，resolve(xhr.response)，否则reject(xhr.status)，最终返回promise
- `sendAjax().then(value=>{...},reason=>{...})
:::

### cookie封装

:::tip
- setCookie(name,val,n):创建new Date，`date.setDate(date.getDate()+n)`，然后设置`document.cookie=name+'='+escape(val)+';expires='+date`
- getCookie(name):获取document.cookie.split("=")赋值给arr，遍历arr，设置arrcookie为`arr[i].split("=")`，若arrcookie[0]等于name，则`return unescape(arrcookie[1])`
- removeCookie(name):`setCookie(name,1,-1)`
:::

### 事件委托

:::tip
```js
let myUI=document.getElementById("my-ui");
myUI.addEventListener('click',function(e){
if(e.target.tagName=='LI'){
alert(e.target.innerText);
}
})
```
:::

### 数组转树

```md
let data = [ 
{ id: 0, parentId: null, name: '生物' }, 
{ id: 1, parentId: 0, name: '动物' }, 
{ id: 2, parentId: 0, name: '植物' }, 
{ id: 3, parentId: 0, name: '微生物' }, 
{ id: 4, parentId: 1, name: '哺乳动物' }, 
{ id: 5, parentId: 1, name: '卵生动物' }, 
{ id: 6, parentId: 2, name: '种子植物' }, 
{ id: 7, parentId: 2, name: '蕨类植物' }, 
{ id: 8, parentId: 4, name: '大象' }, 
{ id: 9, parentId: 4, name: '海豚' }, 
{ id: 10, parentId: 4, name: '猩猩' }, 
{ id: 11, parentId: 5, name: '蟒蛇' }, 
{ id: 12, parentId: 5, name: '麻雀' } 
]
对象数组一定要按照id值排好序，每个对象id唯一，但不同对象的parentId可以相同，可根据parentId找到其父元素
```

参数为data

:::tip
设置result为[]，map为{}，若data不是数组，直接return []，forEach遍历data，`map[item.id]=item`，遍历结束后再次遍历data，声明parent变量为map[item.parentId]，若parent存在，则`(parent.children||(parent.children=[])).push(item)`，若不存在则将item push进result中，最终return result。
`console.log(JSON.stringfy(transTree(data)))`
:::

### 树转数组

```md
let node = { 
"id": 0, 
"parentId": null, 
"name": "生物", 
"children": [{ 
"id": 1, 
"parentId": 0, 
"name": "动物", 
"children": [{ 
"id": 4, 
"parentId": 1, 
"name": "哺乳动物", 
"children": [{ 
"id": 8, 
"parentId": 4, 
"name": "大象" 
}, { 
"id": 9, 
"parentId": 4, 
"name": "海豚" 
}, { 
"id": 10, 
"parentId": 4, 
"name": "猩猩" 
}] 
}, { 
"id": 5, 
"parentId": 1, 
"name": "卵生动物", 
"children": [{ 
"id": 11, 
"parentId": 5, 
"name": "蟒蛇" 
}, { 
"id": 12, 
"parentId": 5, 
"name": "麻雀" 
}] 
}] 
}, { 
"id": 2, 
"parentId": 0, 
"name": "植物", 
"children": [{ 
"id": 6, 
"parentId": 2, 
"name": "种子植物" 
}, { 
"id": 7, 
"parentId": 2, 
"name": "蕨类植物" 
}] 
}, { 
"id": 3, 
"parentId": 0, 
"name": "微生物" 
}]}
```

参数为node

:::tip
设置queue初始值为[node]，设置data为空数组，当queue的len不为=时进入while，设置item为queue.shift()，`data.push({
id:item.id,
parentId:item.parentId,
name:item.name
})`，设置children为item.children，若children存在，则遍历children，将值push进queue里，最终返回data
:::

### 使用闭包隔一秒打印 1,2,3,4

:::tip
0到5进行遍历，进入匿名函数参数为i，setTimeout里传入时间为i*1000，传入函数内console.log(i)，或者整个匿名函数用let代替也可以
:::

### 通用事件侦听器函数

:::tip
```js
markyun.Event = {
// 视能⼒分别使⽤dom0||dom2||IE⽅式 来绑定事件
// 参数： 操作的元素,事件名称 ,事件处理程序
addEvent : function(element, type, handler) {
if (element.addEventListener) {
//事件类型、需要执⾏的函数、是否捕捉
element.addEventListener(type, handler, false);
} else if (element.attachEvent) {
element.attachEvent('on' + type, function() {
handler.call(element);
});
} else {
element['on' + type] = handler;
}
},
// 移除事件
removeEvent : function(element, type, handler) {
if (element.removeEventListener) {
element.removeEventListener(type, handler, false);
} else if (element.datachEvent) {
element.detachEvent('on' + type, handler);
} else {
element['on' + type] = null;
}
},
// 阻⽌事件 (主要是事件冒泡，因为IE不⽀持事件捕获)
stopPropagation : function(ev) {if (ev.stopPropagation) {
ev.stopPropagation();
} else {
ev.cancelBubble = true;
}
},
// 取消事件的默认⾏为
preventDefault : function(event) {
if (event.preventDefault) {
event.preventDefault();
} else {
event.returnValue = false;
}
},
// 获取事件⽬标
getTarget : function(event) {
return event.target || event.srcElement;
}
```
:::

### url化

编写一种方法，将字符串中的空格全部替换为%20。假定该字符串尾部有足够的空间存放新增字符，并且知道字符串的“真实”长度。

:::tip
```js
function replaceSpaces(S, length) {
  return S.replace(/\s/g, (s, i) => (i >= length ? "" : "%20"));
};
```
:::

### 继承的圣杯模式

为了son继承father原型上的东西还可以修改自己原型上的东西，对father的原型不影响

:::tip
```js
function inherit(target,origin){
function F(){}//中间层，上连father，下连son，使两函数互不干扰
F.prototype=origin.prototype;
target.prototype=new F();
target.prototype.construtor=target;
target.prototype.uber=origin.prototype;
}
Father.prototype.lastName = "Deng";
        function Father(){}
        function Son(){}
        inherit(Son,Father);
        // 运行函数，形参实参相统一
        var son = new Son();
        var father = new Father();
```
:::