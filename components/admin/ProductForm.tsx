"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageUploader from "@/components/admin/ImageUploader";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  productSchema,
  type ProductFormData,
} from "@/lib/schemas/product.schema";
import type { ProductFormProps } from "@/lib/types/admin";
import { BOTANICAL_OPTIONS } from "@/app/constants/botanicalFilters";

export default function ProductForm({
  categories,
  initialData,
}: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isEditing = !!initialData?.id;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema) as Resolver<ProductFormData>,
    defaultValues: {
      name: initialData?.name ?? "",
      slug: initialData?.slug ?? "",
      description: initialData?.description ?? "",
      category_id: initialData?.category_id ?? "",
      base_price: initialData?.base_price ?? 0,
      compare_price: initialData?.compare_price ?? undefined,
      stock_quantity: initialData?.stock_quantity ?? 0,
      low_stock_threshold: initialData?.low_stock_threshold ?? 5,
      weight_kg: initialData?.weight_kg ?? undefined,
      is_perishable: initialData?.is_perishable ?? false,
      is_featured: initialData?.is_featured ?? false,
      is_pet_friendly: initialData?.is_pet_friendly ?? false,
      is_indoor: initialData?.is_indoor ?? false,
      is_outdoor: initialData?.is_outdoor ?? false,
      light_requirement: initialData?.light_requirement ?? "",
      water_frequency: initialData?.water_frequency ?? "",
      care_difficulty: initialData?.care_difficulty ?? "",
    },
  });

  const [images, setImages] = useState<string[]>(initialData?.images ?? []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const slug = e.target.value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim();
    setValue("slug", slug);
  };

  const onSubmit = async (data: ProductFormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products/create", {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, images, id: initialData?.id }),
      });

      if (res.ok) {
        toast.success(isEditing ? "Producto actualizado" : "Producto creado");
        router.push("/admin/productos");
        router.refresh();
      } else {
        const err = (await res.json()) as { error?: string };
        toast.error(err.error ?? "Error al guardar");
      }
    } catch {
      toast.error("Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  const isPerishable = useWatch({
    control,
    name: "is_perishable",
  });

  const booleanFields: { field: keyof ProductFormData; label: string }[] = [
    { field: "is_perishable", label: "🌱 Es planta viva" },
    { field: "is_featured", label: "⭐ Destacado" },
  ];

  const botanicalBooleans: { field: keyof ProductFormData; label: string }[] = [
    { field: "is_pet_friendly", label: "🐾 Apto para mascotas" },
    { field: "is_indoor", label: "🏠 Interior" },
    { field: "is_outdoor", label: "🌳 Exterior" },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (errors) => {
        console.log("Errores de validación:", errors);
      })}
      className="flex flex-col gap-6"
    >
      {/* Datos básicos */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
        <h2 className="font-semibold text-white mb-5">Datos básicos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Label className="text-gray-300">Nombre</Label>
            <Input
              {...register("name", { onChange: handleNameChange })}
              placeholder="Ej: Pothos Dorado"
              className="mt-1 bg-gray-800 border-gray-700 text-white"
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label className="text-gray-300">Slug (URL)</Label>
            <Input
              {...register("slug")}
              placeholder="pothos-dorado"
              className="mt-1 bg-gray-800 border-gray-700 text-white font-mono text-sm"
            />
            {errors.slug && (
              <p className="text-red-400 text-xs mt-1">{errors.slug.message}</p>
            )}
          </div>
          <div>
            <Label className="text-gray-300">Categoría</Label>
            <select
              {...register("category_id")}
              className="mt-1 w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Selecciona categoría</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.category_id && (
              <p className="text-red-400 text-xs mt-1">
                {errors.category_id.message}
              </p>
            )}
          </div>
          <div className="sm:col-span-2">
            <Label className="text-gray-300">Descripción</Label>
            <textarea
              {...register("description")}
              rows={3}
              placeholder="Descripción del producto..."
              className="mt-1 w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
          </div>
        </div>
      </div>

      {/* Imágenes */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
        <h2 className="font-semibold text-white mb-5">Imágenes del producto</h2>
        <ImageUploader images={images} onChange={setImages} maxImages={5} />
      </div>

      {/* Precios e inventario */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
        <h2 className="font-semibold text-white mb-5">Precios e inventario</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <Label className="text-gray-300">Precio (USD)</Label>
            <Input
              type="number"
              step="0.01"
              min="0"
              {...register("base_price", { valueAsNumber: true })}
              className="mt-1 bg-gray-800 border-gray-700 text-white"
            />
            {errors.base_price && (
              <p className="text-red-400 text-xs mt-1">
                {errors.base_price.message}
              </p>
            )}
          </div>
          <div>
            <Label className="text-gray-300">Precio tachado</Label>
            <Input
              type="number"
              step="0.01"
              min="0"
              placeholder="Opcional"
              className="mt-1 bg-gray-800 border-gray-700 text-white"
              {...register("compare_price", {
                setValueAs: (v) =>
                  v === "" || v === null ? undefined : parseFloat(v),
              })}
            />
          </div>
          <div>
            <Label className="text-gray-300">Stock inicial</Label>
            <Input
              type="number"
              min="0"
              {...register("stock_quantity", { valueAsNumber: true })}
              className="mt-1 bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div>
            <Label className="text-gray-300">Alerta bajo stock</Label>
            <Input
              type="number"
              min="0"
              {...register("low_stock_threshold", { valueAsNumber: true })}
              className="mt-1 bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div>
            <Label className="text-gray-300">Peso (kg)</Label>
            <Input
              type="number"
              step="0.1"
              min="0"
              className="mt-1 bg-gray-800 border-gray-700 text-white"
              {...register("weight_kg", {
                setValueAs: (v) =>
                  v === "" || v === null ? undefined : parseFloat(v),
              })}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mt-4">
          {booleanFields.map(({ field, label }) => (
            <label
              key={field}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                {...register(field)}
                className="w-4 h-4 accent-green-500"
              />
              <span className="text-gray-300 text-sm">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Atributos botánicos */}
      {isPerishable && (
        <div className="bg-gray-900 rounded-2xl border border-green-900 p-6">
          <h2 className="font-semibold text-white mb-5">
            🌿 Atributos botánicos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Label className="text-gray-300">Luz requerida</Label>
              <select
                {...register("light_requirement")}
                className="mt-1 w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Seleccionar luz...</option>
                {BOTANICAL_OPTIONS.luz.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label className="text-gray-300">Frecuencia de riego</Label>
              <select
                {...register("water_frequency")}
                className="mt-1 w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Seleccionar riego...</option>
                {BOTANICAL_OPTIONS.riego.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label className="text-gray-300">Dificultad</Label>
              <select
                {...register("care_difficulty")}
                className="mt-1 w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Seleccionar Dificultad...</option>
                {BOTANICAL_OPTIONS.dificultad.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            {botanicalBooleans.map(({ field, label }) => (
              <label
                key={field}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  {...register(field)}
                  className="size-4 accent-green-500"
                />
                <span className="text-gray-300 text-sm">{label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Botones */}
      <div className="flex items-center gap-3">
        <Button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Guardando...
            </>
          ) : isEditing ? (
            "Actualizar producto"
          ) : (
            "Crear producto"
          )}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.back()}
          className="text-gray-400 bg-gray-900 hover:bg-gray-950 hover:text-white"
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
