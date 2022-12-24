# 配置信息

>issues 是第一生产力！😄
>
>(如果觉得不错 👍，给个 star ⭐ 吧，你的认可是我最大的动力 ！)
>
>[github传送门](https://github.com/Jimmylxue/daily-store/tree/master/packages/snowtiny)

在项目根目录下新建`snowtiny.json`

基础配置：

```json
{
	"entry": "./images",
	"output": "./temp",
	"diffCompress": false,
	"tile": true,
	"saveOther": true
}
```

## entry

压缩的入口，在此案例配置文件中的入口为 `snowtiny.json` 文件同级目录下的 `images/`文件夹

## output

压缩后文件的输出位置，在此案例配置文件中的入口为 `snowtiny.json` 文件同级目录下的 `output/`文件夹。

> 在执行压缩前需要先确保项目中并无`output`对应的文件夹，因为在执行时会自动创建新的文件夹

## diffCompress

是否开启递归压缩，默认不开启。

> 开启递归压缩后会将入口文件夹下的所有子文件夹都进行递归压缩，如果不开启只会压缩入口文件夹本层的图片资源文件

## tile

是否平铺图片输出

> 开启平铺输出后所有的图片文件都将在`output`对应的文件夹下输出，不保留压缩文件夹时的文件结构。（这种配置最好保证压缩的文件没有重名）

## saveOther

是否将非图片资源也一起拷贝一份

> 这个配置主要考虑到前端开发时，压缩结束后只需替换压缩文件夹和输出文件夹的文件名即可完成项目的图片替换。所以如果有需要可以打开。