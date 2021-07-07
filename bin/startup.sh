#!/bin/bash

echo "开始构建docker镜像》》》》》》》》start"
cd ..
docker-compose build
echo "构建docker镜像结束》》》》》》》》end"

echo "后台启动容器》》》》》》》"
docker-compose up -d
