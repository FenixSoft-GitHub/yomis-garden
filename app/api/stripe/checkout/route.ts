import { NextResponse } from "next/server";
import { getStripeServer } from "@/lib/stripe/server";
import { createClient } from "@/lib/supabase/server";
import type { CartItem } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const { items, customerEmail, orderId, orderNumber } =
      (await request.json()) as {
        items: CartItem[];
        customerEmail: string;
        orderId: string;
        orderNumber: string;
      };

    const stripe = getStripeServer();
    const supabase = await createClient();

    // Verificar que el pedido existe
    const { data: order } = await supabase
      .from("orders")
      .select("id, total")
      .eq("id", orderId)
      .single();

    if (!order) {
      return NextResponse.json(
        { error: "Pedido no encontrado" },
        { status: 404 },
      );
    }

    // Crear line items para Stripe
    const lineItems = items.map((item) => {
      const price =
        Number(item.product.base_price) + (item.variant?.price_modifier ?? 0);
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name:
              item.product.name +
              (item.variant ? ` - ${item.variant.name}` : ""),
            description: item.product.description ?? undefined,
            images: item.product.images?.length
              ? [item.product.images[0]]
              : undefined,
          },
          unit_amount: Math.round(price * 100), // Stripe usa centavos
        },
        quantity: item.quantity,
      };
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    // Crear sesión de Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      customer_email: customerEmail,
      metadata: {
        orderId,
        orderNumber,
      },
      success_url: `${appUrl}/pedido-confirmado?order=${orderNumber}&payment=success`,
      cancel_url: `${appUrl}/checkout?cancelled=true`,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Error al crear sesión de pago" },
      { status: 500 },
    );
  }
}
