"use client";

import { useState } from "react";
import { toast } from "sonner";
import StarRating from "@/components/store/StarRating";
import { CheckCircle, XCircle, Trash2 } from "lucide-react";

interface ReviewRow {
  id: string;
  rating: number;
  title: string | null;
  body: string | null;
  is_approved: boolean;
  created_at: string;
  profiles?: { full_name: string | null };
  products?: { name: string | null };
}

export default function ReviewsAdmin({
  reviews: initial,
}: {
  reviews: ReviewRow[];
}) {
  const [reviews, setReviews] = useState(initial);
  const [loading, setLoading] = useState<string | null>(null);

  const updateReview = async (id: string, is_approved: boolean) => {
    setLoading(id);
    const res = await fetch("/api/admin/reviews", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, is_approved }),
    });

    if (res.ok) {
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, is_approved } : r)),
      );
      toast.success(is_approved ? "Reseña aprobada" : "Reseña rechazada");
    } else {
      toast.error("Error al actualizar");
    }
    setLoading(null);
  };

  const deleteReview = async (id: string) => {
    setLoading(id);
    const res = await fetch("/api/admin/reviews", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setReviews((prev) => prev.filter((r) => r.id !== id));
      toast.success("Reseña eliminada");
    } else {
      toast.error("Error al eliminar");
    }
    setLoading(null);
  };

  if (reviews.length === 0) {
    return (
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-12 text-center">
        <p className="text-gray-400">No hay reseñas aún</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {reviews.map((review) => (
        <div
          key={review.id}
          className={`bg-gray-900 rounded-2xl border p-5 transition-colors ${
            review.is_approved ? "border-green-900" : "border-gray-800"
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              {/* Producto y cliente */}
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-green-400 text-sm font-medium">
                  {review.products?.name ?? "Producto"}
                </span>
                <span className="text-gray-600 text-xs">•</span>
                <span className="text-gray-400 text-sm">
                  {review.profiles?.full_name ?? "Cliente anónimo"}
                </span>
                <span className="text-gray-600 text-xs">•</span>
                <span className="text-gray-500 text-xs">
                  {new Date(review.created_at).toLocaleDateString("es-VE", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ml-auto ${
                    review.is_approved
                      ? "bg-green-900 text-green-400"
                      : "bg-yellow-900 text-yellow-400"
                  }`}
                >
                  {review.is_approved ? "Aprobada" : "Pendiente"}
                </span>
              </div>

              {/* Estrellas */}
              <StarRating rating={review.rating} size="sm" />

              {/* Contenido */}
              {review.title && (
                <p className="text-white font-medium text-sm mt-2">
                  {review.title}
                </p>
              )}
              {review.body && (
                <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                  {review.body}
                </p>
              )}
            </div>

            {/* Acciones */}
            <div className="flex items-center gap-2 shrink-0">
              {!review.is_approved && (
                <button
                  onClick={() => updateReview(review.id, true)}
                  disabled={loading === review.id}
                  className="text-green-400 hover:text-green-300 transition-colors p-1"
                  title="Aprobar"
                >
                  <CheckCircle className="w-5 h-5" />
                </button>
              )}
              {review.is_approved && (
                <button
                  onClick={() => updateReview(review.id, false)}
                  disabled={loading === review.id}
                  className="text-yellow-400 hover:text-yellow-300 transition-colors p-1"
                  title="Rechazar"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={() => deleteReview(review.id)}
                disabled={loading === review.id}
                className="text-gray-600 hover:text-red-400 transition-colors p-1"
                title="Eliminar"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
