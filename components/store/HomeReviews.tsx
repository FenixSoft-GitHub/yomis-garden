import StarRating from "./StarRating";
import type { Review } from "@/lib/types";

interface HomeReviewsProps {
  reviews: (Review & { products?: { name: string } })[];
}

export default function HomeReviews({ reviews }: HomeReviewsProps) {
  if (reviews.length === 0) return null;

  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Experiencias reales de personas que aman sus plantas
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-300 dark:border-gray-800 p-6 flex flex-col gap-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <StarRating rating={review.rating} size="sm" />
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {new Date(review.created_at).toLocaleDateString("es-VE", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              {review.title && (
                <p className="font-semibold text-gray-900 dark:text-white text-sm">
                  {review.title}
                </p>
              )}
              {review.body && (
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed flex-1">
                  {review.body}
                </p>
              )}
              <div className="flex items-center gap-3 pt-2 border-t border-gray-50 dark:border-gray-800">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {(review.profiles?.full_name ?? "C")[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {review.profiles?.full_name ?? "Cliente"}
                  </p>
                  {review.products?.name && (
                    <p className="text-xs text-green-600 dark:text-green-400">
                      Compró: {review.products.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
