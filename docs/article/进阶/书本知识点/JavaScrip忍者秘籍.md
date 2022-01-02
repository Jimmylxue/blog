# 《JavaScript 忍者秘籍》知识点

::: tip 前言
这个记录顺序是按章节但是知识点是零散的记录，录入的内容并不会非常的细微，均是以我还不了解、不掌握、或觉得有意思/意义的知识点。
:::

### 第一部分热身

这一章介绍了 JavaScript 的语言特性，以及核心要素，强调了 JS 的强大，能够实现一种语言开发各个方向的应用。一些概念性的问题终于明白了。

- **函数是一等公民**

  在 JS 中，函数与其他对象共存，并且能够像对象一样进行使用，可以通过字面量创建，可以赋值给对象，可以做为函数参数进行传参，甚至函数的返回值也可以是函数。

  函数几乎无所不能，所以函数是 JS 的一等公民

- **web 应用的生命周期相关知识**

  典型的客户端 web 应用生命周期是在浏览器输入 url 之后链接开始，直到用户关闭了这个浏览器。

  关键步骤，也是生命周期阶段：

  - 页面构建
  - 事件处理

- **为什么更加推荐使用`addEventLinstener`而不是属性绑定事件如`onclick`**

  使用`onclick`只能绑定一个事件处理函数（事件监听器），写多个的效果只能是将之前的监听器进行覆盖，而`addEventLinstener`可以绑定多个监听器。

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>
    <body>
      <button id="btn1">btn1</button>
      <button id="btn2">btn2</button>
      <script>
        let btn1 = document.getElementById('btn1');
        let btn2 = document.getElementById('btn2');
        btn1.onclick = () => {
          console.log('hello world1');
        };
        btn1.onclick = () => {
          console.log('前端加油站：http://www.jimmyxuexue.top:999/');
        };
        btn2.addEventListener('click', () => {
          console.log('公众号：Jimmy前端');
        });
        btn2.addEventListener('click', () => {
          console.log('B站：Jimmyhao');
        });
      </script>
    </body>
  </html>
  
  ```

  点击 **按钮1** 和 **按钮2** 输出结果

  ![image-20220102185911336](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220102185911336.png)

- **事件队列的事件以什么顺序进行处理**

给了一个例子，给一个元素添加`mousemove`和`click`事件并绑定了对应的监听器函数，事件的处理顺序是，当发生了一个事件之后，会将这个事件对应的监听器函数推入 **事件队列** 中，之后再去轮询 **事件队列** ，从队首中取出对应的监听器执行，执行结束之后将这个监听器移出队列。

用户的鼠标移动和点击一定有先后的，先执行的事件会先被放入 **事件队列** ，后执行的追加到队尾，主线程结束之后轮询队首，以此过程来保证执行的顺序不出错。

