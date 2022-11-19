# QRcode 二维码生成器

## 介绍

自定义生成一张二维码图片

![image-20220917220428792](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220917220428792.png)

## 使用

### 框架中使用

```vue
<template>
	<img alt="QRcode" :src="QRcodeSource" />
</template>

<script setup>
import { ref } from 'vue'
import { QRcode } from 'esay-watermark'

const QRcodeSource = ref('')

QRcode({
	source: 'http://www.jimmyxuexue.top',
	src: 'https://avatars.githubusercontent.com/u/65758455?v=4',
	size: 100,
}).then(source => {
	QRcodeSource.value = source
})
</script>
```

### 原生页面中使用

```html
<body>
	<script src="./watermark.min.js"></script>

	<img id="qrCodeImage" alt="二维码" />

	<script>
		const { QRcode } = waterMarker // watermark 默认导出对象
		const qrCodeImage = document.getElementById('qrCodeImage')

		QRcode({
			source: 'http://www.jimmyxuexue.top',
			src: 'https://avatars.githubusercontent.com/u/65758455?v=4',
			size: 100,
		}).then(source => {
			qrCodeImage.src = source
		})
	</script>
</body>
```

## API

| 属性名       | 类型           | 是否必填 | 描述                             |
| ------------ | -------------- | -------- | -------------------------------- |
| source       | string         | yes      | 二维码资源（扫码结果）           |
| src          | string         | no       | 二维码中心区图片地址             |
| codeSize     | number         | no       | 二维码尺寸（默认 400）           |
| size         | number         | no       | 中心区图片尺寸 默认（100）       |
| colorDark    | string         | no       | 二维码亮色（前景色，默认`#000`） |
| colorLight   | string         | no       | 二维码暗色（背景色，默认`#fff`） |
| correctLevel | number         | no       | 错误级别（默认 2）               |
| output       | 'jpeg' \|'png' | no       | 导出图片类型（默认 jpeg）        |
