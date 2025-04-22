"use client";

import { useBackendConfig } from "../hooks/useBackendConfig";
import { FaMotorcycle } from "react-icons/fa";

import VideoProcessor from "@/components/VideoProcessor";
import { MdOutlineSportsMotorsports } from "react-icons/md";

export default function Home() {
  return (
    <main className="h-[100dvh] p-0 flex flex-col items-center justify-center">
      <div className="text-center mb-10">
        <div className="flex justify-center mb-4">
          <MdOutlineSportsMotorsports size={60} />
        </div>
        <h1 className="text-3xl font-bold ">
          Detección de cascos de motocicleta
        </h1>
        <p className="mt-3 text-xl text-neutral-500 ">
          Cargar un video para detectar y analizar el uso de cascos de
          motocicleta
        </p>
      </div>
      <VideoProcessor />
    </main>
  );
}
