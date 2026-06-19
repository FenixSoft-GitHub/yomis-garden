import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { User, Package, Heart, Award, Lock } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import LoyaltyCard from "@/components/store/LoyaltyCard";
import ProfileForm from "@/components/store/ProfileForm";
import ChangePasswordForm from "@/components/store/ChangePasswordForm";
import type { Profile } from "@/lib/types";

export const metadata: Metadata = {
  title: "Mi perfil — Yomi's Garden",
  description: "Gestiona tu cuenta, puntos de fidelización y datos personales.",
};

const quickLinks = [
  {
    href: "/mis-pedidos",
    icon: Package,
    label: "Mis pedidos",
    desc: "Ver historial de compras",
  },
  {
    href: "/favoritos",
    icon: Heart,
    label: "Mis favoritos",
    desc: "Plantas que te gustan",
  },
];

export default async function PerfilPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Mi perfil
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Gestiona tu cuenta y preferencias
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna izquierda */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Avatar y email */}
          <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl border border-gray-300 dark:border-gray-800 p-6 text-center">
            <div className="size-20 bg-green-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
              {(profile?.full_name ?? user.email ?? "U")[0].toUpperCase()}
            </div>
            <p className="font-semibold text-gray-900 dark:text-white text-lg">
              {profile?.full_name ?? "Sin nombre"}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 truncate">
              {user.email}
            </p>
            {profile?.phone && (
              <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                📱 {profile.phone}
              </p>
            )}
          </div>

          {/* Links rápidos */}
          <div className="flex flex-col gap-3">
            {quickLinks.map(({ href, icon: Icon, label, desc }) => (
              <Link
                key={href}
                href={href}
                className="bg-gray-100 dark:bg-gray-900 rounded-2xl border border-gray-300 dark:border-gray-800 p-4 flex items-center gap-4 hover:border-green-300 dark:hover:border-green-700 hover:shadow-sm transition-all"
              >
                <div className="size-10 bg-green-100 border border-green-300 dark:border-green-800 dark:bg-green-950/30 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="size-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">
                    {label}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Puntos de fidelización */}
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2 text-sm">
              <Award className="size-4 text-green-600" />
              Programa de fidelización
            </h2>
            <LoyaltyCard />
          </div>
        </div>

        {/* Columna derecha */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Datos personales */}
          <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl border border-gray-300 dark:border-gray-800 p-6">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
              <User className="size-4 text-green-600" />
              Datos personales
            </h2>
            <ProfileForm profile={profile as Profile} />
          </div>

          {/* Cambiar contraseña */}
          <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl border border-gray-300 dark:border-gray-800 p-6">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
              <Lock className="size-4 text-green-600" />
              Cambiar contraseña
            </h2>
            <ChangePasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
}
