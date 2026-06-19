"use client";

import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import LandscapeBentoGrid from "./LandscapeBentoGrid"; 

export default function LandscapeServices() {
  return (
    <section className="py-20 px-4 bg-linear-to-br from-green-950 via-emerald-950 to-neutral-950 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Bloque Izquierdo */}
        <div className="lg:col-span-5 text-center lg:text-left flex flex-col items-center lg:items-start space-y-6">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide uppercase">
            <Star className="size-3 fill-emerald-400" />
            Servicio Premium
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            ¿Tienes un proyecto de paisajismo?
          </h2>

          <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-xl">
            Diseñamos y ejecutamos entornos botánicos únicos para hogares y
            empresas. Transformamos espacios comunes en oasis naturales
            minimalistas y profesionales.
          </p>

          <div className="pt-2 w-full sm:w-auto">
            <Link href="/paisajismo" className="block w-full">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-emerald-600 text-white hover:bg-emerald-500 font-semibold gap-2 rounded-xl"
              >
                Solicitar cotización gratuita
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
        <LandscapeBentoGrid className="hidden md:grid lg:col-span-7 h-110" />
      </div>
    </section>
  );
}
