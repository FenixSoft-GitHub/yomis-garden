"use client";

import { useState } from "react";
import { MessageCircle, X, ShoppingCart, HelpCircle, Leaf } from "lucide-react";
import { WhatsAppSVG } from "./WhatsAppSVG";

const WHATSAPP_NUMBER = "+584124998811"; // ← Cambia por tu número real (sin + ni espacios)

const quickMessages = [
  {
    icon: ShoppingCart,
    label: "Consultar sobre un pedido",
    message: "Hola! Quiero consultar sobre mi pedido en Yomi's Garden 🌿",
  },
  {
    icon: Leaf,
    label: "Información de plantas",
    message:
      "Hola! Me gustaría obtener información sobre sus plantas disponibles 🌱",
  },
  {
    icon: HelpCircle,
    label: "Proyecto de paisajismo",
    message:
      "Hola! Estoy interesado en un proyecto de paisajismo. ¿Pueden ayudarme? 🏡",
  },
];

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  const sendMessage = (message: string) => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Mensajes rápidos */}
      {open && (
        <div className="flex flex-col gap-2 mb-1">
          {/* Tooltip */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-4 w-72">
            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="text-green-500">●</span>
              Yomi&apos;s Garden — En línea
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
              ¿En qué podemos ayudarte?
            </p>
            <div className="flex flex-col gap-2">
              {quickMessages.map(({ icon: Icon, label, message }) => (
                <button
                  key={label}
                  onClick={() => sendMessage(message)}
                  className="flex items-center gap-3 text-left p-3 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-green-50 dark:hover:bg-green-950/30 hover:text-green-700 dark:hover:text-green-400 transition-colors group"
                >
                  <div className="size-8 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-green-200 dark:group-hover:bg-green-900 transition-colors">
                    <Icon className="size-4 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-green-700 dark:group-hover:text-green-400">
                    {label}
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
              <button
                onClick={() =>
                  sendMessage("Hola! Tengo una consulta sobre Yomi's Garden 🌿")
                }
                className="w-full text-xs text-center text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                Escribir mensaje personalizado →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Botón principal */}
      <button
        onClick={() => setOpen(!open)}
        className={`size-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          open
            ? "bg-gray-700 hover:bg-gray-800 rotate-0"
            : "bg-green-500 hover:bg-green-400"
        }`}
        aria-label={open ? "Cerrar WhatsApp" : "Abrir WhatsApp"}
      >
        {open ? (
          <X className="size-6 text-white" />
        ) : (
          <WhatsAppSVG />
        )}
      </button>

      {/* Pulse animado cuando está cerrado */}
      {!open && (
        <span className="absolute bottom-0 right-0 size-12 rounded-full bg-green-400 opacity-30 animate-ping pointer-events-none" />
      )}
    </div>
  );
}
