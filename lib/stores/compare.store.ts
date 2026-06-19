import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/types";

interface CompareStore {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  clearAll: () => void;
  isInCompare: (productId: string) => boolean;
}

export const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      products: [],

      addProduct: (product) => {
        set((state) => {
          if (state.products.some((p) => p.id === product.id)) return state;
          if (state.products.length >= 3) return state;
          return { products: [...state.products, product] };
        });
      },

      removeProduct: (productId) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== productId),
        }));
      },

      clearAll: () => set({ products: [] }),

      isInCompare: (productId) =>
        get().products.some((p) => p.id === productId),
    }),
    { name: "yomis-compare" },
  ),
);
