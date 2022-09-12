---
head:
  - - meta
    - name: description
      content: Vue.js设计与实现

  - - meta
    - name: keywords
      content: Vue.js设计与实现
---

# Vue.js设计与实现

等了好几天这本书终于到了，这是我买得第一本框架类的书籍，这篇文章中我将陆续的记录从这本书中学到的知识。

![image-20220613220644914](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220613220644914.png)

## 权衡的艺术

> 框架设计里到处都体现了权衡的艺术

### 命令式和声明式

老实说，我还真不知道什么是命令式代码和声明式代码，看完这一小节之后我的感觉是这个和过去所知道的 **面向对象**和 **面相过程**是有点儿像的，其中就举了一个简答的例子。

命令式的代码：

```js
const div = document.querySelector('div')
div.innerText = 'hello world'
div.addEventListener('click', ()=>{ alert('hello') })
```

 声明式的代码：

```vue
<div @click="()=>alert('hello')">hello world</div>
```

以上的代码就是简单的给`DOM`设置文本同时添加点击事件，命令式代码我们注重过程，会一步步的实现，而声明式的代码我们只需要告诉代码或者编辑器，我们想怎么样，真正的过程vue都帮我们做好了。

**过去的误区 : 虚拟DOM性能更高，真实DOM更消耗性能**

可能因为之前背面试题背多了，导致会有这种想法，这里就像作者说的，上面的那个例子就是典型的一个反例代表了，如果我们就想实现设置文本，再添加点击事件，有比命令式代码性能更高的操作方法吗？

只怕是没有，因为上面声明式的代码每步也都是做定向的修改操作！而下面声明式的代码，多了一个编辑解析的过程，（要能编译‘@’点击事件），所以下面的性能是肯定没有上面的性能高的，但是下面代码更加利于开发和维护（想象一下如果有几十个这种差不多操作需求，明显下面的更利于维护）

所以！vue或者说那些框架做的，实际是在 **保持代码维护体验性的同时，尽量让性能损失降低到最小**

总结：

- 命令式的代码性能消耗为A
- 声明式的代码性能消耗为B+A (B是编译的那个过程)

**虚拟DOM的优势体现在更新**

比较一下这样一个代码（过去我确实写过）：

```js
const html = `<div><span>112233</span></div>`
const div = document.querySelector('div')
div.innerHTML = html
```

每当我们使用innerHTML去修改DOM这个是极其消耗性能的，因为innerHTML的过程会去试图解析字符串，转成可用的DOM树，之后再插入文档（非常的消耗性能），而当我们数据发生改变，再次使用innerHTML操作的时候等于又要再执行一次，所以这种场景就是 **原生操作DOM消耗性能的场景**

而虚拟DOM在更新的时候会生成一个新的JS的DOM对象，再去比对前一次和这一次的DOM对象的差别，只修改差别的地方（这里就少了渲染DOM树，和插入的过程），所以这就是虚拟DOM的优势。

### 更好的错误处理机制

在开发过程中`try-catch` 是用户自己写吗？如果是我们自己开发一些零碎的小功能的需求，那写一些是没问题的，但是如果是我们在设计框架，或者说封装一些组件，再或者是写一些工具方法，就算是为了开发体验，也应该要在内部实现一下错误处理：

**过去我曾大量写过这样的代码**

```js
function foo(fn) {
	try {
		fn && fn()
	} catch (error) {
		console.warn('not a function')
	}
}

function bar(fn) {
	try {
		fn && fn()
	} catch (error) {
		console.warn('not a function')
	}
}

module.exports = {
	foo,
	bar,
}
```

当只有一两个try-catch的时候其实还好，但是一旦 方法多了，就会发现try-catch会让代码变得不太好看，而且也不利于统一的管理。这种其实是可以优化的！

**简单优化后**

```js
let errorFn = null // 用户存放用户自定义错误处理的方法

function foo(fn) {
	// to do somethings
	catchError(fn)
}

function bar(fn) {
	// to do somethings
	catchError(fn)
}

// 内部统一做错误处理
function catchError(fn) {
	try {
		fn & fn()
	} catch (error) {
		errorFn && errorFn()
	}
}

// 暴露给用户的 如果发生错误了 应该要如何处理的接口
function ErrorHandler(fn) {
	errorFn = fn
}

module.exports = {
	foo,
	bar,
	ErrorHandler,
}
```

用户在使用的时候，就可以不用去写一些`try-catch`了，而且我们也比较贴心的为用户提供了如果发生错误时，相对应处理的钩子函数`ErrorHandler`,用户就可以这样使用：

```js
const { foo, bar, ErrorHandler } = require('./utils')

ErrorHandler(() => {
	console.warn('发生错误了，这里统一进行处理')
})

foo(() => {
	console.log('foo function')
})

bar('hello world')
```

上面的实现逻辑，其实就是 **vue** 的错误处理的方法，它也提供了这种统一处理错误钩子：

```js
import { createApp } from 'vue'
import App from 'App.vue'

const app = createApp(App)
app.config.errorHandler = () => {
  // 这里做一些错误的处理
}
```

### 虚拟DOM的理解

虚拟DOM就是用js的对象来描述我们我们的DOM，结合前面所了解的知识，我们知道了虚拟DOM是声明式的而不是命令式的，所以重点在于我们 如何声明和描述一个DOM。

如vue的**template**就是一个非常典型的声明式代码：

