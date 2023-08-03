# Timer 内容补充

上节 timer 相关的内容涉及了比较多的新知识点，如果第一次接触可能会有觉得有点难以理解，所以接下来会出几节会以案例的方式对内容进行只是补充，主要的目的就是为了再复习一下这块的测试方式和流程。

## 案例

下面我们来看个官网的案例：[官网 timer 案例](https://jestjs.io/zh-Hans/docs/timer-mocks)

**业务代码**

```ts
export function timerGame(callback?: () => void) {
	console.log('Ready....go!')
	setTimeout(() => {
		console.log("Time's up -- stop!")
		callback && callback()
	}, 1000)
}
```

**对应测试**

```ts
it('简单测试timer 等待1s', () => {
	jest.useFakeTimers() //这个甚至可以不用写。
	jest.spyOn(global, 'setTimeout')
	timerGame(() => {})

	expect(setTimeout).toHaveBeenCalledTimes(1)
	expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000)
})
```

在这个案例中我们的测试逻辑其实是通过`spyOn`来创建一个模拟的`setTimeout`，然后判断`setTimeout`被执行的次数来判断 timerGame 的业务逻辑是否正确的。

在这个案例中 `jest.useFakeTimers()` 这个甚至不需要使用。但是这个测试并不完善。我们并没有对`timerGame` 函数传递的回调函数进行测试。所以我们就需要使用到`jest.fn`

**使用 jest.fn 配合 jest.useFakeTimers**

```ts
it('calls the callback after 1 second', () => {
	jest.useFakeTimers()
	const callback = jest.fn()

	timerGame(callback)

	// 期待函数还没有被调用
	expect(callback).not.toBeCalled()

	// 运行所有的timer
	jest.runAllTimers()

	// 到这里 所有的Timer时间都过了
	expect(callback).toBeCalled()
	expect(callback).toHaveBeenCalledTimes(1)
})
```

以上这个 demo 我们就能很好的知道`jest.useFakeTimers`的用处了，使用它再配合上`jest.fn` 就可以很好的知道一个函数到底是否被调用了。

这个测试对于上一个测试来说我又更进了一步，不仅知道了`setTimeout`被调用了，传递的回调函数也可以很清晰的知道是被调用了。

> jest.useFakeTimers 配合 jest.fn 一起使用

**更进一步**

看以下这个 demo：

```ts
export function testTwoFn(fn1: () => void, fn2: (str?: string) => void) {
	setTimeout(() => {
		console.log('fn1 running!')
		fn1()
	}, 2000)

	setTimeout(() => {
		console.log('fn2 running!')
		fn2('hello world')
	}, 4000)
}
```

我们简单读代码知道核心逻辑是 2 秒执行 fn1，4 秒执行 fn2。通过我们前面学到的知识和 api 是不能够测试这种场景的，因为`jest.runAllTimers`会直接把时间拉满，没有办法测试具体的一些一个时间点。

不过这个 jest 也为我们想好了，这里我们学习一个新的 api ：`jest.advanceTimersByTime()` 可以传对应的毫秒数。

我们可以把这个 api 理解成是：时间推进

```ts
describe('>>> test advancertimersbytime', () => {
	it('test 1.9 second function status', () => {
		const fn1 = jest.fn()
		const fn2 = jest.fn()
		jest.useFakeTimers()
		testTwoFn(fn1, fn2)
		expect(fn1).not.toBeCalled()
		expect(fn2).not.toBeCalled()

		jest.advanceTimersByTime(1900)

		expect(fn1).not.toBeCalled()
		expect(fn2).not.toBeCalled()
	})

	it('test 2 second function status', () => {
		const fn1 = jest.fn()
		const fn2 = jest.fn()
		jest.useFakeTimers()
		testTwoFn(fn1, fn2)
		expect(fn1).not.toBeCalled()
		expect(fn2).not.toBeCalled()

		jest.advanceTimersByTime(2000)

		expect(fn1).toBeCalled()
		expect(fn2).not.toBeCalled()
	})

	it('test 4 second function status', () => {
		const fn1 = jest.fn()
		const fn2 = jest.fn()
		jest.useFakeTimers()
		testTwoFn(fn1, fn2)
		expect(fn1).not.toBeCalled()
		expect(fn2).not.toBeCalled()
		jest.advanceTimersByTime(4000)
		expect(fn1).toBeCalled()
		expect(fn2).toBeCalled()
	})
})
```

基于这个知识点，我们可以很好很方便的精准定位每个时间点时的一些状态以及对应的做一些测试。

## 总结

相信通过官网的这两个案例，大家能够很清晰的知道哪个场景下具体应该怎测试了。就是`timer`相关的 api 进行对应的场景的配合使用。

下节课我们通过一个短节再来重新的认识一下`jest.fn`
