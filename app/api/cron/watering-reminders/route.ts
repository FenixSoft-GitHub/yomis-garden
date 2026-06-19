import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendWateringReminder } from "@/lib/emails/sendEmail";

export async function GET(request: Request) {
  // Verificar el secret del cron
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const supabase = createAdminClient();

  // Obtener plantas que necesitan riego hoy o están atrasadas
  const { data: plants } = await supabase
    .from("user_plants")
    .select("id, nickname, user_id, next_watering, product:products(name)")
    .eq("reminders_enabled", true)
    .lte("next_watering", new Date().toISOString());

  if (!plants || plants.length === 0) {
    return NextResponse.json({ message: "No hay recordatorios pendientes" });
  }

  // Agrupar por usuario
  const byUser = plants.reduce<Record<string, typeof plants>>((acc, plant) => {
    if (!acc[plant.user_id]) acc[plant.user_id] = [];
    acc[plant.user_id].push(plant);
    return acc;
  }, {});

  let sentCount = 0;

  for (const [userId, userPlants] of Object.entries(byUser)) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", userId)
      .single();

    const { data: authUser } = await supabase.auth.admin.getUserById(userId);
    const email = authUser?.user?.email;

    if (email && profile) {
      await sendWateringReminder({
        to: email,
        customerName: profile.full_name ?? "Amante de las plantas",
        plants: userPlants.map((p) => {
          const product = Array.isArray(p.product) ? p.product[0] : p.product;
          return {
            nickname: p.nickname,
            productName: (product as { name: string } | null)?.name,
          };
        }),
      });
      sentCount++;
    }
  }

  return NextResponse.json({ message: `${sentCount} recordatorios enviados` });
}
