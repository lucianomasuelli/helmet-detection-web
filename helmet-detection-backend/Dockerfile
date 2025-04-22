# Usa una imagen base con Python
FROM python:3.9-slim

# Instalar dependencias del sistema necesarias para OpenCV y FFmpeg
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    ffmpeg \
    libsm6 \
    libxext6 \
    libxrender-dev \
    libgomp1 \
    libavcodec-extra \
    libavformat-dev \
    libavutil-dev \
    libswscale-dev \
    && rm -rf /var/lib/apt/lists/*

# Define el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos necesarios
COPY requirements.txt .

# Instala las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copia el código del backend
COPY . .

# Expone el puerto en el que correrá el backend
EXPOSE 8000

# Comando para correr el servidor
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]