"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 dark:from-gray-950 via-white dark:via-gray-900 to-orange-50 dark:to-gray-950 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Ilustración */}
        <div className="relative mb-8 flex items-center justify-center">
          <div className="text-[8rem] leading-none select-none">🥀</div>
          <div className="absolute -top-2 -right-4 text-[2rem]">⚠️</div>
        </div>

        <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-400 text-sm font-medium px-4 py-2 rounded-full mb-4">
          <AlertTriangle className="w-4 h-4" />
          Algo salió mal
        </div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Error inesperado
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          Ocurrió un error inesperado. No te preocupes, nuestro equipo ya fue
          notificado. Intenta recargar la página.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={reset}
            className="bg-green-600 hover:bg-green-700 text-white gap-2"
            size="lg"
          >
            <RefreshCw className="size-4" />
            Intentar de nuevo
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-gray-200 dark:border-gray-700 gap-2"
            size="lg"
          >
            <Link href="/">
              <Home className="size-4" />
              Ir al inicio
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
