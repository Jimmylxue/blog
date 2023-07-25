# 牛刀小试 - 获取文件名信息

看完上一节内容，这节我们再来做一个简单的练习题，也是一个非常常见场景和需求，我们来获取一个文件名的信息。

> 这回我们采用 BDD 的方式来进行编程。
>
> TDD 很多小伙伴不习惯先写测试用例的习惯，那我们就用 TDD 来写，先写业务，再针对业务点进行抽象和拆分，对主要场景进行编写单测进行测试。

## 需求分析

一个文件名我们可以获取的信息有如下：

- 文件名
- 文件扩展名

## 业务&测试代码

简单的分析，我们知道一般的文件是通过`.`来进行分割的，如`test.html`，文件名是`test`，文件扩展名是`html`。基于这点理解，我们开始编写业务代码：

```ts
// file.ts
export function getFileName(nameString: string) {
	if (nameString === undefined || nameString === null) {
		return {
			ext: '',
			fileName: '',
		}
	}
	const name = String(nameString) // 虽然我们ts限制了 参数是string类型，但是保不齐会有新手同学传不同类型的参数，所以也可以做一层防御
	const nameArr = name.split('.')
	const ext = nameArr[nameArr.length - 1]
	return {
		fileName: nameArr[0],
		ext,
	}
}
```

基于上面的业务代码，我们现在来编写测试代码：

```ts
import { getFileName } from '../file'

describe('>>> getFileName', () => {
	it('fileName is undefined', () => {
		expect(getFileName(undefined as any)).toEqual({
			ext: '',
			fileName: '',
		})
	})

	it('fileName is null', () => {
		expect(getFileName(null as any)).toEqual({
			ext: '',
			fileName: '',
		})
	})

	it('fileName is ""', () => {
		expect(getFileName('')).toEqual({
			ext: '',
			fileName: '',
		})
	})

	it('fileName is "file.ts"', () => {
		expect(getFileName('file.ts')).toEqual({
			ext: 'ts',
			fileName: 'file',
		})
	})

	// 这个单测 测试失败
	it('fileName is "file.ts"', () => {
		expect(getFileName('file.spec.ts')).toEqual({
			ext: 'ts',
			fileName: 'file.spec',
		})
	})
})
```

上面的 demo 中，最后一个单测运行失败，我们获取文件名这块错误了，报的错是这个：

![image-20230725215254581](https://image.jimmyxuexue.top/img/202307252153699.png)

jest 也非常贴心的告诉我们是 fileName 没有匹配上，说明这块我们的业务代码实现的有 bug（我们获取的是数组的第一项）。所以这块我们需要更新一下对应的业务代码：

```ts
export function getFileName(nameString: string) {
	if (nameString === undefined || nameString === null) {
		return {
			ext: '',
			fileName: '',
		}
	}
	const name = String(nameString)
	const nameArr = name.split('.')
	const ext = nameArr[nameArr.length - 1]
	const copyNameArr = [...nameArr]
	copyNameArr.splice(nameArr.length - 1, 1)
	return {
		// fileName: nameArr[0],
		fileName: copyNameArr.join('.'), // 不再只是获取第一项
		ext,
	}
}
```

之后再运行测试用例，这时候我们的单测就完美通过了.

![image-20230725215656169](https://image.jimmyxuexue.top/img/202307252156214.png)

## 优化

上面的代码还是能够继续优化的 想象我们平时见的文件还有那些呢？是不是还有一些隐藏文件，如`.gitignore`这种的，这块的代码我就不继续写了，大家自己给这个函数进行优化吧~🤭

## 总结

上面的编码开发过程就是 BDD ，怎么样？和　 TDD 的编程方式大家更喜欢哪种呢？ BDD 可能会更加贴近我们平时的开发流程和模式一点 , 但是本质上二者其实差不多, 核心都是通过一些单元测试来巩固我们的代码 , 提前发现一些上线了可能会出现的 bug。

通过这八节课，我们系列课程的基础实战部分已经全部结束，已经可以应付绝大多数的场景的测试了。我们需要提高的无非就是一些封装和抽象思维。（这点写多了就会了）但这不意味着结束，才只是冰山一角，后面我们会进入第三部分 —— 进阶实战。
