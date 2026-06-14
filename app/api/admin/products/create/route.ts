import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

async function verifyAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return false;
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  return profile?.role === "admin";
}

export async function POST(request: Request) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const data = await request.json();
  const adminSupabase = createAdminClient();

  const { data: product, error } = await adminSupabase
    .from("products")
    .insert({
      name: data.name,
      slug: data.slug,
      description: data.description || null,
      category_id: data.category_id,
      base_price: data.base_price,
      compare_price: data.compare_price || null,
      stock_quantity: data.stock_quantity,
      low_stock_threshold: data.low_stock_threshold,
      weight_kg: data.weight_kg || null,
      is_perishable: data.is_perishable,
      is_featured: data.is_featured,
      is_active: true,
      images: data.images ?? [],
    })
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  // Si es planta viva, crear atributos botánicos
  if (data.is_perishable && product) {
    await adminSupabase.from("plant_attributes").insert({
      product_id: product.id,
      light_requirement: data.light_requirement || null,
      water_frequency: data.water_frequency || null,
      is_pet_friendly: data.is_pet_friendly,
      is_indoor: data.is_indoor,
      is_outdoor: data.is_outdoor,
      care_difficulty: data.care_difficulty || null,
    });
  }

  return NextResponse.json({ success: true, product });
}

export async function PUT(request: Request) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const data = await request.json();
  const adminSupabase = createAdminClient();

  const { error } = await adminSupabase
    .from("products")
    .update({
      name: data.name,
      slug: data.slug,
      description: data.description || null,
      category_id: data.category_id,
      base_price: data.base_price,
      compare_price: data.compare_price || null,
      stock_quantity: data.stock_quantity,
      low_stock_threshold: data.low_stock_threshold,
      weight_kg: data.weight_kg || null,
      is_perishable: data.is_perishable,
      is_featured: data.is_featured,
      updated_at: new Date().toISOString(),
      images: data.images ?? [],
    })
    .eq("id", data.id);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  // Upsert atributos botánicos
  if (data.is_perishable) {
    await adminSupabase.from("plant_attributes").upsert(
      {
        product_id: data.id,
        light_requirement: data.light_requirement || null,
        water_frequency: data.water_frequency || null,
        is_pet_friendly: data.is_pet_friendly,
        is_indoor: data.is_indoor,
        is_outdoor: data.is_outdoor,
        care_difficulty: data.care_difficulty || null,
      },
      { onConflict: "product_id" },
    );
  }

  return NextResponse.json({ success: true });
}
