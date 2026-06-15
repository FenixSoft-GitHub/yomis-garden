"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export default function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  interactive = false,
  onChange,
}: StarRatingProps) {
  const sizeClass = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-6 h-6",
  }[size];

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: maxRating }).map((_, i) => {
        const filled = i < Math.floor(rating);
        const partial = !filled && i < rating;

        return (
          <button
            key={i}
            type={interactive ? "button" : undefined}
            onClick={() => interactive && onChange?.(i + 1)}
            disabled={!interactive}
            className={cn(
              "transition-transform",
              interactive && "hover:scale-110 cursor-pointer",
              !interactive && "cursor-default",
            )}
          >
            <Star
              className={cn(
                sizeClass,
                "transition-colors",
                filled
                  ? "fill-amber-400 stroke-amber-400"
                  : partial
                    ? "fill-amber-200 stroke-amber-400"
                    : "fill-transparent stroke-gray-300 dark:stroke-gray-600",
                interactive &&
                  !filled &&
                  "hover:fill-amber-200 hover:stroke-amber-400",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
