# 快速开始

## 安装

通过 npm 安装

```
npm i esay-watermark
```

也可以使用 yarn 或者 pnpm 安装

```
# 使用yarn
yarn add esay-watermark

# 使用pnpm
pnpm add esay-watermark
```

## 使用方式

### 框架中使用

```vue
<template>
	<img alt="fullMarker" :src="imgUrl5" />
</template>

<script setup>
import { ref } from 'vue'
import { fullMarker } from 'esay-watermark'

const imgUrl5 = ref('')

// fullMarker 全局平铺水印
fullMarker({
	src: 'http://jimmyxx.oss-cn-beijing.aliyuncs.com/lot.png',
	text: 'easy-watermark https://github.com/Jimmylxue/easy-watermark',
	color: '#c0c0c0',
	size: 30,
	padding: 180,
	rotate: -15,
	type: 'stroke',
}).then(source => {
	imgUrl5.value = source
})
</script>
```

### html 中使用

```html
<body>
	<script src="./watermark.js"></script>
	<img id="img2" alt="马赛克效果" />
	<script>
		const { mosaic } = waterMarker // watermark 默认导出对象
		const img2 = document.getElementById('img2')

		// 制作马赛克效果
		mosaic({
			src: 'https://avatars.githubusercontent.com/u/65758455?v=4',
			size: 5,
		}).then(source => {
			img2.src = source
		})
	</script>
</body>
```

### 打包优化

本包提供了 开发版 和 生产版，引入包时会自动判断环境进行选择引入，如果觉得影响到项目体积，大家可自行删除对应的文件即可。对应文件录下：

```

# 开发版 含警告信息信息输出信息等

esay-watermark/dist/watermark.js

# 生产版

esay-watermark/dist/watermark.min.js

```
