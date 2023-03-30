# 将事件从 effect 中抽离出来

我们知道 useEffect 是一个功能非常强大的 API，但是我们也不能滥用和泛用。
分享和总结几个常见 react 开发上比较容易出现的错误处理流程。

::: tip useEffect 官方解释
useEffect 是用于同步 react 内部状态和外部系统状态（网络请求、第三方库等）的 API，其中外部系统 API
:::

## 事件类型不依赖于 Effect

基于这个 hook 设计的初衷（同步外界系统）。如果我们用 useEffect 去控制和执行一些内部的流程，就可能会触发一些 bug。其中一个比较典型的例子就是实用 effect 去控制一些 react 内部的流程。

**举个例子**

有个 Form 表单，当我点击按钮时会触发网络请求，请求之后会根据系统的主题（白色/黑色）分别弹窗出不同样式的提示。

如果我们把是否发起网络请求这个条件和流程放在 effect 中处理，则代码大致如下：

```tsx
import { Button, message, Switch } from 'antd'
import { FC, useEffect, useState } from 'react'

interface TProps {
	theme: 'Light' | 'Dark'
}

const BugForm: FC<TProps> = ({ theme }) => {
	const [isSubmit, setIsSubmit] = useState<boolean>(false)

	useEffect(() => {
		if (isSubmit) {
			// 为true时，触发网络请求
			FetchData()
			showNotification('已经触发网络请求了', theme)
		}
	}, [isSubmit, theme])

	const handleSubmit = () => {
		setIsSubmit(true) // 将状态设为true
	}

	const FetchData = () => {
		console.log('发起网络请求了')
	}

	const showNotification = (text: string, theme: 'Light' | 'Dark') => {
		if (theme === 'Light') {
			message.success(text)
		} else {
			message.info(text)
		}
	}

	return (
		<div>
			<Button onClick={handleSubmit}>提交</Button>
		</div>
	)
}

export const DependenciesBug: FC = () => {
	const [theme, setTheme] = useState<'Light' | 'Dark'>('Light')
	return (
		<div>
			<p>当前主题：{theme}</p>
			<Switch
				checked={theme === 'Light'}
				onClick={() =>
					setTheme(theme => (theme === 'Light' ? 'Dark' : 'Light'))
				}
			/>
			<BugForm theme={theme}></BugForm>
		</div>
	)
}
```

我们利用 effect 想要实现的是一个类似于自动化请求的逻辑，只需要控制 isSubmit 就可以触发网络请求。但是这个实际上是一个错误的处理方式。因为在业务上，也是只有当按钮被点击时才会走逻辑和流程。但是这样写的情况下，如果修改 另外一个 `dependencies` theme 的话，也是会走到 effect 逻辑里的，这里就是一个很有可能出现的一个 bug。

**一个真实的故事**

以上的这种代码我写过，而且因为业务相对复杂，所以 effect 监听的依赖还很多，导致后续出问题时及其的难以调试，同事说：**`useEffect`** 不是这么用的，用 useEffect 来管理这种数据是会出问题的。后面花时间重构了那段复杂的代码......
