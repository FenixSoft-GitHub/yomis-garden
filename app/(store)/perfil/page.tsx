import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import LoyaltyCard from "@/components/store/LoyaltyCard";
import { User } from "lucide-react";

export default async function PerfilPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Mi perfil
        </h1>
      </div>

      <div className="flex flex-col gap-6">
        {/* Info del usuario */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-300 dark:border-gray-800 p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {(profile?.full_name ?? user.email ?? "U")[0].toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white text-lg">
                {profile?.full_name ?? "Sin nombre"}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Tarjeta de puntos */}
        <div>
          <h2 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <User className="size-4 text-green-600" />
            Programa de fidelización
          </h2>
          <LoyaltyCard />
        </div>
      </div>
    </div>
  );
}
