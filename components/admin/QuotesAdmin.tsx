"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { LandscapingQuote, QuoteStatus } from "@/lib/types";
import { ChevronDown, Mail, Phone } from "lucide-react";
import { statusConfig, projectTypeLabel } from "@/app/constants/quoteStatus";

// const statusConfig: Record<QuoteStatus, { label: string; color: string }> = {
//   nuevo: { 
//     label: "Nuevo", 
//     color: "bg-blue-900 text-blue-400 border-blue-800" 
// },
//   contactado: {
//     label: "Contactado",
//     color: "bg-yellow-900 text-yellow-400 border-yellow-800",
//   },
//   en_proceso: {
//     label: "En proceso",
//     color: "bg-purple-900 text-purple-400 border-purple-800",
//   },
//   cotizado: {
//     label: "Cotizado",
//     color: "bg-indigo-900 text-indigo-400 border-indigo-800",
//   },
//   cerrado: {
//     label: "Cerrado",
//     color: "bg-green-900 text-green-400 border-green-800",
//   },
//   cancelado: {
//     label: "Cancelado",
//     color: "bg-red-900 text-red-400 border-red-800",
//   },
// };

// const projectTypeLabel: Record<string, string> = {
//   residencial: "🏡 Residencial",
//   comercial: "🏢 Comercial",
//   corporativo: "🌳 Corporativo",
//   evento: "🎉 Evento",
// };

export default function QuotesAdmin({
  quotes: initial,
}: {
  quotes: LandscapingQuote[];
}) {
  const [quotes, setQuotes] = useState(initial);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  const updateStatus = async (id: string, status: QuoteStatus) => {
    setUpdating(id);
    const res = await fetch("/api/admin/quotes", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });

    if (res.ok) {
      setQuotes((prev) =>
        prev.map((q) => (q.id === id ? { ...q, status } : q)),
      );
      toast.success("Estado actualizado");
    } else {
      toast.error("Error al actualizar");
    }
    setUpdating(null);
  };

  if (quotes.length === 0) {
    return (
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-12 text-center">
        <p className="text-gray-400">No hay cotizaciones aún</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {quotes.map((quote) => (
        <div
          key={quote.id}
          className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <p className="text-white font-semibold">{quote.full_name}</p>
                <span className="text-xs text-gray-500">
                  {projectTypeLabel[quote.project_type]}
                </span>
                <span className="text-xs text-gray-600">•</span>
                <span className="text-xs text-gray-500">
                  {new Date(quote.created_at).toLocaleDateString("es-VE", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  {quote.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  {quote.phone}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <select
                value={quote.status}
                disabled={updating === quote.id}
                onChange={(e) =>
                  updateStatus(quote.id, e.target.value as QuoteStatus)
                }
                className={`text-xs font-medium px-2 py-1 rounded-lg border bg-gray-900 cursor-pointer ${
                  statusConfig[quote.status]?.color
                }`}
              >
                {Object.entries(statusConfig).map(([value, { label }]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>

              <button
                onClick={() =>
                  setExpanded(expanded === quote.id ? null : quote.id)
                }
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ChevronDown
                  className={`size-4 transition-transform ${
                    expanded === quote.id ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Detalle expandido */}
          {expanded === quote.id && (
            <div className="border-t border-gray-800 p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-3">
                {quote.area_m2 && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">Área</p>
                    <p className="text-gray-300 text-sm">{quote.area_m2}</p>
                  </div>
                )}
                {quote.budget && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">
                      Presupuesto
                    </p>
                    <p className="text-gray-300 text-sm">{quote.budget}</p>
                  </div>
                )}
                {quote.preferred_plants.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">
                      Plantas de interés
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {quote.preferred_plants.map((p) => (
                        <span
                          key={p}
                          className="text-xs bg-green-900/50 text-green-400 px-2 py-0.5 rounded-lg"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div>
                {quote.description && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">
                      Descripción del proyecto
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {quote.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
