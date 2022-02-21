# Vue3 源码阅读记录

::: tip 前言
阅读源码是能提高自己编程能力和思维的一个非常有效的方式，和读一本书一样能理解作者想要表达的想法，以及学习作者的优秀思想！例如现在要学习的 Vue3 的源码，对于我来说难度是非常之大的。我学习它的目的除了学习优秀的思想之外，还有一点是现在面试基本这是个必考题 😂😂

以前我也有看过，但是一段时间之后就忘了，所以还是使用这种 **“看得见的思考” ** 的方式学习，也可以给其他人 **“费曼”** 一下。
:::

## 初始化流程

![初始化](https://vitepress-source.oss-cn-beijing.aliyuncs.com/vuepackage.jpg)

在学习之前，因为 vue3 的源码 package 文件夹下有十几个包，所以在学习之前我们应该要先知道各个包做的是什么事情。其中最重要的一个包是 vue 包，其是顶级包，最终项目能够使用的包就是这个包。

初始化流程中涉及到的包是 vue 包 和 runtime-dom 包

![整体结构图](http://vitepress-source.oss-cn-beijing.aliyuncs.com/vue3.png)

因为初始化过程的代码最重要的过程是创建渲染器和挂载的这两个过程，而整体的代码量非常之大，所以需要明确目标，只看初始化过程的代码，不看其他内容的代码，如：响应式、vnode 之类的代码。

### 问题集合

- vue3 初始化过程都做了什么

  首先会通过`ensureRenderer`这个总体方法创建渲染器，当然`ensureRenderer`是一个创建单例的函数，如果没有 renderer 就会通过`createRenderer`来创建渲染器。

  ```ts
  function ensureRenderer() {
  	// 单例 渲染函数 可以简单的理解这个渲染器可以帮助我们创建应用实例
  	return (
  		renderer ||
  		// 通过 createRenderer 创建渲染函数
  		((renderer = createRenderer < Node),
  		Element | (ShadowRoot > rendererOptions))
  	)
  }
  ```

- 渲染器是什么

  渲染器是一个对象，通过`baseCreateRenderer`这个函数创建，这个函数有 2000 多行！是 vue3 中最大的一个函数，其中这个函数返回的是一个对象，这个对象就是渲染器，拥有三个属性：

  - render

    是一个函数，这个 render 函数和组件的 render 函数有所不同，这个 render 函数是接收虚拟 DOM,转正真实 DOM，再挂载到宿主 DOM 上，就类似于 React 的`ReactDOM.render(<App />,document.getElementById('app'))`是一个道理的

  - hydrate

    当处理服务端渲染中使用的， 服务端将一个 vnode 生成 html

  - createApp：createAppAPI(render, hydrate)

    返回的实际上是 createAppApi（工厂函数）

  这个 createAPI 就是返回的 createApp 函数就是用户使用的 createApp 函数，其中就暴露了我们熟悉的 use、mount、component 方法。

  和 vue2 不同的地方在于这些方法已经变成了实例方法而不是原型方法了。

- 挂载都做了什么事情

  挂载最新执行的是根组件的挂载，我们通过 createApp 传入的配置对象会被转成转换成一个根组件，render 函数执行 processComponent 挂载组件，挂载组件会执行的是：

  - 先创建组件的实例
  - 创建更新函数
  - 创建更新机制 其实就是响应式
  - 首次得手动执行一下更新函数

### 设计模式

大神的源码，随处可见的设计模式。

#### 单例

获取渲染器

```ts
function ensureRenderer() {
	return (
		renderer ||
		// 通过 createRenderer 创建渲染函数
		(renderer = createRenderer<Node, Element | ShadowRoot>(rendererOptions))
	)
}
```

#### 工厂函数

创建渲染器

```ts
function baseCreateRenderer(
	options: RendererOptions,
	createHydrationFns?: typeof createHydrationFunctions
): any {
	// 省略2000多行 渲染器方法
	return {
		render,
		hydrate,
		// createApp 返回的实际上是createAppApi（工厂函数）
		createApp: createAppAPI(render, hydrate),
	}
}
```
