#!/bin/bash
echo "Deteniendo y eliminando contenedores existentes..."
cd /home/ubuntu/app
docker-compose down || echo "No se encontraron contenedores en ejecución."
