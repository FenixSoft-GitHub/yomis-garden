"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { BlogPost } from "@/lib/types";

interface BlogPostFormProps {
  initialData?: Partial<BlogPost>;
}

export default function BlogPostForm({ initialData }: BlogPostFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isEditing = !!initialData?.id;

  const [form, setForm] = useState({
    title: initialData?.title ?? "",
    slug: initialData?.slug ?? "",
    excerpt: initialData?.excerpt ?? "",
    content: initialData?.content ?? "",
    cover_image: initialData?.cover_image ?? "",
    category: initialData?.category ?? "cuidados",
    tags: initialData?.tags?.join(", ") ?? "",
    is_published: initialData?.is_published ?? false,
  });

  const handleTitleChange = (value: string) => {
    const slug = value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim();
    setForm((prev) => ({ ...prev, title: value, slug }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...form,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      ...(isEditing ? { id: initialData?.id } : {}),
    };

    const res = await fetch("/api/admin/blog", {
      method: isEditing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      toast.success(isEditing ? "Artículo actualizado" : "Artículo creado");
      router.push("/admin/blog");
      router.refresh();
    } else {
      toast.error("Error al guardar");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 flex flex-col gap-4">
        <div>
          <Label className="text-gray-300">Título</Label>
          <Input
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Cómo cuidar tus suculentas en verano"
            className="mt-1 bg-gray-800 border-gray-700 text-white"
            required
          />
        </div>
        <div>
          <Label className="text-gray-300">Slug</Label>
          <Input
            value={form.slug}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, slug: e.target.value }))
            }
            className="mt-1 bg-gray-800 border-gray-700 text-white font-mono text-sm"
            required
          />
        </div>
        <div>
          <Label className="text-gray-300">Categoría</Label>
          <select
            value={form.category}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                category: e.target.value as BlogPost["category"],
              }))
            }
            className="mt-1 w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm rounded-md"
          >
            <option value="cuidados">🌱 Cuidados</option>
            <option value="paisajismo">🏡 Paisajismo</option>
            <option value="consejos">💡 Consejos</option>
            <option value="noticias">📰 Noticias</option>
          </select>
        </div>
        <div>
          <Label className="text-gray-300">Imagen de portada (URL)</Label>
          <Input
            value={form.cover_image}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, cover_image: e.target.value }))
            }
            placeholder="https://..."
            className="mt-1 bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <div>
          <Label className="text-gray-300">Resumen breve</Label>
          <textarea
            value={form.excerpt}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, excerpt: e.target.value }))
            }
            rows={2}
            className="mt-1 w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm rounded-md resize-none"
          />
        </div>
        <div>
          <Label className="text-gray-300">Contenido (HTML permitido)</Label>
          <textarea
            value={form.content}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, content: e.target.value }))
            }
            rows={12}
            placeholder="<p>Escribe el contenido del artículo aquí...</p>"
            className="mt-1 w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm rounded-md font-mono"
            required
          />
        </div>
        <div>
          <Label className="text-gray-300">Tags (separados por coma)</Label>
          <Input
            value={form.tags}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, tags: e.target.value }))
            }
            placeholder="suculentas, riego, verano"
            className="mt-1 bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.is_published}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, is_published: e.target.checked }))
            }
            className="w-4 h-4 accent-green-500"
          />
          <span className="text-gray-300 text-sm">Publicar inmediatamente</span>
        </label>
      </div>

      <div className="flex items-center gap-3">
        <Button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : isEditing ? (
            "Actualizar"
          ) : (
            "Crear artículo"
          )}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.back()}
          className="text-gray-400"
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
