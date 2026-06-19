"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ChevronDown,
  TreeDeciduous,
  Flower2,
  Sprout,
  Package,
} from "lucide-react";

const categories = [
  {
    label: "Árboles",
    href: "/catalogo?categoria=arboles",
    icon: TreeDeciduous,
    desc: "Frutales y ornamentales",
  },
  {
    label: "Ornamentales",
    href: "/catalogo?categoria=ornamentales",
    icon: Flower2,
    desc: "Flores y follaje",
  },
  {
    label: "Cactus y Suculentas",
    href: "/catalogo?categoria=cactus-suculentas",
    icon: Sprout,
    desc: "Bajo mantenimiento",
  },
  {
    label: "Macetas",
    href: "/catalogo?categoria=macetas",
    icon: Package,
    desc: "Porrones y accesorios",
  },
];

export default function CategoriesDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 hover:text-green-700 dark:hover:text-green-400 transition-colors"
      >
        Categorías
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl z-50 overflow-hidden">
          <div className="py-2">
            {categories.map(({ label, href, icon: Icon, desc }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 dark:hover:bg-green-950/30 transition-colors group"
              >
                <div className="w-9 h-9 bg-green-50 dark:bg-green-950/50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-green-100 dark:group-hover:bg-green-900 transition-colors">
                  <Icon className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {label}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="border-t border-gray-100 dark:border-gray-800 px-4 py-3">
            <Link
              href="/catalogo"
              onClick={() => setOpen(false)}
              className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 font-medium"
            >
              Ver catálogo completo →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
