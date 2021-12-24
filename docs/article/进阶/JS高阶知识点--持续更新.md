# JS 高阶知识点 -- 持续更新

逛稀土掘金看到的些好文章，记录的非常的详细，JS 高阶知识点。

## DOM 元素节点的类型

```js
元素节点            　　Node.ELEMENT_NODE(1)
属性节点            　　Node.ATTRIBUTE_NODE(2)
文本节点            　　Node.TEXT_NODE(3)
CDATA节点             Node.CDATA_SECTION_NODE(4)
实体引用名称节点    　　 Node.ENTRY_REFERENCE_NODE(5)
实体名称节点        　　Node.ENTITY_NODE(6)
处理指令节点        　　Node.PROCESSING_INSTRUCTION_NODE(7)
注释节点            　 Node.COMMENT_NODE(8)
文档节点            　 Node.DOCUMENT_NODE(9)
文档类型节点        　　Node.DOCUMENT_TYPE_NODE(10)
文档片段节点        　　Node.DOCUMENT_FRAGMENT_NODE(11)
DTD声明节点            Node.NOTATION_NODE(12)

```

## 数组的 splice 与 slice 的区别

| 方法   | 参数                                  | 描述                                                                            |
| ------ | ------------------------------------- | ------------------------------------------------------------------------------- |
| splice | splice(start, num, item1, item2, ...) | 从 start 索引开始，截取 num 个元素，并插入 item1、item2 到原数组里，影响原数组  |
| slice  | slice(start, end)                     | 从 start 开始，截取到 end - 1，如果没有 end，则截取到左后一个元素，不影响原数组 |

## substr 和 substring 的区别？

| 方法      | 参数                 | 描述                                                 |
| --------- | -------------------- | ---------------------------------------------------- |
| substr    | substr(start,length) | 返回从 start 位置开始 length 长度的子串              |
| substring | substring(start,end) | 返回从 start 位置开始到 end 位置的子串（不包含 end） |

## JS 延迟加载的方法有哪些？

- `<script async src="script.js"></script>` ：给 script 标签加 async 属性，则加载和渲染后续文档元素的过程将和 `script.js` 的加载与执行并行进行（异步）
- `<script defer src="script.js"></script>`：给 script 标签加 defer 属性，加载后续文档元素的过程将和 `script.js` 的加载并行进行（异步），但是 `script.js` 的执行要在所有元素解析完成之后，`DOMContentLoaded` 事件触发之前完成

- 动态创建 script 标签：等到`DOMContentLoaded` 事件触发时，生成一个 script 标签，渲染到页面上上
- setTimeout 定时器延迟代码执行

## 异步脚本 defer 和 async 的区别

- 当 HTML 文档被解析时如果遇见 defer 脚本，则在后台加载脚本，文档解析过程不中断，而等文档解析结束之后，defer 脚本执行。另外，defer 脚本的执行顺序与定义时的位置有关。
- 当 HTML 文档被解析时如果遇见 async 脚本，则在后台加载脚本，文档解析过程不中断。脚本加载完成后，文档停止解析，脚本执行，执行结束后文档继续解析。

总结：defer 脚本是异步加载，但是执行时是等整个文档结束之后执行，async 脚本也是异步加载，但是执行是异步脚本加载完成之后就执行，执行的时候文档停止解析，等到脚本执行结束之后继续文档解析

## 为什么 Commonjs 不适用于浏览器

```js
var math = require('math');

math.add(2, 3);
```

第二行 math.add(2, 3)，在第一行 require('math')之后运行，因此必须等 math.js 加载完成。也就是说，如果加载时间很长，整个应用就会停在那里等。

这对服务器端不是一个问题，因为所有的模块都存放在本地硬盘，可以同步加载完成，等待时间就是硬盘的读取时间。但是，对于浏览器，这却是一个大问题，因为模块都放在服务器端，等待时间取决于网速的快慢，可能要等很长时间，浏览器处于"假死"状态。

因此，浏览器端的模块，不能采用"同步加载"（synchronous），只能采用"异步加载"（asynchronous）。这就是 AMD 规范诞生的背景。

## Commonjs 和 ES6 Module 的区别

- Commonjs 是拷贝输出，ES6 模块化是引用输出（更快，更适合浏览器）
- Commonjs 是运行时加载，ES6 模块化是编译时输出接口
- Commonjs 是单个值导出，ES6 模块化可以多个值导出
- Commonjs 是动态语法可写在函数体中，ES6 模块化静态语法只能写在顶层
- Commonjs 的 this 是当前模块化，ES6 模块化的 this 是 undefined

## 深度遍历与广度遍历的区别

- 深度优先不需要记住所有的节点, 所以占用空间小, 而广度优先需要先记录所有的节点占用空间大
- 深度优先有回溯的操作(没有路走了需要回头)所以相对而言时间会长一点
- 深度优先采用的是堆栈的形式 即先进后出
- 广度优先则采用的是队列的形式 即先进先出

## 文档碎片

- 是什么：一个容器，用于暂时存放创建的 dom 元素，使用`document.createDocumentFragment()`创建
- 有什么用：将需要添加的大量元素 先添加到文档碎片 中，再将文档碎片添加到需要插入的位置，大大减少 dom 操作，提高性能

Jxue.js 吸收了这一点，当需要编译大段文本的时候，这个是个杀招！

## 元素进入视口 - IntersectionObserver

案例：很长的页面底部有一个评论区，当出现评论区时需要显示评论区的回复框。

方案 1：大多数同学心里想的是不是和我一样需要计算页面的高度，当达到指定的高度时显示？

不足之处：这样其实是不好的，当页面是个多路由每个路由下都有评论区，且页面高度都不同的情况呢？每次都要计算？加上我们必须监听滚动条的滚动事件，由于滚动事件机密发生，就算加上防抖，计算量也很大，容器造成性能问题！！

方案 2：**IntersectionObserver API**

> 它的优点是不会引起重绘回流

```js
var div2 = document.getElementById('div2');
let observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (element, index) {
      console.log(element);
      if (element.isIntersecting) {
        // element.isIntersecting 表示可见
        div1.innerText = '我出来了';
      } else {
        div1.innerText = '首页';
      }
    });
  },
  {
    root: null,
    threshold: [0, 1],
  }
);

observer.observe(div2); // 监听 div2
```

callback 函数的参数（entries）是一个数组，每个成员都是一个 IntersectionObserverEntry 对象。举例来说，如果同时有两个被观察的对象的可见性发生变化，entries 数组就会有两个成员。

- time：可见性发生变化的时间，是一个高精度时间戳，单位为毫秒

- target：被观察的目标元素，是一个 DOM 节点对象

- isIntersecting: 目标是否可见

- rootBounds：根元素的矩形区域的信息，getBoundingClientRect()方法的返回值，如果没有根元素（即直接相对于视口滚动），则返回 null

- boundingClientRect：目标元素的矩形区域的信息

- intersectionRect：目标元素与视口（或根元素）的交叉区域的信息

- intersectionRatio：目标元素的可见比例，即 intersectionRect 占 boundingClientRect 的比例，
