# IPC （进程间通信）

## 前言

前段时间看到一个项目中有用到一个ipc技术（一个hooks叫`useIpc()`），那时候还非常的疑惑，不懂实现的逻辑，看了实现也不知道是什么意思。所以就简单了解下这个技术吧~

## 关于 IPC

我们使用的 JavaScript 是一门单线程的语言，单线程的架构并非完美，尤其是如今的 CPU 基本都是多核的。正是因为单线程对于多核的机器上效率等方面使用不足的问题，前人们的解决方案是启动多进程即可，也就是 **多进程架构**。

## 浏览器端的 IPC

由于单线程的原因，使得浏览器在一个时间点上只能做一件事情！尤其是在浏览器一方面又要负责渲染，又要负责 JS 的一些解析，所以在一些复杂的情况下，就会造成网页的卡顿或者白屏的效果。

为了解决这个问题，浏览器端也是提出了新的 API，那就是`webWorker`，我们可以将一些要花费大量算力的 js 操作，放进一个新的进程。如：

- 解析文本（markdown 转 html）
- 流媒体等操作

```js
// index.js
const worker = new Worker('worker.js')
// console.log(1)

worker.onmessage = e => {
	console.log('接收到了消息', e)
}

setInterval(() => {
	console.log('old console')
}, 1000)

worker.postMessage('给子线程')
setTimeout(() => {
	// 2秒后开启一个阻塞主线程的任务， webworker子线程并不会被阻塞住
	confirm('理解webworker了吗 看看控制台')
}, 2000)

// worker.js
onmessage = e => {
	console.log('接收到了', e)
}

setInterval(() => {
	console.log('过了一秒了')
}, 1000)

postMessage('hello world by hello world')
```

## node 端的 IPC

node 提供了`child_process`模块，这个模块提供了一系列 api 可以让我们玩转进程。

### 创建子进程

我们可以使用`spwan`、`exec`、`execFile`、`fork`等API来创建子进程，这里就简单演示一下这四个API的使用方式：

```js
import { spawn, exec, execFile, fork } from 'child_process'

/**
 * spawn 和 execFile 配置都相当之复杂，建议使用
 *  建议使用 fork 对前端来说是最简单明了的
 */

spawn('zsh', ['-c', 'node worker.js'], {
	stdio: 'inherit',
	// shell: true,
})

exec('node worker.js', (err, stdout, stderr) => {
	console.log('log by exec:', stdout)
})

execFile(
	'node worker.js',
	{
		shell: 'zsh',
	},
	(err, stdout, stderr) => {
		console.log('log by execFile:', stdout)
	}
)

fork('./worker.js')

console.log('主线程')
```

最终使用下来，个人感觉这四个里面还是`fork`是最好用的一个API，比较贴近咱前端，没有那么多复杂的参数配置。

知道了如何创建子进程，我们就可以来创建IPC了。

### 实现IPC

这里使用`fork`来实现一下：

- parent.js

  ```js
  /* parent.js */
  import { fork, spawn } from 'child_process'
  import { resolve } from 'path'

  /**
   * 父子进程会创建 IPC 通道， 基于这个可以实现 父子进程之间的通信
   */

  const __dirname = resolve()

  const process = fork(resolve(__dirname, './sub.js'))

  process.on('message', message => {
    console.log('get message from child_process', message)
  })

  process.send({ name: 'jimmy' })
  ```

- sub.js

  ```js
  process.on('message', message => {
  	console.log('get message from parent', message)
  })
  
  process.send({ name: 'xuexue' })
  ```


以上我们只需要执行一下parent.js就可以实现通信了，最终会输出如下内容：

```
get message from parent { name: 'jimmy' }
get message from child_process { name: 'xuexue' }
```



