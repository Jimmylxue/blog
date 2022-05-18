# 实现一个简单插值表达式（模板引擎）

> 熟悉 Vue 的小伙伴都知道我们在 template 中使用 state 状态可以使用插值表达式`{{}}`

现在我们也来实现一个简单的插值表达式，希望能够达到如下的效果：

已知有个数据结构：

```js
const site = {
	names: 'jimmy 知识星球',
	article: 50,
	comment: 50,
}
```

---

| 表达式                    | 结果           |
| ------------------------- | -------------- |
| site.names                | jimmy 知识星球 |
| site.article+site.comment | 100            |

## 原理解析

主要可分为以下几步：

- 先解析模板语法，将可能是插值表达式的文本（string 取出来）

- 解析取出来的插值表达式，将插值表达式的大括号替换为 js 的模板语法`${a}`

- 使用 eval 函数解析以下这个语法，实现内部表达式替换为真实的数据

  这里使用到了`eval`函数，这个熟悉`webpack`的小伙伴肯定对这个函数不会陌生的，其会尝试将字符串理解成 js 代码去执行，正是因为这个我们才能将正则解析的结果实现真实转换：**site.name => jimmy 知识星球**

## 代码

JS 逻辑代码：

```js
const site = {
	name: 'jimmy 知识星球',
	article: 50,
	comment: 50,
}

/**
 *
 * @param {string} string
 */
function generate(string) {
	let template = string.replace(/\{\{([^}]+)\}\}/g, (a, b) => {
		return eval(`${b}`)
	})
	return template
}

console.log(generate('{{ site.article + site.comment }}'))
```

完整代码：

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
	</head>
	<body>
		<h1>插值表达式的实现</h1>
		<p>{{site.name}}</p>
		<p>总数据：{{site.article+site.comment}}</p>
		<script src="./index.js"></script>
	</body>
</html>
```

```js
/**
 * 模板编译
 *  目标实现和 vue 一样的插值表达式
 */

const site = {
	name: 'jimmy 知识星球',
	article: 50,
	comment: 50,
}

/**
 *
 * @param {string} string
 */
function generate(string) {
	console.log('string', string)
	let template = string.replace(/\{\{([^}]+)\}\}/g, (a, b) => {
		return eval(`${b}`)
	})
	return template
}

const body = document.body
const deepCheck = element => {
	const children = [...element.children]
	console.log(children)
	if (children.length > 0) {
		children.forEach(child => {
			deepCheck(child)
		})
	} else {
		const insetExpression = generate(element.textContent)
		element.textContent = insetExpression
	}
}

deepCheck(body)
```

## 页面效果

![image-20220518221547078](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220518221547078.png)

## 总结

只是完成简单的模板插值表达式的编译还是比较简单的，欢迎小伙伴们关注和 star
