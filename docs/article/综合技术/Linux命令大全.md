---
head:
  - - meta
    - name: description
      content: Linux 常用命令

  - - meta
    - name: keywords
      content: Linux

  - - script
    - src: https://vitepress-source.oss-cn-beijing.aliyuncs.com/statistics.js
---

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

- `passwd`修改密码

  只需要输入 `passwd` 即可，输入一遍旧密码和两遍新密码即可。密码最好复杂。

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

**进程相关操作**

使用`ps`即可获取当前系统正在运行中的进程，知道了这个就理解了 docker 查看运行中的容器为什么是`docker ps`了，其返回结果包含有:

| 字段    | 含义                                                                                              |
| ------- | ------------------------------------------------------------------------------------------------- |
| PID     | 进程 ID                                                                                           |
| STAT    | 进程状态：S（正在休眠）、R（正在运行）                                                            |
| TIME    | 进程占 CPU 的总时长                                                                               |
| COMMAND | 命令名（如果使用`npm run dev`开启一个 node 服务，那个 ps 命令对应的 COMMAND 就会是`npm run dev`） |

命令选项也很多，类比于 docker：
| 命令 | 含义 |
| ---- | ---- |
| ps x | 显示当前用户运行的所有进程 |
| ps ax | 显示当前系统运行的所有进程（这个包含其他用户） |
| ps u | 显示更详细的进程信息 |
| ps w | 显示命令的全名，而不是只显示一行 |

终止进程：
| 命令 | 含义 |
| ---- | ---- |
| kill pid | 直接杀死这个进程 |
| kill -STOP pid | 让进程暂停，而不是杀死，（仍然会继续暂存在内容，等待重新被开启） |
| kill -CONT pid | 开启被暂停的暂存在内存中的进程 |

想要体验一下这些进程命令对于我们来说也很简单，我们只需要开启一个 node 服务即可，然后就可以体验一下通过进程命令来强制关闭掉我们的 node 服务。

有时候我们启动某个服务发现端口被占用了，如果在进程中能发现的话，逻辑上也是可以通过找进程的方式将其关闭，就可以释放端口号了。

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

- `rmdir `删除目录

  ```
  rmdir demo # 删除当前目录下的 demo 文件夹
  ```

  只有当这个文件夹下是空的时候，这个命令才能删除成功，否则是删除失败，如果想要删除有文件内容的文件夹（目录），则可以使用`rm -rf demo` 的形式来记性删除

- `ls` 查看当前目录下文件

  ```
  ls # 查看当前目录下文件（不包含隐藏文件）
  ls -a # 查看当前目录下文件（包含隐藏文件）
  ls -l # 显示详细的列表信息（这个更加多的内容）
  ```

  ![image-20211226224906205](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20211226224906205.png)

**查看文件信息**

- `cat`查看文件内容

  ```
  cat start.sh # 查看 start.sh 内容
  ```

  ![image-20211226225118652](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20211226225118652.png)

- `head`查看前 10 行内容

  `head /etc/passwd`

  ![image-20220514225602256](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220514225602256.png)

- `tail`查看后 10 行内容

  `tail /etc/passwd`

  如果想指定行数，可以使用-n 来设置，如：`tail -3 /etc/passed`

  ![image-20220514225855188](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220514225855188.png)

**对文件进行排序**

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

- `touch`创建文件

  ```
  touch index.html
  ```

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

- `*`通配符

  `*`这里类似于正则进行匹配，在 shell 里，`*`可以代表人和的字符或者数字，所以可以做出以下的一些操作：

  | 命令              | 含义                         |
  | ----------------- | ---------------------------- |
  | `cat at*`         | 查看所有以 at 开头的文件     |
  | `rm -rf *.css`    | 删除所有的 css 文件          |
  | `rm -rf *.temp.*` | 删除所有的包含 .temp. 的文件 |

- `?`通配符

  匹配一个字符，也是正则的概念，只是和 JS 中的正则不太一样，在 linux 中：

  b?at => 可以成功匹配 boat 或 brat

**查找文件**

- `find dir -name file` 查找文件

  查找 dir 目录下的 file 文件。例：

  ```
  find ./me -name index.html # 查找me目录下的所有的index.html文件
  ```

  ![image-20220514224819845](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220514224819845.png)

### 其他

- centos8 开放端口

  ```
  # firewall-cmd --zone=public --add-port=端口/tcp --permanent

  #开放9999端口
  firewall-cmd --zone=public --add-port=9999/tcp --permanent
  #配置立即生效
  firewall-cmd --reload
  ```

  当我们开启一个后端服务的时候向外暴露端口，除了云服务器控制面板里面的端口要开启之外，Linux 服务器自身的端口也需要向外开启暴露才行。

  因为版本升级到 centos8 之后，一些配置和 7.X 的不一样

- Nginx 反向代理

  修改配置 nginx 的 **default.conf** 文件

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

  - `http://1.116.xxx.xxx`,请求会发送到`http://1.116.xxx.xxx:3000`
  - `http://1.116.xxx.xxx/wx`/,请求会发送到`http://1.116.xxx.xxx:9999`

- ln配置软链接

  软链接配置相信对于很多前端程序员来说是一个噩梦般的存在，对于我来说是这样的，很痛苦，配置每次都要网上一直查最后才能解决！

  如我们在服务器全局安装了 `pnpm` ,但是直接输入 `pnpm` 是会报找不到命令的，这时候我们就需要配置一下软链接才能全局使用指令。

  ```
  ln -s /app/node-v16.13.1-linux-x64/bin/pnpm /usr/bin/pnpm
  ```

  这里最关键的地方就是 /app/node-v16.13.1-linux-x64/ 这个路径，这个路径是我们node安装的路径，所以设置软链接的时候一定要找对这个路径，网上很多指令不管用主要原因就是大家node安装的路径都不一样，因为我node装在 /app 目录下，所以就这个指令就行了。

  当我们安装错误，报软链接已存在时，我们可以选择删除这个软链接，执行：

  ```
  rm /usr/bin/pnpm
  ```

  或者直接覆盖之前的指令，也简单，将原有指令的 -s 改成 -sf

  ```
  ln -sf /app/node-v16.13.1-linux-x64/bin/pnpm /usr/bin/pnpm
  ```

  以上便是软链接的基本配置。
