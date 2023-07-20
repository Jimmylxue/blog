# 全局 mock 配置

jest 在运行时，毕竟是在终端上运行的，所以默认的环境是 node 环境（在生成配置文件的时候也让我们选择环境了）如果选择的是 node 环境。它是没有`localStorage`、`Session`、`Cookie`、`indexedDB`、`Web SQL`、`DOM`等 API 的。而如果我们选择的是`jsdom`，我们可以理解成是在 Node.js 环境模拟的一个浏览器环境中运行，这时候它就会有这些 api 函数。

> 这里需要注意，这我们可以理解成是一个阉割版的浏览器环境，api 是肯定没有真正的浏览器环境全的。
>
> 之后会慢慢深入

下面我们重点来讲下如果我们选择的是 node 环境，没有一些 api，我们应该怎么让测试进行下去。

> 虽然我们之前课程选的是 jsdom 环境，但是一样的道理，jsdom 也会有一些没有的 api，所以这种解决问题的思路需要统一学习的。

具体我们选择的是环境可以 jest 的配置文件：

```ts
import type { Config } from 'jest'

const config: Config = {
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: 'coverage',
	coverageProvider: 'v8',
	testEnvironment: 'node', // jsdom 二者可选 先改成node 学习mock的思路
}

export default config
```

这时候我们可以自己 mock 一个配置。

> mock 这个词也是非常的形象，就是咱可以自己模拟一个。
>
> ....换句话说就是得自己写一个类似的 API，是个挑战吧~，当然这种的肯定也是有别人已经写好了的。直接拿他们写好的就行，不过避免后续出现非常特殊和少见的 api，我们也是得学习怎么用的。

## mock localStorage

这里我们选择 mock 一个 localStorage，选择它是因为它的 api 足够简单，且我们对它都非常熟。

我们先写一个关于 localStorage 的测试用例。

```ts
import { clear, get, set } from '../localStorage'

describe('>>> test localStorage function', () => {
	it('set and get localStorage', () => {
		set('test', 'hello world')
		expect(get('test')).toBe('hello world')
	})

	it('clear localStorage', () => {
		set('hello', 'world')
		expect(get('hello')).toBe('world')
		clear()
		expect(get('hello')).toBeFalsy()
	})
})
```

接着写对应的 `set`、`get`、`clear` 函数。

```ts
// utils/localStorage.ts
export const LOCAL_KEY = 'JEST_STUDY_KEY_'

export function set(key: string, value: string) {
	localStorage.setItem(LOCAL_KEY + key, value)
}

export function get(key: string) {
	return localStorage.getItem(LOCAL_KEY + key)
}

export function clear() {
	localStorage.clear()
}
```

这时候我们执行测试，就会发现控制台报错了。

![image-20230719094640514](https://image.jimmyxuexue.top/img/202307190946633.png)

不出所料报的是找不到`localStorage`，和我们之前说的是一样的。

```ts
// src/__test__/setup.ts
Object.defineProperty(global, 'localStorage', {
	value: {
		store: {} as Record<string, string>,
		setItem(key: string, value: string) {
			this.store[key] = value
		},
		getItem(key: string) {
			return this.store[key]
		},
		removeItem(key: string) {
			delete this.store[key]
		},
		clear() {
			this.store = {}
		},
	},
	configurable: true,
})
```

在 jest 配置文件中引入这个 setup 文件

```ts

const config: Config = {
	...
	testEnvironment: 'node', // node 二者可选
	setupFilesAfterEnv: ['./src/__test__/setup.ts'], // 引入setup文件
}

export default config
```

之后再进行测试，就会发现已经正常了。

![image-20230719095255357](https://image.jimmyxuexue.top/img/202307190952444.png)

当然如果我们将`testEnvironment`改成`jsdom`，也是一样能够运行的。

## 总结

这里主要就是学习怎么样 mock 一些，jest 本身不认识的 api。这是一个解决思路，真正企业里的项目可能会引用各种各样的库，jest 并不都认识。所以我们是可以通过这种思路来解决一下运行单测报错的问题。
