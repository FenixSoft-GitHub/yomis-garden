"use client";

import Image from "next/image";

interface ServiceItem {
  label: string;
  image: string;
  desc: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    label: "Residencial",
    image: "/images/paisajismo/residencial.webp",
    desc: "Jardines y terrazas a la medida para el confort de tu hogar.",
  },
  {
    label: "Comercial",
    image: "/images/paisajismo/comercial.webp",
    desc: "Diseños vibrantes para locales comerciales, restaurantes y vitrinas.",
  },
  {
    label: "Corporativo",
    image: "/images/paisajismo/corporativo.webp",
    desc: "Áreas verdes e interiores de oficinas que inspiran productividad.",
  },
  {
    label: "Eventos",
    image: "/images/paisajismo/eventos.webp",
    desc: "Montajes e instalaciones botánicas efímeras de alto impacto.",
  },
];

interface LandscapeBentoGridProps {
  className?: string;
}

export default function LandscapeBentoGrid({
  className = "",
}: LandscapeBentoGridProps) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 gap-4 w-full ${className}`}
    >
      {SERVICES_DATA.map(({ label, image, desc }) => (
        <div
          key={label}
          className="group relative rounded-3xl overflow-hidden border border-white/5 bg-neutral-900 shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:border-emerald-500/30 h-64 sm:h-auto min-h-110px]"
        >
          {/* Imagen real optimizada con Next.js */}
          <Image
            src={image}
            alt={`Proyecto de paisajismo ${label}`}
            fill
            sizes="(max-w-768px) 100vw, (max-w-1024px) 50vw, 30vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:brightness-90"
          />

          {/* Capa de gradiente oscuro inferior para mejorar legibilidad de textos */}
          <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-300 group-hover:from-black/90" />

          {/* Textos inferiores (Minimalistas y limpios) */}
          <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col justify-end transform transition-transform duration-300">
            <p className="text-xs font-semibold uppercase text-emerald-400 tracking-wider mb-1">
              Espacio
            </p>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {label}
            </h3>
            <p className="text-gray-300 text-xs mt-1.5 opacity-0 max-h-0 overflow-hidden transition-all duration-350 group-hover:opacity-100 group-hover:max-h-16">
              {desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
