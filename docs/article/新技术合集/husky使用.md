---
head:
  - - meta
    - name: description
      content: git hooks & husky

  - - meta
    - name: keywords
      content: husky

  - - script
    - src: https://vitepress-source.oss-cn-beijing.aliyuncs.com/statistics.js
---

# git hooks

嗨，我是吉米，今天分享的一个知识点是 git hooks，这也是之前一位小伙伴在我的一个 git 视频中评论中说想了解和学习的知识点。

老实讲其实我过去知道有这么个东西，基本是开源项目的标配，如`antd-pro`、`vitepress`等等，有了它，能够从源头上就避免了一些不规范代码的产生。

> 因为你不规范，就提交不了代码。

首先我们需要知道什么是 hooks，也就是钩子，我们可以理解成这个钩子可以帮助我们捕获一些事情，在我的理解里和事件监听是差不多。当我们执行`git commit`，我们可以利用 hook 捕获到执行前、和执行后时的事件。

最常用的 hook 我认为有两个（具体的 hook 有非常多，大家可以自行看文档）：

[husky 文档](https://typicode.github.io/husky/#/)

- pre-commit

  在`git commit -m "xxx"`提交 commit 执行前的一个钩子

- pre-push

  在`git push`执行前触发的钩子

## 实际使用案例

这里我讲个使用场景，我想要实现每次执行 commit 的时候都去检查一下项目的一些单元测试，如果单元测试通过，就正常 commit，否则就阻止 commit 的执行。

步骤大致如下：

- 根据 npm 文档安装一下，执行该执行的命令：

  [npm husky](https://www.npmjs.com/package/husky)
  husky 是开发环境的工具，和 prettier 一样，只是开发环境有用，就加上 -D

- 添加 commit 时都检查测试用例的代码

  ```
  npx husky add .husky/pre-commit "yarn test"
  ```

- 再打个 commit 就可以正常看情况了。

## husky 不生效问题

我也是初次自己配置 husky，过程遇到的一些问题跟大家伙分享一下，首先是现在网上的一些信息其实有些过时了。

我个人一个搜索习惯喜欢直接搜同类型解决方案，而更不习惯于搜索官网。导致我搜索到的其实大部分都是 20、21 年左右的同类问题的解决方案，那时候的 husky 版本是 4.x.x，而现在的版本已经是 8.x.x 了。

但是最初我并没有特别在意，也是跟着那些低版本的配置一顿配，但是就是不生效。后面隔了一天我想到那还是看看 npm 或者官网的文档吧，根据官网的一配置，就成功了！！！

我想说技术迭代是真的很快，两年时间左右吧，这个库就已经更新了 4 个大版本了，所以网上的很多当时的解决方案其实放到现在就不能解决问题。包括我之前分享的一些工具的使用可能到后面也会有版本问题。

今后大家还是要养成看官方文档的习惯，一切还是以官网为主，而像我们这些 up 主分享的一些所谓解决方案为辅。才是上上策。
