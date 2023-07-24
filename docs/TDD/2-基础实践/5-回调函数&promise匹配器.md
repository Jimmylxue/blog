## 回调函数 & promise

重点还是要自己主动的看文档哦，这里只涉及一些常用的。

## 回调函数

简单过一下回调函数，我们看下这个demo:

> 虽说现在异步的代码大部分都是promise实现了，但是还是有一部分的老代码或者老库是支持异步回调函数的方式的，所以这块也得简单的过一下。

```ts
function fetchData(callback: (arg: string) => void) {
	setTimeout(() => {
		callback('hello world')
	}, 1000)
}
```

这种情况我们应该怎么测试呢？

```ts
it('是否返回 hello jest', done => {
	function callback(data: string) {
		expect(data).toBe('hello jest')
		done()
	}
	fetchData(callback)
})
```

这里非常关键的一点是我们在test里接收了一个 `done` 参数，只有当我们手动的调用了`done()`，这个测试才会进入完成状态，否则我们可以理解它是会一直在等待状态（这个感觉和promise 的 pending有点像是吧）

![image-20230724222214990](https://image.jimmyxuexue.top/img/202307242222095.png)

> 如果不加 done，程序会卡一段时间（等待）。从报错信息中也提示了我们，应该加上done

这就是一个最重要的一个点，当我们需要测试一些异步回调函数时，我们就需要用到 `done` 这个函数了。

## promise

异步的另一个更好解决方案就是promise！基于上面的例子，我们简单的改为promise来试一下：

```ts
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('hello jest'), 1000)
  })
}
```

匹配promise的方式有很多

- 使用 `then`、`catch`

    ```ts
    it('>>> 使用   匹配器来匹配resolve', () => {
	expect(fetchPromise(true)).resolves.toBe('hello jest')
    })
    
    it('>>> 使用 rejects 匹配器来匹配resolve', () => {
    	expect(fetchPromise(false)).rejects.toBe('hello reject')
    })
    ```

- 使用 `resolves`、`rejects`

  ```ts
  it('>>> 使用 resolves 匹配器来匹配resolve', () => {
  	expect(fetchPromise(true)).resolves.toBe('hello jest')
  })
  
  it('>>> 使用 rejects 匹配器来匹配resolve', () => {
  	expect(fetchPromise(false)).rejects.toBe('hello reject')
  })
  ```

- 使用`async/await`

  ```ts
  it('>>> 使用 async await 匹配promise', async () => {
  	const res = await fetchPromise(true)
  	expect(res).toBe('hello jest')
  	try {
  		await fetchPromise(false)
  	} catch (error) {
  		expect(error).toBe('hello reject')
  	}
  })
  ```

测试promise的方式有很多，见仁见智，我个人还是比较喜欢async/await 的方式，比较符合平时开始的逻辑和流程。

## 总结

这部分的内容也过完啦，现在真的是85%的场景我们都可以写一些单测来进行测试了。

下一节我们就来写一个经典案例，这回我们通过`BDD`的方式来写

> 还记得BDD是啥吧，不知道的同学回看第五节的内容🤭

