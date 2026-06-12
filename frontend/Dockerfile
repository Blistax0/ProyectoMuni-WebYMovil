# 1. Etapa de Construcción (Build)
FROM node:20-alpine AS builder

# Crear directorio de trabajo:
WORKDIR /app

# Copiar archivos de dependencias:
COPY package*.json ./

# Instalar dependencias:
RUN npm install

# Copiar el resto del código:
COPY . .

# Compilar TypeScript:
RUN npm run build


# 2. Etapa de Producción (Run)
FROM node:20-alpine

WORKDIR /app

# Copiar solo lo necesario desde la etapa builder:
COPY package*.json ./

# Instalar solo dependencias de producción:
RUN npm install -g serve

COPY --from=builder /app/dist ./dist

# Exponer el puerto:
EXPOSE 80

# Comando para iniciar la app:
CMD ["serve", "-s", "dist", "-l", "80"]