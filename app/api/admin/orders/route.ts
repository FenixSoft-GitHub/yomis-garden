import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { sendOrderStatusUpdate } from "@/lib/emails/sendEmail";

export async function PATCH(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const { orderId, field, value } = await request.json();

  const validStatusFields = ["status", "payment_status"];
  if (!validStatusFields.includes(field)) {
    return NextResponse.json({ error: "Campo inválido" }, { status: 400 });
  }

  const adminSupabase = createAdminClient();

  const { error } = await adminSupabase
    .from("orders")
    .update({ [field]: value, updated_at: new Date().toISOString() })
    .eq("id", orderId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (field === "status") {
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
        try {
          await sendOrderStatusUpdate({
            to: address.email,
            orderNumber: orderData.order_number,
            customerName: address.full_name,
            status: value,
            total: Number(orderData.total),
          });
        } catch (emailError) {
          console.error("Error sending status update email:", emailError);
        }
      } 
    }
  }

  return NextResponse.json({ success: true });
}
