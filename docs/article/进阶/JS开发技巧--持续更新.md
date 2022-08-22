---
head:
  - - meta
    - name: description
      content: 开发技巧

  - - meta
    - name: keywords
      content: JS

  - - script
    - src: https://vitepress-source.oss-cn-beijing.aliyuncs.com/statistics.js
---

## JS 开发技巧 -- 持续更新

> 所谓技巧，就是用更少行数，写出更加优雅的代码
>
> 部分自己总结，部分是掘金大佬那边看到的，一并收入起来。

## 过滤错误值

看到过滤，第一时间我想到的就是数组的`filter`方法，脑海中出现的代码是这样：

```js
let arr = [1, 0, undefined, 6, 7, '', false]
Array.prototyoe.filter.call(arr, item => Boolean(item)) // [1, 6, 7]
```

但是实际上数组的处理函数我们是可以简写的，写成：

```js
let arr = [1, 0, undefined, 6, 7, '', false]
Array.prototype.filter.call(arr, Boolean) // [1, 6, 7]
```

## 数组元素转数字

将一个数组的元素转为数字，第一想法想到的是`map`方法：

```js
let arr = ['12', '1', '3.1415', '-10.01']
Array.prototyoe.map.call(arr, item => Number(item)) // [12, 1, 3.1415, -10.01]
```

但是实际上这个处理函数我们是可以和前面过滤错误值一样直接简写的，写成：

```js
let arr = ['12', '1', '3.1415', '-10.01']
Array.prototyoe.map.call(arr, Number) // [12, 1, 3.1415, -10.01]
```

以此类推，处理函数可以写`String`转字符串。

## 使用逻辑运算符

当处理简单的 if 语句的时候，可以使用逻辑运算符来写

```js
if (a > 10) {
	doSomething(a)
}
```

替换后

```js
a > 10 && doSomething(a)
```

`&&`只有在左侧为真时，才会执行右侧的代码，否则就会触发短路，就特别适合处理这种场景。

## 简化判断

当一个变量为多个值时，我们需要做一些操作，常态写法为：

```js
if (a === undefined || a === 10 || a === 15 || a === null) {
	doSomething()
}
```

可以使用数组的`includes()`方法来简化判断：

```js
if ([undefined, 10, 15, null].includes(a)) {
	//...
}
```

这个的使用场景还是非常多的，过去我的许多项目中都有这样的逻辑，写出了非常长的判断，这样写可以让代码更加的优雅。

## 对象验证方式

在框架开发中，尤其是`react`,当我们通过第三方获取了一个嵌套比较深的对象：

```js
const parent = {
	child: {
		child1: {
			child2: {
				key: [1, 2, 3, 4, 5],
			},
		},
	},
}
```

在开发中我们为了确保出现错误，我过去都是使用`&&`来进行读取：

```js
parent && parent.child && parent.child.child1 && parent.child.child1.child2
```

诚然，这样代码必定不会报错，但是代码实在是太长了，十分的臃肿。我们使用 JS 的可选链运算符来写，代码就会变为：

```js
parent?.child?.child1?.child2
```

这样写和上面的一长串是一样的。这个真的非常的有用，一定要用起来！！！！

可选链运算符允许我们读取位于连接对象链深处的属性的值，而不必明确验证链中的每个引用是否有效。在引用为空(null 或者 undefined) 的情况下不会引起错误，该表达式短路返回值是 undefined。与函数调用一起使用时，如果给定的函数不存在，则返回 undefined。

## 验证 undefined 和 null

第一想法：

```js
if (a === null || a === undefined) {
	doSomething()
}
```

使用**空值合并运算符**简化代码

```js
a ?? doSomething()
```

空值合并操作符（??）是一个逻辑操作符，当左侧的操作数为 null 或者 undefined 时，返回其右侧操作数，否则返回左侧操作数。

## 数字取整

取整，第一时间我想到的是`parseInt()`：

```js
parseInt(3.1415923) // 3
```

除此之外，可能还能想到一个`Math.floor()`方法

```js
Math.floor(3.1415923) // 3
```

其实可以使用~~运算符来消除数字的小数部分，它相对于数字的那些方法会快很多。

```js
~~3.1415926 // 3
```

其实这个运算符的作用有很多，通常是用来将变量转化为数字类型的，不同类型的转化结果不一样：

- 如果是数字类型的字符串，就会转化为纯数字；
- 如果字符串包含数字之外的值，就会转化为 0；
- 如果是布尔类型，true 会返回 1，false 会返回 0；

还有一个是使用这个运算符来写会让整个代码的逼格瞬间提升起来。装 X 很有用！

除了这种方式之外，我们还可以使用按位与来实现数字的取整操作，只需要在数字后面加上`|0`即可：

```js
;23.9 |
	(0 - // 23
		23.9) |
	0 // -23
```

## 检测一个对象是否位空对象

