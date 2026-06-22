import Image from "next/image";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  const hasSize = className.includes("w-") || className.includes("h-");
  const sizeClasses = hasSize ? className : `size-16 ${className}`;

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
        priority 
      />
    </div>
  );
}
