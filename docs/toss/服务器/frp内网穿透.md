# Frp 内网穿透的基本配置

由于我最近在研究 wsl ，顺带着就一起研究研究如何实现内网穿透，这篇文章，直接完整的记录一下我们应该如何使用 frp 来进行实现内网穿透。

## 基本概念

首先我们要知道什么是内网穿透，其实我也不是能够非常精准的解释这个，不过按照我的理解就是，让我们的内网，可以在外网下被访问到。所以，我们需要至少需要两个条件

- 拥有一台内网的机器
- 拥有一台外网可以访问的 云服务器

基于以上两个东西，我们就可以来实现下面说的具体的内容了。

## 什么是frp

frp 这个是一个开源的目前已经拥有100k star 的github开源的一个工具，首先我们可以正常的去github上下载对应机器类型的版本：

![image-20251104230934910](https://image.jimmyxuexue.top/img/image-20251104230934910.png)

解压文件之后，分别在 内网机 和 外网机 上解压，我们只需要着重关心以下四个文件。会涵盖如下这几个文件：

- frpc - 相当于客户端

  内网机上需要用的二进制可执行文件，不需要修改。外网机不需要关注此文件

- frpc.toml

  内网机上的配置文件，主要是配置 内网上 需要被外网访问的端口

- frps - 相当于服务端

  外网机上需要用的二进制可执行文件，不需要修改，内网机不需要关注此文件

- frps.toml

  外网机上的配置文件，只是配置内外网互相映射的端口，也不需要做额外过多的配置

整体流程：

```
任意用户浏览器客户端 → FRP 服务端 (公网服务器) → FRP 客户端 (内网机器) → 内网服务
```

## 完整DEMO

> 已知我在内网的 9998 端口下部署了一个 nginx 的前端页面

正常我在内网，可以使用 http://127.0.0.1:9998 访问这个页面，如下：

![image-20251104232048277](https://image.jimmyxuexue.top/img/image-20251104232048277.png)

- 这时我们配置 内网机（客户端）的 frpc.toml

    ```
    serverAddr = "118.89.198.194" # 这里换成 各自的 外网机器 ip
    serverPort = 7000 # 映射端口 外网机和内网机 都应开放这个端口 
    auth.method = "token" 
    auth.token = "jimmyCheese" # 可自定义
    
    # ssh连接的  可不配置
    [[proxies]]
    name = "wsl-ssh"          # 代理名称
    type = "tcp"              # 协议类型
    localIP = "127.0.0.1"     # WSL 本地服务IP
    localPort = 22            # WSL 的SSH端口
    remotePort = 6000         # 公网访问的端口
    
    # 新增 9998 端口转发（TCP）
    [[proxies]]
    name = "wsl-9998-port"
    type = "tcp"                  # 如果转发 HTTP 可以用 "http"
    localIP = "127.0.0.1"         # WSL 本地服务 IP
    localPort = 9998               # WSL 上运行的服务端口
    remotePort = 9998              # 云服务器暴露的端口
    
    # 如果要新增其他端口 如 8888端口 只需要复制一份9998 端口配置即可，需要注意的是，所开放的端口需要在内网机和外网机的防火墙都开放同行才可
    ```

- 配置外网机（服务端）frps.toml

  ```
  bindPort = 7000  # 与内网机 端口保持一直
  auth.method = "token" # 与内网机保持一致
  auth.token = "jimmyCheese" # 与内网机保持一直
  ```

- 启动frp，这里要分别在内网机和外网机上执行一次启动命令

    - 服务端启动

      ```
      # 直接运行
      ./frps -c frps.toml
      
      # 后台运行
      nohup ./frps -c frps.toml > frps.log 2>&1 &
      
      # 使用 systemd (Linux)
      sudo systemctl start frps
      ```

    - 客户端启动

      ```
      # 直接运行
      ./frpc -c frpc.toml
      
      # 后台运行
      nohup ./frpc -c frpc.toml > frpc.log 2>&1 &
      
      # Windows 后台运行
      frpc.exe -c frpc.toml
      ```

      启动之后如果出现如下类似日志，说明启动成功

      ![image-20251104232944118](https://image.jimmyxuexue.top/img/image-20251104232944118.png)

      ![image-20251104233016590](https://image.jimmyxuexue.top/img/image-20251104233016590.png)

- 测试访问：http://118.89.198.194:9998/ 大功告成

  ![image-20251104233104843](https://image.jimmyxuexue.top/img/image-20251104233104843.png)

## 其他

### 检查端口占用情况

**Linux/Mac:**

```
# 查看哪个进程占用了7000端口
sudo lsof -i :7000
# 或者
sudo netstat -tulpn | grep 7000
```

#### 方案一：停止占用端口的进程

```
# 找到占用7000端口的PID，然后停止它
sudo kill -9 <PID>
```

### 后台运行

```
nohup ./frpc -c frpc.toml > frpc.log 2>&1 & 

nohup ./frps -c frps.toml > frpc.log 2>&1 & 
```

### 删除后台运行

```
pkill -f "frpc -c frpc.toml"  # 因为运行时时通过 frpc -c frpc.toml  所以我们可以精准的通过这个进行删除

pkill -f "frps -c frps.toml"
```

