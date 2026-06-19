import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Leaf, Calendar, ArrowRight, BookOpen } from "lucide-react";
import type { BlogPost } from "@/lib/types";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Guías de cuidado — Yomi's Garden",
  description:
    "Consejos de jardinería, cuidado de plantas y tips de paisajismo escritos por expertos. Aprende a cuidar tus plantas como un profesional.",
};

const categoryLabels: Record<string, { label: string; color: string }> = {
  cuidados: {
    label: "🌱 Cuidados",
    color:
      "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400",
  },
  paisajismo: {
    label: "🏡 Paisajismo",
    color: "bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400",
  },
  consejos: {
    label: "💡 Consejos",
    color:
      "bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400",
  },
  noticias: {
    label: "📰 Noticias",
    color:
      "bg-purple-100 dark:bg-purple-950/30 text-purple-700 dark:text-purple-400",
  },
};

interface PageProps {
  searchParams: Promise<{ categoria?: string }>;
}

export default async function GuiasPage({ searchParams }: PageProps) {
  const { categoria } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (categoria) {
    query = query.eq("category", categoria);
  }

  const { data } = await query;
  const posts = (data as BlogPost[]) ?? [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400 text-sm font-medium px-4 py-2 rounded-full mb-4">
          <BookOpen className="w-4 h-4" />
          Centro de aprendizaje
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Guías de cuidado
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          Consejos prácticos para que tus plantas crezcan sanas y felices,
          escritos por nuestro equipo de expertos.
        </p>
      </div>

      {/* Filtro de categorías */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <Link
          href="/guias"
          className={`text-sm px-4 py-2 rounded-xl border transition-colors ${
            !categoria
              ? "bg-green-600 text-white border-green-600"
              : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-green-400"
          }`}
        >
          Todas
        </Link>
        {Object.entries(categoryLabels).map(([key, { label }]) => (
          <Link
            key={key}
            href={`/guias?categoria=${key}`}
            className={`text-sm px-4 py-2 rounded-xl border transition-colors ${
              categoria === key
                ? "bg-green-600 text-white border-green-600"
                : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-green-400"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Grid de artículos */}
      {posts.length === 0 ? (
        <div className="text-center py-20">
          <Leaf className="w-12 h-12 text-gray-200 dark:text-gray-700 mx-auto mb-4" />
          <p className="text-gray-400 dark:text-gray-500">
            Aún no hay artículos en esta categoría
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/guias/${post.slug}`}
              className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="relative aspect-video bg-linear-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900 overflow-hidden">
                {post.cover_image ? (
                  <Image
                    src={post.cover_image}
                    alt={`Portada del artículo: ${post.title}`}
                    fill
                    sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                    loading="eager"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Leaf className="size-16 text-green-300" />
                  </div>
                )}
              </div>
              <div className="p-5">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-lg ${categoryLabels[post.category]?.color}`}
                >
                  {categoryLabels[post.category]?.label}
                </span>
                <h2 className="font-bold text-gray-900 dark:text-white mt-3 mb-2 leading-snug group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.created_at).toLocaleDateString("es-VE", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1 text-green-600 dark:text-green-400 font-medium group-hover:gap-2 transition-all">
                    Leer más <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
