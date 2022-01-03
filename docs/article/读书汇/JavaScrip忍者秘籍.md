# 《JavaScript 忍者秘籍》记录

::: tip 前言
这个记录顺序是按章节但是知识点是零散的记录，录入的内容并不会非常的细微，均是以我还不了解、不掌握、或觉得有意思/意义的知识点。
:::

## 第一部分热身

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

- **事件队列的事件以什么顺序进行处理**

给了一个例子，给一个元素添加`mousemove`和`click`事件并绑定了对应的监听器函数，事件的处理顺序是，当发生了一个事件之后，会将这个事件对应的监听器函数推入 **事件队列** 中，之后再去轮询 **事件队列** ，从队首中取出对应的监听器执行，执行结束之后将这个监听器移出队列。

用户的鼠标移动和点击一定有先后的，先执行的事件会先被放入 **事件队列** ，后执行的追加到队尾，主线程结束之后轮询队首，以此过程来保证执行的顺序不出错。

## 第二部分 理解函数

函数作为 JS 的一等公民，所以这本忍者书并没有像其他书籍一样先介绍对象，而是选择直接介绍函数。

### 回调函数并不是都是异步

回调函数 =》我们建立的函数会被其他函数在稍后的某个合适的时间点 ”再回来调用“

在过于因为使用：事件、网络请求、node 的一些 API 之后，我误认为所有的回调函数都是异步，其实不是这样的，我们先思考一个问题：

#### 数组的 map 方法是异步的吗

先思考这个例子输出的结果是什么

```js
let arr = [1, 2, 3, 4, 5];
arr.map((item) => {
  console.log(item);
});
console.log('主线程');
```

大家是否有被我误导到，我特意写一个主线程，会有人和我一样认为结果是：先输出主线程再输出 1,2,3,4,5 吗？

不怕大家笑话，这个在过去我一直认为它是异步的，因为这个事情我甚至一脸不屑的和公司的同事讨论过，我始终认为我是对的，结果一上代码测试结果我傻了，居然是同步的！！！这个一下子就颠覆了我的三观，原来自己学的一直都不到位。

好吧公布答案：

![image-20220103230652865](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220103230652865.png)

总结下来就是，回调函数并非都是异步的，当然也有人认为回调函数是异步的，只是这种回调函数并不是纯种的回调函数~好吧，我现在始终坚信，回调函数并非都是异步的。

### 存储函数

因为函数是一等公民，它也是对象，可以通过设置属性的方式进行存值，对应`class`语法也就是`static`的使用。

思考这个例子：我们需要维护一个回调函数集合，需要保证这个集合中肯定不会出现重复的回调函数。

抛开`ES6`的一些`Set`之类的 API，你会有什么样的解决思路的？我先说我的：将回调函数都存到一个数组中，每次存入都判断数组是否含有这个回调函数，如果含有就不存，不含有就存。代码如下：

```js
let fnArr = [];
let clickFn = () => {
  console.log('点击事件的回调');
};
function addFn(fn) {
  if (fnArr.includes(fn)) {
    console.log('已经有了');
    return;
  }
  fnArr.push(fn);
  console.log('加入成功');
}

addFn(clickFn); // 加入成功
addFn(clickFn); // 已经有了
```

这样写其实没什么毛病，但是性能相对较差，很简单，如果存储的数组量比较大了，那么每次查找是否有这个回调函数的时候就会花上比较多的时间，所以书中推荐了一种 **忍者** 的写法，所谓忍者，就是要把事情干的漂亮，而不是做到能用就好。

```js
let store = {
    nextIndex:1,
    cache:{},
    add(fn){
        console.log(111,fn)
        if(!fn.id){
            fn.id = this.nextIndex++
            this.cache[fn.id] = fn
            console.log('存储上了')
            return
        }
        console.log('已经有了')
    }
}
function clickFn = ()=>{
    console.log('点击事件回调函数')
}

store.add(clickFn) // 存储上了
store.add(clickFn) // 已经有了
```

这样的写法真是太精妙了，巧妙的用到了函数 **一等公民** 的身份，利用函数作为对象形象存值，这样的写的好处在于就算已经存储了一万个回调函数，它的速度还是一样的快！！！这就是 **忍者秘籍** ！

果然，用函数和用好函数是两回事！😯
