#!/bin/bash
echo "Construyendo imágenes de Docker y levantando contenedores..."
cd /home/ubuntu/app
docker-compose up --build -d
