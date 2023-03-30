# dependencies 引起闭包陷阱

::: tip useEffect
useEffect 是一个非常强大且危险的 API。很多工作多年的 react 开发者可能还是不能完全理解和吃透 useEffect 的机制。下面介绍一个最为常见的一个理解误区：**闭包陷阱**。
:::

## 案例

以下一个简单的例子，大家可以猜测下**当在两个输入框都随便输入一些内容之后，点击 Switch 开关时输出的结果是什么？**：

```tsx
import { Button, Input, message, Switch } from 'antd'
import { FC, useEffect, useState } from 'react'

export const EffectEventDemo: FC = () => {
	const [name, setName] = useState<string>('')
	const [age, setAge] = useState<number>(0)
	const [show, setShow] = useState<boolean>(false)

	useEffect(() => {
		if (show) {
			message.success(`${name} + ${age}`) // 输出内容是什么呢？
		}
	}, [show])

	return (
		<div>
			<Input
				value={name}
				onChange={e => {
					setName(e.target.value)
				}}
			></Input>
			<Input
				value={age}
				onChange={e => {
					setAge(Number(e.target.value))
				}}
			></Input>
			<Switch
				checked={show}
				onClick={val => {
					setShow(val)
				}}
			/>
		</div>
	)
}
```

答案是输出 ` + 0` 吗？因为`useEffect`中的`dependencies`中只监听了`show`这个值，而`name`和`age`并没有在 `dependencies` 中，所以这个 effect 并不会监听`name`和`age`的值，无论输入框输出什么点击开关时永远输出的内容都是` + 0`。

大家的答案是否如上面一样呢？

以上的猜想是我第一次写这个 demo 时的想法，我是一个使用 `react` 开发一年半的程序员，自认为已经完全摸透了`useEffect`这个 `hook`，然而在这个 demo 上翻了车。

公布正确答案吧：

正确答案是无论输入框输入了什么，当我们点击开关之后，输出的内容都是始终保持和我们输入的内容保持一致的！

这我就纳了闷了，`useEffec`t 不是没有添加对应的 `name` 和 `age` 的依赖吗，怎么还是会保持同步更新呢？真是百思不得其解。

之后问了几个同事，也是有和我一样掉入这个陷阱的同事，也是有说出正确答案的同事。在同事的解释下，其实解答这个问题的答案非常简单，使用一句话就可以概括了，那就是：**useEffect 中，每一个 effect 版本“看到”的值都来自于它属于的那次渲染**

将这句话应用到这个简单的 `demo` 中:

> 假设第一个输入框输入 jimmy，第二个输入框输入 24

我们可以知道，当点击开关之后，这次渲染的 `effect` 上下文的值分别是多少:

- show => true
- name => jimmy
- age => 22

因为这次版本中 `name` 和 `age` 是有值的，所以会在 `effect` 中取值时就直接取了这当中的值。

## 举一反三

如果我们代码是这样写的呢？结果会是什么？

> 当组件渲染的 5s 后，输出 name 和 age

```tsx
import { Button, Input, message, Switch } from 'antd'
import { FC, useEffect, useState } from 'react'

export const EffectEventDemo: FC = () => {
	const [name, setName] = useState<string>('')
	const [age, setAge] = useState<number>(0)
	const [show, setShow] = useState<boolean>(false)

	useEffect(() => {
		setTimeout(() => {
			message.success(`${name} + ${age}`) // 输出内容是什么呢？
		}, 5000)
	}, [])

	return (
		<div>
			<Input
				value={name}
				onChange={e => {
					setName(e.target.value)
				}}
			></Input>
			<Input
				value={age}
				onChange={e => {
					setAge(Number(e.target.value))
				}}
			></Input>
			<Switch
				checked={show}
				onClick={val => {
					setShow(val)
				}}
			/>
		</div>
	)
}
```

回想上面的那个口诀：**useEffect 中，每一个 effect 版本“看到”的值都来自于它属于的那次渲染**

5 秒后即是我们两个输入框都有输内容，但是因为那次 `effect` 的版本中值分别是什么：

- show => false
- name => ''
- age => 0

所以在这个版本下，无论我们输入框输入了什么内容，输出的结果始终将是 ` + 0`。

## 再举个例子

如果代码改成这样写，输出的内容又将会是怎么样呢？

> 假设我们 5 秒内将第一个输入框输入 jimmy 第二个输入框输入 24。

```tsx
import { Button, Input, message, Switch } from 'antd'
import { FC, useEffect, useState } from 'react'

export const EffectEventDemo: FC = () => {
	const [name, setName] = useState<string>('')
	const [age, setAge] = useState<number>(0)
	const [show, setShow] = useState<boolean>(false)

	useEffect(() => {
		if (show) {
			message.success(`${name} + ${age}`) // 输出内容是什么呢？
		}
	}, [show])

	useEffect(() => {
		setTimeout(() => {
			setShow(true)
		}, 5000)
	}, [])

	return (
		<div>
			<Input
				value={name}
				onChange={e => {
					setName(e.target.value)
				}}
			></Input>
			<Input
				value={age}
				onChange={e => {
					setAge(Number(e.target.value))
				}}
			></Input>
			<Switch
				checked={show}
				onClick={val => {
					setShow(val)
				}}
			/>
		</div>
	)
}
```

因为组件渲染的我们 5 秒后将 `show` 改为了 `false`，触发了组件的重新渲染，那么这次 effect 版本的值分别是：

- show => true
- name => jimmy
- age => 24

所以这时候，输出的内容就是 `jimmy + 24` 了。

## 总结

如果能耐心开导这里，相信大家能理解这个 `useEffect` 关于闭包陷阱的机制了，总的说就是那句非常关键的口诀：**useEffect 中，每一个 effect 版本“看到”的值都来自于它属于的那次渲染**。

为了避免出现这种闭包陷阱，还有一个口诀：**useEffect 中用到了什么变量，那就把所用的变量加入到 dependencies 中（前提是业务和处理流程正确的情况下）。**
