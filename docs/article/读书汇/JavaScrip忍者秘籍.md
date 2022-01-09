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

:::demo

```vue
<template>
  <div class="demo">
    <iframe
      src="//player.bilibili.com/player.html?aid=680393211&bvid=BV1gS4y1T7E1&cid=477531971&page=1"
      scrolling="no"
      border="0"
      frameborder="no"
      framespacing="0"
      allowfullscreen="true"
    >
    </iframe>
  </div>
</template>
<style>
.demo > iframe {
  width: 100%;
  height: 450px;
}
</style>
```

:::

### 关于 this

在我作为 JavaScript 开发者前期一直困扰着我，但随着自己的积累，慢慢的已经懂得了在不同场景下 this 的指向问题，最后通过忍者秘籍的总结，算是彻底搞明白了，this 指向在以下情况下将有所不同:

- 作为一个函数调用(function),直接被调用
- 作为一个方法(method)被调用
- 作为一个构造函数(constructor),被实例化
- 通过`apply()`、`call()`方法

#### 作为函数被调用

当函数作为普通函数被调用时，也分为两种情况

- 在非严格模式下，this 指向 `window`
- 在严格模式下,this 指向 `undefined`

```js
function show() {
  console.log('show:this', this);
}

show();

function strictShow() {
  'use strict';
  console.log('strictShow:this', this);
}

strictShow();
```

![image-20220107222840372](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220107222840372.png)

#### 作为方法被调用

当函数时作为一个对象的某个属性时,我们更加习惯称呼这个函数为方法。

当通过方法被调用时，this 指向的时方法的拥有者。

```js
let obj = {
  wx: '公众号:Jimmy前端',
  bilibili: 'Jimmyhao',
  docs: 'http://www.jimmyxuexue.top:999/',
  show1() {
    console.log('show1_this', this);
  },
  show2: function () {
    console.log('show2_this', this);
  },
  show3: () => {
    console.log('show3_this', this);
  },
};
obj.show1();
obj.show2();
obj.show3();
```

![image-20220107223419337](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220107223419337.png)

show1 的写法和 show2 的写法最终的效果是一样的,箭头函数的 this 指向的是它所处环境(它的上一级)的 this

#### 作为构造函数使用

一个构造函数在`new`的过程主要发生了以下几件事:

- 创建一个空对象
- 该空对象作为 this 参数传递给构造函数,从而成为构造函数的上下文
- 新构造的对象作为`new`运算符的返回值返回(**在构造函数显示返回对象时会有例外,返回的显示返回的对象**)

```js
function User() {
  this.wx = '公众号:Jimmy前端';
  this.bilibili = 'Jimmyhao';
  this.docs = '在线文档:http://www.jimmyxuexue.top:999/';
}

let Jimmy = new User();
console.log('jimmy', Jimmy);
```

![image-20220107224114932](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220107224114932.png)

##### 具体例外情况:

- 当构造函数本身返回的非对象时,this 走的还是正常初始化流程

  ```js
  function User() {
    this.wx = '公众号:Jimmy前端';
    this.bilibili = 'Jimmyhao';
    this.docs = '在线文档:http://www.jimmyxuexue.top:999/';
    return 1;
  }
  let Jimmy = new User();
  console.log('jimmy', Jimmy);
  ```

  ![image-20220107224402543](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220107224402543.png)

- 当构造函数返回的是对象时,会忽略掉初始化的流程,直接将返回值作为 new 的结果进行返回

  ```js
  function User() {
    this.wx = '公众号:Jimmy前端';
    this.bilibili = 'Jimmyhao';
    this.docs = '在线文档:http://www.jimmyxuexue.top:999/';
    return {
      name: 'Jimmyxuexue',
      age: 22,
    };
  }
  let Jimmy = new User();
  console.log('jimmy', Jimmy);
  ```

  ![image-20220107224445973](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220107224445973.png)

#### 通过 call 和 apply 显示修改 this

call 和 apply 是可以显示修改 this 绑定的,这两个方法也是开发中非常常用的方法,如果有阅读他人源码时会发现使用的更加之多,二者的具体区别在于:

- call 在修改 this 同时如果需要传参时单个单个传

  ```js
  let jimmy = {
    wx: '公众号:Jimmy前端',
    bilibili: 'Jimmyhao',
    docs: '在线文档:http://www.jimmyxuexue.top:999/',
  };

  function show(...args) {
    console.log(this, args);
  }

  show.call(jimmy, 1, 2, 3);
  ```

![image-20220107225038481](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220107225038481.png)

- apply 在修改 this 同时如果需要传参传递的是一个数组

  ```js
  let jimmy = {
    wx: '公众号:Jimmy前端',
    bilibili: 'Jimmyhao',
    docs: '在线文档:http://www.jimmyxuexue.top:999/',
  };

  function show(...args) {
    console.log(this, args);
  }

  show.apply(jimmy, [1, 2, 3]);
  ```

  ![image-20220107225159819](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220107225159819.png)

- 如果不传参二者基本无区别

在过去我总是会吧 call 和 apply 两个弄混淆,但是现在有个比较方法的记法:我们可以这样想,apply 比 call 字母更多,所以需要传递更大的东西,数组肯定比单个元素能放的东西更多,所以 apply 传参数是通过数组的方式!

总结下来 this 的指向我们其实只要参考这几个公式,基本就能够像忍者一样非常稳健的找出 this 的所在了.

:::demo

```vue
<template>
  <div class="demo">
    <iframe
      src="//player.bilibili.com/player.html?aid=295567266&bvid=BV14F411v7Q2&cid=479910067&page=1"
      scrolling="no"
      border="0"
      frameborder="no"
      framespacing="0"
      allowfullscreen="true"
    >
    </iframe>
  </div>
</template>
<style>
.demo > iframe {
  width: 100%;
  height: 450px;
}
</style>
```

:::
