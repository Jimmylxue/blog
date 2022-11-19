# marker 自定义水印

## 介绍

生成一张自定义内容和位置水印的海报

![demo](http://jimmyxx.oss-cn-beijing.aliyuncs.com/demo.png)

![demo](http://jimmyxx.oss-cn-beijing.aliyuncs.com/demo2.png)

## 使用

### 框架中使用

```vue
<template>
	<img alt="marker" :src="markerSource" />
</template>

<script setup>
import { ref } from 'vue'
import { marker } from 'esay-watermark'

const markerSource = ref('')

marker({
	src: 'https://img1.baidu.com/it/u=128307009,2094083535&fm=26&fmt=auto',
	text: 'jimmy',
	color: '#bdc3c7',
	size: 120,
	position: 'center',
	padding: 10,
}).then(source => {
	markerSource.value = source
})
</script>
```

### 原生页面中使用

```html
<body>
	<script src="./watermark.min.js"></script>

	<img id="markerImage" alt="自定义水印" />

	<script>
		const { marker } = waterMarker // watermark 默认导出对象
		const markerImage = document.getElementById('markerImage')

		marker({
			src: 'https://img1.baidu.com/it/u=128307009,2094083535&fm=26&fmt=auto',
			text: 'jimmy',
			color: '#bdc3c7',
			size: 120,
			position: 'center',
			padding: 10,
		}).then(source => {
			markerImage.src = source
		})
	</script>
</body>
```

## API

| 属性名   | 类型             | 是否必填 | 描述                                            |
| -------- | ---------------- | -------- | ----------------------------------------------- |
| src      | string           | yes      | 图片地址（必填）                                |
| text     | string           | yes      | 水印文字                                        |
| color    | string           | no       | 水印颜色（默认 `#c0c0c0`）                      |
| size     | number           | no       | 水印文字大小（默认 20）                         |
| padding  | number           | no       | 水印距离图片边缘的距离（默认 30）               |
| output   | 'jpeg' \| 'png'  | no       | 输出图片类型 支持 `jpeg`和`png` （默认 `jpeg`） |
| position | Position         | no       | 水印所处位置，默认 RIGHT_BOTTOM（右下）         |
| type     | 'fill'\|'stroke' | no       | 文字的“填充模式”和“描边模式”（默认`fill`模式）  |
| rotate   | number           | no       | 旋转角度（默认 0）                              |

其中 Position 属性具有以下属性值：

| Position 属性值 | 效果 |
| --------------- | ---- |
| LEFT_TOP        | 左上 |
| LEFT_CENTER     | 左中 |
| LEFT_BOTTOM     | 坐下 |
| CENTER_TOP      | 中上 |
| CENTER          | 正中 |
| CENTER_BOTTOM   | 中下 |
| RIGHT_TOP       | 右上 |
| RIGHT_CENTER    | 右中 |
| RIGHT_BOTTOM    | 右下 |
