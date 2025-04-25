# Helmets Detection Web

**Helmets Detection Web** es una aplicación web desarrollada en el marco de un proyecto de beca Tipo C de la Facultad de Ingeniería de la Universidad Nacional de Cuyo, en el contexto de la Licenciatura en Ciencias de la Computación. El proyecto se titula:

> Visualización de la información proveniente de la detección automática de infracciones de tránsito asociadas a la falta del casco obligatorio en motos y bicicleta.

Este sistema permite la detección automática de motociclistas sin casco en videos, aplicando visión por computadora con modelos de aprendizaje profundo.

El desarrollo se estructura en dos componentes principales:
- Un backend basado en FastAPI, encargado de ejecutar un modelo YOLOv8 para la detección.
- Un frontend implementado con Next.js, que permite la interacción del usuario con el sistema.

Ambos servicios están orquestados a través de Docker y Docker Compose.

## 👥 Integrantes del proyecto

- Francisco Devaux – **Líder de Proyecto**
  - Correo de contacto: frandevaux2013@gmail.com
    
- Luciano José Masuelli Redmond – **Integrante**
  - Correo de contacto: lucianomasuelli.lm@gmail.com
    
- Dra. Ana Carolina Olivera – **Asesora**
  - Investigadora Independiente CONICET
  - Profesora Titular Efectiva con dedicación Semiexclusiva de la Licenciatura en Ciencias de la Computación, Facultad de Ingeniería, UNCuyo
  - Correo de contacto: acolivera@conicet.gov.ar

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

