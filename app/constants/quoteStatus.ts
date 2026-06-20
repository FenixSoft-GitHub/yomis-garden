import type { QuoteStatus } from "@/lib/types";

export const statusConfig: Record<QuoteStatus, { label: string; color: string }> = {
  nuevo: {
    label: "Nuevo",
    color: "bg-blue-900 text-blue-400 border-blue-800",
  },
  contactado: {
    label: "Contactado",
    color: "bg-yellow-900 text-yellow-400 border-yellow-800",
  },
  en_proceso: {
    label: "En proceso",
    color: "bg-purple-900 text-purple-400 border-purple-800",
  },
  cotizado: {
    label: "Cotizado",
    color: "bg-indigo-900 text-indigo-400 border-indigo-800",
  },
  cerrado: {
    label: "Cerrado",
    color: "bg-green-900 text-green-400 border-green-800",
  },
  cancelado: {
    label: "Cancelado",
    color: "bg-red-900 text-red-400 border-red-800",
  },
};

export const projectTypeLabel: Record<string, string> = {
  residencial: "🏡 Residencial",
  comercial: "🏢 Comercial",
  corporativo: "🌳 Corporativo",
  evento: "🎉 Evento", 
};

export const projectTypes = [
  { value: "residencial", label: projectTypeLabel.residencial },
  { value: "comercial", label: projectTypeLabel.comercial },
  { value: "corporativo", label: projectTypeLabel.corporativo },
  { value: "evento", label: projectTypeLabel.evento },
];

export const budgetOptions = [
  "Menos de $500",
  "$500 - $1,000",
  "$1,000 - $3,000",
  "$3,000 - $5,000",
  "Más de $5,000",
  "Por definir",
];

export const plantOptions = [
  "Plantas tropicales",
  "Cactus y suculentas",
  "Árboles frutales",
  "Plantas de sombra",
  "Plantas con flores",
  "Follaje decorativo",
  "Sin preferencia",
];
