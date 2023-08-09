# 小试牛刀 - StatusText 组件测试

上节的最后我们有了一个简单测试 demo，这节我们再来写一个业务组件，再根据业务组件我们来写对应的组件测试。

> 这里我们采用 BDD 的方式来实现，因为我还是习惯先写业务再写测试（见仁见智）

## 业务

我们要实现一个带有状态的文本。样式大致如下：
![image-20230809170403462](https://image.jimmyxuexue.top/img/202308091704634.png)

圈起来的部分就是我们要实现的组件。通过分析我们得出这个组件只有两部分组成，一个是左侧的状态点（状态点有不同的颜色），右侧是状态文案。

> 这是个很简单的组件吧，那我们就动手实现一下

## 实现

### 组件代码

```tsx
import { FC, HTMLAttributes } from 'react'

export enum EStatus {
	成功,
	失败,
}

interface TProps extends HTMLAttributes<HTMLDivElement> {
	successText: string
	errorText: string
	status: EStatus
}

export const StatusText: FC<TProps> = ({ successText, errorText, status }) => {
	const isSuccess = status === EStatus.成功
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
			}}
		>
			<div
				data-testid="statusBox"
				style={{
					width: 5,
					height: 5,
					backgroundColor: isSuccess
						? 'rgb(120, 219, 137)'
						: 'rgb(156, 163, 174)',
					borderRadius: '50%',
					marginRight: 5,
				}}
			></div>
			<div>{isSuccess ? successText : errorText}</div>
		</div>
	)
}
```

### 测试思路

这个简单的组件我们知道它的状态只有**成功**和**失败**两个状态，所以我们现在主要就是需要测试的是这两个状态下组件的一些内容就好，大致就是如下几个测试点

- 当状态为成功时
  - 状态文案是否是传入的成功文案
  - 状态点的颜色是否是成功状态的颜色
- 当状态为失败时
  - 状态文案是否是传入的失败文案
  - 状态点的颜色是否是失败状态的颜色

根据以上的测试点，我们就可以对应的编写出对应的测试代码，如下：

### 测试代码

```tsx
import { render } from '@testing-library/react'
import { EStatus, StatusText } from '..'

describe('>>> component StatusText', () => {
	it('when status is 成功', () => {
		const { queryByText, getByTestId } = render(
			<StatusText successText="成功" errorText="失败" status={EStatus.成功} />
		)
		expect(queryByText('成功')).toBeTruthy()
		expect(queryByText('失败')).toBeFalsy()
		const element = getByTestId('statusBox')
		const computedStyle = getComputedStyle(element)
		expect(computedStyle.backgroundColor).toBe('rgb(120, 219, 137)')
	})

	it('when status is 失败', () => {
		const { queryByText, getByTestId } = render(
			<StatusText successText="在线" errorText="离线" status={EStatus.失败} />
		)

		expect(queryByText('离线')).toBeTruthy()
		expect(queryByText('在线')).toBeFalsy()

		const element = getByTestId('statusBox')
		const computedStyle = getComputedStyle(element)
		expect(computedStyle.backgroundColor).toBe('rgb(156, 163, 174)')
	})
})
```

这里我们用到了关键的`@testing-library/react`这个库，这个库可以帮我们 mock 渲染出 react 组件，并且可以获取到对应的很多信息。如：

- queryByText

  组件是否有指定的文本

- getByTestId

  根据 test-id 获取元素，这个元素就是 mock 的 DOM 元素，我们就可以获取到这个 DOM 元素的信息，如背景颜色，等等

最终效果如下：
![image-20230809172418160](https://image.jimmyxuexue.top/img/202308091724280.png)

## 总结

这节我们算是复习了一下如何测试组件，后面我们会陆续学习其他的测试知识，如快照测试。
