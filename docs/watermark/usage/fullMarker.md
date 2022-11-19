# fullMarker 全局平铺水印

## 介绍

生成一张带有全局平铺水印的海报

![image-20220918202205711](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220918202205711.png)

## 使用

### 框架中使用

```vue
<template>
	<img alt="fullMarker" :src="fullMarkerSource" />
</template>

<script setup>
import { ref } from 'vue'
import { fullMarker } from 'esay-watermark'

const fullMarkerSource = ref('')

fullMarker({
	src: 'http://jimmyxx.oss-cn-beijing.aliyuncs.com/lot.png',
	text: 'easy-watermark https://github.com/Jimmylxue/easy-watermark',
	color: '#c0c0c0',
	size: 30,
	padding: 180,
	rotate: -15,
	type: 'stroke',
}).then(source => {
	fullMarkerSource.value = source
})
</script>
```

### 原生页面中使用

```html
<body>
	<script src="./watermark.min.js"></script>

	<img id="fullMarkerImage" alt="全局平铺水印" />

	<script>
		const { fullMarker } = waterMarker // watermark 默认导出对象
		const fullMarkerImage = document.getElementById('fullMarkerImage')

		fullMarker({
			src: 'http://jimmyxx.oss-cn-beijing.aliyuncs.com/lot.png',
			text: 'easy-watermark https://github.com/Jimmylxue/easy-watermark',
			color: '#c0c0c0',
			size: 30,
			padding: 180,
			rotate: -15,
			type: 'stroke',
		}).then(source => {
			fullMarkerImage.src = source
		})
	</script>
</body>
```

## API

| 属性名  | 类型             | 是否必填 | 描述                                                                               |
| ------- | ---------------- | -------- | ---------------------------------------------------------------------------------- |
| src     | string           | yes      | 图片地址（必填）                                                                   |
| text    | string           | yes      | 水印文字                                                                           |
| color   | string           | no       | 水印颜色（默认 `#c0c0c0`）                                                         |
| size    | number           | no       | 水印文字大小（默认 20）                                                            |
| padding | number           | no       | 平铺水印之间的间距（默认 30）                                                      |
| output  | 'jpeg' \| 'png'  | no       | 输出图片类型 支持 `jpeg`和`png` （默认 `jpeg`）                                    |
| type    | 'fill'\|'stroke' | no       | 文字的“填充模式”和“描边模式”（默认`fill`模式）（**微信小程序下只支持**`fill`模式） |
| rotate  | number           | no       | 旋转角度（默认 0）                                                                 |
