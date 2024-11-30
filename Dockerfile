# Usa una imagen de Node.js como base
FROM node:16

# Configura el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos necesarios
COPY package*.json ./
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto donde el backend escucha
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
