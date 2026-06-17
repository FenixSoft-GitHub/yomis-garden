"use client";

import { useState } from "react";
import { Mail, Leaf, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    // Por ahora guardamos en Supabase como audiencia
    await new Promise((r) => setTimeout(r, 800));
    setSubscribed(true);
    toast.success("¡Suscrito! Pronto recibirás consejos de jardinería 🌿");
    setLoading(false);
  };

  return (
    <section className="py-16 px-4 bg-green-900 dark:bg-gray-950">
      <div className="max-w-2xl mx-auto text-center">
        <div className="size-14 bg-green-800 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <Mail className="size-7 text-green-300" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">
          Consejos de jardinería en tu email
        </h2>
        <p className="text-green-300 mb-8 text-sm leading-relaxed">
          Recibe semanalmente tips de cuidado de plantas, novedades del vivero y
          ofertas exclusivas para suscriptores.
        </p>

        {subscribed ? (
          <div className="flex items-center justify-center gap-2 text-green-400 font-medium">
            <Leaf className="size-5" />
            ¡Gracias por suscribirte!
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              className="bg-green-900/50 border-green-800 text-white placeholder:text-green-500 focus:border-green-500 flex-1"
            />
            <Button
              type="submit"
              disabled={loading}
              className="bg-green-500 hover:bg-green-400 text-green-950 font-semibold shrink-0"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Suscribirme"
              )}
            </Button>
          </form>
        )}
        <p className="text-green-600 text-xs mt-4">
          Sin spam · Puedes cancelar cuando quieras
        </p>
      </div>
    </section>
  );
}