```vue
<template>
	<div @click="alert('hello')">hello world</div>
</template>
```

需要注意的是，以上的代码并不是纯种的HTML，vue为了让我们更平滑的使用，所以它直接采用了和纯种HTML一样的字符串（标签）来表述真实的DOM！

就像上面我们一眼就能看出来，是一个div标签，并且绑定了一个点击事件。

同样的，我们也可以使用纯JS来描述一个DOM：

```js
const vnode = {
  tag: 'div',
  props: {
    onClick: ()=>{
      alert('hello')
    }
  },
  children: 'hello world'
}
```

以上，我们就是成功的通过JS来描述了一个DOM，实际上我们知道vue的模板最终转成的vnode的最简单的模型其实也就是这样！所以我们试着将它渲染一下：

**将vnode 渲染到 id为app 的容器上**

```js
function renderer(vnode,container){
	const {tag, props, children} = vnode
  
  const el = document.createElement(tag)
  
	for (const key in props) {
		if (Object.hasOwnProperty.call(props, key)) {
			const fn = props[key]
			if (/^on/.test(key)) {
				el.addEventListener(key.substring(2).toLocaleLowerCase(), fn)
			}
		}
	}

	if (typeof children === 'string') {
		el.appendChild(document.createTextNode(children))
	} else if (Array.isArray(children)) {
		children.forEach(child => renderer(child, el))
	}

	container.appendChild(el)
}
```

**组件的理解**

怎么理解组件呢？

我们知道有函数式组件，如果组件可以是一个函数，但是有一点很重要，其的返回值一定也是一个vnode：

函数式组件：

```js
const MyComponent = () => {
	return {
		tag: 'h2',
		props: {
			onClick: () => {
				alert('function component')
			},
		},
		children: 'function component',
	}
}
```

所以我们如何渲染这个函数式组件呢？所以我们的代码就需要做一些细微的调整了:

```js
const MyComponent = () => {
	return {
		tag: 'h2',
		props: {
			onClick: () => {
				alert('function component')
			},
		},
		children: 'function component',
	}
}

const vnode2 = {
  tag: MyComponent
}

function renderer(vnode, container) {
	const { tag } = vnode
	if (typeof tag === 'string') {
		// mountElement(vnode, container) 挂载元素
	} else if (typeof tag === 'function') {
		// 函数式组件
		mountFunctionComponent(vnode, container)
	} 
}

function mountFunctionComponent(vnode, container) {
	const subtree = vnode.tag()
	renderer(subtree, container)
}
```

组件也可以是一个对象，大家都知道组件都有一个render渲染函数，所以大致可以理解成有这么一个结构：

```js
const MyComponent2 = {
	render() {
		return {
			tag: 'h3',
			props: {
				onClick: () => {
					alert('objectVnode')
				},
			},
			children: 'object Vnode',
		}
	},
}
```

渲染它！最终的代码如下：

```js
const MyComponent2 = {
	render() {
		return {
			tag: 'h3',
			props: {
				onClick: () => {
					alert('objectVnode')
				},
			},
			children: 'object Vnode',
		}
	},
}

const vnode3 = {
	tag: MyComponent2,
}

function renderer(vnode, container) {
	const { tag } = vnode
	if (typeof tag === 'string') {
		// mountElement(vnode, container)
	} else if (typeof tag === 'function') {
		// 函数式组件
		//  mountFunctionComponent(vnode, container)
	} else if (typeof tag === 'object') {
		// 具有render渲染函数的组件
		mountObjectComponent(vnode, container)
	}
}

function mountObjectComponent(vnode, container) {
	const subtree = vnode.tag.render()
	renderer(subtree, container)
}

renderer(vnode3, container)

```

这个就是对于虚拟DOM的一个简单理解，不过虚拟DOM最重要的是在更新环节而不是挂载环节，更新环节会在后续更加清晰之后再更新，敬请期待!

## 非原始值的响应式方案

### 函数和普通对象的区别

如何判断一个对象是普通对象还是函数？

> 这是一个非常常见的一个面试题，相信大部分的小伙伴都会

- 使用`typeof`来判断一个对象是否是函数

  ```js
  function f1(){}
  const obj = {}

  typeof f1  // "function"
  typeof obj // "object"
  ```

- 使用 `instanceof` 来判断

  > A instanceof B 判断 A 是否由 B 构造出来

  ```js
  function f1(){}
  const obj = {}
  
  f1 instanceof Function  // true
  obj instanceof Function // false
  ```

- 对象内部必要方法

  所有的对象内部方法
  
  
  |  内部方法  |
  |  ----  |
  | [[ Get ]] |
  | [[ Set ]] |
  | [[ Delete ]] |
  | [[ OwnPropertyKeys ]] |
  | [[ GetPrototypeOf ]] |
  | [[ SetPrototypeOf ]] |
  | [[ IsExteni=sible ]] |
  | [[ PreventExtensions ]] |
  | [[ GetOwnProperty ]] |
  
  函数独有的内部方法
  
  |  内部方法  |
  |  ----  |
  | [[ Call ]] |
  | [[ Construct] ] |
  
  > [[ Construct ]] 与 new 相关
  
  以上都是ECMA确定的内部方法，因为函数继承自对象，所以函数有独有的 `[[ Call ]]` 和 `[[ Construct] ]`，这也是一个函数与普通对象的区别。

​	
