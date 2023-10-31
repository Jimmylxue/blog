# z-index 层级问题

这篇文章用来记录一个比较常见的z-index的问题，不知道大家在开发过程中是否遇到过，一个定位元素，无论我z-index设置的最高，哪怕设置了1000000都无法出现在页面上（原因不是因为有别的值设置的比他高），这篇文章我们来完整的过一遍这块的知识！

## 常规结构&层级

看一段最简单的html结构代码：

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>常规结构&层级</title>
		<style>
			div {
				width: 100px;
				height: 100px;
				position: absolute;
			}
			.a1 {
				background-color: #2ecc71;
				left: 0;
				top: 0;
			}
			.a2 {
				background-color: #9b59b6;
				left: 30px;
				top: 30px;
			}
		</style>
	</head>
	<body>
		<div class="a1"></div>
		<div class="a2"></div>
	</body>
</html>

```

在这段代码中，a1和a2都设置了绝对定位，且它们都没有设置z-index调整层级，这时候他们会按照默认结构进行层级排序

> html结构后面的层级会更高

![image-20231031144714681](https://image.jimmyxuexue.top/img/202310311447786.png)

这个还是比较好理解的吧，如果我们想要让a1在a2的上面，只需要修改一下a1的 z-index 即可，如下：

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>设置z-index</title>
		<style>
			div {
				width: 100px;
				height: 100px;
				position: absolute;
			}
			.a1 {
				background-color: #2ecc71;
				left: 0;
				top: 0;
				/* 通过设置 z-index 即可让 同层级 的元素 位于更高一层 */
				z-index: 10;
			}
			.a2 {
				background-color: #9b59b6;
				left: 30px;
				top: 30px;
			}
		</style>
	</head>
	<body>
		<div class="a1"></div>
		<div class="a2"></div>
	</body>
</html>
```

![image-20231031145945960](https://image.jimmyxuexue.top/img/202310311459027.png)

## 特殊结构

下面我们来看一个特殊的场景，这个场景就是，无论我们怎么设置z-index都没有效果的场景：

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>特殊代码结构</title>
		<style>
			div {
				width: 100px;
				height: 100px;
				position: absolute;
			}
			.a1 {
				background-color: #2ecc71;
				left: 0;
				top: 0;
				z-index: 10;
			}
			.a2 {
				background-color: #9b59b6;
				left: 30px;
				top: 30px;
				z-index: 5;
			}
			.a3 {
				left: 30px;
				top: 30px;
				background-color: #e74c3c;
				/*
          这里即使 a3 的 z-index 比 a1 要高，但是它依旧是盖在a1下面的，
            可以理解成 a3 的父元素 a2 都没有 a1 高 所以 它的 子元素也是没有办法比它高的
        */
				z-index: 100;
			}
		</style>
	</head>
	<body>
		<div class="a1"></div>
		<div class="a2">
			<div class="a3"></div>
		</div>
	</body>
</html>
```

这段代码，a3是a2的一个子元素，我们即使给a3的z-index设置成100（最大），a3仍然位于a1（z-index = 10）的下面。效果如下：

![image-20231031150240492](https://image.jimmyxuexue.top/img/202310311502536.png)

原因是因为我们a2依旧是低于a1的，所以即使a3比a1高，它依旧无法展示，所以得出结论：**z-index是受父级元素层级影响的**

如果我们要实现层级结构为：a3>a1>a2，这时候就得修改代码的结构了：

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>特殊代码结构</title>
		<style>
			div {
				width: 100px;
				height: 100px;
				position: absolute;
			}
			.a1 {
				background-color: #2ecc71;
				left: 0;
				top: 0;
				z-index: 10;
			}
			.a2 {
				background-color: #9b59b6;
				left: 30px;
				top: 30px;
				z-index: 5;
			}
			.a3 {
				left: 30px;
				top: 30px;
				background-color: #e74c3c;
				z-index: 100;
			}
		</style>
	</head>
	<body>
		<div class="a1"></div>
		<div class="a2"></div>
    <div class="a3"></div>
	</body>
</html>
```

效果如下：

![image-20231031150750613](https://image.jimmyxuexue.top/img/202310311507686.png)

到这里应该能够很清晰的理解这块的层级的逻辑了，不过我在调试的时候发现了一个非常诡异的问题，也没有理解，这里跟大家一起讨论一下：

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>特殊代码结构</title>
		<style>
			div {
				width: 100px;
				height: 100px;
				position: absolute;
			}
			.a1 {
				background-color: #2ecc71;
				left: 0;
				top: 0;
				z-index: 10;
			}
			.a2 {
				background-color: #9b59b6;
				left: 30px;
				top: 30px;
				/* z-index: 5; */
			}
			.a3 {
				left: 30px;
				top: 30px;
				background-color: #e74c3c;
				z-index: 100;
			}
		</style>
	</head>
	<body>
		<div class="a1"></div>
		<div class="a2">
			<div class="a3"></div>
		</div>
	</body>
</html>
```

这里我们没有给a2设置层级，但是最终展示的效果又是a3>a1>a2如下这个效果：

![image-20231031151017474](https://image.jimmyxuexue.top/img/202310311510545.png)

非常疑惑，我也很是不解，和前面我们的理解又有出入了。有知道的同学可以把原因说下大家一起讨论下~
