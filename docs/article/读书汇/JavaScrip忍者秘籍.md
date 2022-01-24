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

### 理解闭包

闭包在 JS 这门语言中真的算是一个八股文级别的知识点，大部分开发者包括我在内，都对闭包这个词存在着恐惧，但是其实我们日常的开发中，无时无刻不在使用这闭包，只是我们不知道！所以闭包的概念是非常重要的。如我们日常频繁使用的回调函数，本质都是闭包！

如果没有闭包，事情将会变得非常复杂 ----- 如果么有闭包，事件处理和动画等包含回调函数的任务，他们的实现将会变得复杂很多。

#### 简单的例子 - 利用闭包实现累加函数

```js
function addFn() {
  let count = 0;
  return () => {
    return count++;
  };
}
let add = addFn();
console.log(add()); // 0
console.log(add()); // 1
console.log(add()); // 2
```

以上便是闭包的一个非常简单的应用，大部分的函数，在执行之后都会因为 JS 的垃圾回收机制清空掉一些定义的变量，但是大家发现没有，这个例子的 `count` 值被神奇的记录下来了，而且还一直存在！！！

因为 js 使用的是 **词法作用域** ，所谓词法作用域，也就是说一个函数或者变量的所在作用域是在书写函数的时候就定下来的，而不管这个函数具体在哪里执行，它都可以访问定义这个函数时候所在作用域的一些值。！！！

也正是因为函数是 JS 的一等公民，允许某个函数已返回值或者传参的形式传入，这就导致函数执行位置和定义函数时所在的位置不同，这时候，闭包就产生了！

#### 使用闭包封装私有变量

原生的 JS 是不支持私有变量的，但是通过闭包，我们可以实现一个很接近的私有变量。

```js
function User() {
  let fans = 0;
  this.getFans = () => {
    return fans;
  };
  this.addFans = () => {
    fans++;
  };
}

let jimmy = new User();
console.log(jimmy.fans); // undefined
jimmy.getFans(); // 0
```

getFans 和 addFans 由于作用域规则它是可以访问函数内部的 fans 这个变量的，且只有在构造器内部才能访问它，我们通过使用 jimmy.getFans()本质上也是把函数在外部进行调用了，调用区域和定义的区域发生了差异，这时候闭包就会产生。并且只要这个函数存在，其内部的闭包就会一直存在！！！

#### 回调函数本质上也是闭包

```html
<div id="box">hello world</div>
<script>
  function animate(elementId) {
    let elem = document.getElementById(elementId);
    let tick = 0;
    let timer = setInterval(() => {
      if (tick < 100) {
        elem.style.left = elem.style.top = tick + 'px';
        tick++;
      } else {
        clearInterval(timer);
      }
    }, 10);
  }
  animate('box1');
</script>
```

这里 setInterval 的第一个参数传递的是一个回调函数，每次执行都会生成一个闭包，基于闭包，使得回调函数中可以访问到前面定义的 elem tick 这些变量。

也可以这么理解，回调函数的词法作用域能够访问 elem tick 这些变量的，所以回调函数无论被谁调用，在哪儿调用，都能访问到闭包这个区域的作用域上的变量。

如果没有闭包，我们的代码可能就要这么写

```html
<div id="box">hello world</div>
<script>
  function animate(elementId) {
    let timer = setInterval(() => {
      if (tick < 100) {
        // 如果没有了闭包，说明没有了存储值的能力，所以回调函数每次使用都得重新获取一次值，效率非常之低效
        let elem = document.getElementById(elementId);
        let tick = 0;
        elem.style.left = elem.style.top = tick + 'px';
        tick++;
      } else {
        clearInterval(timer);
      }
    }, 10);
  }
  animate('box1');
</script>
```

#### 总结

一道经典的闭包面试题：

**闭包的作用**

- 变量长期驻扎在内存当中（一般函数执行完毕，变量和参数会被销毁）
- 避免全局变量的污染

**闭包的另外一面**

- 闭包会记住作用域链的全部信息，因此我们不能过度使用。过度使用也会造成性能和效率问题

:::demo

