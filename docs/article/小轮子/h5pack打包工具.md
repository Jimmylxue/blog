# 我开发了一个 H5PACK，可以将 H5 直接打包成安卓 App！

## 前言

大家好我是吉米，这回跟大家分享一个我最新完成的一个小工具 [h5pack](https://github.com/Jimmylxue/h5pack-core) 。已经它背后的原理。

[视频介绍](https://www.bilibili.com/video/BV1fm421g7Ux/?spm_id_from=333.999.0.0)

h5pack 是一个跨平台(支持 mac/windows)的 app 打包工具，只需简单的配置和一个指令，即可将 H5 直接打包成 Android APK

## 少废话先看东西

这是一个常规的干净的一个 web 项目，其效果是：

![image-20240718162604678](https://image.jimmyxuexue.top/img/image-20240718162604678.png)

通过 h5pack 我们可以将其直接打包成一个 App，其效果如下：

![image-20240718165708410](https://image.jimmyxuexue.top/img/image-20240718165708410.png)

### 为什么会开发它？

起因是最近在学习 [expo](https://expo.nodejs.cn/get-started/expo-go/) 这个新的 cli，我发现它对比与传统的`React-native-cli`相比很神奇，它居然没有了`android`和`ios`文件夹，那它是如何打包的呢？

我执行本地打包时发现它会在我系统中创建一个临时文件夹，然后再进行打包。临时文件夹下是有这两个文件夹的，收到这个就大致会有思路了。于是就天马行空的想到我们可以用这个机制来做点东西，于是就有了这个`h5pack`

### 项目价值

可能会有人说你这东西网上有 xxx、有什么价值？我能想到的价值大致有如下几点：

- 对于个人来说，毕竟自己写的，意义非凡。
- 如果你在接外包，客户点名要商城 app，但是你有商城的 h5，就可以通过它快读打包 app，帮助你变现。
- ...实在编不下去了 😄

## 基本使用

1. 安装

```
pnpm add h5pack
```

2. 配置

项目根目录下新建 `h5pack.json` 并做如下配置：

> 具体配置信息见:[传送门](http://www.jimmyxuexue.top:999/snowtiny/usage/config.html)

```json
{
	"entry": "./dist", // h5项目打包入口
	"name": "newApp", // app包名
	"splash": "./public/vite.svg", // app splash 启动页logo
	"output": "./", // 打包完成后app 输出位置
	"log": false // 是否开启完整打包日志
}
```

在`package.json` 中增加如下脚本：

```json
"scripts": {
  "compress": "npx h5pack"
}
```

3. 运行

```
npm run compress
```

**执行之后的效果如下**

![image-20240718165914875](https://image.jimmyxuexue.top/img/image-20240718165914875.png)

打包完成之后就会在我们配置的`output`路径下生成`app-release.apk`这个安装包了。

## 逻辑&原理

到了原理部分了，那么到底是如何实现的呢？其实还是比较简单的。

大家可能会有这么两个疑问：

- apk 安装包是哪来的？
- 怎么把 web 的内容打包进去的呢？

我们分别来看：

### apk 安装包是哪来的

这里依赖于另外一个项目[h5pack-native](https://github.com/Jimmylxue/h5pack-native)，这是一个 react-native 的项目，参考前言的部分，这块的逻辑是当执行打包指令时，会通过 node ，创建一个临时文件夹目录，在这里面去拉这个仓库的代码，执行打包，生成 apk 文件。

### 怎么把 web 的内容打包进去的呢

这块的逻辑其实也是相对比较简单，借助的是`WebView`组件，我们一般常规的用法是将`WebView`用来展示网页的信息，提供一个在线地址，如：`https://blog.jimmyxuexue.top`，那么它就会去下载这个地址下的 `html`、`css`、`js`等文件，最终渲染出来。

所以，这块的操作是将 web 项目的打包之后的`dist`也一起打包进 apk 中，然后`WebView`不引入远程的地址，引入的是 apk 内的我们打包进入的 dist 中的 html，那么是不是就完美解决实现啦？

![image-20240721112249523](https://image.jimmyxuexue.top/img/image-20240721112249523.png)

至于其他的配置，如 apk 名，启动页，图标等等配置，我们就可以完全通过 node 脚本的方式动态替换项目的一些文件的内容了，就可以实现了。

## 相关依赖

App 的打包依赖于另外一个仓库 [h5pack-native](https://github.com/Jimmylxue/h5pack-native) 使用的同学需要安装最基础的安卓环境

- `node20`、`yarn`

- `javaJDK17`
- `Android SDK Platform 34`

具体环境可以看[参考文档](https://reactnative.dev/docs/0.73/environment-setup?platform=android)

## 其他内容

我会不定期在 B 站直播写代码，欢迎有兴趣的小伙伴们前来围观，期待你们的关注~

[B 站个人主页](https://space.bilibili.com/304985153?spm_id_from=333.1007.0.0)

我有个前端交流群，平时大家一起讨论技术和交流 bug，有兴趣的小伙伴欢迎加入。（vx 添加：ysh15120）
