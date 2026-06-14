export type UserRole = "customer" | "admin";

export type LightRequirement =
  | "sol_directo"
  | "sol_parcial"
  | "sombra"
  | "interior";
export type WaterFrequency =
  | "diario"
  | "cada_2_dias"
  | "semanal"
  | "quincenal"
  | "mensual";
export type CareDifficulty = "facil" | "moderado" | "experto";
export type Climate = "tropical" | "desertico" | "templado" | "frio";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
export type PaymentMethod = "stripe" | "zelle" | "pago_movil" | "efectivo";

export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  is_perishable: boolean;
  parent_id: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface PlantAttributes {
  id: string;
  product_id: string;
  light_requirement: LightRequirement | null;
  water_frequency: WaterFrequency | null;
  is_pet_friendly: boolean;
  is_indoor: boolean;
  is_outdoor: boolean;
  mature_height_cm: number | null;
  care_difficulty: CareDifficulty | null;
  climate: Climate | null;
  extra_notes: string | null;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  name: string;
  sku: string | null;
  price_modifier: number;
  stock_quantity: number;
  attributes: Record<string, unknown>;
  is_active: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category_id: string;
  base_price: number;
  compare_price: number | null;
  sku: string | null;
  is_active: boolean;
  is_featured: boolean;
  is_perishable: boolean;
  weight_kg: number | null;
  stock_quantity: number;
  low_stock_threshold: number;
  images: string[];
  tags: string[];
  created_at: string;
  updated_at: string;
  // Relaciones
  category?: Category;
  plant_attributes?: PlantAttributes;
  product_variants?: ProductVariant[];
}

export interface CartItem {
  product: Product;
  variant?: ProductVariant;
  quantity: number;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  variant_id: string | null;
  product_name: string;
  product_image: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface Order {
  id: string;
  order_number: string;
  user_id: string;
  status: OrderStatus;
  payment_status: PaymentStatus;
  payment_method: PaymentMethod | null;
  payment_reference: string | null;
  subtotal: number;
  shipping_cost: number;
  discount_amount: number;
  total: number;
  shipping_address: Record<string, unknown> | null;
  notes: string | null;
  shipped_at: string | null;
  delivered_at: string | null;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
}
