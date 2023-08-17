# 可别再欺骗 ts 了

这周被 leader 领导批评了一下，领导说代码没写好，总结下来就是我写了一些欺骗 ts 的代码。下面跟大家分享一下。

> 我是很服气的状态下发的这个视频，确实是没写好。

欺骗 ts 的方式有哪些呢？可能大家第一时间想的比较多的是`ts-ignore`，类似下面这样：

```ts
let a: any = 'str'
// @ts-ignore
a('jimmy')
```

上面这段代码中，a 可能是任意类型，我们消费 a 的时候是把它当做一个函数来调用的，这时候 ts 会给我们一个报错，我们就可以使用`@ts-ignore`直接跳过。但是这是个很危险的操作，相信大家也会知道不能这么搞。这个可能大部分的同学也不会这么搞。这是欺骗 ts。

我欺骗 ts 的方式不是这样，是使用`!`断言，我尽量还原一个最简单的场景。

```ts
type TPerson = {
	name: string
}

class User {
	constructor() {}

	student?: TPerson

	setStudent(student: TPerson) {
		this.student = student
	}

	get studentName() {
		return this.getName(this.student!)
	}

	getName(stu: TPerson) {
		return stu.name
	}
}

const jimmy = new User()
jimmy.setStudent({ name: 'jimmy' })
jimmy.studentName
```

上面的业务代码我写了一个欺骗 ts 的代码，就是这个：

```ts
get studentName() {
  return this.getName(this.student!)
}
```

`this.student!`我加了`!`强制有值的断言，之所以这样加是因为在我的业务逻辑中，这个类中的`student`一定是有值的，所以我就加了个断言，觉得应该是没啥毛病没啥问题的。

三个月后......

出现了一个线上问题，问题就在于别的一些业务逻辑的改动，导致了获取`studentName`的时候，这时候可能会没有`student`！这时候走到`getName`这个函数的时候就报错了......

然后慢慢找原因就发现是我这段代码中欺骗了 ts，就被领导批评了一下。领导说的是：**“大家写代码的时候不要去欺骗 ts，这个字段可能是 null 或者 undefined 就老老实实取判断”**

## 总结

总结下来就是这么一个 Bug 的前因后果，这种欺骗 ts 确实是个不好的行为，可能当时能跑，但是我们在公司里是多人协同一起开发，时间久了，可能自己也会忘记了。就像领导说的。如果某个字段可能是 null 或者 undefined 就老老实实取判断吧。

希望大家不要踩我踩过的坑。
