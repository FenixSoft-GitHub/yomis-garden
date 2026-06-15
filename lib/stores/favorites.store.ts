import { create } from "zustand";
import { createClient } from "@/lib/supabase/client";

interface FavoritesStore {
  productIds: Set<string>;
  loading: boolean;
  initialized: boolean;
  init: () => Promise<void>;
  toggle: (productId: string) => Promise<void>;
  isFavorite: (productId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  productIds: new Set(),
  loading: false,
  initialized: false,

  init: async () => {
    if (get().initialized) return;
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("favorites")
      .select("product_id")
      .eq("user_id", user.id);

    set({
      productIds: new Set(data?.map((f) => f.product_id) ?? []),
      initialized: true,
    });
  },

  toggle: async (productId: string) => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      window.location.href = "/auth";
      return;
    }

    const isFav = get().productIds.has(productId);
    const current = new Set(get().productIds);

    if (isFav) {
      current.delete(productId);
      set({ productIds: current });
      await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", productId);
    } else {
      current.add(productId);
      set({ productIds: current });
      await supabase
        .from("favorites")
        .insert({ user_id: user.id, product_id: productId });
    }
  },

  isFavorite: (productId: string) => get().productIds.has(productId),
}));
