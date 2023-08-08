# mock fn 内容补充

前几节我们都涉及到一个`jest.fn`这个 api，使用它 mock 出来的函数，我们可以知道这个函数是否被调用，或者被调用了几次。

但是我们通常测试函数时，除了要测试函数是否被调用，重头戏应该是：

- 函数接收的参数
- 函数的返回值

所以我们就简单的过一下，应该如何测试这两个场景：

> 一样也是基于 `jest.fn`

## 案例

我们来看下这个 demo:

**业务代码**

```ts
export function testTwoFn(fn1: () => void, fn2: (count?: number) => void) {
	setTimeout(() => {
		console.log('fn1 running!')
		fn1()
	}, 2000)

	setTimeout(() => {
		console.log('fn2 running!')
		fn2(3)
	}, 4000)
}
```

核心逻辑就是 2 秒执行 fn1，4 秒执行 fn2，同时 fn2 是会传递一个 count 参数的。所以基于这个我们就可以写出以下的测试代码：

**对应测试**

```ts
describe('>>> jest.fn', () => {
	it('test fn return', () => {
		jest.useFakeTimers()
		const fn1 = jest.fn(() => {})
		const fn2 = jest.fn(num => num + 1)

		testTwoFn(fn1, fn2)

		jest.runAllTimers()

		expect(fn1).toBeCalled()
		expect(fn2).toBeCalled()

		// 测试 函数接受的形参
		expect(fn2).toBeCalledWith(3)

		// 测试 函数的返回值
		expect(fn2).toHaveReturnedWith(4)
	})
})
```

以上的代码最为关键的其实就是我们学会了两个新的 api：

- toBeCalledWith

  函数被调用时伴随的参数

- toHaveReturnedWith

  伴随函数返回时的值

基于以上的两个 api，我们就可以知道这两个场景下的内容了。

## 总结

这个小节作为前面的课程内容的知识点补充小节，所以内容非常简短，再结合前面的内容，掌握了我们就基本可以非常轻松的模拟几乎所有的函数调用的场景了。后面我们再一一的继续深入学习。
