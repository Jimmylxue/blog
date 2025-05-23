# 不要掉入舒适陷阱，请在合适的场景下使用 Tag

## 前言

大家是否有使用`git tag`这个指令呢？相信可能绝大多数的小伙伴在初入职场或是相对萌新阶段是比较难以使用到这个指令的。

> 先叠个甲，本人也是在工作了两三年后，可能有点操作项目的权限了之后才又机会接触到这些指令的。不然可能大家更经常使用的指令可能是分支`branch`那块的操作。

如果有不清楚这块知识的小伙伴可以看下这篇文章：[git tag 指令介绍与和 git branch 的区别](https://blog.jimmyxuexue.top/job/Git/%E7%9F%A5%E8%AF%86%E7%82%B9.html#git-tag-%E7%9B%B8%E5%85%B3%E6%93%8D%E4%BD%9C)

## 要勇于尝试！

有时候我们使用工具或者某个技术时，就容易掉入舒适陷阱，就拿本次的主题`git tag`来说，它和`git branch`在某些程度上理解他们是相同的。

在我的内心，我深刻的知道，在某些场景下，我应该使用`git branch`是一个更加规范的功能和操作，但是由于我掉入了舒适陷阱，或者说就是比较**懒、怕做错、怕背锅**，我用了我最熟悉的`git branch`来操作：

![image-20241029152121237](https://image.jimmyxuexue.top/img/image-20241029152121237.png)

### 举个例子 🌰：

> 具体的就是在发布一个版本时，为了能方便进行版本的回归，我都把这时刻的代码创建一个新的版本分支来处理，这个场景理论上是使用`tag`标记是比较合适的。

由于这么操作将版本（不变）和开发分支（可变）的东西杂糅在了一起。由于版本是很多的，随着时间的推移，远程分支变得越来越多，不方便找到开发分支。

![image-20241029150534373](https://image.jimmyxuexue.top/img/image-20241029150534373.png)

而我们在明确了什么场景下使用是什么对应的指令之后，可以更加规范我们整体的一个开发。这样对于团队来说是一个更好的事情。

## 总结

`git tag`这个可能只是其中的一个例子，甚至这个可能是生活中处理问题的一个缩影，希望这次分享能够帮助到和我有相同处境的同学，当知道一个技术点的时候，还是应该勇于尝试，这能让我们更好！

![image-20241029152558468](https://image.jimmyxuexue.top/img/image-20241029152558468.png)
