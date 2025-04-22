"use client";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Alert } from "@heroui/alert";
import { useEffect, useState } from "react";
import { Spinner } from "@heroui/spinner";
import { MdOutlineClose } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
export default function VideoUpload() {
  const [video, setVideo] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [processedVideo, setProcessedVideo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [backendUrl, setBackendUrl] = useState<string | null>(null);
  const [number, setNumber] = useState<number | null>(null);

  useEffect(() => {
    const fetchBackendUrl = async () => {
      const response = await fetch("/api/config");
      const data = await response.json();
      setBackendUrl(data.backendUrl);
    };
    fetchBackendUrl();
  }, []);

  const handleGetNumber = async () => {
    const response = await fetch("/api/number");
    const data = await response.json();
    setNumber(data.number);
  };

  useEffect(() => {
    handleGetNumber();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Limpiar error previo si existe
      setError(null);

      // Revocar la URL anterior para liberar memoria
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      // Crear nueva URL antes de actualizar estados
      const newPreviewUrl = URL.createObjectURL(file);

      // Actualizar todos los estados de una vez
      setVideoUrl(null);
      setVideo(file);
      setFileName(file.name);
      setPreviewUrl(newPreviewUrl);
      setProcessedVideo(null);

      // Resetear el input de archivo
      e.target.value = "";
    }
  };

  const handleUpload = async () => {
    setIsLoading(true);
    setError(null);

    if (!video) {
      setError("Por favor, selecciona un video.");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", video);

    try {
      const response = await fetch(`${backendUrl}/upload/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error en la subida del archivo");
      }

      const data = await response.json();
      setIsLoading(false);
      console.log("Respuesta del servidor:", data);

      if (data.video_url) {
        setProcessedVideo(`${backendUrl}${data.video_url}`);
      } else {
        setError("No se recibió una URL de video válida.");
      }
    } catch (error) {
      console.log(error);
      setError(
        error instanceof Error ? error.message : "Error al procesar el video"
      );
      setIsLoading(false);
    }
  };

  const handleYoutubeUpload = async () => {
    setIsLoading(true);
    setError(null);

    if (!videoUrl) {
      setError("Por favor, ingrese una URL de video de Youtube.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/process-youtube/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: videoUrl }),
      });

      if (!response.ok) {
        throw new Error("Error al subir el video de Youtube");
      }

      const data = await response.json();
      setIsLoading(false);
      console.log("Respuesta del servidor:", data);

      if (data.video_url) {
        setProcessedVideo(`${backendUrl}${data.video_url}`);
      } else {
        setError("No se recibió una URL de video válida.");
      }
    } catch (error) {
      console.log(error);
      setError(
        error instanceof Error ? error.message : "Error al procesar el video"
      );
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setProcessedVideo(null);
    setVideo(null);
    setFileName("");
    setPreviewUrl(null);
    setError(null);
  };

  return (
    <div className="flex flex-col items-center gap-4 [&_nextjs-portal]:hidden">
      <p>{number}</p>
      <p>{backendUrl}</p>
      <div className="flex w-[80dvw] gap-2">
        <Input
          className="border-none bg-transparent "
          endContent={
            fileName && !isLoading && !processedVideo ? (
              <Button isIconOnly variant="light" onPress={handleReset}>
                <MdOutlineClose className="w-5 h-5" />
              </Button>
            ) : null
          }
          isReadOnly={fileName ? true : false}
          placeholder="Ingrese el link del video de Youtube o seleccione un video local"
          value={fileName ? fileName : videoUrl ? videoUrl : ""}
          onChange={(e) => setVideoUrl(e.target.value)}
        />

        <Button
          isIconOnly
          color="primary"
          isDisabled={isLoading}
          variant="light"
          onPress={() => document.getElementById("file-upload")?.click()}
        >
          <FiUpload className="w-5 h-5" />
        </Button>

        <Button
          isDisabled={(!video && !videoUrl) || isLoading}
          onPress={
            processedVideo
              ? handleReset
              : videoUrl
                ? handleYoutubeUpload
                : handleUpload
          }
        >
          {isLoading
            ? "Procesando..."
            : processedVideo
              ? "Enviar otro video"
              : "Procesar"}
        </Button>
      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="flex items-center justify-center w-full">
          <Alert color="danger">{error}</Alert>
        </div>
      )}

      {isLoading && (
        <div className="flex items-center justify-center h-[40dvh]">
          <Spinner />
        </div>
      )}

      {/* Previsualización del video seleccionado */}
      {previewUrl && !processedVideo && !isLoading && (
        <video controls width="600" key={previewUrl}>
          <source src={previewUrl} type="video/mp4" />
          <track kind="captions" label="Spanish captions" src={undefined} />
          Tu navegador no soporta la reproducción de este video.
        </video>
      )}

      {/* Video procesado */}
      {processedVideo && (
        <video controls width="600">
          <source src={processedVideo} type="video/mp4" />
          <track kind="captions" label="Spanish captions" src={undefined} />
          Tu navegador no soporta la reproducción de este video.
        </video>
      )}

      {/* Botón para seleccionar archivo */}
      <input
        accept="video/*"
        className="hidden"
        id="file-upload"
        type="file"
        onChange={handleFileChange}
      />
    </div>
  );
}
