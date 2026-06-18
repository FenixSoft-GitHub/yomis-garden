"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { sponsors } from "@/app/constants/sponsors";

export default function SponsorsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animationFrame: number;
    let lastTimestamp = performance.now();
    const speed = 40;

    const animate = (now: number) => {
      if (!isPaused) {
        const elapsed = now - lastTimestamp;
        lastTimestamp = now;

        track.scrollLeft += (speed * elapsed) / 1000;

        const halfScrollWidth = track.scrollWidth / 2;
        if (track.scrollLeft >= halfScrollWidth) {
          track.scrollLeft -= halfScrollWidth;
        }
      } else {
        lastTimestamp = now;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isPaused]);

  if (!sponsors || sponsors.length === 0) return null;

  return (
    <section className="w-full bg-linear-to-b from-gray-300 to-white dark:from-gray-950/20 dark:to-gray-700 py-6 border-b border-gray-300 dark:border-gray-900/40">
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <h3 className="text-center text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
          Nuestras Marcas Aliadas y Productos
        </h3>
      </div>

      {/* Contenedor con máscara de desvanecimiento v4 */}
      <div className="relative w-full mask-[linear-gradient(to_right,transparent_0%,white_15%,white_85%,transparent_100%)]">
        <div
          ref={trackRef}
          className="overflow-x-scroll scrollbar-none flex gap-16 md:gap-20 whitespace-nowrap px-10 group"
          style={{ scrollBehavior: "auto" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          role="list"
        >
          {[...sponsors, ...sponsors].map((sponsor, i) => (
            <div
              key={`${sponsor.name}-${i}`}
              className="relative w-48 h-20 shrink-0 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 hover:scale-105 cursor-pointer rounded-full"
              role="listitem"
            >
              <Image
                src={sponsor.logoUrl}
                alt={`Logo de ${sponsor.name}`}
                fill
                sizes="192px"
                className="object-contain"
                priority={i < sponsors.length}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