这个操作是非常常用的，我经常使用的是`JSON.stringify()`来进行转成字符串进行判断：

```js
let obj = {}
JSON.stringify(obj) === '{}' // true
```

其实可以使用对象的原型方法来遍历 key 判断 key 是都位空：

```js
let obj = {}
Object.keys(obj).length === 0 // true
```

## 获取数组中的最后一项

第一想法，根据数组的索引来获取：

```js
let arr = [1, 2, 3, 4, 5]
arr[arr.length - 1] // 5
```

这样写没什么问题，就好像写的会偏多一点，其实可以使用数组的`slice`方法：

```js
let arr = [1, 2, 3, 4, 5]
Array.prototype.slice.call(arr, -1) // 5
```

数组的 slice 方法支持传入负数，为负数时表示从后往前查找，传入-1 表示查找最后一个元素，且这个方法是不会改变原数组的。

ES2022 中新增了一个特别好用的 `at()` 方法，传递负数时会从后往前查，这是目前位置最精简&优化的写法了！

```js
let arr = [1, 2, 3, 4, 5]
arr.at(-1) //5
```

## 转为布尔值

转为布尔值，我最常使用的方法是使用 `Boolean()`方法进行转：

```js
let str1 = ''
let count = 0
Boolean(str1) // false
Boolean(count) // false
```

其实还有一个更加装 X 的方法，使用`!!`来获取布尔值

```js
let str1 = ''
let count = 0
!!str1 // false
!!count // false
```

简单的解释一下，当`!str`表示将 str 这个值进行取反，在`!str`的前面再加一个`!`变成`!!str`，将取反的结果再次取反，得到的就是原来的值的布尔类型。

## 使用双星号代替 Math.pow()

过去要使用乘方的方法时，第一想到的就是`Math.pow()`方法，但是还可以使用`**`来表示乘方。

```js
const power = Math.pow(4, 3) // 64
const power = 4 ** 3 // 64
```

## 具名导出时更改别名

如项目中我们使用了两个组件库的`Table`组件，并且都用上了，这时候如果引入两个`Table`会报错，所以我们可以使用导出时改名，用的就是`as`关键字。

```ts
import { Table } from 'dz-ui'
import { Table as Tables } from 'antd'
```

看着感觉蛮简单的，但是之前我就是搞错了，我把 **结构** 语法搞混了，写成如下这样，一直报错，后面才焕然大悟是搞混乱了：

```ts
import { Table } from 'dz-ui'
import { Table : Tables } from 'antd' // 直接报错了 : 是结构的语法

// 结构时改名才是使用 :
const person = {
  name:'jimmy',
  age:22
}
const { name:names, age:ages } = person
```

稍微记录一下，避免下次再搞混乱了。

## parseInt的使用细节

`parseInt`是JS提供的一个静态方法，它其实也是有使用细节的，如果我们细节没有做到位其实是比较容易出bug的，而且还是那种不好找的bug。

先理解一下`parseInt`的原理：`parseInt`会遍历我们拿到的数据，如果第一个字符是不是一个有效的数字，那么它会直接返回`NaN`，且不会继续去遍历了，如果它是一个有效数字，则记下这个数字继续查看第二个字符，一直重复这个操作。因为浮点数中的小数点`.`会被认定为不是合法数字，所以就是因为这个才实现了取整的效果！

这就说明了一个问题，`parseInt('18') === parseInt('18 years old')`这个是true！如果我们不小心写了这种判断的话，可能就会出现程序bug了，而且很难找出原因到底是出在哪里。

```js
parseInt('08') === parseInt('09')  // false  相当于 8 === 9
/*
	但是我们想要的是八进制的一个比较，所以需要调整一下写法
*/
```

有时候可能是不小心写了这种比较，我们想以八进制来比较，但是其始终都是以十进制来比较的，所以我们在使用`parseInt()`的时候，最好都加上第二个参数（基础参数）如：

```js
parseInt('08',8) === parseInt('09',8) // true

/*
	第二个参数是8 表示按照8进制来转
	8 和 9 在二进制中都不是合法数字，所以按照规则会直接跳过
*/
```

所以以后如果使用`parseInt`的时候，记得需要加上第二个参数！

## findLast() 与 findLastIndex()

ES2022的新API，使用起来与ES6的 `find()`和`findIndex()`是一样的，虽然 find() 和 findIndex() 都从数组的第一个元素开始搜索，但在某些情况下，最好从最后一个元素开始搜索。在某些情况下，我们知道从最后一个元素中查找可能会获得更好的性能。

```js
const letters = [
  { value: 'v' },
  { value: 'w' },
  { value: 'x' },
  { value: 'y' },
  { value: 'z' },
];
const found = letters.findLast((item) => item.value === 'y');
const foundIndex = letters.findLastIndex((item) => item.value === 'y');
console.log(found); // { value: 'y' }
console.log(foundIndex); // 3
```
