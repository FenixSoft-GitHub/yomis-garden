import Image from "next/image";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  // Buscamos si el componente que lo invoca ya le está pasando tamaños personalizados
  const hasSize = className.includes("w-") || className.includes("h-");

  // Si no le pasaron tamaño externo, le asignamos w-16 h-16 (64px) por defecto
  const sizeClasses = hasSize ? className : `w-16 h-16 ${className}`;

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full animate-pulse ${sizeClasses}`.trim()}
    >
      <Image
        src="/LogoYomisGarden.webp"
        alt="Yomi's Garden"
        fill
        sizes="(max-w-768px) 64px, 128px"
        className="object-cover"
        priority // Mantiene la precarga del logo activa
      />
    </div>
  );
}

// import Image from "next/image";

// interface LogoProps {
//   width?: number;
//   height?: number;
//   className?: string;
// }

// export default function Logo({
//   width = 64,
//   height = 64,
//   className = "",
// }: LogoProps) {
//   const hasWidthClass = className.includes("w-");
//   const hasHeightClass = className.includes("h-");

//   let autoRatioClass = "";
//   if (hasWidthClass && !hasHeightClass) autoRatioClass = "h-auto";
//   if (hasHeightClass && !hasWidthClass) autoRatioClass = "w-auto";

//   return (
//     <Image
//       src="/LogoYomisGarden.webp"
//       alt="Yomi's Garden"
//       width={width}
//       height={height}
//       // Fijar ambos en "auto" en el objeto inline silencia la advertencia del navegador
//       style={{ width: "auto", height: "auto" }}
//       className={`${autoRatioClass} ${className} rounded-full animate-pulse`.trim()}
//     />
//   );
// }
