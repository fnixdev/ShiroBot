#!/usr/bin/bash

apt-get update
apt-get upgrade
apt-get install -y nodejs npm libwebp ffmpeg wget git

npm install

echo "[*] Todas dependências foram instaladas, por favor inicie o bit usando: \"npm start\""