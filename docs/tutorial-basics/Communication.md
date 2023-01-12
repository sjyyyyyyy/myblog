---
sidebar_position: 3
---

# 通信方式

常见通信方式

## 跨标签页通信
```html 

1.localStorage可用于解决两个同源页面通信

// pageA.html
<body>
  <h1>pageA</h1>
</body>
<script>
  window.addEventListener("storage", (e) => {
    console.info("localStorage发生变化：", e)
  })
</script>
// pageB.html
<body>
  <h1>pageB</h1>
  <button id="btnB">添加数据到localStorage</button>
</body>
<script>
  let btnB = document.getElementById("btnB");
  let num = 0;
  btnB.addEventListener("click", () => {
    localStorage.setItem("num", num++)
  })
</script>
//当我们点击pageB中的按钮时，会更改localStorage中的值。然后在pageA中的storage监听函数便会监听到localStorage发生变化。可以看到在pageA中不仅可以拿到改变后的值，还可以拿到改变之前的值。通过这种方式，我们就可以将两个页面的数据进行同步了。当然，如果你只是需要两个页面之间数据共享，那么可以不使用storage监听方法，直接通过localStorage.getItem()获取即可。

2.webSocket//可跨域

3.Shared Worker postMessage//不能跨域

4.cookie+setInterval//不能跨域

//pageA
<script>
  setInterval(() => {
    //加入定时器，让函数每一秒就调用一次，实现页面刷新
    console.log("cookie",document.cookie)
  }, 1000);
</script>
//pageB
<script>
  let btnB = document.getElementById("btnB");
  let num = 0;
  btnB.addEventListener("click", () => {
    document.cookie = `客户端B发送的消息:${num++}`
  })
</script>
```