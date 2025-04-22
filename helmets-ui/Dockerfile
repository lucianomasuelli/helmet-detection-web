# Development Stage
FROM node:18.18 AS development

WORKDIR /app

# Instalar dependencias de desarrollo
COPY package*.json ./
RUN npm ci

# Copiar el resto del código
COPY . .

# Exponer el puerto de desarrollo
EXPOSE 3000

# Comando para desarrollo
CMD ["npm", "run", "dev"]

# Builder Stage
FROM node:18.18 AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Production Stage
FROM node:18.18 AS production

WORKDIR /app

ENV BACKEND_URL=$BACKEND_URL

# Copiar los artefactos construidos
COPY --from=builder /app/.next ./.next
#COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Exponer el puerto de producción
EXPOSE 3000

# Comando correcto para iniciar Next.js en producción
CMD ["node", "node_modules/.bin/next", "start"]