export interface CategoryOption {
  id: string;
  name: string;
  slug: string;
}

export interface ProductFormProps {
  categories: CategoryOption[];
  initialData?: Partial<{
    id: string;
    name: string;
    slug: string;
    description: string;
    category_id: string;
    base_price: number;
    compare_price: number;
    stock_quantity: number;
    low_stock_threshold: number;
    weight_kg: number;
    is_perishable: boolean;
    is_featured: boolean;
    light_requirement: string;
    water_frequency: string;
    is_pet_friendly: boolean;
    is_indoor: boolean;
    is_outdoor: boolean;
    care_difficulty: string;
    images: string[];
    mature_height_cm: number;
  }>;
}

export interface ProductRow {
  id: string;
  name: string;
  slug: string;
  base_price: number;
  stock_quantity: number;
  low_stock_threshold: number;
  is_active: boolean;
  is_featured: boolean;
  is_perishable: boolean;
  category?: { name: string };
}

export interface OrderItemRow {
  id: string;
  product_name: string;
  quantity: number;
  total_price: number;
}
