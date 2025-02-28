# has 伪类

大家好，这里是两分钟前端，今天给大家带来的CSS强大的 has 伪类。

## 什么是 has 伪类

has 伪类是用于选择包含特定元素的元素。在过去，我们通过 CSS 可以实现根据 A 找到 B，但是无法根据 B 找到 A。

我们来个例子

```html
<div class="parent">
	<div class="child1">child1</div>
	<div class="child2">child2</div>
	<div class="child3">child3</div>
</div>
```

想要根据 child2 找到 child3 节点，将颜色改为红色，通过 CSS，我们可以这么写：

```css
.child2 + .child3 {
	color: red;
}
```

加号表示相邻的下一个兄弟节点

现在再次反过来，我们想要根据 child3 获取 child2 节点，可能大家想到的是使用 JS 来实现了。割裂感比较重，在JS的地方写css，性能也更差

```js
const child3 = document.querySelector('.child3')
const child2 = child3.previousElementSibling
child2.style.color = 'red'
```

现在我们有了has伪类，就可以一步到位，直接通过CSS的方式来实现，可以写出这么一段代码：

```css
div:has(+ .child3) {
	color: red;
}
```

这个我们可以这么读他：找到一个div元素，它满足的是 它的下一个兄弟节点是类名有 child3的元素

是不是有点初中时候解方程的感觉？Child3 = Child2 + 1; Child2 = Child3 - 1;

现在我们来个稍微复杂点的例子，看这个dom结构

```html
<ul>
	<li>item1</li>
	<li>item2</li>
	<li>item3</li>
</ul>
```

找到当前 hover 的元素的前一个兄弟元素，将颜色改为红色。我们就通过has伪类快速的找到这个元素（这个很关键，has 后面是可以跟一个选择器的表达式，而不是一个具体的元素。）

```css
li:has(+ li:hover) {
	color: red;
}
```

读代码：找到一个li元素，这个li元素要满足 它的兄弟li元素 正在被hover。  是不是就是等于 当前正在被hover的前一个元素 （是不是就像我说的解方程的感觉）

## 实战

我们来实现一个 mac 的 Dock 效果，当鼠标 hover 到某个图标时，移入的元素放大，并且前后的元素也会跟着一起放大。

这个效果大家想一下，如果是没有 has 伪类，我们该怎么实现？

...一段巨长的代码

现在有了 has 伪类，我们只需要一行核心的代码即可实现

```css
li:has(+ li:hover) {
	transform: scale(1.1);
}
```

## 总结

has 伪类是 CSS 中的一个伪类，利用它，可以非常高效的提升我们的开发效率。

## 最后

如果觉得有帮助，可以点赞收藏支持一下，也可以关注我，我会持续分享更多有用的前端知识。
