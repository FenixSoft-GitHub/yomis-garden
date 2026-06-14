"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/stores/cart.store";

export default function CartCount() {
  const [count, setCount] = useState(() =>
    useCartStore.getState().totalItems(),
  );

  useEffect(() => {
    const unsub = useCartStore.subscribe((state) => {
      setCount(state.totalItems());
    });
    return unsub;
  }, []);

  if (count === 0) return null;

  return (
    <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
      {count}
    </span>
  );
}
