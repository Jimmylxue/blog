---
head:
  - - meta
    - name: description
      content: SnowIndex - 极客风格的浏览器主页

  - - meta
    - name: keywords
      content: SnowIndex - 极客风格的浏览器主页

  - - script
    - src: https://vitepress-source.oss-cn-beijing.aliyuncs.com/statistics.js
---

# SnowIndex - 极客风格的浏览器主页

![image-20220906171030374](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220906171030374.png)

## 前言

我被程序员鱼皮，狠狠的惊艳到了！！！

> 大厂的同学就是有一些奇思妙想！

鱼皮发了一个视频，它做了一个 yuIndex，我觉得太酷了！就像他说的，这个真的太吸引程序员了！于是我立马fork了它的项目，初期非常快速的就发现了几个小bug，我也是第一个给 yuIndex 这个项目提 Pr 的人，但是由于一些未知原因，格式化的时候代码缩进有一些问题（我本地缩进2个空格，远程就变成4个空格），所以最终鱼皮并没有把我的pr给合并进去，之后又试了一次，还是有缩进问题😤，最终无奈没能成为yuIndex的贡献者🤷🏻‍♀️🤷🏻‍♀️

![image-20220906164121128](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220906164121128.png)

所以最终，我决定自己做一个 yuIndex！我叫她 **snowIndex** 😄

## 关于SnowIndex

宗旨：将大而全的功能全部集成在一个小而美的 **终端** 上，这很酷！

[项目地址](https://github.com/Jimmylxue/snowIndex) https://github.com/Jimmylxue/snowIndex

既然目标是复刻一个 yuIndex，所以我决定用完全不同的技术栈，这个项目我采用的技术栈如下：

**前端**

- Vite3 + React + tailwindCSS + Redux

  > 前端目前已开源

**后端**

- Nestjs + Mysql + Redis + docker

  > Mysql 使用的是 planetscale，也是鱼皮分享过的一个白嫖数据库
  >
  > 后端部分因为放在了个人服务器上，所以暂未开源，等日后基本稳定之后就一起将代码分享出来。

目前已经开发了 **20+** 个指令+快捷键操作，日后会持续不断的继续维护，如果大家更喜欢用react方向的技术栈，也欢迎大家给我提**issue** 和 **pr**。

## 收获

这个项目因为主要是参考yuIndex写的，所以前期代码结构和基本的方向都是按照yuIndex来的，不得不说跟鱼皮学到了更加精妙的代码编写方式，yuIndex将封装和抽象体现的很好，要新开发一个指令只需要创建一个文件，再做一些导入的操作即可，基本不会影响到已存在的指令。总的来说就是优雅！

而snowIndex就是学习到了这种抽象和封装的思维，所以要开发新的指令也是非常简单！

可能会有人觉得：**为啥还搞这个？花里胡哨，没什么用！🤷🏻‍♀️🤷🏻‍♀️🤷🏻‍♀️**

见仁见智吧，我觉得挺酷的，那就指的做下去！

**如果您觉得这个项目还不错, 可以在 [Github](https://github.com/Jimmylxue/snowIndex) 上面帮我点个`star`, 支持一下呢 ☜(ﾟヮﾟ☜)**
