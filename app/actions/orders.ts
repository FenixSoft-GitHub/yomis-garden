"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { CheckoutFormData } from "@/lib/schemas/checkout.schema";
import type { CartItem } from "@/lib/types";
import { sendOrderConfirmation } from "@/lib/emails/sendEmail";

export async function createOrder(
  formData: CheckoutFormData,
  items: CartItem[],
) {
  // Cliente normal para obtener el usuario actual
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Cliente admin para saltarse RLS en la creación del pedido
  const adminSupabase = createAdminClient();

  // Calcular totales
  const subtotal = items.reduce((sum, item) => {
    const price =
      Number(item.product.base_price) + (item.variant?.price_modifier ?? 0);
    return sum + price * item.quantity;
  }, 0);

  const shipping_cost = 0;
  const total = subtotal + shipping_cost;

  // Crear el pedido con cliente admin
  const { data: order, error: orderError } = await adminSupabase
    .from("orders")
    .insert({
      user_id: user?.id ?? null,
      status: "pending",
      payment_status: "pending",
      payment_method: formData.payment_method,
      payment_reference: formData.payment_reference ?? null,
      subtotal,
      shipping_cost,
      discount_amount: 0,
      total,
      shipping_address: {
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        address_line1: formData.address_line1,
        address_line2: formData.address_line2 ?? "",
        city: formData.city,
        state: formData.state,
        country: "Venezuela",
      },
      notes: formData.notes ?? null,
    })
    .select()
    .single();

  if (orderError) {
    console.error("ORDER ERROR:", JSON.stringify(orderError, null, 2));
    return { success: false, error: `Error: ${orderError.message}` };
  }

  // Crear los items del pedido
  const orderItems = items.map((item) => {
    const price =
      Number(item.product.base_price) + (item.variant?.price_modifier ?? 0);
    return {
      order_id: order.id,
      product_id: item.product.id,
      variant_id: item.variant?.id ?? null,
      product_name:
        item.product.name + (item.variant ? ` - ${item.variant.name}` : ""),
      product_image: item.product.images?.[0] ?? null,
      quantity: item.quantity,
      unit_price: price,
      total_price: price * item.quantity,
    };
  });

  const { error: itemsError } = await adminSupabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) {
    console.error("ITEMS ERROR:", JSON.stringify(itemsError, null, 2));
    return {
      success: false,
      error: `Error al guardar productos: ${itemsError.message}`,
    };
  }

  // Actualizar stock
  for (const item of items) {
    await adminSupabase.rpc("decrement_stock", {
      p_product_id: item.product.id,
      p_quantity: item.quantity,
    });
  }

  await sendOrderConfirmation({
    to: formData.email,
    orderNumber: order.order_number,
    customerName: formData.full_name,
    items: orderItems.map((item) => ({
      product_name: item.product_name,
      quantity: item.quantity,
      unit_price: item.unit_price,
      total_price: item.total_price,
    })),
    subtotal,
    shippingCost: shipping_cost,
    total,
    paymentMethod: formData.payment_method,
    paymentReference: formData.payment_reference,
    shippingAddress: {
      address_line1: formData.address_line1,
      address_line2: formData.address_line2,
      city: formData.city,
      state: formData.state,
      country: "Venezuela",
    },
  });

  // Otorgar puntos si el usuario está autenticado
  if (user?.id) {
    await adminSupabase.rpc("award_loyalty_points", {
      p_user_id: user.id,
      p_order_id: order.id,
      p_order_total: total,
    });
  }

  return { success: true, orderId: order.id, orderNumber: order.order_number };
}
