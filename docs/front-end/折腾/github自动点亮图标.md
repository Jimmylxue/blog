# github 自动点亮图标

你是否非常羡慕那些大神 github 一年全勤，绿的发光！不用羡慕，你也可以！写点脚本，也能够让你拥有这种酷炫的提交记录，面试时经验面试官？！

> 这是最近在做自动化脚本实现的，大家只要和我一样这么操作与配置，即可实现。

ps：大家还是不要过度最求这个，自己的实际代码提交量才是硬道理。

上效果图：

![image-20231126202453882](https://image.jimmyxuexue.top/img/202311262024895.png)

是不是很绿，还挺好看的，最近的几天都是有使用这个脚本

> 虽然有使用脚本，但是实则我也是有真正提交内容哈😁

![image-20231126202419583](https://image.jimmyxuexue.top/img/202311262024645.png)

具体到仓库，其实是这个自动化脚本仓库，每日都有一个`auto cimmit` 的提交。

## 如何实现

实现它需要有几个前置知识：

- 有一个仓库

- Github-action

  需要会一些基础的github-action的配置，不会也没关系，后面我会提供一个基本配置信息附上每行的注释。大家自行修改即可。

- Github-token

  我们需要token，这个token主要是为了能够让自动化脚本push代码用的，且需要给这个token提交代码的权限。

下面我们一个个来讲：

### 有一个仓库

我们需要给github仓库根目录下加上一个.github/workflows文件夹。在这个文件夹下就可以创建一个个`.yml`文件，这个文件就是用来写action脚本的。

![image-20231126203303246](https://image.jimmyxuexue.top/img/202311262033266.png)

### Githun-action

下面我们在`.github/workflows`创建一个`signin.yml`文件。

> 名字可自行修改，不一定要signin，只要保证结尾为 .yml 结尾接口

```yaml
name: 掘金自动签到 # 脚本名称

on:
  schedule:
    # 这个是国际标准时间 非北京时间 北京时间比国际时间早8小时 所以要减去8小时 为 国际时间的1点
    # schedule 的 cron 任务可能会延迟，短则几小时长则甚至可能一天
    - cron: '30 1 * * *'
  #  配置了 workflow_dispatch 我们就可以手动执行了
  workflow_dispatch:

# 推送之后执行一系列的任务
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      # 获取代码
      - name: 迁出代码
        # 使用action库 action/checkout获取代码
        uses: actions/checkout@master
        with:
          # personal access token 这个就是 Github-token
          token: ${{ secrets.TOKEN }}
      # 安装Node10

      - name: 安装node.js
        # 使用action库  actions/setup-node安装node
        uses: actions/setup-node@v1
        with:
          node-version: 16.17.1

      - name: 安装pnpm
        run: npm install -g pnpm@7.12.2

      # 安装依赖
      - name: 安装依赖
        run: pnpm install

      # 执行签到脚本 -> 打包执行结束之后，我们的代码会有更新，目标是将这部分代码提交到仓库
      - name: 打包
        run: pnpm run juejin userId=${{ secrets.userId }}

        # 推送信息到微信
      - name: 推送信息到微信
        uses: easychen/github-action-server-chan@main
        with:
          sendkey: ${{ secrets.PRIVATE_FANGTANG_KEY }}
          title: '掘金自动签到完成'

      - name: Display Git status
        run: git status
				
				# 配置你的 git 信息
      - name: Commit changes
        run: |
          git config --local user.email "1002661758@qq.com"
          git config --local user.name "jimmyxuexue"
          git add .
          git commit -m "action commit : auto commit"
				
				# 提交 git 代码
      - name: push code to master
        run: git push origin master

```

关键配置：

- schedule

  配置它的cron，则每日github会自动帮我们执行这个yml脚本，这个也就是自动点亮图标的关键

  > 注意：配置的cron时间为美国时间，且会有延迟。

- workflow_dispatch

  手动执行脚本，类似与Jenkins，方便我们自行配置

  ![image-20231126210252859](https://image.jimmyxuexue.top/img/202311262102900.png)

- TOKEN

  需要配置对应的**Repository secrets** 后面会提到。

以上的最核心的部分`git commit` 和 `git push`操作，核心要有代码的变更。

上面能够实现的核心操作是，在我的仓库，执行`pnpm run juejin userId=${{ secrets.userId }}`之后会有文件变动，有文件变动是核心，因为有文件变动，才能提交代码。

> 我的文件变动是会更新cookies，实现cookie永久有效。

如果是单纯想刷图标的同学，可以自行利用node写一个如`fs`的脚本，修改一下某个文件的内容，之后再提交即可。

相信看完上面的注释，兄弟们能够了解这个脚本的执行的内容和方式了。下面讲另外一个关键的：Githun-token

### Githun-token

这个token主要是为了能够让自动化脚本push代码用的。所以我们去github的个人中心生成一个即可。

**创建**

这个过程还比较长，这里放一个知乎的图片，按照上面的步骤生成一个即可：[github访问令牌token的创建方法](https://zhuanlan.zhihu.com/p/501872439)

**给权限足**

权限这块很重要，如果没有给权限会出现提交失败的情况。

![image-20231126205608689](https://image.jimmyxuexue.top/img/202311262056728.png)

> 无法截长图，我是所有权限都给了 read and write 的权限。实则应该不用所有给，由于我不知道具体要给哪个，所以我全给了！

**配置到需要自动提交代码仓库的 Repository secrets 中**

![image-20231126205857706](https://image.jimmyxuexue.top/img/202311262058733.png)

## 效果

上面的脚本会在每日上午大概十点左右执行，并帮助我点亮图标，自动执行流程如下：

![image-20231126210421527](https://image.jimmyxuexue.top/img/202311262104555.png)

## 总结

这个就是自动点亮图标的所有内容，我用它主要是为了保存token，实现登录态的持久化。

不过好像他更大一方面可以帮助我们点亮小绿表，达到一个装酷的效果。

有不清晰的地方欢迎私信。
