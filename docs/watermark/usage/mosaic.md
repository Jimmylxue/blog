# mosaic 马赛克

## 介绍

将图片转为一张带有马赛克效果的图片

![image-20220701233625989](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220701233625989.png)

## 使用

### 框架中使用

```vue
<template>
	<img alt="mosaic" :src="mosaicSource" />
</template>

<script setup>
import { ref } from 'vue'
import { mosaic } from 'esay-watermark'

const mosaicSource = ref('')

mosaic({
	src: 'https://avatars.githubusercontent.com/u/65758455?v=4',
	size: 5,
}).then(source => {
	mosaicSource.value = source
})
</script>
```

### 原生页面中使用

```html
<body>
	<script src="./watermark.min.js"></script>

	<img id="mosaicImage" alt="马赛克效果" />

	<script>
		const { mosaic } = waterMarker // watermark 默认导出对象
		const mosaicImage = document.getElementById('mosaicImage')

		mosaic({
			src: 'https://avatars.githubusercontent.com/u/65758455?v=4',
			radius: 5,
		}).then(source => {
			mosaicImage.src = source
		})
	</script>
</body>
```

## API

| 属性名 | 类型            | 是否必填 | 描述                            |
| ------ | --------------- | -------- | ------------------------------- |
| src    | string          | yes      | 图片地址                        |
| size   | number          | no       | 模糊力度，越大越模糊（默认 10） |
| output | 'jpeg' \| 'png' | no       | 导出图片类型（默认`jpeg`）      |
