import { z } from "zod";

export const profileSchema = z.object({
  full_name: z.string().min(3, "Nombre requerido"),
  phone: z.string().min(7, "Teléfono requerido").optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
  city: z.string().optional().or(z.literal("")),
  state: z.string().optional().or(z.literal("")),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
