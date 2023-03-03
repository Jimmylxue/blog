---
head:
  - - meta
    - name: description
      content: mobx状态管理

  - - meta
    - name: keywords
      content: mobx

  - - script
    - src: https://vitepress-source.oss-cn-beijing.aliyuncs.com/statistics.js
---

# mobx 状态管理

嗨大家好我是 jimmy，又见面了，今天这期视频要跟大家分享的一个技术或者说小工具就是 mobx，会分享这个是因为上周我经历了一个强度相当之大的一周，后面同事推荐我使用这个工具库来统一维护一些业务的状态。用了之后确实是事半功倍，代码也更加的优雅了。那我现在也向大家分享和推荐一下这个库，以及应该如何使用~

我是 react 技术栈的开发者，所以主要面向的是 react 方向的小伙伴。
首先我们需要安装这两个东西。

```
yarn add mobx mobx-react-lite
```

说到状态，我们知道 react 是状态变化驱动视图变化的，这也就是我们常说的响应式，在 react 中我们要使用状态，可以使用`useState`这种 hook 来管理一个状态，这也是官方提供给我们的 API。

所以状态管理，我们可以理解成类似于 `vuex`、`redux`同类型的产品，在它们所管理下的状态，页面只要引用了状态，当状态变化时，页面数据也是同步进行响应式变化的。

## 关键 API

> 因为我也是刚接触，所以一些高阶的 API 暂不做研究和讨论，只讨论如何快速构建一个状态管理系统所需要的一些 API。

- makeAutoObservable

  见字如面，这个方法传递一个对象，那么这个对象将会变成一个响应式的对象。

- observer

  监听变化，传递一个组件，那么这个组件就变成一个观察者组件。

只需这两个 API，我们便可创建一个最简单的响应式状态管理系统！

box.ts

```ts
import { makeAutoObservable } from 'mobx'

class Box {
	flag: undefined | boolean
	constructor() {
		makeAutoObservable(this)
	}

	setFlg(flag: boolean) {
		this.flag = flag
	}
}

export const box = new Box()
```

demo.tsx

```tsx
import { Button } from 'antd'
import { box } from './box'
import { observer } from 'mobx-react-lite'

export const MoBxDemo = observer(function () {
	return (
		<div>
			{box.flag ? '1' : '0'}
			<Button
				onClick={() => {
					box.flag ? box.setFlg(false) : box.setFlg(true)
				}}
			>
				changeFlag
			</Button>
		</div>
	)
})
```

此时我们会发现，点击按钮，页面也在不断地 0 和 1 之间进行着切换！我们并没有用`useState`之类的东西对吧，但是视图也是更新了！

使用它的好处就是我们可以非常舒服的在不同层次组件中进行状态管理，而不需要通过 `props` 或者 `context` 进行传参。
