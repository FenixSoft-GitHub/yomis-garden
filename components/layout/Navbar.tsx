"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import CartCount from "@/components/layout/CartCount";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import AdminLink from "./AdminLink";
import SearchBar from "@/components/store/SearchBar";
import UserMenu from "@/components/layout/UserMenu";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { useCartStore } from "@/lib/stores/cart.store";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleCart = useCartStore((s) => s.toggleCart);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-950 border-b border-green-100 dark:border-gray-800 shadow-sm py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-green-700 text-xl shrink-0"
          >
            <Logo />
            <span className="hidden sm:block dark:text-green-500">
              Yomi&apos;s{" "}
              <span className="text-gray-600 dark:text-gray-400">Garden</span>
            </span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-xs hidden md:block">
            <SearchBar />
          </div>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-gray-600 dark:text-gray-400">
            <Link
              href="/catalogo"
              className="hover:text-green-700 dark:hover:text-green-400 transition-colors"
            >
              Catálogo
            </Link>
            <Link
              href="/catalogo?categoria=arboles"
              className="hover:text-green-700 dark:hover:text-green-400 transition-colors"
            >
              Árboles
            </Link>
            <Link
              href="/catalogo?categoria=ornamentales"
              className="hover:text-green-700 dark:hover:text-green-400 transition-colors"
            >
              Ornamentales
            </Link>
            <Link
              href="/catalogo?categoria=cactus-suculentas"
              className="hover:text-green-700 dark:hover:text-green-400 transition-colors"
            >
              Cactus
            </Link>
            <Link
              href="/catalogo?categoria=macetas"
              className="hover:text-green-700 dark:hover:text-green-400 transition-colors"
            >
              Macetas
            </Link>
            <Link
              href="/paisajismo"
              className="hover:text-green-700 dark:hover:text-green-400 transition-colors"
            >
              Paisajismo
            </Link>
          </nav>

          {/* Acciones */}
          <div className="flex items-center gap-4 shrink-0">
            <AdminLink />
            <UserMenu />
            <ThemeToggle />

            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={toggleCart}
            >
              <ShoppingCart className="size-5" />
              <CartCount />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Nav mobile */}
        {menuOpen && (
          <nav className="md:hidden py-4 border-t border-green-100 dark:border-gray-800 flex flex-col gap-3 text-sm font-medium text-gray-600 dark:text-gray-400">
            <Link href="/catalogo" onClick={() => setMenuOpen(false)}>
              Catálogo
            </Link>
            <Link
              href="/catalogo?categoria=arboles"
              onClick={() => setMenuOpen(false)}
            >
              Árboles
            </Link>
            <Link
              href="/catalogo?categoria=ornamentales"
              onClick={() => setMenuOpen(false)}
            >
              Ornamentales
            </Link>
            <Link
              href="/catalogo?categoria=cactus-suculentas"
              onClick={() => setMenuOpen(false)}
            >
              Cactus
            </Link>
            <Link
              href="/catalogo?categoria=macetas"
              onClick={() => setMenuOpen(false)}
            >
              Macetas
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
