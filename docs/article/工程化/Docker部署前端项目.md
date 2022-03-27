# 使用 Docker 部署前端项目

## 环境的部署

docker 相当于是一个容器，docker 是运行在服务器上的，有它在可以让我们在这个 docker 的大环境下安装一些小环境，电脑相当于我们的手机，docker 相当于我们的微信，nginx 等等镜像就相当于是微信里面的一个个小程序。

<!-- more -->

### 学习 dokcer 之前需要明白的一些知识

- 基础的 Linux 命令  
  `mv oldname newname` 修改文件名  
  `ls` 查看当前的目录下的文件  
  `cd 文件名` 进入指定文件夹 `cd ..`返回上一级  
  `mkdir 文件名` 创建文件夹  
  `rm -rf 文件名` 删除指定文件  
  `cat 文件名` 查看文件内容  
  `touch 文件名` 创建指定文件  
  `vi 文件名` 进入文件内部 可以再输入 i 进入修改模式，修改完成后输入按下 Esc 键+:wq 保存并退出

## 需要前期的准备

- 一台属于自己的服务器（推荐阿里云上购买）
- window 环境下安装一个 xshell 软件（用于连接服务器）

### 服务器的购买

> 服务器可以就在阿里云上购买一个即可，注意如果有条件就直接买一个就豪，如果是学生还可以买一个学生机(我买的就是-9.5 元一个月)

购买了之后可以在控制台的地方设置了一下多开放几个服务器的端口，阿里云的服务器默认只开启了三个端口，分别是

1. 端口 80：HTTP 默认端口
2. 端口 443：HTTPS 默认端口
3. 端口 22： SSH 端口

