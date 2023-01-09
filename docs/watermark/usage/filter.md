# blur 高斯模糊

## 介绍

将图片添加一些滤镜

- 黑白滤镜

  ![黑白滤镜](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20230109095911982.png)

## 使用

### 框架中使用

```vue
<template>
	<img alt="filter" :src="filterSource" />
</template>

<script setup>
import { ref } from 'vue'
import { filter } from 'esay-watermark'

const filterSource = ref('')

filter({
	src: 'https://avatars.githubusercontent.com/u/65758455?v=4',
	type: 0,
}).then(source => {
	filterSource.value = source
})
</script>
```

### 原生页面中使用

```html
<body>
	<script src="./watermark.min.js"></script>

	<img id="filterImage" alt="黑白滤镜效果" />

	<script>
		const { filter } = waterMarker // watermark 默认导出对象
		const filterImage = document.getElementById('filterImage')

		blur({
			src: 'https://avatars.githubusercontent.com/u/65758455?v=4',
			type: 0,
		}).then(source => {
			filterImage.src = source
		})
	</script>
</body>
```

## API

| 属性名 | 类型            | 是否必填 | 描述                       |
| ------ | --------------- | -------- | -------------------------- |
| src    | string          | yes      | 图片地址                   |
| type   | FilterType      | no       | 滤镜类型                   |
| output | 'jpeg' \| 'png' | no       | 导出图片类型（默认`jpeg`） |

### 滤镜类型

| FilterType 属性值 | 效果     |
| ----------------- | -------- |
| 0                 | 黑白滤镜 |
