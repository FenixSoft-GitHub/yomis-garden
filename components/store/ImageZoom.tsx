"use client";

import { useState, useRef } from "react";
import { Leaf, ZoomIn } from "lucide-react";
import Image from "next/image"; 

interface ImageZoomProps {
  images: string[];
  productName: string;
}

export default function ImageZoom({ images, productName }: ImageZoomProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
  };

  const currentImageUrl = images[activeImage];

  return (
    <div className="flex flex-col gap-4">
      {/* Imagen principal con zoom */}
      <div
        ref={containerRef}
        className="relative aspect-square bg-linear-to-br from-green-50 dark:from-green-950 to-emerald-100 dark:to-emerald-900 rounded-2xl overflow-hidden cursor-zoom-in select-none"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={handleMouseMove}
      >
        {currentImageUrl ? (
          <>
            {/* ✨ Refactorizado a <Image /> con 'fill' por el contenedor aspect-square */}
            <Image
              src={currentImageUrl}
              alt={`Imagen principal de ${productName}`}
              fill
              priority // Le da prioridad de carga (LCP) a la imagen principal del producto
              sizes="(max-w-768px) 100vw, 50vw" // Optimiza la resolución según el dispositivo
              className={`object-cover transition-transform duration-200 ${
                zoom ? "scale-150" : "scale-100"
              }`}
              style={
                zoom
                  ? { transformOrigin: `${position.x}% ${position.y}%` }
                  : undefined
              }
              draggable={false}
            />
            {!zoom && (
              <div className="absolute bottom-3 right-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg p-1.5 text-gray-500 dark:text-gray-400 z-10">
                <ZoomIn className="w-4 h-4" />
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Leaf className="size-32 text-green-300" />
          </div>
        )}
      </div>

      {/* Miniaturas */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                activeImage === i
                  ? "border-green-600 shadow-md shadow-green-200 dark:shadow-green-900"
                  : "border-transparent opacity-70 hover:opacity-100 hover:border-green-300"
              }`}
            >
              {/* ✨ Refactorizado a <Image /> con width y height fijos (w-20 = 80px) */}
              <Image
                src={img}
                alt={`Miniatura ${i + 1} de ${productName}`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}