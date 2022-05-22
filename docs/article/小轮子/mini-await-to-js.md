---
head:
  - - meta
    - name: description
      content: mini-await-to-js

  - - meta
    - name: keywords
      content: mini-await-to-js

  # - - script
  #   - src: https://vitepress-source.oss-cn-beijing.aliyuncs.com/statistics.js
---

# mini-await-to-js

源码：[传送门](https://github.com/Jimmylxue/dailyLearning/tree/master/%E8%BD%AE%E5%AD%90/await-to-js)

> `async await`语法糖在现如今的开发中几乎已经是必用的一个 API 了，使用它可以让我们使用同步的方式来编写我们异步的代码，非常的好用！

虽然`async await`非常的给力，但是还是有能够继续优化和进步的空间，其中之一就是其相对比较鸡肋的错误处理，过去只能是在外层嵌套`try-catch`，如果涉及连锁的操作，就可能会出现比较难看的代码，也相对不好维护。

## example

```js
const getInfo = async () => {
	try {
		let res = await getPageInfo()
		console.log('成功了', res)
	} catch (error) {
		console.error(error, '错误了')
	}
}
```

甚至当有连锁请求时，就不太好判断发生错误时具体时哪个环节引发的错误，再做对应的错误处理.

```js
const getInfo = async () => {
	try {
		let page = await getPageInfo()
		let banner = await getBanner({id:page.id})
	} catch (error) {
		console.error(error,'错误了')
        // 以下一段伪代码
        if(page接口错误){
            doPageError()
        }else if(banner接口错误){
            doBannerError()
        }else if... 还有很多
	}
}
```

## 使用 await-to-js

```js
import { to } from './await-to-js.js'

const getInfo = async () => {
	const [err, res] = await to(getPageInfo())
	console.log('res', res)
	console.log('err', err)
}
```

原来恶心的`try-catch`结构，被我们神奇的拍平了！结构异常的清晰

就算遇到嵌套的请求，也不怕了

```js
const getInfo = async () => {
	const [err, page] = await to(getPageInfo())
	if (!err) {
		const [err, banner] = await to(getBannerInfo({ id: page.id }))
		if (err) {
			doBannerError()
		}
	} else {
		doPageError()
	}
}
```

## 源码

源码也是异常的简单，只有十几行。

```js
/**
 *
 * @param {Promise} promise
 * @param {object} errMessage
 * @returns
 */
export const to = (promise, errMessage) => {
	return promise
		.then(res => {
			return [null, res]
		})
		.catch(err => {
			if (errMessage) {
				const parserError = Object.assign({}, err, errMessage)
				return [parserError, undefined]
			}
			return [err, undefined]
		})
}
```

虽然只有几十行，但是这是一个非常稳健的库，在 github 上搜索 `await-to-js` 是可以搜索到的，有将近 2.5K 的 star，所以有时候一个优秀的库跟代码里的多少还真没有强绑定关系！
