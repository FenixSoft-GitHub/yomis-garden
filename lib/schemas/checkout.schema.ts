import { z } from "zod";

export const checkoutSchema = z.object({
  // Datos personales
  full_name: z.string().min(3, "Nombre completo requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(7, "Teléfono requerido"),

  // Dirección de envío
  address_line1: z.string().min(5, "Dirección requerida"),
  address_line2: z.string().optional(),
  city: z.string().min(2, "Ciudad requerida"),
  state: z.string().min(2, "Estado requerido"),

  // Pago
  payment_method: z.enum(["stripe", "zelle", "pago_movil", "efectivo"]),
  payment_reference: z.string().optional(),

  // Notas
  notes: z.string().optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
