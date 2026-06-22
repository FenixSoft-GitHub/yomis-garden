"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Resolver } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { quoteSchema, type QuoteFormData } from "@/lib/schemas/quote.schema";
import { createClient } from "@/lib/supabase/client";
import {
  projectTypes,
  budgetOptions,
  plantOptions,
} from "@/app/constants/quoteStatus";

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedPlants, setSelectedPlants] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema) as Resolver<QuoteFormData>,
  });

  const togglePlant = (plant: string) => {
    setSelectedPlants((prev) =>
      prev.includes(plant) ? prev.filter((p) => p !== plant) : [...prev, plant],
    );
  };

  const onSubmit = async (data: QuoteFormData) => {
    setLoading(true);
    const supabase = createClient();

    const { error } = await supabase.from("landscaping_quotes").insert({
      ...data,
      preferred_plants: selectedPlants,
      status: "nuevo",
    });

    if (error) {
      toast.error("Error al enviar la solicitud. Intenta de nuevo.");
    } else {
      setSubmitted(true);
      toast.success("¡Solicitud enviada! Te contactamos pronto 🌿");
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-10 text-center">
        <div className="size-16 bg-green-100 dark:bg-green-950/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="size-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          ¡Solicitud recibida!
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Nos pondremos en contacto contigo en menos de 24 horas para hablar
          sobre tu proyecto.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 flex flex-col gap-5"
    >
      {/* Datos personales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <Label className="text-gray-700 dark:text-gray-300">
            Nombre completo
          </Label>
          <Input
            {...register("full_name")}
            placeholder="Juan Pérez"
            className="mt-1"
          />
          {errors.full_name && (
            <p className="text-red-500 text-xs mt-1">
              {errors.full_name.message}
            </p>
          )}
        </div>
        <div>
          <Label className="text-gray-700 dark:text-gray-300">Email</Label>
          <Input
            {...register("email")}
            type="email"
            placeholder="juan@email.com"
            className="mt-1"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <Label className="text-gray-700 dark:text-gray-300">Teléfono</Label>
          <Input
            {...register("phone")}
            placeholder="0414-1234567"
            className="mt-1"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>
      </div>

      {/* Tipo de proyecto */}
      <div>
        <Label className="text-gray-700 dark:text-gray-300 mb-2 block">
          Tipo de proyecto
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {projectTypes.map(({ value, label }) => (
            <label key={value} className="cursor-pointer">
              <input
                type="radio"
                value={value}
                className="sr-only"
                {...register("project_type")}
              />
              <div className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-green-400 transition-colors has-checked:border-green-600 has-checked:bg-green-50 dark:has-checked:bg-green-950/30 has-checked:text-green-700 dark:has-checked:text-green-400">
                {label}
              </div>
            </label>
          ))}
        </div>
        {errors.project_type && (
          <p className="text-red-500 text-xs mt-1">
            {errors.project_type.message}
          </p>
        )}
      </div>

      {/* Área y presupuesto */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label className="text-gray-700 dark:text-gray-300">
            Área aproximada (m²)
          </Label>
          <Input
            {...register("area_m2")}
            placeholder="Ej: 50 m²"
            className="mt-1"
          />
        </div>
        <div>
          <Label className="text-gray-700 dark:text-gray-300">
            Presupuesto estimado
          </Label>
          <select
            {...register("budget")}
            className="mt-1 w-full border border-input bg-background px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="">Selecciona un rango</option>
            {budgetOptions.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Plantas preferidas */}
      <div>
        <Label className="text-gray-700 dark:text-gray-300 mb-2 block">
          Plantas de interés (opcional)
        </Label>
        <div className="flex flex-wrap gap-2">
          {plantOptions.map((plant) => (
            <button
              key={plant}
              type="button"
              onClick={() => togglePlant(plant)}
              className={`text-sm px-3 py-1.5 rounded-lg border transition-colors ${
                selectedPlants.includes(plant)
                  ? "bg-green-600 text-white border-green-600"
                  : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-green-400"
              }`}
            >
              {plant}
            </button>
          ))}
        </div>
      </div>

      {/* Descripción */}
      <div>
        <Label className="text-gray-700 dark:text-gray-300">
          Describe tu proyecto
        </Label>
        <textarea
          {...register("description")}
          rows={4}
          placeholder="Cuéntanos sobre el espacio, tus gustos, referencias que tengas..."
          className="mt-1 w-full border border-input bg-background px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-none dark:bg-gray-800 dark:border-gray-700"
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 text-white w-full"
        size="lg"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" /> Enviando...
          </>
        ) : (
          "Solicitar cotización gratuita"
        )}
      </Button>

      <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
        Sin compromiso · Te respondemos en menos de 24 horas
      </p>
    </form>
  );
}
