"use client";

import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Check } from "lucide-react";
import { toast } from "sonner";
import {
  profileSchema,
  type ProfileFormData,
} from "@/lib/schemas/profile.schema";
import type { Profile } from "@/lib/types";
import { estadosVenezuela } from "@/app/constants/estadosVenezuela";

interface ProfileFormProps {
  profile: Profile;
}

export default function ProfileForm({ profile }: ProfileFormProps) {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema) as Resolver<ProfileFormData>,
    defaultValues: {
      full_name: profile.full_name ?? "",
      phone: profile.phone ?? "",
      address: (profile as Profile & { address?: string }).address ?? "",
      city: (profile as Profile & { city?: string }).city ?? "",
      state: (profile as Profile & { state?: string }).state ?? "",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setLoading(true);
    const supabase = createClient();

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: data.full_name,
        phone: data.phone || null,
        address: data.address || null,
        city: data.city || null,
        state: data.state || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", profile.id);

    if (error) {
      toast.error("Error al actualizar el perfil");
    } else {
      toast.success("Perfil actualizado correctamente 🌿");
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
        <div className="sm:col-span-2">
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
        <div className="sm:col-span-2">
          <Label className="text-gray-700 dark:text-gray-300">Dirección</Label>
          <Input
            {...register("address")}
            placeholder="Av. Principal, Casa #5"
            className="mt-1"
          />
        </div>
        <div>
          <Label className="text-gray-700 dark:text-gray-300">Ciudad</Label>
          <Input {...register("city")} placeholder="Caracas" className="mt-1" />
        </div>
        <div>
          <Label className="text-gray-700 dark:text-gray-300">Estado</Label>
          <select
            {...register("state")}
            className="mt-1 w-full border border-input bg-background px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="">Selecciona un estado</option>
            {estadosVenezuela.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading || !isDirty}
        className="bg-green-600 hover:bg-green-700 text-white gap-2 self-start"
      >
        {loading ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Guardando...
          </>
        ) : saved ? (
          <>
            <Check className="size-4" /> ¡Guardado!
          </>
        ) : (
          "Guardar cambios"
        )}
      </Button>
    </form>
  );
}