```vue
<template>
  <div class="demo">
    <iframe
      src="//player.bilibili.com/player.html?aid=978133698&bvid=BV1144y15786&cid=485019585&page=1"
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

### 未来的函数：生成器

普通的函数，从头运行到尾，最多只会生成一个值。因为普通函数最多只有一个 return

过去我也看了蛮多 JS 类书籍，看到生成器这一块只是学习了它的 API，发现自己在工作中似乎是没有能够使用生成器函数的场景，使用到的还是基于生成器封装的`async await`之类的高级 API，以致于我在怀疑这一块需要深入了解吗？应付面试应该就可以了吧

但是！我看到了这本书上的一句对我来说“惊天动地”的一句话：“生成器经常被作为一种古怪不常用的语言特性，**普通水平**的程序员一般不会使用这个特性。”，这个普通水平好似千斤，重重的压在了我的心头。

#### 生成器的基本知识

生成器在执行时并不会和普通函数一样执行函数内部的内容，生成器函数在执行之后会返回一个迭代对象。而迭代对象内部其实是有`next()`、`throw()`方法的。

迭代器：**iterator**

```js
function* Book() {
  console.log('comming!');
  yield 'bilibili：Jimmyhao';
  yield '公众号：Jimmy前端';
}
let jimmy = Book();
console.log('jimmy', jimmy);
```

![image-20220115140103539](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220115140103539.png)

我们通过 next 方法来迭代

```js
jimmy.next(); // {value: 'bilibili：Jimmyhao', done: false}
jimmy.next(); // {value: '公众号：Jimmy前端', done: false}
jimmy.next(); // {value: undefined, done: true}
```

迭代器每次执行都会返回一个含有迭代信息的对象，分别是值和是否结束的状态。

for-of 循环其实是遍历迭代器的，之所以数组可以使用 for-of，对象不能使用 for-of，是因为数组内部含有 iterator 属性，而对象没有

![image-20220115140610327](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220115140610327.png)

#### 生成器的特点

每当生成器生成（迭代）一个值后，生成器就会非阻塞的挂起，随后耐心的等待下次迭代请求的到达

**使用 yield 操作符将执行权交给另外一个生成器**

```js
function* AboutMe() {
  yield 'bilibili:Jimmy前端';
  yield* Others();
  yield '公众号：Jimmy前端';
}
function* Others() {
  yield '在线文档：http://www.jimmyxuexue.top:999/';
}

for (let msg of AboutMe()) {
  console.log(msg);
}
```

![image-20220115141233022](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220115141233022.png)

在迭代器上使用 `yield*` 操作符，程序会跳转到另外一个生成器上执行，当然这个过程也是处于非阻塞的挂起执行

#### 用生成器生成 ID 序列

```js
function* IdGenerator() {
  let id = 0;
  while (true) {
    yield ++id;
  }
}
const idIterator = IdGenerator();
let obj1 = { id: idIterator.next().value, msg: 'bilibili：Jimmyhao' };
let obj2 = { id: idIterator.next().value, msg: '公众号：Jimmyhao' };
let obj3 = {
  id: idIterator.next().value,
  msg: '在线文档：http://www.jimmyxuexue.top:999/',
};
```

![image-20220115142530003](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220115142530003.png)

第一眼看是不是也被惊艳到了！居然写出了`while(true){}`这种死循环的操作，在普通函数内部肯定不能这样写的，但是因为是生成器函数，每次请求都会非阻塞的挂起，所以这样写一点问题都没有。

而且这样写的另外一个好处是生成器中包含一个局部变量 id，代表 ID 计数器，这个 id 仅能生成器访问，所以不用担心会有人不小心修改其他代码而不小心改掉了 id 的数值，而且如果有另外的逻辑需要计数操作，只需要再次初始化一个迭代器就可以了。！

#### 与生成器交互

我们可以与生成器进行交互，交互方式就是通过使用 next()方法迭代时进行传值，yield 负责接受值，如：`next('Jimmy')`

```js
function* Message(name) {
  const msg = yield 'hello' + name;
  if (msg === 'xuexue') {
    console.log('msg is xuexue');
  }
  yield 'hello' + name;
}

