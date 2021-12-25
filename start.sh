# 删除容器
docker rm -f vitepressBlog &> /dev/null

# 重启容器
docker run -d --restart=on-failure:5\
    -p 999:80 \
    -v $PWD/dist:/usr/share/nginx/html \
    --name vitepressBlog nginx
