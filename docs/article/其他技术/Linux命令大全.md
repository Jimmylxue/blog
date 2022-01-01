# Linux 常用命令

![image-20211226202054235](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20211226202054235.png)

## 前言

程序员是只会用 **windows** 是不行，因为几乎所有的项目最后部署都是选择部署在 **Linux** 服务器上的，因为其具有 **稳定**、**安全**、**开源** 的特点，比如我的 **windows** 经常死机，但是的一个 1 核 2G 的小水管服务器买来已经一年之久了，就根本没有死机，个人网站部署在上面非常之稳定，这就是 **Linux** 的优势，随着我们水平和段位不断的进阶，是一定会遇到它的，尤其是做后端的大兄弟，一定会用到的！

**Linux** 命令非常之多！我曾经尝试死记硬背，到头就是只记住了 cd😂🤣，正如高中背单词，好记性不如烂笔头，想要记住它们，方法只有一个 ------ **多敲！**

多说两句，我是一个纯种的 `terminal`党，也确实有因为使用终端敲命令更加酷炫，也更能理解这个系统，所以我强烈建议用`terminal`，尽量少用图形化的界面，虽然市面上像 **宝塔面板** 一样的工具确实是非常的好用！

## 指令大全

作为一个前端程序员，工作中使用 **Linux** 的机会并不多，以下的指令都是我在工作之外部署个人网站时使用到的，会在学到和用到新的以后不断的进行更新。

### 系统级别指令

- `ssh`登录服务器

  ```
  ssh root@ip
  ```

  ![image-20211226223445111](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20211226223445111.png)

- `uname -a`查看系统版本信息

  ```
  uname -a # 查看系统版本信息
  ```

  ![image-20211226225232378](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20211226225232378.png)

- `pwd`获取当前路径

  ```
  pwd
  ```

  ![image-20211226223705194](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20211226223705194.png)

- `ifconfig`查看网络设备信息

  ```
  ifconfig
  ```

  ![image-20211226223842512](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20211226223842512.png)

- `free` 获取内存信息

  ```
  free # 获取内存的信息 最小单位为kb
  free -h # 获取内存信息 最小单位为M  这个比较常用
  ```

  ![image-20211226224153332](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20211226224153332.png)

- `df -lh`获取存储空间（磁盘空间）

  ```
  df -lh
  ```

  ![image-20211226224431005](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20211226224431005.png)

- `yum`安装软件

  ```
  yum install mysql # 安装mysql
  ```

  ![image-20211226225537961](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20211226225537961.png)

- `wget`下载内容

  ```
  wget https://nodejs.org/dist/v16.13.1/node-v16.13.1-linux-x64.tar.xz # 下载node.js
  ```

  我们可以先在网上找到下载连接，使用 wget+链接 可以实现下载

  ![image-20211226230124146](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20211226230124146.png)

- `which`查看文件位置

  ```
  which nginx # 查看nginx安装位置
  ```

  ![image-20211226225745578](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20211226225745578.png)

- `-- help`查看帮助手册

  ```
  docker --help # 查看docker的指令大全
  ```

  ![image-20211226231311158](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20211226231311158.png)

- `find`查找文件

  ```
  find -name '*.yml' # 查看 .yml结尾的文件所在位置
  ```

  ![image-20211226231517981](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20211226231517981.png)

- `nohup`后台执行任务

  ```
  nohup node app.js # 后台执行app.js

  ```

- `jobs`查看后台执行的任务

  ```
  jobs # 查看后台执行的任务
  ```

- `ps`查看后台进程

  ```
  ps -ef # 查看后台所有进程
  ```

  ![image-20211226232915764](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20211226232915764.png)

- `|grep` 筛选内容

  ```
  ps -ef|grep 'docker' # 只筛选出 docker 进程
  ```

  ![image-20211226232934363](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20211226232934363.png)

- `netstat`查看端口占用

  ```
  netstat -ntlp # 查看端口占用
  ```

  ![image-20211226233120885](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20211226233120885.png)

- `history`查看历史敲的命令

  ```
  history
  ```

  ![image-20211226233605944](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20211226233605944.png)

### 文件级别指令

- `cd`更改所在位置

  ```
  cd .. # 返回上一级
  cd demo # 进入demo目录
  cd demo/page # 进入demo目录下的page目录
  ```

- `mkdir` 创建目录

  ```
  mkdir demo # 在当前路径下创建一个dmeo文件夹
  ```

- `ls` 查看当前目录下文件

  ```
  ls # 查看当前目录下文件（不包含隐藏文件）
  ls -a # 查看当前目录下文件（包含隐藏文件）
  ```

  ![image-20211226224906205](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20211226224906205.png)

- `cat`查看文件内容

  ```
  cat start.sh # 查看 start.sh 内容
  ```

  ![image-20211226225118652](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20211226225118652.png)

- `tar`解压文件

  ```
  tar -axvf node-v16.13.1-linux-x64.tar.gz # 解压 .tar.gz 格式压缩包

  # 如果解压 .tar.xz 类型文件 需要先将 .tar.xz 转成 .tar
  xz -d node-v16.13.1-linux-x64.tar.xz # 得到 node-v16.13.1-linux-x64.tar 文件
  tar -xvf node-v16.13.1-linux-x64.tar # 解压 .tar文件
  ```

- `cp`复制文件

  ```
  cp ./node-v16.13.1-linux-x64/lib/node_modules/npm/node_modules/node-gyp/.github/workflows/tests.yml ./
  # 复制 tests.yml 到当前目录下
  # 这个指令就是 cp 目录1 目录2  把目录1指定文件复制到目录2中
  ```

  ![image-20211226231908240](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20211226231908240.png)

- `mv`改文件名

  ```
  mv tests.yml demo.yml # 把 demo.yml 更改名为 demo.yml
  ```

  ![image-20211226231957370](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20211226231957370.png)

- `vim` 使用编辑器

  ```
  vim app.js # 编辑 app.js 文件
  i     # 修改模式
  :wq   # 保存退出
  ```

- `rm -rf` 删除命令

  ```
  rm -rf demo # 删除demo这个文件夹
  rm -rf /* # 删库跑路
  ```

  兄弟们这个命令非常的危险，尤其是删库跑路的那个命令，如果是公司的服务器这样搞一下是要赔很多钱说不定会被告的，千万不要用！！！

### 其他

- centos8 开放端口

  ```
  # firewall-cmd --zone=public --add-port=端口/tcp --permanent
  
  #开放9999端口
  firewall-cmd --zone=public --add-port=9999/tcp --permanent
  #配置立即生效
  firewall-cmd --reload
  ```

  当我们开启一个后端服务的时候向外暴露端口，除了云服务器控制面板里面的端口要开启之外，Linux服务器自身的端口也需要向外开启暴露才行。

  因为版本升级到centos8之后，一些配置和7.X的不一样

- Nginx反向代理

	修改配置nginx的 **default.conf** 文件

  ```
  server {
      listen 80;
      server_name 1.116.xxx.xxx;
      location / {
          proxy_pass http://1.116.xxx.xxx:3000;
          proxy_redirect default;
      }
      location ~ /wx/ {
          proxy_pass http://1.116.xxx.xxx:9999;
          proxy_redirect default;
      }
  }
  ```
  
  这样做实现的是
  
  -  `http://1.116.xxx.xxx`,请求会发送到`http://1.116.xxx.xxx:3000`
  - `http://1.116.xxx.xxx/wx`/,请求会发送到`http://1.116.xxx.xxx:9999`

