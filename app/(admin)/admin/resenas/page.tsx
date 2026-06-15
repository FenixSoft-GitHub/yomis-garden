import { createAdminClient } from "@/lib/supabase/admin";
import ReviewsAdmin from "@/components/admin/ReviewsAdmin";

export default async function ResenasPage() {
  const supabase = createAdminClient();

  const { data: reviews } = await supabase
    .from("reviews")
    .select("*, profiles(full_name), products(name)")
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Reseñas</h1>
        <p className="text-gray-400 text-sm mt-1">
          Modera las reseñas de los clientes
        </p>
      </div>
      <ReviewsAdmin reviews={reviews ?? []} />
    </div>
  );
}