let jimmy = Message('jimmy');
jimmy.next();
jimmy.next('xuexue');
```

![image-20220115143706586](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220115143706586.png)

这里如果没有理解 yield 交互的同学一定会很懵逼。第一次执行 next 的时候输出结果是 hellojimmy 这个没什么问题，不理解的地方主要是第二次执行`next('xuexue')`的时候，其实当 next 传值进行交互的时候，迭代位置的 yield 后面的整个内容看成形参，next 传的值作为实参，在这个例子中，`yield ('hello'+name)`中的 `('hello'+name)`是形参，`next('xuexue')`中的 xuexue 是实参，所以会输出`msg is xuexue`

#### 总结

生成器函数真的很有用，主要是它能无阻塞的挂起函数，等到合适的时候再恢复函数执行，执行结束之后继续挂起，这个太棒了，非常的适合 js 这种需要大量使用异步的语言。像 async await 就是它的语法糖。目前我还知道的就是 react 的状态管理 dva 就是需要手动写生成器函数。

:::demo

```vue
<template>
  <div class="demo">
    <iframe
      src="//player.bilibili.com/player.html?aid=593205697&bvid=BV13q4y117RG&cid=485422553&page=1"
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



## 第三部分 理解对象

### 原型链

#### 原型链指向的细节

一个对象的原型链指向关系实际上是在一个对象被构建（初始化）时就构建好的，所以就算重写了原型链上的一些属性或者方法，已经实例化过的对象仍能够正常的进行访问。

```js
function User(){}
User.prototype.say = ()=>{
    console.log('关注bilibili：Jimmyhao')
}
let jimmy = new User()
User.prototype = {
    speak(){
        console.log('关注公众号：Jimmy前端')
    }
}
let xuexue = new User()
xuexue.speak() // 关注公众号：Jimmy前端
jimmy.say() // 关注bilibili：Jimmyhao
xuexue.say() // xuexue.say is not a function
jimmy.speak() // jimmy.speak is not a function
```

以上的这个例子就能够特别好的证明了，一个对象的原型链指向是在构造（实例化）的时候才进行绑定的，改变了原型链，也只有在之后的实例化的对象上次啊会生效，所以这个证明了，其实实例化的时候整个原型链都是会拷贝一份存下来的。所以原型链固然好用，但是不能滥用。

![image-20220116152432606](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220116152432606.png)

以上这个例子是之前`vue2.x`的例子，我们在Vue构造函数上绑定原型都是在`new Vue`之前绑定，而不会在之后绑定。再次加深了以上的理解。

#### instanceof的细节

在已经了解了上个例子之后，我们知道了一个对象原型链上的指向其实是在示例化的时候就绑定了的，就算后期我们再对它进行了重写，之前实例化的对象任然能够使用重写前原型上的方法和属性。

下面要说个和上面相反的例子，就是当我们使用 `instacnceof` 关键字时，事情又变成了另外一个样子。

`instanceof`用户坚持一个函数是否存在于一个示例的原型链中。

```js
function User(){}
User.prototype.show = ()=>{
    console.log('hello world')
}
const jimmy = new User()
console.log(jimmy instanceof User) // true
User.prototype = {}
console.log(jimmy instanceof User) // false
```

what？怎么又变成false了？怎么感觉好像和上面的那个例子冲突了，不是说原型链上的东西都是实例化的时候都绑定好的吗，只有重写之后实例化的对象才会生效了，这是咋回事？通过调试查看这时候的jimmy对象，得到的是以下的结果：

经过对比，添加`User.prototype = {}`这句话前后分别打印jimmy对象，再分析一下二者的区别：

![image-20220116174101366](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220116174101366.png)

啊哈，找到区别了，原来我们的User构造函数原型链上的`show`方法还是存在的，但是它原型链上的`constructor`的`prototype`被改变了，在这个例子也就是User的这个函数的原型上找不到`constructor`为User的函数了，所以返回的是false，这个和前面的例子并没有冲突。

`instanceof`的真正语义是：检查右边函数的原型上是否存在于操作符左侧的对象的原型链上，这样理解就不会觉得奇怪了。
