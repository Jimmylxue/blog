<br>

<h1 align="center">Welcome to snow-react-markdown 👋</h1>

<br>

react-markdown 是一个快速将 markdown 转为 html 的 vite 插件，支持自定义样式与一系列好看的默认样式！

开发文档: [传送门](http://www.jimmyxuexue.top:999/snow-react-markdown/guide/introduce.html)

GitHub: [传送门](https://github.com/Jimmylxue/daily-store/tree/master/packages/vite/packages/markdown)

> issues 是第一生产力！😄

知识星球：[传送门](http://www.jimmyxuexue.top)

> 大兄弟们聚过来，这件事很重要 🎉🎉🎉

(如果觉得不错 👍，给个 star ⭐ 吧，你的认可是我最大的动力 ！)

## 使用：

1. 安装

```
yarn add snow-react-markdown
```

2. 配置

在`vite.config.ts`中做如下配置：

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import markdownPlugin from 'snow-react-markdown' // 引入插件

// https://vitejs.dev/config/
export default defineConfig({
	// 注册插件 - 需在 react 插件之前
	plugins: [markdownPlugin(), react()],
})
```

在`项目中引入默认css文件` 中增加如下脚本：

```ts
// main.ts
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import BabelPage from './pages/babel'
import Vite from './pages/vite'
import 'snow-react-markdown/dist/css/juejin.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<div>hello world</div>
)
```

3. 使用 markdown

```tsx
// demo.tsx
import { memo } from 'react'

export default memo(() => {
	return (
		<div>
			{/* 
				使用 snow-markdown 标签， source 属性引入 一个相对路径的 markdown 文件
			 */}
			<snow-markdown source="./README.md" />
		</div>
	)
})
```

```
npm run compress
```

## 最终效果

![最终效果](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20221224162247379.png)
