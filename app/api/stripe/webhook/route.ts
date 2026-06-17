import { NextResponse } from "next/server";
import { getStripeServer } from "@/lib/stripe/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendOrderStatusUpdate } from "@/lib/emails/sendEmail";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature")!;

  let event;

  try {
    const stripe = getStripeServer();
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error) {
    console.error("Webhook signature error:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const adminSupabase = createAdminClient();

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { orderId, orderNumber } = session.metadata ?? {};

    if (orderId) {
      // Actualizar estado del pedido a pagado y confirmado
      await adminSupabase
        .from("orders")
        .update({
          payment_status: "paid",
          status: "confirmed",
          payment_reference: session.payment_intent as string,
          updated_at: new Date().toISOString(),
        })
        .eq("id", orderId);

      // Obtener datos del pedido para el email
      const { data: orderData } = await adminSupabase
        .from("orders")
        .select("order_number, total, shipping_address")
        .eq("id", orderId)
        .single();

      if (orderData) {
        const address = orderData.shipping_address as Record<
          string,
          string
        > | null;
        if (address?.email && address?.full_name) {
          await sendOrderStatusUpdate({
            to: address.email,
            orderNumber: orderData.order_number,
            customerName: address.full_name,
            status: "confirmed",
            total: Number(orderData.total),
          });
        }
      }
    }
  }

  if (event.type === "checkout.session.expired") {
    const session = event.data.object;
    const { orderId } = session.metadata ?? {};

    if (orderId) {
      await adminSupabase
        .from("orders")
        .update({
          payment_status: "failed",
          updated_at: new Date().toISOString(),
        })
        .eq("id", orderId);
    }
  }

  return NextResponse.json({ received: true });
}
