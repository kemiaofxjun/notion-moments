FROM nginx:alpine

ENV TZ=Asia/Shanghai

# 删除默认的 nginx 欢迎页并设置时区
RUN rm -rf /usr/share/nginx/html/*  && \
    rm -rf /etc/nginx/conf.d/* && \
    cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

# 将本地的静态文件复制到 nginx 的默认网页目录
COPY ./out/ /usr/share/nginx/html/

# 拷贝自定义 nginx 配置
COPY ./nginx.conf /etc/nginx/nginx.conf

# 暴露 80 端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
