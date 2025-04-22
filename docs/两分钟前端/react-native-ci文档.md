# **《当Jenkins打包机变成“病毒传播中心”：我们如何用Docker拯救》**

## **前因：APP打包又双叒叕炸了💥**

每次测试同学突然在群里怒吼：**“XXX App 又打包失败了！！！”**，我的内心OS：

> **“啊？我明明没动它啊？？？”** 😱

然后只能含泪放下手头的工作，紧急救火🔥。

### **为什么Jenkins打包机总在“交叉感染”？🦠**

经过我（被迫）深入调查，发现罪魁祸首通常是这几个“毒王”：

- **Node 版本不对**（老项目用 Node 12，新项目用 Node 20，结果 `n` 切换时直接精神分裂）
- **JDK 版本打架**（智慧门店用 JDK 11，运营通用 JDK 17，一台机器上互相掐架）
- **依赖安装失败**（网络抽风、权限问题、玄学报错……）

#### **1. Node 版本：一场“你死我活”的战争**

> 这是jenkins 上分配给前端项目的机器

![image-20250421152451146](https://image.jimmyxuexue.top/img/image-20250421152451146.png)

因为项目的不同，有的比较老，有的又是新项目，所以不可避免的会发生node版本的问题。需要去动态的切换node的版本。Jenkins 打包机上的 Node 版本管理用的是 `n`，而 `n` 的哲学是：

> **“一台机器，一个Node，要么你用，要么我用，但绝不能一起用！”**

![image-20250421144725585](https://image.jimmyxuexue.top/img/image-20250421144725585.png)

![image-20250421144843099](https://image.jimmyxuexue.top/img/image-20250421144843099.png)

我们可以看到这块使用的是 `n` 进行的版本切换。`n` 的方式比较粗暴，不支持多版本共存。所以我们想一个极限的情况，如果两个项目同时打包，就可能会有问题，要么直接报错（报错可能还好）要么就是会出现一些莫名其妙的线上问题

![n 切换版本时的机器状态](https://image.jimmyxuexue.top/img/image-20250421145157403.png)

**理想情况**：两个项目同时打包？直接原地爆炸💣！
**现实情况**：要么报错（还算善良），要么默默生成一个薛定谔的包😡非常的不稳定。比如进某个页面报一个完全看不懂的错。

**为什么不换 `nvm`？**
试过，但 Jenkins 的 Shell 直接摆烂：“我不认识这玩意儿！”（可能是权限问题，也可能是运维大哥懒得折腾😅）。

#### **2. JDK 版本**

智慧门店（React Native 0.64.4）和运营通（RN 0.73.6）就像两个不同时代的安卓机：

- **一个要 JDK 11**
- **一个要 JDK 17**

我的本地解决方案：**疯狂 alias 切换**🤫（这个目前在打包机上是这么做的）。

```
alias jdk11="export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-11.0.1.jdk/Contents/Home"  
alias jdk17="export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-17.0.1.jdk/Contents/Home"  
```

但 Jenkins 打包机可没这么智能，经常出现：

> **“A项目打包完，B项目直接原地升天！”** 🚀

## **解决方案：Docker，打包界的“隔离酒店”🏨**

既然 Jenkins 打包机像个大杂烩，那不如让每个项目住进自己的**“独立套房”**——**Docker 容器**！

### **react-native-ci：一个让打包机不再“社恐”的Demo**

> 根据这个痛点，我写了这个这是一个 demo ,旨在解决安卓打包环境交叉感染的场景 
>
> [react-native-ci](https://github.com/Jimmylxue/react-native-ci)

![Demo效果](https://image.jimmyxuexue.top/img/image-20250421150605456.png)

总体流程是：

构建镜像 -> 运行容器 -> 打包Apk -> 上传release

![image-20250421153133475](https://image.jimmyxuexue.top/img/image-20250421153133475.png)

![image-20250421153205944](https://image.jimmyxuexue.top/img/image-20250421153205944.png)

**核心思想**：

- **每个项目一个专属环境**（Node、JDK、Android SDK 全隔离）
- **配置全动态化**（想用啥版本就用啥版本）
- **借助 GitHub Actions + 外网机器**（告别依赖下载慢的痛）

### **好处**

✅ **再也不用担心“你装啥我崩啥”**（彻底杜绝交叉感染）
✅ **CI/CD 丝滑如德芙**（GitHub Action 自动跑，解放双手）
✅ **终于不用当救火队员了**（世界和平✌️）

## **代码环节（枯燥但有用版）**

```dockerfile
FROM ubuntu:latest

# 定义构建参数
ARG NODE_VERSION=20.14.0
ARG JDK_VERSION=17
ARG ANDROID_SDK_VERSION=34
ARG ANDROID_BUILD_TOOLS_VERSION=34.0.0
ARG ANDROID_NDK_VERSION=26.1.10909125
ARG CMAKE_VERSION=3.22.1

# 设置 安卓 环境变量
ENV ANDROID_SDK_ROOT=/opt/android-sdk
ENV PATH=${PATH}:${ANDROID_SDK_ROOT}/tools:${ANDROID_SDK_ROOT}/platform-tools:${ANDROID_SDK_ROOT}/cmdline-tools/latest/bin

# 安装必要的工具和 OpenJDK
RUN apt-get update && \
  apt-get install -y openjdk-${JDK_VERSION}-jdk git wget unzip && \
  apt-get clean

# 下载并安装 Android SDK Command-Line Tools
RUN mkdir -p ${ANDROID_SDK_ROOT}/cmdline-tools && \
  cd ${ANDROID_SDK_ROOT}/cmdline-tools && \
  wget https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip && \
  unzip commandlinetools-linux-11076708_latest.zip && \
  rm commandlinetools-linux-11076708_latest.zip && \
  mv cmdline-tools latest

# 安装 Android SDK Platform
RUN yes | sdkmanager --sdk_root=${ANDROID_SDK_ROOT} "platforms;android-${ANDROID_SDK_VERSION}"

# 安装 Android SDK Build-Tools
RUN yes | sdkmanager --sdk_root=${ANDROID_SDK_ROOT} "build-tools;${ANDROID_BUILD_TOOLS_VERSION}"

# 安装 cmake
RUN yes | sdkmanager --sdk_root=${ANDROID_SDK_ROOT} "cmake;${CMAKE_VERSION}"

# 安装 ndk
RUN yes | sdkmanager --sdk_root=${ANDROID_SDK_ROOT} "ndk;${ANDROID_NDK_VERSION}"

# 安装 Git
RUN apt-get update && apt-get install -y curl && apt-get clean

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN curl -o node.tar.gz https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.gz \
  && tar -xzf node.tar.gz -C /usr/local --strip-components=1 \
  && rm node.tar.gz


ENV PATH="/usr/local/bin:${PATH}"

# 设置淘宝镜像 - 这个是可选配置 github-action 自带翻墙 不用配置 如果国内用户本地docker 需要配置一下
RUN npm config set registry https://registry.npmmirror.com

# 安装yarn
RUN npm install -g yarn@1.22.22

# 设置工作目录
WORKDIR /app

COPY . /app

# 暴露应用程序端口（根据需要修改）
EXPOSE 999
```

## **最后**

这个小实验已经在小黑屋个别项目里试水了，效果不错！**如果有项目也在被 Jenkins 打包机折磨，不妨试试 Docker 这个模式！**

**欢迎讨论：**

- 会不会存在啥问题？
- 有没有更骚的操作？（比如 Kubernetes 动态调度？）
