"use client";

import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import {
  Pencil,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Leaf,
} from "lucide-react";

interface Product {
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
  images: string[];
}

export default function ProductsTable({
  products: initial,
}: {
  products: Product[];
}) {
  const [products, setProducts] = useState(initial);
  const [editingStock, setEditingStock] = useState<string | null>(null);
  const [stockValue, setStockValue] = useState<number>(0);
  const [saving, setSaving] = useState(false);

  const startEditStock = (product: Product) => {
    setEditingStock(product.id);
    setStockValue(product.stock_quantity);
  };

  const saveStock = async (productId: string) => {
    setSaving(true);
    const res = await fetch("/api/admin/products", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId,
        field: "stock_quantity",
        value: stockValue,
      }),
    });

    if (res.ok) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, stock_quantity: stockValue } : p,
        ),
      );
      toast.success("Stock actualizado");
    } else {
      toast.error("Error al actualizar stock");
    }

    setEditingStock(null);
    setSaving(false);
  };

  const toggleActive = async (productId: string, current: boolean) => {
    const res = await fetch("/api/admin/products", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, field: "is_active", value: !current }),
    });

    if (res.ok) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, is_active: !current } : p,
        ),
      );
      toast.success(current ? "Producto desactivado" : "Producto activado");
    } else {
      toast.error("Error al actualizar");
    }
  };

  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">
                Imagen
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">
                Producto
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">
                Categoría
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">
                Precio
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">
                Stock
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">
                Estado
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">
                Tipo
              </th>
              <th className="px-6 py-4" />
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const isLow =
                product.stock_quantity <= product.low_stock_threshold;
              const isOut = product.stock_quantity === 0;

              return (
                <tr
                  key={product.id}
                  className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                >
                  {/* Imagen */}
                  <td className="pl-6 py-3 align-middle w-16">
                    <div className="relative w-12 h-12 bg-gray-800 rounded-md border border-gray-700/50 overflow-hidden shrink-0 flex items-center justify-center group-hover:border-gray-600 transition-colors">
                      {product.images?.[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="48px"
                          className="object-cover hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <Leaf className="size-4 text-green-400/70" />
                      )}
                    </div>
                  </td>

                  {/* Nombre */}
                  <td className="px-6 py-4">
                    <p className="text-white font-medium text-sm">
                      {product.name}
                    </p>
                    <p className="text-gray-500 text-xs font-mono">
                      {product.slug}
                    </p>
                  </td>

                  {/* Categoría */}
                  <td className="px-6 py-4">
                    <span className="text-gray-300 text-sm">
                      {product.category?.name ?? "—"}
                    </span>
                  </td>

                  {/* Precio */}
                  <td className="px-6 py-4">
                    <span className="text-green-400 font-semibold">
                      ${Number(product.base_price).toFixed(2)}
                    </span>
                  </td>

                  {/* Stock editable */}
                  <td className="px-6 py-4">
                    {editingStock === product.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={0}
                          value={stockValue}
                          onChange={(e) =>
                            setStockValue(Number(e.target.value))
                          }
                          className="w-20 bg-gray-800 border border-green-500 text-white text-sm rounded-lg px-2 py-1 focus:outline-none"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveStock(product.id);
                            if (e.key === "Escape") setEditingStock(null);
                          }}
                        />
                        <button
                          onClick={() => saveStock(product.id)}
                          disabled={saving}
                          className="text-green-400 hover:text-green-300"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingStock(null)}
                          className="text-gray-500 hover:text-gray-300"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEditStock(product)}
                        className="flex items-center gap-2 group"
                      >
                        <span
                          className={`text-sm font-medium ${
                            isOut
                              ? "text-red-400"
                              : isLow
                                ? "text-orange-400"
                                : "text-white"
                          }`}
                        >
                          {product.stock_quantity} uds
                        </span>
                        {isOut && (
                          <AlertTriangle className="w-3 h-3 text-red-400" />
                        )}
                        {isLow && !isOut && (
                          <AlertTriangle className="w-3 h-3 text-orange-400" />
                        )}
                        <Pencil className="w-3 h-3 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    )}
                  </td>

                  {/* Activo/Inactivo */}
                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        toggleActive(product.id, product.is_active)
                      }
                      className={`text-xs px-3 py-1 rounded-lg font-medium border transition-colors ${
                        product.is_active
                          ? "bg-green-900 text-green-400 border-green-800 hover:bg-green-800"
                          : "bg-gray-800 text-gray-500 border-gray-700 hover:bg-gray-700"
                      }`}
                    >
                      {product.is_active ? "Activo" : "Inactivo"}
                    </button>
                  </td>

                  {/* Tipo */}
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-lg ${
                        product.is_perishable
                          ? "bg-emerald-900/30 text-emerald-400"
                          : "bg-gray-800 text-gray-400"
                      }`}
                    >
                      {product.is_perishable ? "🌱 Vivo" : "📦 Accesorio"}
                    </span>
                  </td>

                  {/* Editar */}
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/productos/${product.id}/editar`}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
