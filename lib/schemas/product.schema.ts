import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Nombre requerido"),
  slug: z.string().min(2, "Slug requerido"),
  description: z.string().optional(),
  category_id: z.string().min(1, "Categoría requerida"),
  base_price: z.number({ error: "Precio requerido" }).min(0, "Precio inválido"),
  compare_price: z.number().min(0).optional().nullable(),
  stock_quantity: z.number({ error: "Stock requerido" }).min(0),
  low_stock_threshold: z.number({ error: "Requerido" }).min(0),
  weight_kg: z.number().min(0).optional().nullable(),
  is_perishable: z.boolean().default(false),
  is_featured: z.boolean().default(false),
  light_requirement: z.string().optional(),
  water_frequency: z.string().optional(),
  is_pet_friendly: z.boolean().default(false),
  is_indoor: z.boolean().default(false),
  is_outdoor: z.boolean().default(false),
  care_difficulty: z.string().optional(),
  mature_height_cm: z.number().min(0).optional().nullable(),
});

export type ProductFormData = z.infer<typeof productSchema>;
