# 获取 node 脚本的传参

老实讲这个其实挺简单的，应该是属于查询一下文档就能找到的知识点。但是我确实是第一次在业务上用到它。简单记录下~

## 场景

下面是一段连接数据的代码：

```ts
/**
 * index.js
 */

function connect() {
	TypeOrmModule.forRoot({
		type: 'mysql',
		host: 'us-east.connect.psdb.cloud',
		port: 3306,
		username: 'aaa-bbb-ccc-ddd',
		password: 'xxx-aaa-sss-dddd',
		database: 'snow-server',
		entities: [__dirname + '/**/*.entity{.ts,.js}'],
		synchronize: false,
		ssl: {},
	})
}

connect()
```

当我们执行`node index.js`时，node 脚本会执行这个`connect`方法，去连接数据库。

但是问题来了，对于喜欢开源代码的同学来说是不友好的，数据库的账号密码这类数据是相对私密的。一开源其他人就能访问了，肯定不能这样搞，所以我们这时候就需要在执行脚本时，手动传参，这样就能规避掉这个风险了。

## 优化

node 提供了 `process` 对象，通过`process.argv` 可以获取参数，如：

```js
/**
 * index.js
 */
const baseParams = process.argv.slice(2)
console.log(baseParams)
```

当我们执行 `node index.js name=jimmy age=24`会得到一个数组：`['name=jimmy', 'age=24']`，这样就可以获取到我们想要的数据了，再简单做一个转换，改成对象类型：

```ts
/**
 * index.js
 */

function format(arr: string[]) {
	const obj = {}
	arr.forEach(item => {
		const [key, value] = item.split('=')
		obj[key] = value
	})

	return obj
}

format('name=jimmy', 'age=24')
```

这样我们就可以获取一个对象：

```ts
{
  name:'jimmy',
  age:'24'
}
```

我们代码就需要调整至如下：

```ts
/**
 * index.js
 */

function format(arr: string[]) {
	const obj = {}
	arr.forEach(item => {
		const [key, value] = item.split('=')
		obj[key] = value
	})
	return obj
}

const baseParams = process.argv.slice(2)

const args = format(baseParams)

function connect() {
	TypeOrmModule.forRoot({
		type: 'mysql',
		host: 'us-east.connect.psdb.cloud',
		port: 3306,
		username: args.username,
		password: args.password,
		database: 'snow-server',
		entities: [__dirname + '/**/*.entity{.ts,.js}'],
		synchronize: false,
		ssl: {},
	})
}

connect()
```

我们执行：`node index.js username=jimmy password=111` 即可。

## 总结

按上述那样操作之后，我们就完美解决了这个问题。后续也可以比较方便的处理这种带点隐私信息的代码了。
