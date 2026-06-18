// @/app/constants/botanicalFilters.ts

// 1. Diccionarios de traducción (Mapeos estáticos de clave -> Label)
export const LUZ_LABELS: Record<string, string> = {
  sol_directo: "☀️ Sol directo",
  sol_parcial: "⛅ Sol parcial",
  sombra: "🌥️ Sombra",
  interior: "🏠 Interior",
};

export const RIEGO_LABELS: Record<string, string> = {
  diario: "💧 Diario",
  cada_2_dias: "💧 Cada 2 días", 
  semanal: "💧 Semanal",
  quincenal: "💧 Quincenal",
  mensual: "💧 Mensual",
};

export const DIFICULTAD_LABELS: Record<string, string> = {
  facil: "🟢 Fácil",
  moderado: "🟡 Moderado",
  experto: "🔴 Experto",
};

// 2. Estructuras de opciones para Componentes Interactivos (FilterDrawer, ProductForm, etc.)
export const BOTANICAL_OPTIONS = {
  luz: [
    { value: "sol_directo", label: LUZ_LABELS.sol_directo },
    { value: "sol_parcial", label: LUZ_LABELS.sol_parcial },
    { value: "sombra", label: LUZ_LABELS.sombra },
    { value: "interior", label: LUZ_LABELS.interior },
  ],
  riego: [
    { value: "diario", label: RIEGO_LABELS.diario },
    { value: "cada_2_dias", label: RIEGO_LABELS.cada_2_dias },
    { value: "semanal", label: RIEGO_LABELS.semanal },
    { value: "quincenal", label: RIEGO_LABELS.quincenal },
    { value: "mensual", label: RIEGO_LABELS.mensual },
  ],
  dificultad: [
    { value: "facil", label: DIFICULTAD_LABELS.facil },
    { value: "moderado", label: DIFICULTAD_LABELS.moderado },
    { value: "experto", label: DIFICULTAD_LABELS.experto },
  ],
};

export const BOTANICAL_BOOLEANS = [
  {
    value: "pet_friendly",
    field: "attributes.is_pet_friendly",
    label: "🐾 Apto para mascotas",
  },
  {
    value: "medicinal",
    field: "attributes.is_medicinal",
    label: "🌿 Medicinal",
  },
  {
    value: "perishable",
    field: "is_perishable",
    label: "⚠️ Delicado / Perecedero",
  },
];