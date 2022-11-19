# rotate 旋转、镜像

## 介绍

将图片旋转与镜像处理

![旋转-镜像](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20221119110657033.png)

## 使用

### 框架中使用

```vue
<template>
	<img alt="rotate" :src="rotateSource" />
</template>

<script setup>
import { ref } from 'vue'
import { rotate } from 'esay-watermark'

const rotateSource = ref('')

rotate({
	src: 'https://avatars.githubusercontent.com/u/65758455?v=4',
	rotate: 90,
	symmetric: 'row',
}).then(source => {
	rotateSource.value = source
})
</script>
```

### 原生页面中使用

```html
<body>
	<script src="./watermark.min.js"></script>

	<img id="rotateImage" alt="旋转、镜像效果" />

	<script>
		const { rotate } = waterMarker // watermark 默认导出对象
		const rotateImage = document.getElementById('rotateImage')

		rotate({
			src: 'https://avatars.githubusercontent.com/u/65758455?v=4',
			radius: 5,
		}).then(source => {
			rotateImage.src = source
		})
	</script>
</body>
```

## API

| 属性名    | 类型              | 是否必填 | 描述                       |
| --------- | ----------------- | -------- | -------------------------- |
| src       | string            | yes      | 图片地址                   |
| rotate    | number            | no       | 旋转度数                   |
| symmetric | 'row' \| 'column' | no       | 横向镜像还是纵向镜像       |
| output    | 'jpeg' \| 'png'   | no       | 导出图片类型（默认`jpeg`） |
