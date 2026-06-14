import { Leaf } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-green-950 text-green-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <Logo className="mb-2" />
            <div className="flex items-center gap-2 font-bold text-white text-lg mb-1">
              <Leaf className="size-5" />
              <span>Yomi&apos;s Garden</span>
            </div>
            <p className="text-sm text-green-300">
              Vivero artesanal venezolano. Llevamos vida y color a tu hogar con
              plantas seleccionadas con amor.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">Catálogo</h3>
            <ul className="space-y-2 text-sm text-green-300">
              <li>
                <Link
                  href="/catalogo?categoria=arboles"
                  className="hover:text-white transition-colors"
                >
                  Árboles
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo?categoria=ornamentales"
                  className="hover:text-white transition-colors"
                >
                  Ornamentales
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo?categoria=cactus-suculentas"
                  className="hover:text-white transition-colors"
                >
                  Cactus y Suculentas
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo?categoria=macetas"
                  className="hover:text-white transition-colors"
                >
                  Macetas y Porrones
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">Contacto</h3>
            <ul className="space-y-2 text-sm text-green-300">
              <li>📍 Venezuela</li>
              <li>📱 Instagram: @yomisgarden</li>
              <li>✉️ hola@yomisgarden.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-green-800 mt-8 pt-6 text-center text-xs text-green-500">
          © {new Date().getFullYear()} Yomi&apos;s Garden. Hecho con 🌿 en
          Venezuela.
        </div>
      </div>
    </footer>
  );
}
