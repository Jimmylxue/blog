---
head:
  - - meta
    - name: description
      content: OSS 你可能不知道的事情

  - - meta
    - name: keywords
      content: OSS

  - - script
    - src: https://vitepress-source.oss-cn-beijing.aliyuncs.com/statistics.js
---

# OSS 你可能不知道的事情

OSS 对象存储服务相信各位小伙伴们都知道，最近因为我在 B 站上分享了一个我的个人网站，然后发生了一些事情，才发现过去我对于 OSS 对象存储的理解是不对的，或者说只是很浅的理解这个工具，并不够透彻，我一直以为 OSS 就是类似和各种线上网盘一样的东西，我们能在上面存一些开发要用的东西，如图片啥的，其实不然！相信也有小小伙伴跟我的理解是一样的，所以记录一下，帮兄弟们排个雷。

## 为啥要用到 OSS

以一个前端程序员的角度思考这个问题，我的理解无非就是往性能优化这一块走了，我们可以将项目的一些图片全部实现分离，全部放到 OSS 上，我们就可以使用线上链接的形式来访问图片，能够让我们的项目体积更加的小。

```html
<body>
	<img src="./typora01.jpg" />
	<img
		src="https://vitepress-source.oss-cn-beijing.aliyuncs.com/typora01.jpg"
	/>
</body>
```

最终“**能跑就行**”的项目体积是越小越好的，小的项目体积代表用户能够更快的访问页面，消耗用户或者服务器更小的流量，再贴近一点情况就是小程序开发时，是否有大兄弟遇到项目体积大于 2MB 无法预览的情况呢？所以这个就是减少项目体积的 **大杀器** 了。

## 突如其来的欠费

最近的频繁的收到阿里云发来的欠费提醒，消息大概长这样。

![image-20220410110203853](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220410110203853.png)

我很疑惑，我明明是买了 OSS 的存储包买了整整一年（40G）,我就存一些图片，不可能会欠费的呀，于是我一顿检查。发现我的流量包是到 2023 年才过期的，还有近乎一年的时间，这是咋扣费的。

![image-20220410110525517](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220410110525517.png)

后来通过查流水和资金明细，发现确实是 OSS 在扣钱，一分两分钱的扣，虽然少，但是一天扣好几次，日积月累，就会被干停机了.

![image-20220410110746124](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220410110746124.png)

再细查到底是什么导致的不断扣钱，发现是 OSS 有一个， **外网流出流量**，就是这个玩意儿在扣钱！快要接近真相了！

![image-20220410110913653](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220410110913653.png)

于是我查询 **外网流出流量** 的定义，总结下来就是：资源放 oss 上 只要访问了 就会产生扣费。这就推翻了之前我以为 OSS 是网盘的定义。

![image-20220410111130476](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220410111130476.png)

我慢慢的知道了扣费的原因了，因为我的个人网站逐渐会有一些大兄弟们访问，而那个网站上的所有图片资源我都是放在 OSS 上，所有访问量如果越大等于我要扣越多的钱......，过去可能因为没啥人访问所以我根本意识不到扣钱。后面发现每天几乎都有几百 MB 的外网流出流量。其实这钱扣的我还是挺开心的，说明做的网站有人访问了！！！！

![image-20220410111625940](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220410111625940.png)

## 解决方案

这里提供几个解决方案，如果有自己做项目的大兄弟们可以参考一下这几个方案，都能解决这个问题。

- 购买下行流量包

  继续使用 OSS，购买个下行流量包就不会一直扣费了，只需要一次交差不多 250 元即可~

  ![image-20220410111846249](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220410111846249.png)

  可能大部分大兄弟都用不到这么多流量，其实也可以选择一天扣个几分钱，别超过停机的余额就行了。

- 用服务器做一个简单的静态存储（大佬朋友也推荐这个方式）

  服务器暴露一个接口，将资源全部放到服务器上，通过这个接口可以访问服务器上的图片。

  这是个最省钱的方式了~还是蛮不错的，后面如果我扣费很严重会转战这种方式！

## 总结

在寻找这个问题的答案过程中我和大佬同学探讨了好一会儿，得知其实 OSS 存储只是给一个存的权限，访问照样扣费，所以外网流量是很宝贵的！希望这个文章&视频能给还不知道的小伙伴们提供一些帮助吧~

![image-20220410112802549](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220410112802549.png)

![image-20220410112734038](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220410112734038.png)
