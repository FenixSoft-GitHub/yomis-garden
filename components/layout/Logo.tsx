import Image from "next/image";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function Logo({
  width = 64,
  height = 64,
  className = "",
}: LogoProps) {
  const hasWidthClass = className.includes("w-");
  const hasHeightClass = className.includes("h-");

  let autoRatioClass = "";
  if (hasWidthClass && !hasHeightClass) autoRatioClass = "h-auto";
  if (hasHeightClass && !hasWidthClass) autoRatioClass = "w-auto";

  return (
    <Image
      src="/LogoYomisGarden.png"
      alt="Yomi's Garden"
      width={width}
      height={height}
      className={`${autoRatioClass} ${className} rounded-full animate-pulse`.trim()}
    />
  );
}
