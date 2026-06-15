"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { carouselImages } from "@/app/constants/carouselImages";

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 5000); // Cambia de imagen cada 5 segundos

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-87.5 md:h-125 rounded-3xl overflow-hidden shadow-2xl shadow-green-900/10 dark:shadow-black/40 border border-green-100/20">
      {carouselImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={index === 0} // Prioridad de carga solo a la primera imagen
            sizes="(max-w-768px) 100vw, 50vw"
            className="object-cover"
          />
          {/* Un degradado sutil en los bordes para integrarlo mejor con el fondo */}
          <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
        </div>
      ))}

      {/* Indicadores de bolitas (dots) abajo en el centro */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`size-2.5 rounded-full transition-all ${
              index === currentIndex
                ? "bg-green-600 w-6"
                : "bg-white/60 hover:bg-white"
            }`}
            aria-label={`Ir a la imagen ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