![像这样多开放几个端口即可](https://img-blog.csdnimg.cn/20200811232112592.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70)

### 环境安装

> 我们需要安装 docker 环境,nginx 环境，node 环境

- 进入 Xshell 软件，先根据阿里云上的服务器信息输入到软件上，连接上服务器。

- docker 环境

  1. 安装 docker

     ```
      $ sudo yum install docker-ce docker-ce-cli containerd.io
      // 如果提示您接受 GPG 密钥，请选是
     ```

  2. 检测是否安装成功 docker

     ```
       // sudo systemctl start 是运行系统程序 如运行mysql sudo systemctl start mysql
       $ sudo systemctl start docker
       // 通过运行 hello-world 映像来验证是否正确安装了 Docker Engine-Community 。
       $ sudo docker run hello-world

     ```

  3. 将 docker 设置为开机自启动

     ```
     /*
     	sudo systemctl enable/disable 服务名
     		这个是个 linux 命令 后面的服务名可以是系统的服务 如 mysql nginx 等等
     */
     sudo systemctl enable docker  // 设置自启动
     sudo systemctl disable docker  // 关闭自启动

     /*
     	sudo systemctl list-unit-files 查看系统服务信息
     	sudo systemctl list-unit-files | grep docker  查看docker的服务信息
     	sudo systemctl list-unit-files | grep enable  查看系统自启动的服务有哪些
     		| 管道符是用于过滤的，可以参考vue的过滤器的语法
     */

     sudo systemctl list-unit-files | grep docker
     ```

  CentOS8 安装 Docker 出现 package docker-ce-3:19.03.8-3.el7.x86_64 requires containerd.io >= 1.2.2-3（没有报错这一步就不需要执行）

  ```
    centos8默认使用podman代替docker，所以需要containerd.io，那我们就安装一下就好了
    yum install https://download.docker.com/linux/fedora/30/x86_64/stable/Packages/containerd.io-1.2.6-3.3.fc30.x86_64.rpm
  ```

  3. docker 常用指令集合
     - `docker images`查看已有的镜像
     - `docker rmi -f 镜像名 `删除指定镜像，如`docker rmi -f mysql`删除 mysql 镜像
     - `docker run 镜像名`相当于是启动一个镜像
     - `docker ps`查询所有在运行的容器，`docker ps -a`所有的容器（不管在不在运行）
     - `docker stop 容器名`关闭某个执行的容器
     - `docker restart 容器名/id名`重新开启某个容器
     - `docker rm $(docker ps -a -q)`一次性删除所有无用的容器

- 基于 docker 安装 nginx 镜像

  > docker 相当于我们生活中使用的我微信，nginx 镜像相当于是一个小程序，我们可以直接在 docker 上安装 nginx 镜像来实现 nginx 的功能

  - 使用`docker search nginx` 查询 nginx 镜像
  - 使用`docker pull nginx` 下载镜像
  - 使用`docker images` 查看是否有拉取的镜像

  ![nginx镜像](https://img-blog.csdnimg.cn/20200814212426275.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

  - 开启容器

  ```
    docker run -d -p 8080:80 --name 容器名 nginx 开启一个容器
    /*
      -d 表示后台运行 就算关闭了这个窗口，服务器后台任然在运行
      -p 端口映射 冒号前是本机端口(自己设置)，冒号后是容器端口(默认是80)
    */
  ```

  - 浏览器检查是否成功安装，输入服务器公网地址+自己设置的端口(这里的端口必须是已经开放的端口，就是之前阿里云控制台设置的)，如果浏览器出现以下的显示，恭喜，nginx 启动成功

  ![nginx默认页面](https://img-blog.csdnimg.cn/20200811131211344.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70)

  - 使用`docker ps`查看已经开启的容器，`docker ps -a`查看所有的容器

  ![查看容器](https://img-blog.csdnimg.cn/20200814213300616.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

  - 使用`docker stop 容器名/id` 停止掉指定的容器

- 创建本机实例文件夹

  > 这个步骤很重要，相当于是处理 nginx 文件映射的功能，类似于 Vue 的 v-model 层，我们映射了 nginx 层的文件夹，我们需要修改 nginx 里面的数据的时候，就可以不同每次都进入 nginx，修改数据，再退出，直接通过修改映射层的数据，会自动的同步到 nginx 里面，非常的方便。

  - /home 文件夹下新建 mutou 文件夹，木头文件夹下新建 nginx 文件夹，nginx 文件夹下新建 conf.d 文件夹，html 文件夹，大致结构如下：

    ![映射文件解构](https://img-blog.csdnimg.cn/20200811172447883.png)

  - 在我们创建的 conf.d 文件夹下新建 default.conf 文件，做出如下的一些配置:

    ![映射conf.d配置文件](https://img-blog.csdnimg.cn/20200811172400164.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70)

  - 在 html 文件夹下编写我们刚刚修改之后的指定的 html 文件，如我将原有的 index-test.html 修改成了 index-test.html，所以我就要在 html 文件夹下创建一个 index-test.html 文件

    ![文件](https://img-blog.csdnimg.cn/2020081117270767.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70)

  - 启动我们的 nginx 容器，同时映射地址:代码为：

    ```
    docker run -d -p 80:80 -v /home/mutou/nginx/conf.d:/etc/nginx/conf.d  -v /home/mutou/nginx/html:/usr/share/nginx/html nginx
    ```

    ![信息](https://img-blog.csdnimg.cn/20200811173209475.png)

  - 在上述的步骤完成之后，我们输入 ip:80，就可以得到我们刚刚写的 html 代码的页面了

    ![修改配置后的浏览器显示效果](https://img-blog.csdnimg.cn/20200811173342941.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70)

- 在服务器上安装 git

  - 使用`yum install -y git`在服务器上安装，之后使用`git --version`查看版本，如果有就代表安装成了

    ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200812145927643.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

  - 安装好了之后做一些 git 的简单配置
    1. git config --global user.name "Your Name"
    2. git config --global user.email "email@example.com"
    3. ssh-keygen -t rsa -C "youremail@example.com" 生成公钥和私钥，之后一路回车

- 在服务器上安装 node,npm 环境

  > 这一步的操作主要是为了能够实现自动部署，就相当于将整个项目都放在服务器上，在服务器上执行`npm run build`,有好处也有不好的地方，好处就是十分的方便，可以自动部署，可以配置自动配合 git 拉去 github 的代码，拉取到之后自动重新打包，打包之后自动将 dist 文件夹替换并且自动重启 nginx。就是会消耗服务器的资源，占用比较大的空间。

  - `wget https://nodejs.org/dist/v9.3.0/node-v9.3.0-linux-x64.tar.xz`为服务器安装 node

  - `tar -xvf node-v9.3.0-linux-x64.tar.xz`解压安装包

  - 部署 bin 文件，`ln -s ~/node-v9.3.0-linux-x64/bin/node /usr/bin/node`,`ln -s ~/node-v9.3.0-linux-x64/bin/npm /usr/bin/npm`(这步骤的路径很重要，路径不对就翻车) bin 文件配置好了之后可以分别执行 node -v 和 npm-v 如果有给出版本号说明安装成功了 node

  - 如果我们一旦不小心路径写错想再重新映射路径的时候就会报`File exists`,这时候我们只需要将正确的看一下路径，并将原来的设置路径的指令的`-s`改成`-sf`就可以完后才能覆盖

  - 之后就和在电脑里面的操作一样了，npm instll npm run build

  - 安装其他的开发工具，如 cnpm、pm2、nodemon 等等也是一样就可以使用 npm 来装了，装完之后也是一样要配置好 bin 文件，路径也是不能错，只有配置成功之后这些指令我们才能够全局的使用。

## 将项目挂在挂在在服务器上(项目部署)

> 到这步就很简单了，离成功就一步之遥了，只需要将项目打包之后的文件夹丢到 nginx 上就可以了。  
>  因为我们服务器安装了 git，所以对于前端来说，我们只需要将前端 vue 项目执行了打包命令之后的 dist 文件夹给传到服务器上，再在服务器上开一个端口来专门处理这个 dist 文件夹就可以了 -- 这里拿 Vue 项目来演示

    ![打包后的dist文件夹](https://img-blog.csdnimg.cn/20200812163429191.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

- 之后执行指令`docker run -d -p 8080:80 -v $PWD/dist:/usr/share/nginx/html nginx`这里注意`$PWD`表示的是当前所在目录，所以执行这一行代码的时候，我们就必须得在项目的目录中了。

- 执行`docker ps`如果有我们刚刚那个项目，则部署成功，访问 ip：端口号,就可以线上访问我们的项目了

  ![项目创建成功](https://img-blog.csdnimg.cn/20200814214922208.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

## 项目部署优化(半自动部署)

> 到这里项目部署流程基本已经明白了，服务器在 github 上拉去代码，打包，之后开放端口放打包后的文件夹。如果一天文件修改 10 次，那么这个动作就非常的麻烦，所以我们可以配置半自动部署

- 在项目中添加一个服务器的.sh 脚本文件，并放入以下代码

  ```
   # 拉去代码
   git pull
   # 安装依赖并打包项目
   cnpm install && cnpm run build
   # 关闭容器和端口
   docker rm -f myblog &> /dev/null
   # 重启容器和端口
   docker run -d --restart=on-failure:5\
    -p 80:80 \
    -v $PWD/public:/usr/share/nginx/html \
    --name myblog nginx
  ```

- 在加入代码之后，我们前端只需要更新将代码传到 github 上，服务端要做的就减少到进入项目目录，使用 `sh 脚本名` 执行这个脚本就行了，节省了相当复杂的一些操作

## 总结

只要一步一步的执行应该是不会翻车的，如果翻车了可以在主页加我 QQ 一起讨论一下。项目部署中当然不止只有这么点东西，比如反向代理，负载均衡这篇文章都没有涉及到，我也还在学习中。等学明白了也会更新的。
