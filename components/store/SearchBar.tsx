"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Leaf, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import type { Product } from "@/lib/types";
import Image from "next/image";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Búsqueda con debounce
  useEffect(() => {
    if (query.trim().length < 2) {
      const timeout = setTimeout(() => {
        setResults([]);
        setOpen(false);
      }, 0);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      const supabase = createClient();

      const { data } = await supabase
        .from("products")
        .select("id, name, slug, base_price, images, category:categories(name)")
        .eq("is_active", true)
        .ilike("name", `%${query}%`)
        .limit(5);

      setResults((data as unknown as Product[]) ?? []);
      setOpen(true);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  const handleSelect = () => {
    setQuery("");
    setResults([]);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-sm">
      {/* Input */}
      <div className="relative flex items-center">
        <Search className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar plantas, macetas..."
          className="w-full pl-9 pr-8 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
              setOpen(false);
            }}
            className="absolute right-3 text-gray-400 hover:text-gray-600"
          >
            {loading ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <X className="w-3 h-3" />
            )}
          </button>
        )}
      </div>

      {/* Dropdown de resultados */}
      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-gray-100 shadow-xl z-50 overflow-hidden">
          {results.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-gray-400">
              No se encontraron productos para &quot;{query}&quot;
            </div>
          ) : (
            <>
              <div className="py-2">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/producto/${product.slug}`}
                    onClick={handleSelect}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition-colors"
                  >
                    {/* Imagen */}
                    <div className="relative w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                      {product.images?.[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      ) : (
                        <Leaf className="size-5 text-green-300" />
                      )}
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {product.category?.name}
                      </p>
                    </div>
                    {/* Precio */}
                    <span className="text-sm font-semibold text-green-700 shrink-0">
                      ${Number(product.base_price).toFixed(2)}
                    </span>
                  </Link>
                ))}
              </div>
              {/* Ver todos */}
              <div className="border-t border-gray-100 px-4 py-3">
                <Link
                  href={`/catalogo?busqueda=${query}`}
                  onClick={handleSelect}
                  className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
                >
                  <Search className="w-3 h-3" />
                  Ver todos los resultados para &quot;{query}&quot;
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
