# 神奇的 inline-block 引发的间距问题

今天朋友抛出了一个我从来没有见过的问题，如下：

![图片](https://vitepress-source.oss-cn-beijing.aliyuncs.com/WechatIMG97.png)

总的说就是css的`inline-block` 引发的空隙问题。

不知道有没有和我一样是第一次遇到这个问题的小伙伴，用惯了`flex`布局的我真觉得挺新鲜的，如果也有的话可以弹幕扣一波1~

老实说我是第一次看到这个问题，平时开发中也是几乎都没有使用过`inline-block`这个属性，所以初次见到这个问题的时候我就觉得应该是一些`margin`、`padding`引起的吧~。

**实操代码如下**

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>inline-block</title>
    <style>
    	*{
        margin: 0;
        padding: 0;
      }

      .container{
        border: 1px solid #3498db;
      }

      .item{
        width: 200px;
        height: 200px;
        background-color: #1abc9c;
        display: inline-block;
      }
    </style>
	</head>
	<body>
		<div class="container">
			<div class="item">1</div>
			<div class="item">2</div>
			<div class="item">3</div>
			<div class="item">4</div>
		</div>
	</body>
</html>

```

在实操之后发现，确实是存在间距问题，症状如下：

![症状图](https://vitepress-source.oss-cn-beijing.aliyuncs.com/WechatIMG98.png)

打开开发者工具之后发现并没有任何`margin`和`padding`。

![无margin和padding](https://vitepress-source.oss-cn-beijing.aliyuncs.com/WechatIMG99.png)

老实说我第一次见到这个诡异的问题，经过百度之后发现了，这个问题的罪魁祸首是 **空格** ，也就是那些空格区域其实是空格。

## 如何解决

**设置字体大小**

知道了这一点解决这个问题就很简单了，我们只需要让空格不显示。或者说是 **小到看不见** 就可以了，所以只需要在父级别设置一个 `font-size: 0`就可以了。

设完之后子级元素一定要再恢复一下字体大小，否则内容就看不见了。

代码如下：

```css
*{
  margin: 0;
  padding: 0;
}

.container{
  border: 1px solid #3498db;
  font-size: 0
}

.item{
  width: 200px;
  height: 200px;
  background-color: #1abc9c;
  display: inline-block;
  font-size: 16 /* 恢复字体大小 */
}
```

![间隙问题解决](https://vitepress-source.oss-cn-beijing.aliyuncs.com/WechatIMG100.png)

**去除代码多余的空格**

我们现在使用的`IDE`都特别的只能，其会自动为我们格式化代码，也就是导致会有一些空格元素，这个就是导致出现间隙的罪魁祸首。我们可以关闭自动格式化，或者用其他文本编辑软件去除掉多余的换行。也可以实现解决这个问题。

## 总结

老实说这个问题还是挺惊艳到我的，因为平时开发中我都是`flex` 布局一把梭，这个是属于比较薄弱的知识了。学到了。

不过为什么`flex`布局不会引发这个空格问题呢？有小伙伴们知道是为什么的吗？
