import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import MyPlantsList from "@/components/store/MyPlantsList";

export const metadata: Metadata = {
  title: "Mis plantas — Yomi's Garden",
  description:
    "Gestiona tu colección de plantas y recibe recordatorios de riego.",
};

export default async function MisPlantasPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth");

  const { data: plants } = await supabase
    .from("user_plants")
    .select("*, product:products(name, images)")
    .eq("user_id", user.id)
    .order("next_watering", { ascending: true });

  const { data: products } = await supabase
    .from("products")
    .select("id, name")
    .eq("is_perishable", true)
    .eq("is_active", true)
    .order("name");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          🌿 Mis plantas
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Gestiona tu colección y recibe recordatorios de riego por email
        </p>
      </div>
      <MyPlantsList
        initialPlants={plants ?? []}
        availableProducts={products ?? []}
      />
    </div>
  );
}
