# 🫨 Helmets Detection Web

**Helmets Detection Web** es una aplicación web desarrollada para la detección automática de motociclistas sin casco en videos, utilizando visión por computadora mediante modelos de aprendizaje profundo. El sistema está compuesto por un backend basado en FastAPI que ejecuta un modelo YOLOv8, y un frontend desarrollado en Next.js. Ambos componentes están orquestados a través de Docker y Docker Compose.

## 📁 Estructura del proyecto

```
Helmets-Web/
│
├── helmet-detection-backend/   # Backend: FastAPI + YOLOv8
├── helmets-ui/                 # Frontend: Next.js
├── docker-compose.yml          # Orquestación de servicios
└── README.md                   # Documentación del proyecto
```

## ⚙️ Requisitos previos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## 🚀 Ejecución del proyecto

1. Clonar este repositorio:

```bash
git clone https://github.com/tu-usuario/Helmets-Web.git
cd Helmets-Web
```

2. Construir y levantar los contenedores:

```bash
docker-compose up --build
```

3. Acceder a la aplicación desde el navegador:

- Frontend: `http://localhost:3000`
- Backend (API): `http://localhost:8000`

## 🌐 Configuración de variables de entorno

Para asegurar la correcta comunicación entre el frontend y el backend, se utilizan variables de entorno:

En el archivo `docker-compose.yml`:

```yaml
environment:
  - NEXT_PUBLIC_API_URL=http://helmet-back:8000
```

Si se desea ejecutar el frontend en modo local, es posible configurar la variable `NEXT_PUBLIC_API_URL` dentro del archivo `.env.local` ubicado en la carpeta `helmets-ui/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```


## 🛠 Tecnologías utilizadas

- **Frontend**: [Next.js](https://nextjs.org/) 15 con soporte para Turbopack.
- **Backend**: [FastAPI](https://fastapi.tiangolo.com/), framework de alto rendimiento para APIs.
- **Modelo de detección**: [YOLOv8](https://docs.ultralytics.com/), implementado vía Ultralytics.
- **Contenedores**: [Docker](https://www.docker.com/), [Docker Compose](https://docs.docker.com/compose/)

