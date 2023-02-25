---
head:
  - - meta
    - name: description
      content: mobx状态不同步？

  - - meta
    - name: keywords
      content: Nest.js

  - - script
    - src: https://vitepress-source.oss-cn-beijing.aliyuncs.com/statistics.js
---

# mobx 状态不同步？

嗨大家好我是 jimmy，之前学习了使用 mobx 进行状态管理，以为已经能够很熟练的使用了，但是还是遇到了一个状态不同步的问题。跟大家伙分享一下~

话不多说，直接上代码~

box.ts

```ts
import { makeAutoObservable } from 'mobx'

class Box {
	child: { name: string }[] = []
	constructor() {
		makeAutoObservable(this)
	}

	addChild(child: { name: string }) {
		this.child.push(child)
	}
}

export const box = new Box()
```

deep.tsx

```tsx
import { Button } from 'antd'
import { box } from './box'
import { observer } from 'mobx-react-lite'
import { action } from 'mobx'

type TProps = {
	child: { name: string }
}

export const DeepDemo = observer(function () {
	const Names = ({ child }: TProps) => {
		return (
			<div
				onClick={action(() => {
					box.childs[0].name = 'hello world'
				})}
			>
				{child.name}
			</div>
		)
	}

	return (
		<div>
			{box.childs.map((child, index) => (
				<Names child={child} key={index} />
			))}
			<Button
				onClick={() => {
					box.addChild({
						name: 'jimmy',
					})
				}}
			>
				add Child
			</Button>
		</div>
	)
})
```

上述例子想实现的功能是：当我点击按钮时，页面上会多一个 jimmy 文字显示，一单我点击其中的一个 jimmy，这时候就会将第一个 jimmy 改成 hello world。

真实的效果是：当我点按钮时，页面同步多一个 jimmy，但是当我点 jimmy 视图修改一个 jimmy 的文案时，这时候就不生效了！！！

有小伙伴知道是为什么吗~~~~~

---

说下解决方案吧。因为我们显示每个 jimmy 是通过<Name />组件所渲染的，所以我们需要给每个`Name`组件也加上`observer`包裹一下变成观察者。

![mobx](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20230225155208321.png)

期初我以为将父组件设置为观察者就行了，原来父组件的子组件也需要变为观察者才行。

学废了吗~ 如果有更好的解决方案欢迎给我私信或者留言呀~
