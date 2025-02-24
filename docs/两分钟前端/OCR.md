## 纯前端 OCR 识别图片中的文字

大家好，这里是两分钟前端，今天给大家带来的是使用 OCR 识别图片中的文字。

## 什么是 OCR

OCR ，即光学字符识别，是一种将图像中的文字转换为可编辑文本的技术。

大家第一想法是，这个技术有什么用？

其实 OCR 的应用场景非常多，比如：

- 识别图片中的文字
- 识别图片中的表格
- 识别图片中的二维码

过去，我们识别图片中的文字，可能会想到接入一些靠谱的第三方平台，比如：

- 百度 OCR
- 腾讯 OCR
- 阿里 OCR

不过接入这些都是有门槛有代价的，我们需要提供自己的 API Key ，而且每次调用还要收费。

现在，我们有了更简单，最重要是免费的方式，那就是使用 `Tesseract.js` 这个库。它不仅支持多语言，而且跨平台，还开箱即用。妈妈再也不用担心我被收费了。

下面我们来看看怎么使用。

## 使用

### 安装

```
pnpm install tesseract.js
```

### 使用

```
import * as Tesseract from 'tesseract.js';

const result = await Tesseract.recognize(
  'image.png',
  'chi_sim',
  { logger: info => console.log(info) }
);
```

就是这么简单的操作，即可完成 OCR 识别。

## 总结

通过 `Tesseract.js` ，我们可以轻松地识别图片中的文字。它不仅支持多语言，而且跨平台，还开箱即用。妈妈再也不用担心我被收费了。

## 参考

- [Tesseract.js](https://github.com/naptha/tesseract.js)
