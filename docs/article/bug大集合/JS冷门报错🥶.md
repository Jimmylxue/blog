# JS 冷门报错 🥶

::: tip
记录一下对我来说”**冷门**“，新奇的报错 🥶，避避坑！

在线文档：[知识星球](http://www.jimmyxuexue.top) http://www.jimmyxuexue.top

视频主页：[传送门](https://space.bilibili.com/304985153?spm_id_from=333.1007.0.0) https://space.bilibili.com/304985153?spm_id_from=333.1007.0.0

感谢关注三连 😁
:::

## JSON.parse 引发的报错 🥶

最近有个需求上线了，在测试环境发现只要一打开 app 就闪退，是有报错导致的，最终定位下发现是`JSON.parse()`报错导致的，挺震惊的。

大家可以先思考下以下哪些语句会导致报错呢？

```js
JSON.parst(undefined)
JSON.parst(null)
JSON.parst()
JSON.parst('')
JSON.parst('11')
JSON.parst(11)
JSON.parst(0)
```

最终揭晓吧：

以下的都不报错

```js
JSON.parst(null)
JSON.parst('11')
JSON.parst(11)
JSON.parst(0)
```

比较令我震惊的是：`JSON.parst(null);`不报错，而`JSON.parst('');`居然会报错。

我的 app 闪退的原因也就是因为`JSON.parst('');`触发的报错，所以为了解决这个问题，我们可以专门封装一个 parse 方法，防止报错！

```ts
export function parseJSON<T>(jsonString: string) {
	try {
		return JSON.parse(json) as T
	} catch {
		return null
	}
}
```
