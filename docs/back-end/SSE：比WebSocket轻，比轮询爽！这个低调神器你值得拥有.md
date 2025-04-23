# 🌟 SSE：比 WebSocket 轻，比轮询爽！这个低调神器你值得拥有

第一眼大家看 SSE 这个名词不知大家是否会比较陌生，我第一想法是不是和 SEO 啥的一个东西，其实完全不是，他是一种网络协议，和 HTTP、WebSocket 是一类的东西。全名叫 Server Send Event。

从看全名大家大概就知道他是干啥的了吧，他是实现服务端发送事件的一个协议。

我们都知道 WebSocket 能够实现客户端和服务端的双向数据通信，这个很棒，在一些聊天室、云文档等多人协同的应用里面被广泛的使用。

但是有自己写过类似聊天室的同学肯定都知道 WebSocket，虽好用，但是也是一个非常**重**的技术，对开发者的要求比较高。需要自行的去上报一些心跳事件。正是因为此，在很多时候，大家可能还用相对更加耗费资源的轮询 http 请求的方式来实现一些效果。本质上其实都是用 资源换相对轻松的开发体验

| 技术      | 方向性          | 复杂度   | 适用场景           | 内心 OS                |
| --------- | --------------- | -------- | ------------------ | ---------------------- |
| 轮询      | 客户端 → 服务端 | 低       | 兼容性要求高       | "又轮询？太不优雅了！" |
| WebSocket | 双向            | 高       | 聊天室、协同编辑   | "心跳包写死我了..."    |
| **SSE**   | 服务端 → 客户端 | **中低** | 实时通知、数据监控 | "真香！"               |

正因为前面说的他是一个单向的传输（服务端向客户端推送），我们来简单说下它的特点：

- 单向数据流（服务端向客户端）
- 基于 HTTP
- 自动重连（写 WebSocket 就需要心跳、重连等操作）
- 轻量级（对比于 WebSocket 一套标准操作来说，非常的轻量级）

正因为这些特性。它的使用场景还是很多的，举几个例子：

- 实时通知
- 股票价格更新
- 社交媒体动态（朋友圈小红点）
- 服务器状态（CPU 温度）

这些场景我们就可以使用 SSE 来实现，不需要使用轮询或者 WebSocket 了。

## 演示

下面这个 Demo 简单到令人发指，甚至不需要装任何第三方库（隔壁 WebSocket 已经哭晕在厕所）

### Node.js 服务端

```js
const http = require('http')
const fs = require('fs')

// 创建HTTP服务器
const server = http.createServer((req, res) => {
	// 处理根路径请求，返回HTML页面
	if (req.url === '/') {
		fs.readFile('./index.html', (err, data) => {
			if (err) {
				res.writeHead(500)
				res.end('Error loading index.html')
			} else {
				res.writeHead(200, { 'Content-Type': 'text/html' })
				res.end(data)
			}
		})
	}
	// 处理SSE连接
	else if (req.url === '/sse') {
		// 设置SSE所需的响应头
		res.writeHead(200, {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			Connection: 'keep-alive',
		})

		console.log('Client connected to SSE')

		// 每2秒发送一条消息
		const intervalId = setInterval(() => {
			const data = {
				time: new Date().toISOString(),
				message: 'Hello from Server!',
				randomValue: Math.random(),
			}

			// SSE消息格式要求
			res.write(`data: ${JSON.stringify(data)}\n\n`)
		}, 2000)

		// 客户端断开连接时清理
		req.on('close', () => {
			console.log('Client disconnected from SSE')
			clearInterval(intervalId)
		})
	}
	// 处理其他请求
	else {
		res.writeHead(404)
		res.end()
	}
})

// 启动服务器
const PORT = 3000
server.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`)
})
```

这是一段简单的 node 服务端的代码，因为前面我们说她是基于 HTTP 的，所以它的接口定义和我们常规写一个 HTTP 接口试一样的。

### 客户端

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>SSE Demo</title>
		<style>
			body {
				font-family: Arial, sans-serif;
				max-width: 800px;
				margin: 0 auto;
				padding: 20px;
			}
			#messages {
				border: 1px solid #ddd;
				padding: 10px;
				height: 300px;
				overflow-y: auto;
				margin-bottom: 20px;
			}
			.message {
				margin-bottom: 10px;
				padding: 8px;
				background-color: #f5f5f5;
				border-radius: 4px;
			}
		</style>
	</head>
	<body>
		<h1>SSE Demo</h1>
		<p>Server-Sent Events实时数据流:</p>
		<div id="messages"></div>
		<button id="connectBtn">连接SSE</button>
		<button id="disconnectBtn">断开SSE</button>

		<script>
			let eventSource

			// 连接SSE
			document.getElementById('connectBtn').addEventListener('click', () => {
				if (eventSource) return // 避免重复连接

				eventSource = new EventSource('/sse')

				// 监听消息事件
				eventSource.onmessage = event => {
					const data = JSON.parse(event.data)
					addMessage(data)
				}

				// 监听错误事件
				eventSource.onerror = error => {
					console.error('SSE Error:', error)
					addMessage({ message: '连接出错，尝试重新连接...' })
				}

				addMessage({ message: '已连接到SSE服务器' })
			})

			// 断开SSE
			document.getElementById('disconnectBtn').addEventListener('click', () => {
				if (eventSource) {
					eventSource.close()
					eventSource = null
					addMessage({ message: '已断开SSE连接' })
				}
			})

			// 添加消息到页面
			function addMessage(data) {
				const messagesDiv = document.getElementById('messages')
				const messageDiv = document.createElement('div')
				messageDiv.className = 'message'

				let html = `<strong>${new Date().toLocaleTimeString()}</strong><br>`
				html += `<strong>消息:</strong> ${data.message}<br>`

				if (data.time) {
					html += `<strong>服务器时间:</strong> ${new Date(
						data.time
					).toLocaleString()}<br>`
				}

				if (data.randomValue) {
					html += `<strong>随机值:</strong> ${data.randomValue.toFixed(4)}`
				}

				messageDiv.innerHTML = html
				messagesDiv.appendChild(messageDiv)
				messagesDiv.scrollTop = messagesDiv.scrollHeight
			}
		</script>
	</body>
</html>
```

这个 demo 就展示了最简单的使用了。在真实的开发中我们扩展开来，比如可以定义一些消息类型，以及处理更复杂的数据格式等。

💡 彩蛋：你可能不知道的 SSE 冷知识

- 重试机制：客户端自动重连时，会携带上次断开时的 Last-Event-ID 头
- 浏览器兼容性：除了 IE，现代浏览器全都支持（IE：又是我背锅？）

## 总结

SSE 是一个非常轻量级和好用的技术。很好的解决了我之前使用轮询时又担心有点浪费流量资源、使用 WebSocket 又觉得重的问题。

据说点赞的小伙伴不仅能减少 90%的 bug，还能自动获得"最会偷懒的程序员"称号（因为用了最省事的方案）
