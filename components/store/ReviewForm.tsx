"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import StarRating from "./StarRating";

interface ReviewFormProps {
  productId: string;
  onSuccess?: () => void;
}

export default function ReviewForm({ productId, onSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Por favor selecciona una calificación");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error("Debes iniciar sesión para dejar una reseña");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("reviews").insert({
      product_id: productId,
      user_id: user.id,
      rating,
      title: title.trim() || null,
      body: body.trim() || null,
      is_approved: false,
    });

    if (error) {
      if (error.code === "23505") {
        toast.error("Ya dejaste una reseña para este producto");
      } else {
        toast.error("Error al enviar la reseña");
      }
    } else {
      toast.success("¡Reseña enviada! Será publicada después de revisión 🌿");
      setRating(0);
      setTitle("");
      setBody("");
      onSuccess?.();
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Calificación */}
      <div>
        <Label className="text-gray-700 dark:text-gray-300 mb-2 block">
          Calificación
        </Label>
        <StarRating
          rating={rating}
          interactive
          size="lg"
          onChange={setRating}
        />
      </div>

      {/* Título */}
      <div>
        <Label
          htmlFor="review-title"
          className="text-gray-700 dark:text-gray-300"
        >
          Título (opcional)
        </Label>
        <Input
          id="review-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Resumen de tu experiencia"
          className="mt-1"
          maxLength={100}
        />
      </div>

      {/* Cuerpo */}
      <div>
        <Label
          htmlFor="review-body"
          className="text-gray-700 dark:text-gray-300"
        >
          Tu reseña (opcional)
        </Label>
        <textarea
          id="review-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Cuéntanos tu experiencia con este producto..."
          rows={4}
          maxLength={500}
          className="mt-1 w-full border border-input bg-background px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-none dark:bg-gray-800 dark:border-gray-700"
        />
        <p className="text-xs text-gray-400 mt-1">{body.length}/500</p>
      </div>

      <Button
        type="submit"
        disabled={loading || rating === 0}
        className="bg-green-600 hover:bg-green-700 text-white self-start"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" /> Enviando...
          </>
        ) : (
          "Enviar reseña"
        )}
      </Button>
    </form>
  );
}
