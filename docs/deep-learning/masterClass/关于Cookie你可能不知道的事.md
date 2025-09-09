# 关于Cookie 

作为一个快五年的前端程序员，很惭愧的说我对于Cookie的了解还是太浅了。述说过去我对于Cookie的了解：

Cookie和Session、Token一样都是用来鉴权的，但是现在通过Cookie来鉴权的业务比较少，或者说从跟着B站学习视频到后来进入公司业务进行开发，大多时候我接触的鉴权都是通过登录后后端返回token，之后手动将token加到请求头中去进行鉴权。

![image-20250909103526185](https://image.jimmyxuexue.top/img/image-20250909103526185.png)

由于之前笔者读过一本经典的书籍《图解HTTP》，在这本书中我了解到了关于Cookie的另一个特点，其在发起网络请求时会自发的将Cookie值放入请求头中传递。但是这个在我们真正的开发中，涉及到的细节还是不少的。

为了进行实验来验证。我们可以搜索一些现成的线上的网站进行分析，这里我找到一个非常知名腾讯的网站我们来进行cookie内容的分析。

当我们访问下`https://hdnf.qq.com/a20250822manholecover/index.html` 查看这个域名下的cookies，我们会发现在这个域名下的cookie有很多，但是在发起网络请求时，会被自动携带的只有我箭头指向和框选的部分会被携带。

![image-20250909110106008](https://image.jimmyxuexue.top/img/image-20250909110106008.png)

![image-20250909110407555](https://image.jimmyxuexue.top/img/image-20250909110407555.png)

那么这个是为什么呢？经过查阅资料后得知，这其实是一个非常经典的问题。也是一个非常容易混淆的细节，就是Cookie的作用域。

根本原因在于：**浏览器发送Cookie时，匹配的是请求的 目标域名，而不是Cookie的存储域名**。

- **Cookie Domain为 `.qq.com`**： 这是一个“通配”域名。以点`.`开头表示它对该域名及其所有子域名（如 `hdnf.qq.com`, `game.qq.com`, `www.qq.com`）都有效。因为 `hdnf.qq.com` 是 `.qq.com` 的子域名，**匹配成功**，所以Cookie被发送。

为什么**`.hdnf.qq.com`**和 **`hdnf.qq.com`** 没有被携带？

经过细致观察，这个网站下的网络请求发送的是地址是：`https://dzhu.qq.com`

![https://image-20250909132641449](https://image.jimmyxuexue.top/img/image-20250909132641449.png)

根据前面我们所知道的cookie匹配原则，它只能匹配到`.qq.com`下的cookie。

而我们查看常规`hdnf.qq.com`下的的网络请求，就是能够正常匹配到 `.hdnf.qq.com`、`hdnf.qq.com`、`.qq.com` 的cookie值。

![image-20250909133004754](https://image.jimmyxuexue.top/img/image-20250909133004754.png)

至于像**`.bilibili.com`**这类的是因为完全匹配失败，所浏览器是不会携带。

## 总结

简单来说，浏览器在发送Cookie时遵循的是 **“域名后缀匹配”** 原则，**发送Cookie时，匹配的是请求的 目标域名，而不是Cookie的存储域名**。