# 初识 react 测试

之前讲的一些单元测试属于的是最为基层的测试，关注点在于一些核心的业务逻辑的抽象，进行细致的测试。

但我们真正深入公司业务开发的过程中，除了单元测试，大家应该都听过一些其他测试，如快照测试、组件测试、e2e 之类的词语。后面我们都会慢慢的接触到它。

```
pnpm add -D @testing-library/react # 测试react的核心库
pnpm add -D @babel/preset-react # 转译react语法的babel库
```

配置 babel.config.cjs

```ts
module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					node: true,
				},
			},
		],
		[
			// 这部分是新增的
			'@babel/preset-react',
			{
				runtime: 'automatic',
			},
		],
		'@babel/preset-typescript',
	],
}
```

> 为什么要配置 babel？
>
> 我们可以理解 babel 为一个语法转译器，我们比较熟知的是，为了兼容一些低版本的浏览器、工具库之类的，使用 babel 可以将一些高级的 js 语法转译成 es5 的语法。所以使用 babel 可以实现语法转译。
>
> 但是 babel 功力不止于此，在测试时，我们需要使用 babel 转译 react 的语法

这里我们需要安装一下这个针对 react 的测试库，之所以选用这个，是因为之前接触的一直是这个，也是非常好用，文档很全。

> [jest 的官网](https://jestjs.io/docs/tutorial-react)现在首选推荐的是 `react-test-renderer` 这个库，这个大家也可以去看看，这个系列的文档就不涉及了。

## hello world

下面我们来写个简单的 hello world，先简单的接触一下，这块应该如何做。

### 业务组件

```tsx
import { useState } from 'react'

type TProps = {
	labelOn: string
	labelOff: string
}

export default function CheckboxWithLabel({ labelOn, labelOff }: TProps) {
	const [isChecked, setIsChecked] = useState(false)

	const onChange = () => {
		setIsChecked(!isChecked)
	}

	return (
		<label>
			<input type="checkbox" checked={isChecked} onChange={onChange} />
			{isChecked ? labelOn : labelOff}
		</label>
	)
}
```

这是一个常见的简单组件，给 checkboox 支持了开启和关闭时对应的文案显示。那这个组件我们应该怎么进行测试呢？

下面我们看下应该怎么编写对应的组件测试代码。

### 组件测试

```ts
import { render, fireEvent } from '@testing-library/react'
import { CheckboxWithLabel } from '..'

describe('>>> component CheckboxWithLabel', () => {
	it('CheckboxWithLabel changes the text after click', () => {
		const { queryByLabelText, getByLabelText } = render(
			<CheckboxWithLabel labelOn="开启" labelOff="关闭" />
		)

		expect(queryByLabelText('关闭')).toBeTruthy()

		fireEvent.click(getByLabelText('关闭'))

		expect(queryByLabelText('关闭')).toBeFalsy()

		expect(queryByLabelText('开启')).toBeTruthy()
	})
})
```

这个测试我们用了`@testing-library/react`这个库的`render`和`fireEvent`方法，测试了这个组件在不同状态下对应文案的展示。

> 看测试组件的代码，其实并不难对吧。

## 总结

这节我们了解 react 侧相关的测试，并跟着官网写了一个简单的 hello world，后面我们会逐步深入，了解快照测试、组件测试、hooks 测试相关的内容。
