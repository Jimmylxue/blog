# 前端 CICD 实现方案

在过去，我其实一直不知道大佬口中的 **CICD**，到底是什么意思，感觉好像离前端非常的遥远，在请教了一个身边的大佬（也是我的高中同学），终于直到 **CICD** 是啥玩意儿了，才发现，其实 CICD 就是我们也经常接触的东西，尤其是有自己开发的项目的同学来说是更加亲切的东西了，只是我们可能对它的认知还不够熟悉。

![image-20220327151039412](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220327151039412.png)

gitlab+jenkins 是比较适合企业生产级别的方案，如果是我们自己做自己的小项目想部署的话，这套方案就显得没有那么轻量级，而且学习成本也更加的高了，要开发自己项目的我们应该是没有什么更多的精力去学习了。

所以！我给大家推荐一套我自己平常使用的最多也是一直在使用的一套 CICD 解决方案，对比前者下来简直就是十分之轻量级！它就是使用 **Github Action + Docker**， 其实我之前出过一个文章讲解这块的知识，[传送门](http://www.jimmyxuexue.top:999/article/%E5%B7%A5%E7%A8%8B%E5%8C%96/%E9%A1%B9%E7%9B%AE%E9%83%A8%E7%BD%B2.html)

之所以选择重新总结这块的知识，其实是因为我最近开始做一个新项目--Knowledge Planet [传送门](http://www.jimmyxuexue.top/)，在做到 cicd 这一块的时候发现它其实是有坑的。实不相瞒昨晚我在操作的时候就踩坑了，熬到凌晨两点多都没有解决，今早终于解决了，顺便分享一下解决的文档吧~[传送门](https://stackoverflow.com/questions/52109775/gitlab-ci-ssh-key-invalid-format/64537348)。知道原因的我眼泪掉下来。相信有很多小伙伴也遇到过，所以一定分享给大家！

接下来大家看我的视频演示吧~，有不明白的地方欢迎评论或者加我个人微信。

**Docker 基本使用**：[传送门](http://www.jimmyxuexue.top:999/article/%E5%B7%A5%E7%A8%8B%E5%8C%96/Docker%E9%83%A8%E7%BD%B2%E5%89%8D%E7%AB%AF%E9%A1%B9%E7%9B%AE.html)

> 跟着文档配置下来就行，每次我重装服务器也是跟着这个我总结下来的文档，就能完美的配置下来啦~

**Github Action 使用&配置文件**：[传送门](http://www.jimmyxuexue.top:999/article/%E5%B7%A5%E7%A8%8B%E5%8C%96/%E9%A1%B9%E7%9B%AE%E9%83%A8%E7%BD%B2.html#%E5%85%A8%E8%87%AA%E5%8A%A8%E9%83%A8%E7%BD%B2)

最后谢谢大家的观看，有不明白的地方欢迎评论或者加我个人微信！
