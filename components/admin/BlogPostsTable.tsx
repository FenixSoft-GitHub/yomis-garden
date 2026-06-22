"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import type { BlogPost } from "@/lib/types";

const categoryLabels: Record<string, string> = {
  cuidados: "🌱 Cuidados",
  paisajismo: "🏡 Paisajismo",
  consejos: "💡 Consejos",
  noticias: "📰 Noticias",
};

export default function BlogPostsTable({
  posts: initial,
}: {
  posts: BlogPost[];
}) {
  const [posts, setPosts] = useState(initial);

  const togglePublish = async (id: string, current: boolean) => {
    const res = await fetch("/api/admin/blog", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, is_published: !current }),
    });

    if (res.ok) {
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, is_published: !current } : p)),
      );
      toast.success(current ? "Despublicado" : "Publicado");
    } else {
      toast.error("Error al actualizar");
    }
  };

  const deletePost = async (id: string) => {
    const res = await fetch("/api/admin/blog", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Artículo eliminado");
    } else {
      toast.error("Error al eliminar");
    }
  };

  if (posts.length === 0) {
    return (
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-12 text-center">
        <p className="text-gray-400">No hay artículos aún</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-800">
            <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">
              Título
            </th>
            <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">
              Categoría
            </th>
            <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">
              Vistas
            </th>
            <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">
              Estado
            </th>
            <th className="px-6 py-4" />
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr
              key={post.id}
              className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
            >
              <td className="px-6 py-4">
                <p className="text-white font-medium text-sm">{post.title}</p>
                <p className="text-gray-500 text-xs font-mono">{post.slug}</p>
              </td>
              <td className="px-6 py-4">
                <span className="text-gray-300 text-sm">
                  {categoryLabels[post.category]}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="text-gray-300 text-sm">{post.views}</span>
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => togglePublish(post.id, post.is_published)}
                  className={`flex items-center gap-1.5 text-xs px-3 py-1 rounded-lg font-medium border transition-colors ${
                    post.is_published
                      ? "bg-green-900 text-green-400 border-green-800"
                      : "bg-gray-800 text-gray-500 border-gray-700"
                  }`}
                >
                  {post.is_published ? (
                    <Eye className="size-3" />
                  ) : (
                    <EyeOff className="size-3" />
                  )}
                  {post.is_published ? "Publicado" : "Borrador"}
                </button>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <Link
                    href={`/admin/blog/${post.id}/editar`}
                    className="text-gray-400 hover:text-white"
                  >
                    <Pencil className="size-4" />
                  </Link>
                  <button
                    onClick={() => deletePost(post.id)}
                    className="text-gray-400 hover:text-red-400"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
