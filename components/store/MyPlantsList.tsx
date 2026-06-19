"use client";

import { useState, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Plus,
  Droplets,
  Bell,
  BellOff,
  Trash2,
  Leaf,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import type { UserPlant } from "@/lib/types";
import Image from "next/image";

const riegoLabel: Record<string, string> = {
  diario: "💧 Diario",
  cada_2_dias: "💧 Cada 2 días",
  semanal: "💧 Semanal",
  quincenal: "💧 Quincenal",
  mensual: "💧 Mensual",
};

interface MyPlantsListProps {
  initialPlants: UserPlant[];
  availableProducts: { id: string; name: string }[];
}

export default function MyPlantsList({
  initialPlants,
  availableProducts,
}: MyPlantsListProps) {
  const [plants, setPlants] = useState(initialPlants);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nickname: "",
    product_id: "",
    water_frequency: "semanal",
  });

  const addPlant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nickname) return;

    setLoading(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("user_plants")
      .insert({
        user_id: user.id,
        product_id: form.product_id || null,
        nickname: form.nickname,
        water_frequency: form.water_frequency,
      })
      .select("*, product:products(name, images)")
      .single();

    if (error) {
      toast.error("Error al agregar la planta");
    } else {
      setPlants((prev) =>
        [...prev, data as UserPlant].sort(
          (a, b) =>
            new Date(a.next_watering).getTime() -
            new Date(b.next_watering).getTime(),
        ),
      );
      toast.success(`${form.nickname} agregada a tu colección 🌿`);
      setForm({ nickname: "", product_id: "", water_frequency: "semanal" });
      setShowForm(false);
    }
    setLoading(false);
  };

  const markWatered = async (plantId: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("user_plants")
      .update({ last_watered: new Date().toISOString() })
      .eq("id", plantId)
      .select("*, product:products(name, images)")
      .single();

    if (!error && data) {
      setPlants((prev) =>
        prev
          .map((p) => (p.id === plantId ? (data as UserPlant) : p))
          .sort(
            (a, b) =>
              new Date(a.next_watering).getTime() -
              new Date(b.next_watering).getTime(),
          ),
      );
      toast.success("¡Riego registrado! 💧");
    }
  };

  const toggleReminders = async (plantId: string, current: boolean) => {
    const supabase = createClient();
    await supabase
      .from("user_plants")
      .update({ reminders_enabled: !current })
      .eq("id", plantId);

    setPlants((prev) =>
      prev.map((p) =>
        p.id === plantId ? { ...p, reminders_enabled: !current } : p,
      ),
    );
    toast.success(
      current ? "Recordatorios desactivados" : "Recordatorios activados",
    );
  };

  const deletePlant = async (plantId: string) => {
    const supabase = createClient();
    await supabase.from("user_plants").delete().eq("id", plantId);
    setPlants((prev) => prev.filter((p) => p.id !== plantId));
    toast.success("Planta eliminada de tu colección");
  };

  const [now] = useState(() => Date.now());

  const getDaysUntil = (date: string) => {
    const diff = new Date(date).getTime() - now;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };
  
  return (
    <div className="flex flex-col gap-6">
      {/* Botón agregar */}
      {!showForm && (
        <Button
          onClick={() => setShowForm(true)}
          className="bg-green-600 hover:bg-green-700 text-white gap-2 self-start"
        >
          <Plus className="w-4 h-4" />
          Agregar planta
        </Button>
      )}

      {/* Formulario */}
      {showForm && (
        <form
          onSubmit={addPlant}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 flex flex-col gap-4"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Nueva planta en tu colección
          </h3>
          <div>
            <Label className="text-gray-700 dark:text-gray-300">
              Nombre de tu planta
            </Label>
            <Input
              value={form.nickname}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, nickname: e.target.value }))
              }
              placeholder="Mi pothos de la sala"
              className="mt-1"
              required
            />
          </div>
          <div>
            <Label className="text-gray-700 dark:text-gray-300">
              ¿Qué planta es? (opcional)
            </Label>
            <select
              value={form.product_id}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, product_id: e.target.value }))
              }
              className="mt-1 w-full border border-input bg-background px-3 py-2 text-sm rounded-md dark:bg-gray-800 dark:border-gray-700"
            >
              <option value="">Selecciona una planta del catálogo</option>
              {availableProducts.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label className="text-gray-700 dark:text-gray-300">
              Frecuencia de riego
            </Label>
            <select
              value={form.water_frequency}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  water_frequency: e.target.value,
                }))
              }
              className="mt-1 w-full border border-input bg-background px-3 py-2 text-sm rounded-md dark:bg-gray-800 dark:border-gray-700"
            >
              {Object.entries(riegoLabel).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Agregar
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowForm(false)}
              className="text-gray-400"
            >
              Cancelar
            </Button>
          </div>
        </form>
      )}

      {/* Lista de plantas */}
      {plants.length === 0 ? (
        <div className="text-center py-16">
          <Leaf className="w-12 h-12 text-gray-200 dark:text-gray-700 mx-auto mb-4" />
          <p className="text-gray-400 dark:text-gray-500">
            Aún no tienes plantas en tu colección
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {plants.map((plant) => {
            const daysUntil = getDaysUntil(plant.next_watering);
            const isOverdue = daysUntil < 0;
            const isToday = daysUntil === 0;

            return (
              <div
                key={plant.id}
                className={`bg-white dark:bg-gray-900 rounded-2xl border p-5 ${
                  isOverdue
                    ? "border-red-200 dark:border-red-900"
                    : isToday
                      ? "border-amber-200 dark:border-amber-900"
                      : "border-gray-100 dark:border-gray-800"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 bg-green-50 dark:bg-green-950/30 rounded-xl overflow-hidden flex items-center justify-center shrink-0">
                      {plant.product?.images?.[0] ? (
                        <Image
                          src={plant.product.images[0]}
                          alt={plant.product.name || "Miniatura de la planta"} 
                          fill
                          sizes="40px" 
                          className="object-cover"
                        />
                      ) : (
                        <Leaf className="w-5 h-5 text-green-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">
                        {plant.nickname}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        {plant.product?.name ?? "Planta personalizada"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => deletePlant(plant.id)}
                    className="text-gray-300 dark:text-gray-600 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <Calendar className="w-3 h-3" />
                  {isOverdue ? (
                    <span className="text-red-500 font-medium">
                      Riego atrasado {Math.abs(daysUntil)} días
                    </span>
                  ) : isToday ? (
                    <span className="text-amber-500 font-medium">
                      ¡Riégala hoy!
                    </span>
                  ) : (
                    <span>Próximo riego en {daysUntil} días</span>
                  )}
                  <span>· {riegoLabel[plant.water_frequency]}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => markWatered(plant.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white gap-1.5 text-xs flex-1"
                  >
                    <Droplets className="w-3 h-3" />
                    Ya la regué
                  </Button>
                  <button
                    onClick={() =>
                      toggleReminders(plant.id, plant.reminders_enabled)
                    }
                    className={`p-2 rounded-lg transition-colors ${
                      plant.reminders_enabled
                        ? "bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400"
                        : "bg-gray-50 dark:bg-gray-800 text-gray-400"
                    }`}
                    title={
                      plant.reminders_enabled
                        ? "Recordatorios activos"
                        : "Recordatorios desactivados"
                    }
                  >
                    {plant.reminders_enabled ? (
                      <Bell className="w-4 h-4" />
                    ) : (
                      <BellOff className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
