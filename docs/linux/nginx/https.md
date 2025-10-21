# Https 相关配置

## API 反向代理

```conf
server {
    listen 80;
    server_name api.jimmyxuexue.top;

    # 强制HTTP跳转到HTTPS
    return 301 https://$server_name$request_uri;

}

server {
    listen 443 ssl;
    server_name api.jimmyxuexue.top;

    # SSL证书配置
    ssl_certificate /www/server/nginx/cert/api/api.jimmyxuexue.top_bundle.crt;
    ssl_certificate_key /www/server/nginx/cert/api/api.jimmyxuexue.top.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass http://localhost:9999;
    }

    # 访问日志和错误日志设置
    access_log /www/server/nginx/logs/api/api.jimmyxuexue.top.access.log;
    error_log /www/server/nginx/logs/api/api.jimmyxuexue.top.error.log;
}

```

## HTTPS web 网页

```conf
server {
    listen 80;
    server_name blog.jimmyxuexue.top;

    # 强制HTTP跳转到HTTPS
    return 301 https://$server_name$request_uri;

}

server {
    listen 443 ssl;
    server_name blog.jimmyxuexue.top;

    # SSL证书配置
    ssl_certificate /www/server/nginx/cert/blog/blog.jimmyxuexue.top_bundle.crt;
    ssl_certificate_key /www/server/nginx/cert/blog/blog.jimmyxuexue.top.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_prefer_server_ciphers on;

    location / {
        index index.html index.htm default.htm default.html;
        root /www/server/nginx/html/blog/dist;
    }

    # 访问日志和错误日志设置
    access_log /www/server/nginx/logs/blog/blog.jimmyxuexue.top.access.log;
    error_log /www/server/nginx/logs/blog/blog.jimmyxuexue.top.error.log;
}

```
