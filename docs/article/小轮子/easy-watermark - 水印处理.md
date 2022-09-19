---
head:
  - - meta
    - name: description
      content: 水印生成器

  - - meta
    - name: keywords
      content: canvas

  - - script
    - src: https://vitepress-source.oss-cn-beijing.aliyuncs.com/statistics.js
---

# watermark.js - 水印处理

watermark 是一个基于 canvas 的简单的生成自定义水印、马赛克、二维码、高斯模糊等的插件，轻量、灵活、配置简单是它的特点。

GitHub: [传送门](https://github.com/Jimmylxue/easy-watermark)

> issues 是第一生产力！😄

知识星球：[传送门](http://www.jimmyxuexue.top)

> 大兄弟们聚过来，这件事很重要🎉🎉🎉

(如果觉得不错 👍，给个star ⭐吧，你的认可是我最大的动力 ！)

## 效果

**marker 水印效果**

![image-20220604104010832](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220604104010832.png)

![demo](http://jimmyxx.oss-cn-beijing.aliyuncs.com/demo.png)

![demo](http://jimmyxx.oss-cn-beijing.aliyuncs.com/demo2.png)

**fullMarker 全局平铺水印**

![image-20220918202205711](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220918202205711.png)

**mosaic 马赛克效果**

![image-20220701233625989](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220701233625989.png)

**blur 高斯模糊**

![image-20220917173326254](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220917173326254.png)

**QRcode**

![image-20220917220428792](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220917220428792.png)

## 快速开始

#### 安装下载

```
npm i esay-watermark

yarn add esay-watermark (推荐)
```

#### 基本使用

- 在框架中使用

  > Vue的demo，react和其他框架同理

  ```vue
  <template>
  	<img alt="marker" :src="imgurl" />
    <img alt="mosaic" :src="imgurl2" />
    <img alt="blur" :src="imgurl3" />
    <img alt="QRcode" :src="imgurl4" />
    <img alt="fullMarker" :src="imgurl4" />
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { marker, mosaic, blur, QRcode, fullMarker } from 'esay-watermark'
  
  const imgUrl = ref('')
  const imgUrl2 = ref('')
  const imgUrl3 = ref('')
  const imgUrl4 = ref('')
  const imgUrl5 = ref('')
  
  // 水印效果
  marker({
  	src: 'https://img1.baidu.com/it/u=128307009,2094083535&fm=26&fmt=auto',
  	text: 'jimmy',
  	color: '#bdc3c7',
  	size: 120,
  	position: 'center',
  	padding: 10,
  }).then(res => (imgurl.value = res))
  
  // 马赛克效果
  mosaic({
  	src: 'https://avatars.githubusercontent.com/u/65758455?v=4',
  	size: 5,
  }).then(source => {
  	imgUrl2.src = source
  })
    
  // 高斯模糊效果
  blur({
  	src: 'https://avatars.githubusercontent.com/u/65758455?v=4',
  	radius: 5,
  }).then(source => {
  	imgUrl3.src = source
  })
  
  // QRcode
  QRcode({
    source: 'http://www.jimmyxuexue.top',
    size: 100,
  }).then(source => {
    imgUrl4.src = source
  })
    
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

- 在 html 中使用

  ```html
  <body>
  	<script src="./watermark.min.js"></script>
  	<img id="img" alt="水印效果" />
		<img id="img2" alt="马赛克效果" />
    <img id="img3" alt="高斯模糊效果" />
	  <img id="img4" alt="QRCode" />
	  <img id="img5" alt="全局平铺水印" />
  	<script>
			const { marker, mosaic, blur, QRcode, fullMarker } = waterMarker // watermark 默认导出对象
  		const img = document.getElementById('img')
  		const img2 = document.getElementById('img2')
	    const img3 = document.getElementById('img3')
	    const img4 = document.getElementById('img4')
	    const img5 = document.getElementById('img5')
	    
			// 制作水印
			const config = {
				src: 'http://jimmyxx.oss-cn-beijing.aliyuncs.com/lot.png',
  			text: 'easy-watermark',
  			color: '#bdc3c7',
  			size: 40,
  			position: 'center',
  			padding: 10,
				rotate: -15,
				type: 'stroke',
			}
			marker(config).then(res => {
				img.src = res
			})
	
  		// 制作马赛克效果
  		mosaic({
  			src: 'https://avatars.githubusercontent.com/u/65758455?v=4',
  			size: 5,
  		}).then(source => {
  			img2.src = source
  		})
      
      // 高斯模糊效果
      blur({
        src: 'https://avatars.githubusercontent.com/u/65758455?v=4',
        radius: 5,
      }).then(source => {
        img3.src = source
      })
      
      // QRcode
      QRcode({
        source: 'http://www.jimmyxuexue.top',
        src: 'https://avatars.githubusercontent.com/u/65758455?v=4',
        size: 100,
      }).then(source => {
        img4.src = source
      })
      
    	// fullMarker 全局平铺水印  
      fullMarker({
        src: 'http://jimmyxx.oss-cn-beijing.aliyuncs.com/lot.png',
        text: 'easy-watermark',
        color: '#c0c0c0',
        size: 30,
        padding: 180,
        rotate: -15,
        type: 'stroke',
      }).then(source => {
        img5.src = source
      })
  	</script>
  </body>
  ```

## API

**marker API**

| 属性名   | 类型   | 是否必填   | 描述                          |
| -------- | ------ | ------ | --------------------------------------------- |
| src      | string | yes | 图片地址（必填）                              |
| text     | string | yes | 水印文字                                      |
| color    | string | no | 水印颜色（默认 `#c0c0c0`）                 |
| size     | number | no | 水印文字大小（默认 20）                       |
| padding  | number | no | 水印距离图片边缘的距离（默认 30）             |
| output   | 'jpeg' \| 'png' | no | 输出图片类型 支持 `jpeg`和`png` （默认 `jpeg`） |
| position | Position | no | 水印所处位置，默认 RIGHT_BOTTOM（右下） |
| type | 'fill'\|'stroke' | no | 文字的“填充模式”和“描边模式”（默认`fill`模式） |
| rotate | number | no | 旋转角度（默认0） |

其中Position属性具有以下属性值：

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

**mosaic API**

| 属性名   | 类型   | 是否必填   | 描述                          |
| -------- | ------ | ------ | --------------------------------------------- |
| src      | string | yes | 图片地址                              |
| size | number | no | 模糊力度，越大越模糊（默认10） |
| output | 'jpeg' \| 'png' | no | 导出图片类型（默认`jpeg`）              |

**blur API**

| 属性名   | 类型   | 是否必填   | 描述                          |
| -------- | ------ | ------ | --------------------------------------------- |
| src      | string | yes | 图片地址                              |
| blur | number | no | 模糊半径，越大越模糊（默认5） |
| output | 'jpeg' \| 'png' | no | 导出图片类型（默认`jpeg`）              |

**QRcode API**

| 属性名       | 类型           | 是否必填 | 描述                             |
| ------------ | -------------- | -------- | -------------------------------- |
| source       | string         | yes      | 二维码资源（扫码结果）           |
| src          | string         | no       | 二维码中心区图片地址             |
| codeSize     | number         | no       | 二维码尺寸（默认400）            |
| size         | number         | no       | 中心区图片尺寸 默认（100）       |
| colorDark    | string         | no       | 二维码亮色（前景色，默认`#000`） |
| colorLight   | string         | no       | 二维码暗色（背景色，默认`#fff`） |
| correctLevel | number         | no       | 错误级别（默认2）                |
| output       | 'jpeg' \|'png' | no       | 导出图片类型（默认jpeg）         |

**fullMarker API**

| 属性名  | 类型             | 是否必填 | 描述                                            |
| ------- | ---------------- | -------- | ----------------------------------------------- |
| src     | string           | yes      | 图片地址（必填）                                |
| text    | string           | yes      | 水印文字                                        |
| color   | string           | no       | 水印颜色（默认 `#c0c0c0`）                      |
| size    | number           | no       | 水印文字大小（默认 20）                         |
| padding | number           | no       | 平铺水印之间的间距（默认 30）                   |
| output  | 'jpeg' \| 'png'  | no       | 输出图片类型 支持 `jpeg`和`png` （默认 `jpeg`） |
| type    | 'fill'\|'stroke' | no       | 文字的“填充模式”和“描边模式”（默认`fill`模式）  |
| rotate  | number           | no       | 旋转角度（默认0）                               |

## 更新日志

- [x] 新增 rotate 旋转角度

  > 2022.06.02 更新
  
- [x] 新增 type 文字书写方式 “描边”|“填充”

  > 2022.07.01 更新
  
- [x] 新增 `mosaic ` 图片转马赛克

  > 2022.07.02 更新
  
- [x] 新增 `blur` 高斯模糊、`QRcode`二维码

  > 2022.09.17 更新
  
- [x] 新增 `fullMarker` 平铺水印

  > 2022.09.18 更新

## 敬请期待

日后这个库会不定期更新😁....

期待小伙伴们的star和PR🤞🤞🤞
