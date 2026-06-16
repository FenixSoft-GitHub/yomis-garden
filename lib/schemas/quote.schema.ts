import { z } from "zod";

export const quoteSchema = z.object({
  full_name: z.string().min(3, "Nombre requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(7, "Teléfono requerido"),
  project_type: z.enum(["residencial", "comercial", "corporativo", "evento"]),
  area_m2: z.string().optional(),
  budget: z.string().optional(),
  description: z.string().min(10, "Describe brevemente tu proyecto"),
  preferred_plants: z.array(z.string()).optional(),
});

export type QuoteFormData = z.infer<typeof quoteSchema>;
