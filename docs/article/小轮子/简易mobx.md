# mobx 实现

本人是一名 react 开发者，的状态管理的实现方案有很多，比较被大家所熟知的有 `redux`、`dva`、`mobx` 等。

其中`mobx`这个解决方案是我认为最简单的一个，因为其他的解决方案涉及的概念实在是太多了，比如`redux`，概念就很多像 state action view 之类的，初次使用时真是研究了好久，还是玩的不太明白。

相比之下 mobx 就简答的多了，具体大家可以看这个这个历史的文章：

- [mobx 状态管理](http://www.jimmyxuexue.top:999/article/%E6%96%B0%E6%8A%80%E6%9C%AF%E5%90%88%E9%9B%86/mobx%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86.html)

- [mobx 使用视频](https://www.bilibili.com/video/BV1N54y1w7Hi/?spm_id_from=333.999.0.0&vd_source=b869b9e47469b5438851429bda1fb3fc)

在使用 mobx 的时候我最大的一个疑问就是，明明就是创建的普通的一个对象变量，居然可以像 react 的内部状态一样，修改时同步更新组件。太强大了。

我也没有看 mobx 的源码，但是有搜索过实现方案，原来实现的逻辑其实就是这两步即可：

- 响应式依赖收集
- 监听变化之后执行 `forceUpdate`

forceUpdate 可以实现强制重新渲染一次组件，所以逻辑上是将组件包裹一层，当捕获到响应式变量变化时，强制执行一次`forceUpdate` 就可以实现状态的精准更新了！

所以我们依次完成上述的两个步骤即可：

## 响应式依赖收集

这个步骤其实和 vue 响应式依赖收集是一样的。原理就是利用`proxy`代理机制，在获取变量和更新变量时可以有回调函数，可以让我们做一些操作：

具体代码实现思路可以看这个视频： [reactive 响应式实现](https://www.bilibili.com/video/BV1hr4y147vf/?spm_id_from=333.999.0.0&vd_source=b869b9e47469b5438851429bda1fb3fc)

- `reactive` 函数将普通变量变为响应式变量
- `autoRun` 当响应式变量变化时，autoRun 绑定的函数会自动执行

## 与 react 相互绑定

只需要实现 响应式数据和组件相互绑定即可，当响应式数据变化时执行一次 forceUpdate 即可。代码其实没有几行，大致如下：

> `autoRun` 这个函数，当响应式数据变化执行重新调用一下组件（组件是函数，返回值是 `ReactNode` 类型，再将最新的 `ReactNode`，再调用一次 `forceUpdate` 返回即可）

```tsx
import { FC, useEffect, useRef, useState } from 'react'
import { autoRun } from '../reactive/reactive'

export function Observer(fnComponent: FC): any {
	return () => {
		const ref = useRef()
		const [_, setData] = useState(0)
		useEffect(() => {
			autoRun(() => {
				// @ts-ignore
				ref.current = fnComponent()
				setData(data => data + 1)
			})
		}, [])
		return ref.current
	}
}
```

## 使用小 Demo

```tsx
import { Observer } from './core/observer/observer'
import { reactive } from './core/reactive/reactive'

const obj = reactive({
	name: 'jimmy',
	age: 22,
	study: {
		book: 'js',
	},
})

const Container: FC = () => {
	return (
		<div>
			{obj.name} -- {obj.age} -- {obj.study.book}
			<Button
				onClick={() => {
					obj.name = '吉米'
				}}
			>
				changeName
			</Button>
			<Button
				onClick={() => {
					obj.age = 33
				}}
			>
				changeAge
			</Button>
		</div>
	)
}

export const MoBxDemo = Observer(Container)
```

以上的代码即可实现一个简易版本的`mobx`啦，不知道实现思路上是否有错误的地方，后续我会看一下`mobx-react-lite`这块的源码，看看实现方案，再同步更新。
