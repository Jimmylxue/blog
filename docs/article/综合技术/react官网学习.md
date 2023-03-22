---
head:
  - - meta
    - name: description
      content: react官网学习
  - - meta
    - name: keywords
      content: react官网学习

  - - script
    - src: https://vitepress-source.oss-cn-beijing.aliyuncs.com/statistics.js
---

# react 英文官网 - 补充 react 知识&学习英语

2022 年的我已经完成了开发技术栈从 vue 转向 react 的目标。但是很尴尬之前 react 官网我从未看过。

> 因为 react 的官网实在是太难看和理解了，完全找不到一个顺序。

好在 千呼万唤始出来 ，react 终于更新了他们的最新官网，这回我会像看 vue 的官网一样完整的过一遍 react 官网。这种感觉就像是看了一本 react 相关的书籍。并记录一下我认为值得记录的知识点

## JSX

why do multiple JSX tags need to be wrapped?

this question is often asked by interview（面试）, but this question has answer in official website(官网)：here is answer as follow:

> JSX under the hood it is transformed into plain JavaScript objects, it can’t return two objects from a function without wrapping them into an array. This explains why you also can’t return two JSX tags without wrapping them into another tag or a Fragment.

## pure function

In react version of 18, development function will call twice, some person ask some question about "how to make function just call once?" in react community. In fact, the answer of question is in [official website](https://react.dev/learn/keeping-components-pure).

the docs use an chapter to explain why is this design, which is wanner developer to write pure function.

pure function has some result when it called once or twice! pure function has a lot of benefits, that is why react designed like this!
