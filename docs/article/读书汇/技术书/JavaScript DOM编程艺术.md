---
head:
  - - meta
    - name: description
      content: JavaScript DOM 编程艺术

  - - meta
    - name: keywords
      content: JavaScript DOM 编程艺术
  - - script
    - src: https://vitepress-source.oss-cn-beijing.aliyuncs.com/statistics.js
---

# JavaScript DOM 编程艺术

![image-20220305154055828](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoratyporaimage-20220305154055828.png)

> 这本书是我上家公司的一个姐姐送我的书，其中一本就是本次内容的主角《JavaScript DOM 编程艺术》时隔快两个月我才开始翻开阅读.....

DOM 的重要性相信大家都知道，现在的像 React 、 Vue 这类的框架之所以效率十分之高有很大一部分的原因就是对 DOM 的操作做的非常的好，因为只要我们操作 DOM，就是一个十分消耗性能的事情，这也间接的说明了 DOM 操作对于一个前端程序员来说的重要性！

首先这本书因为是一个相对来说比较 “老” 的书了，所以里面的内容真的多少有点儿过时，就好像书中介绍查询 DOM 的操作在当时的环境下只有 `getElementById`和 `getElementByTagName` 之类的，还没有我们现在觉得更加方便的 `querySelector`这种相对更加方便的选择器。但是这本书读下来也是让我有了一些细节知识点的收获，有技术层面的，也有综合层面的，如：

- 为什么我们要尽量的少访问 DOM 和尽量的减少标签的数量

  不管在什么时候，只要查询 DOM 中的某些元素，浏览器都会去遍历整个 DOM 树，从中查找可能匹配的元素。尽量减少文档中的标签数量是因为过多的不必要的元素只会增家 DOM 树的规模，进而增加遍历 DOM 树以查找特定元素的时间。

- 不要怪罪 JavaScript

  因为 JavaScript 易学易用，所以这也以为着 JavaScript 其实是一把双刃剑，可能短时间就会为开发者广泛接受，但是着也意味着会缺少高水平的开发者。所以深入 JavaScript 的人还是相对少的。市场真正缺少的也是这一类人，不就是我们前端程序员的发展方向之一吗？

- 不能滥用 JavaScript

  无良的弹窗广告....，对比另外一个被滥用的技术：Adobe 公司研发的 Flash 。不禁让人陷入深思......

这本书大概是我最快看完的一本书了，大概前后也就两天就看完了，发掘这本书也是非常适合于新手学习 JavaScript 时的书籍，书中涉及的内容也是非常之基础，而且书中有类似 “手把手教代码” 的方式有着大量的简单的实战代码，完成了 **图片库**、**乐队网站** 小例子，对于新手来说非常的友好。是一本名副其实的入门书！

最后感谢一些送我这本书的姐姐，看完它补足了一些我原来的知识盲区。收获很大！
