---
sidebar_position: 1
---

# Ajax

服务器交互基础

- 异步模式，在客户端运行，减少了大用户量下的服务器负载，局部刷新，暴露了与服务器交互的细节，不易调试，对搜索引擎的支持较弱
- XMLHttpRequest对象：用于向web服务器发起HTTP请求信息并接收服务器返回的响应消息，解析响应消息内容，呈现到HTMLDOM树上
  
## 创建方式

```jsx title="get与post示例"
//ajax-get方式请求案例：
var xhr = new XMLHttpRequest();
//open(METHOD请求方法8个,URL,true是否异步)找到服务器并链接
xhr.open("get","validate.php?username="+name);
//send("k1=v1&k2=v2"/null)发送请求POST/GET
xhr.send(null);
xhr.onreadystatechange = function(){
    if(xhr.status == 200 && xhr.readyState == 4){ 
        console.log(xhr.responseText);
        document.querySelector(".showmsg").innerHTML = xhr.responseText;;
    }
}

//ajax-post方式请求案例：
var xhr = new XMLHttpRequest();
xhr.open("post","validate.php");
//setRequestHeader(NAME,VALUE)设置请求消息头部
//getResponseHeader(NAME)获取某个响应消息头部
//getAllResponseHeaders()获取所有响应消息头部
//使用xhr对象接收响应消息xhr.setRequestHeader("content-Type","application/Javascript")
xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
xhr.send("username="+name);
xhr.onreadystatechange = function(){
    // 判断服务器是否响应，判断异步对象的响应状态
    if(xhr.status == 200 && xhr.readyState == 4){
        document.querySelector(".showmsg").innerHTML = xhr.responseText;
    }
}
```

## 元数据

- readyState(只读属性，用于描述xhr当前状态)：

0 UNSENT（请求尚未发送）-> 
xhr.open()-> 
1 OPENED（链接被打开）-> 
xhr.send()-> 
2 HEADERS_KELEIVED（开始接收响应信息头部和起始行）-> 
自动-> 
3 LOADING（加载响应主体）-> 
自动-> 
4 DONE（响应消息接收完成）

onreadystatechange()只要xhr.readystate值发生改变就会触发此事件

- response(响应主体)：

 responseText响应主体文本格式 responseType响应主体类型 responseURL响应消息路径 responseXML响应消息主体XML格式 status响应消息状态码（readyState变为2就有值了）