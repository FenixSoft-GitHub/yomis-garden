"use client";

import { useEffect } from "react";
import { Heart } from "lucide-react";
import { useFavoritesStore } from "@/lib/stores/favorites.store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  productId: string;
  className?: string;
  size?: "sm" | "md";
}

export default function FavoriteButton({
  productId,
  className,
  size = "md",
}: FavoriteButtonProps) {
  const { init, toggle, isFavorite, initialized } = useFavoritesStore();
  const favorite = isFavorite(productId);

  useEffect(() => {
    init();
  }, [init]);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await toggle(productId);
    toast.success(
      favorite ? "Eliminado de favoritos" : "¡Agregado a favoritos! 🌿",
    );
  };

  return (
    <button
      onClick={handleClick}
      aria-label={favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
      className={cn(
        "rounded-full transition-all duration-200 flex items-center justify-center cursor-pointer",
        size === "sm" ? "size-8" : "size-10",
        favorite
          ? "bg-red-50 dark:bg-red-950/30 text-yellow-500 hover:bg-red-100 dark:hover:bg-yellow-950/50"
          : "bg-emerald-200/70 dark:bg-gray-800/80 text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-950/30",
        className,
      )}
    >
      <Heart
        className={cn(
          "transition-all duration-200",
          size === "sm" ? "size-4" : "size-5",
          favorite ? "fill-yellow-500 stroke-yellow-500" : "stroke-current",
        )}
      />
    </button>
  );
}
