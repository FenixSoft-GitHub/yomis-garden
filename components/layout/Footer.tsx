import { Leaf } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";
import { WhatsAppSVG } from "../store/WhatsAppSVG";
import { InstagramSVG } from "../store/InstagramSVG";
import { FaceBookSVG } from "../store/FaceBookSVG";

export default function Footer() {
  return (
    <footer className="bg-green-950 text-green-100 mt-auto border-t border-green-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center sm:text-left">
          {/* COLUMNA 1: LOGO E IDENTIDAD */}
          <div className="flex flex-col items-center sm:items-start col-span-1 sm:col-span-2 md:col-span-1">
            <Logo className="mb-2" />
            <div className="flex items-center gap-2 font-bold text-white text-lg mb-2">
              <Leaf className="size-5 text-green-400 fill-green-400/20" />
              <span>Yomi&apos;s Garden</span>
            </div>
            <p className="text-sm text-green-300/80 max-w-xs leading-relaxed">
              Vivero venezolano. Llevamos vida y color a tu hogar con plantas
              seleccionadas con amor.
            </p>
          </div>

          {/* COLUMNA 2: CATÁLOGO */}
          <div>
            <h3 className="font-semibold text-white tracking-wider text-sm uppercase mb-4">
              Catálogo
            </h3>
            <ul className="space-y-2.5 text-sm text-green-300">
              <li>
                <Link
                  href="/catalogo?categoria=arboles"
                  className="hover:text-white hover:underline underline-offset-4 transition-colors"
                >
                  Árboles
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo?categoria=ornamentales"
                  className="hover:text-white hover:underline underline-offset-4 transition-colors"
                >
                  Ornamentales
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo?categoria=cactus-suculentas"
                  className="hover:text-white hover:underline underline-offset-4 transition-colors"
                >
                  Cactus y Suculentas
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo?categoria=macetas"
                  className="hover:text-white hover:underline underline-offset-4 transition-colors"
                >
                  Macetas y Porrones
                </Link>
              </li>
              <li>
                <Link
                  href="/calculadora-sustrato"
                  className="hover:text-white hover:underline underline-offset-4 transition-colors"
                >
                  Calculadora de sustrato
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMNA 3: CONTACTO */}
          <div>
            <h3 className="font-semibold text-white tracking-wider text-sm uppercase mb-4">
              Contacto
            </h3>
            <ul className="space-y-2.5 text-sm text-green-300">
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <span>📍</span> Maturín, Monagas, VE
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <span>✉️</span> yomisgarden@gmail.com
              </li>
            </ul>
          </div>

          {/* NUEVA COLUMNA 4: REDES SOCIALES (Estilizada) */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="font-semibold text-white tracking-wider text-sm uppercase mb-4">
              Síguenos
            </h3>
            <p className="text-xs text-green-400 mb-3 text-center sm:text-left">
              Sé parte de nuestra comunidad verde:
            </p>
            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a
                href="https://instagram.com/yomisgarden"
                target="_blank"
                rel="noopener noreferrer"
                className="size-10 bg-green-900/50 hover:bg-green-500 text-green-300 hover:text-green-950 border border-green-800/60 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                aria-label="Siguenos en Instagram"
              >
                <InstagramSVG size={7} />
              </a>

              {/* WhatsApp / Chat */}
              <a
                href="https://wa.me/+584124998811"
                target="_blank"
                rel="noopener noreferrer"
                className="size-10 bg-green-900/50 hover:bg-green-500 text-green-300 hover:text-green-950 border border-green-800/60 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                aria-label="Escríbenos por WhatsApp"
              >
                <WhatsAppSVG size={5} />
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="size-10 bg-green-900/50 hover:bg-green-500 text-green-300 hover:text-green-950 border border-green-800/60 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                aria-label="Síguenos en Facebook"
              >
                <FaceBookSVG size={8} />
              </a>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-green-900 mt-6 pt-2 text-center text-xs text-green-500 font-medium tracking-wide">
          © {new Date().getFullYear()} Yomi&apos;s Garden. Hecho con 🌿 en
          Venezuela.
        </div>
      </div>
    </footer>
  );
}