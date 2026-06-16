"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Star, Award, TrendingUp } from "lucide-react";
import type { LoyaltyPoints, LoyaltyTransaction } from "@/lib/types";
import { tierConfig } from "@/app/constants/tierConfig";

export default function LoyaltyCard() {
  const [loyalty, setLoyalty] = useState<LoyaltyPoints | null>(null);
  const [transactions, setTransactions] = useState<LoyaltyTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user || cancelled) return;

      const [{ data: loyaltyData }, { data: txData }] = await Promise.all([
        supabase
          .from("loyalty_points")
          .select("*")
          .eq("user_id", user.id)
          .single(),
        supabase
          .from("loyalty_transactions")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(5),
      ]);

      if (cancelled) return;
      setLoyalty(loyaltyData as LoyaltyPoints);
      setTransactions((txData as LoyaltyTransaction[]) ?? []);
      setLoading(false);
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse h-48 bg-gray-100 dark:bg-gray-800 rounded-2xl" />
    );
  }

  if (!loyalty) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-300 dark:border-gray-700 p-6 text-center">
        <Star className="size-8 text-gray-300 mx-auto mb-2" />
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Aún no tienes puntos. ¡Realiza tu primera compra para comenzar!
        </p>
      </div>
    );
  }

  const tier = tierConfig[loyalty.tier];
  const progress = tier.next
    ? Math.min((loyalty.total_earned / tier.next) * 100, 100)
    : 100;

  return (
    <div className={`rounded-2xl border p-6 ${tier.bg} ${tier.border}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Award className={`size-5 ${tier.color}`} />
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Mis puntos
          </h3>
        </div>
        <span
          className={`text-sm font-medium px-3 py-1 rounded-full bg-white/60 dark:bg-white/10 ${tier.color}`}
        >
          {tier.emoji} Nivel {tier.label}
        </span>
      </div>

      {/* Puntos */}
      <div className="mb-4">
        <p className={`text-4xl font-bold ${tier.color}`}>
          {loyalty.points.toLocaleString()}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          puntos disponibles · {loyalty.total_earned.toLocaleString()} ganados
          en total
        </p>
      </div>

      {/* Progreso al siguiente tier */}
      {tier.next && (
        <div className="mb-5">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1.5">
            <span>Progreso a {tier.nextTier}</span>
            <span>
              {loyalty.total_earned}/{tier.next} pts
            </span>
          </div>
          <div className="h-2 bg-white/50 dark:bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {tier.next === null && (
        <div className="mb-5 text-center">
          <p className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">
            🎉 ¡Estás en el nivel máximo! Disfrutas 2x puntos en cada compra.
          </p>
        </div>
      )}

      {/* Beneficios del tier */}
      <div className="bg-white/50 dark:bg-white/5 rounded-xl p-3 mb-4 text-xs text-gray-600 dark:text-gray-400">
        <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">
          Beneficios de tu nivel:
        </p>
        {loyalty.tier === "bronze" && <p>• 1 punto por cada $1 gastado</p>}
        {loyalty.tier === "silver" && (
          <p>• 1.5x puntos por cada $1 gastado • Envío prioritario</p>
        )}
        {loyalty.tier === "gold" && (
          <p>
            • 2x puntos por cada $1 gastado • Envío prioritario • Descuentos
            exclusivos
          </p>
        )}
      </div>

      {/* Últimas transacciones */}
      {transactions.length > 0 && (
        <div>
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-1">
            <TrendingUp className="size-3" />
            Últimos movimientos
          </p>
          <div className="flex flex-col gap-1.5">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between text-xs"
              >
                <span className="text-gray-500 dark:text-gray-400 truncate">
                  {tx.description}
                </span>
                <span
                  className={`font-medium shrink-0 ml-2 ${
                    tx.type === "redeemed"
                      ? "text-red-500"
                      : "text-green-600 dark:text-green-400"
                  }`}
                >
                  {tx.type === "redeemed" ? "-" : "+"}
                  {tx.points} pts
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
