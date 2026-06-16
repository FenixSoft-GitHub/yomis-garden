"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import StarRating from "./StarRating";
import ReviewForm from "./ReviewForm";
import type { Review, ProductRating } from "@/lib/types";
import { MessageSquare, Star } from "lucide-react";

interface ReviewListProps {
  productId: string;
}

export default function ReviewList({ productId }: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<ProductRating | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      const supabase = createClient();

      const [
        { data: reviewsData },
        {
          data: { user },
        },
      ] = await Promise.all([
        supabase
          .from("reviews")
          .select("*, profiles(full_name)")
          .eq("product_id", productId)
          .eq("is_approved", true)
          .order("created_at", { ascending: false }),
        supabase.auth.getUser(),
      ]);

      if (cancelled) return;

      setReviews((reviewsData as Review[]) ?? []);
      setIsLoggedIn(!!user);

      if (reviewsData && reviewsData.length > 0) {
        const avg =
          reviewsData.reduce((sum, r) => sum + r.rating, 0) /
          reviewsData.length;
        setRating({
          average_rating: Math.round(avg * 10) / 10,
          total_reviews: reviewsData.length,
        });
      } else {
        setRating(null);
      }

      setLoading(false);
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [productId, refreshKey]);

  const handleReviewSuccess = () => {
    setShowForm(false);
    setRefreshKey((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="animate-pulse flex flex-col gap-4">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-24 bg-gray-100 dark:bg-gray-800 rounded-xl"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-5 h-5 text-green-600" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Reseñas de clientes
          </h2>
        </div>
        {isLoggedIn && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 font-medium"
          >
            + Escribir reseña
          </button>
        )}
        {!isLoggedIn && (
          <a
            href="/auth"
            className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 font-medium"
          >
            Inicia sesión para reseñar
          </a>
        )}
      </div>

      {/* Resumen de calificación */}
      {rating && (
        <div className="flex items-center gap-4 bg-amber-50 dark:bg-amber-950/20 rounded-2xl p-4 border border-amber-100 dark:border-amber-900/30">
          <div className="text-center">
            <p className="text-4xl font-bold text-amber-500">
              {rating.average_rating}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              de 5
            </p>
          </div>
          <div>
            <StarRating rating={rating.average_rating} size="md" />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {rating.total_reviews} reseña
              {rating.total_reviews !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      )}

      {/* Formulario */}
      {showForm && (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Tu reseña
            </h3>
            <button
              onClick={() => setShowForm(false)}
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              Cancelar
            </button>
          </div>
          <ReviewForm productId={productId} onSuccess={handleReviewSuccess} />
        </div>
      )}

      {/* Lista de reseñas */}
      {reviews.length === 0 ? (
        <div className="text-center py-10">
          <Star className="w-10 h-10 text-gray-200 dark:text-gray-700 mx-auto mb-3" />
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            Aún no hay reseñas para este producto.
          </p>
          {isLoggedIn && !showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 font-medium mt-2"
            >
              ¡Sé el primero en reseñar!
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {(review.profiles?.full_name ?? "U")[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {review.profiles?.full_name ?? "Cliente"}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {new Date(review.created_at).toLocaleDateString("es-VE", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <StarRating rating={review.rating} size="sm" />
              </div>

              {review.title && (
                <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                  {review.title}
                </p>
              )}
              {review.body && (
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {review.body}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}