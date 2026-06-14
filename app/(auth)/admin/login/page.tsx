import LoginForm from "@/components/admin/LoginForm";
import Logo from "@/components/layout/Logo";
import { Leaf } from "lucide-react";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-green-400 font-bold text-2xl mb-2">
            <Logo />
            <Leaf className="size-6" />
            <span>
              Yomi&apos;s <span className="text-stone-600">Garden</span>
            </span>
          </div>
          <p className="text-gray-400 text-sm">Panel de Administración</p>
        </div>
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8">
          <h1 className="text-xl font-bold text-white mb-6">Iniciar sesión</h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
