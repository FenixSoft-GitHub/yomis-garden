"use client";

import { useState } from "react";
import { getStripe } from "@/lib/stripe/client";
import { Button } from "@/components/ui/button";
import { CreditCard, Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { CartItem } from "@/lib/types";

interface StripeCheckoutButtonProps {
  items: CartItem[];
  customerEmail: string;
  orderId: string;
  orderNumber: string;
}

export default function StripeCheckoutButton({
  items,
  customerEmail,
  orderId,
  orderNumber,
}: StripeCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleStripeCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, customerEmail, orderId, orderNumber }),
      });

      const { url, error } = (await res.json()) as {
        url?: string;
        error?: string;
      };

      if (error || !url) {
        toast.error(error ?? "Error al conectar con Stripe");
        return;
      }

      // Redirigir a Stripe Checkout
      window.location.href = url;
    } catch {
      toast.error("Error inesperado al procesar el pago");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleStripeCheckout}
      disabled={loading}
      className="w-full bg-purple-600 hover:bg-purple-700 text-white gap-2"
      size="lg"
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" /> Conectando con Stripe...
        </>
      ) : (
        <>
          <CreditCard className="w-4 h-4" /> Pagar con tarjeta
        </>
      )}
    </Button>
  );
}
