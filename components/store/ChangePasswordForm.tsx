"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function ChangePasswordForm() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (password !== confirm) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      toast.error("Error al cambiar la contraseña");
    } else {
      toast.success("Contraseña actualizada correctamente 🌿");
      setPassword("");
      setConfirm("");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <Label className="text-gray-700 dark:text-gray-300">
          Nueva contraseña
        </Label>
        <div className="relative mt-1">
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mínimo 6 caracteres"
            className="pr-10"
            required
            minLength={6}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
      </div>
      <div>
        <Label className="text-gray-700 dark:text-gray-300">
          Confirmar contraseña
        </Label>
        <Input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Repite la contraseña"
          className="mt-1"
          required
        />
        {confirm && password !== confirm && (
          <p className="text-red-500 text-xs mt-1">
            Las contraseñas no coinciden
          </p>
        )}
      </div>
      <Button
        type="submit"
        disabled={loading || !password || !confirm}
        className="bg-green-600 hover:bg-green-700 text-white gap-2 self-start"
      >
        {loading ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Actualizando...
          </>
        ) : (
          "Cambiar contraseña"
        )}
      </Button>
    </form>
  );
}
