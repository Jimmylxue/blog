# blur 高斯模糊

## 介绍

将图片转为一张高斯模糊的图片

![image-20220917173326254](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220917173326254.png)

## 使用

### 框架中使用

```vue
<template>
	<img alt="blur" :src="blurSource" />
</template>

<script setup>
import { ref } from 'vue'
import { blur } from 'esay-watermark'

const blurSource = ref('')

blur({
	src: 'https://avatars.githubusercontent.com/u/65758455?v=4',
	radius: 5,
}).then(source => {
	blurSource.value = source
})
</script>
```

### 原生页面中使用

```html
<body>
	<script src="./watermark.min.js"></script>

	<img id="blurImage" alt="高斯模糊效果" />

	<script>
		const { blur } = waterMarker // watermark 默认导出对象
		const blurImage = document.getElementById('blurImage')

		blur({
			src: 'https://avatars.githubusercontent.com/u/65758455?v=4',
			radius: 5,
		}).then(source => {
			blurImage.src = source
		})
	</script>
</body>
```

## API

| 属性名 | 类型            | 是否必填 | 描述                           |
| ------ | --------------- | -------- | ------------------------------ |
| src    | string          | yes      | 图片地址                       |
| blur   | number          | no       | 模糊半径，越大越模糊（默认 5） |
| output | 'jpeg' \| 'png' | no       | 导出图片类型（默认`jpeg`）     |
