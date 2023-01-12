---
sidebar_position: 7
---

# Promise

异步编程解决措施

- 对象

三种状态
- pending
- fulfilled
- rejected

:::tip advantage
支持链式调用（传入then的函数必须有返回值），解决回调地狱，指定回调函数的方式更加灵活
:::
:::danger
创建即执行，无法取消，若不设置回调，内部的错误不会反映到外部
:::
