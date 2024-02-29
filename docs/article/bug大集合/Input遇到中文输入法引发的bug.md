# Input 遇到中文输入时引发的 bug

Input 是我们日常在业务开发中最最常见的一个功能，但是如果我们不注意时，是会触发一些性能问题的，这篇博客我们来简单的介绍一下它在遇到中文输入法时的问题，以及我们应该如何解决它！

> 老实说，这个问题可能大家并不会注意到，我也是做了好几年的开发了才知道这个东西。

## 业务背景

有一个搜索框，当搜索框内的内容变化之后，就会触发一次网络请求，向服务端获取搜索的数据。

这个简单的业务相信大家一定是都遇到过的，脑海里应该已经有了对应的代码构图了。下面是一段`React`的代码：

```tsx
import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { useEffect, useState } from 'react'

export function Demo() {
	const [searchText, setSearchText] = useState<string>('')

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value)
	}

	useEffect(() => {
		// 这里 监听到 searchText变化 触发网络请求
	}, [searchText])

	return (
		<div>
			<Input
				className=" w-full rounded"
				placeholder="搜索"
				value={searchText}
				prefix={
					<SearchOutlined
						style={{
							fontWeight: 300,
						}}
						className=" text-lg"
					/>
				}
				onChange={handleInput}
			/>
		</div>
	)
}
```

相信上面这段代码大家应该是都能写出来的，当我们在 Input 上输入内容之后，确实是会触发网络请求的，看上去和需求好像是一致的，也达到了我们的预期，但是实际上是会有问题的，就是输入中文时会有问题！效果如下：

![Kapture 2024-02-29 at 14.06.18](https://image.jimmyxuexue.top/img/202402291424297.gif)

问题描述：

中文输入法还在匹配中文时，也将这个匹配过程中的字符拿去后端进行搜索了，造成了在打字的过程中瞬间触发了过多的网络请求。

## 如何解决

- 防抖||节流

  这其实可以统一归类于 Input 输入框触发多次的问题，所以本质上我们可以使用一些通用的解决方案来解决，像防抖和节流，减少网络触发的频率

  **但是本质上这个问题是中文匹配的问题**

  理论上应该解决的是，只有当中文匹配上了之后，再触发 Input 的 change 事件，这个才是从根源上解决问题。

- 使用状态锁来解决

  这里介绍 Input 的两个事件：

  - compositionstart

    用户开始输入时（如在输入中文时）触发的 DOM 事件

  - compositionend

    用户开始输入结束时（如在输入中文时）触发的 DOM 事件

  基于以上的这两个事件，我们就可以解决这个问题了，上一段代码：

  ```tsx
  import { SearchOutlined } from '@ant-design/icons'
  import { Input } from 'antd'
  import { useEffect, useState } from 'react'
  
  export function Demo() {
  	const [searchText, setSearchText] = useState<string>('')
  	const inputLock = useRef<boolean>(false) /* 输入框的锁 */
  
  	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  		if (inputLock.current) {
  			// 当匹配锁锁上时，不进行输入内容的更新
  			return
  		}
  		setSearchText(e.target.value)
  	}
  
  	useEffect(() => {
  		// 这里 监听到 searchText变化 触发网络请求
  	}, [searchText])
  
  	return (
  		<div>
  			<Input
  				className=" w-full rounded"
  				placeholder="搜索"
  				value={searchText}
  				prefix={
  					<SearchOutlined
  						style={{
  							fontWeight: 300,
  						}}
  						className=" text-lg"
  					/>
  				}
  				onChange={handleInput}
  				onCompositionStart={() => {
  					inputLock.current = true
  				}}
  				onCompositionEnd={e => {
  					inputLock.current = false
  					handleInput(e as any)
  				}}
  			/>
  		</div>
  	)
  }
  ```
  
  通过上面的两个事件配合和引入的匹配锁的概念，我们就能够很好的解决这个问题了，效果如下：
  
  ![3](https://image.jimmyxuexue.top/img/202402291439037.gif)

## 总结

Input作为我们日常业务开发中最常用的一个Input，实际上也是有比较多的细节的。需要我们比较细致的做一些优化，否则很容易造成一些性能损耗与浪费资源。
