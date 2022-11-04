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
JSON.parse(undefined)
JSON.parse(null)
JSON.parse()
JSON.parse('')
JSON.parse('11')
JSON.parse(11)
JSON.parse(0)
```

最终揭晓吧：

以下的都不报错

```js
JSON.parse(null)
JSON.parse('11')
JSON.parse(11)
JSON.parse(0)
```

比较令我震惊的是：`JSON.parse(null);`不报错，而`JSON.parse('');`居然会报错。

我的 app 闪退的原因也就是因为`JSON.parse('');`触发的报错，所以为了解决这个问题，我们可以专门封装一个 parse 方法，防止报错！

```ts
export function parseJSON<T>(jsonString: string) {
	try {
		return JSON.parse(json) as T
	} catch {
		return null
	}
}
```

### 解析

> 感谢评论区大佬的回答，让我知道了触发这个问题的原因，顺带更加深入的理解了一下什么是 **JSON格式** ，过去理解的 **JSON格式是不够全面的**

![解析图片](https://vitepress-source.oss-cn-beijing.aliyuncs.com/WechatIMG72.png)

之所以`JSON.parse`在有的时候会报错，需要知道这个方法的本质是将一个字符串数据转成 **JSON格式**，只有在实在没有办法转成JSON格式的情况下才会触发报错，所以我们要重新认识一下什么是JSON格式。

```json
{
  "key":"value"
}
```

```json
null
```

```json
111
```

```json
[1,2,3]
```

以上的都属于JSON格式，可以直接在编辑器试下就会很方便的知道哪些是有语法错误的。之所以`JSON.parse('111')`不报错是因为将其转为了数字111，数字是属于JSON格式的，而`JSON.parse('abc')`会报错，是因为字符串'abc'没有办法转成数字，就会直接报错了！
