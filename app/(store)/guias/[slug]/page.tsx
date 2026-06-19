import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import Link from "next/link";
import { ChevronLeft, Calendar, User, Leaf } from "lucide-react";
import type { BlogPost } from "@/lib/types";
import ShareButtons from "@/components/store/ShareButtons";
import Image from "next/image";

const categoryLabels: Record<string, string> = {
  cuidados: "🌱 Cuidados",
  paisajismo: "🏡 Paisajismo",
  consejos: "💡 Consejos",
  noticias: "📰 Noticias",
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  return data as BlogPost | null;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return { title: "Artículo no encontrado" };

  return {
    title: post.title,
    description: post.excerpt ?? post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? post.title,
      images: post.cover_image ? [{ url: post.cover_image }] : [],
      type: "article",
    },
  };
}

export default async function GuiaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  // Incrementar vistas (fire and forget)
  const adminSupabase = createAdminClient();
  adminSupabase
    .from("blog_posts")
    .update({ views: post.views + 1 })
    .eq("id", post.id)
    .then(() => {});

  const postUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? "https://yomis-garden.vercel.app"}/guias/${post.slug}`;

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <Link
        href="/guias"
        className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-400 mb-8 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> Volver a guías
      </Link>

      {/* Header */}
      <div className="mb-8">
        <span className="text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 px-3 py-1 rounded-lg">
          {categoryLabels[post.category]}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-4 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-400 dark:text-gray-500">
          <span className="flex items-center gap-1">
            <User className="w-3 h-3" /> {post.author_name}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(post.created_at).toLocaleDateString("es-VE", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Imagen de portada */}
      {post.cover_image && (
        <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden mb-8">
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
            loading="eager"
            className="object-cover"
          />
        </div>
      )}

      {/* Contenido */}
      <div
        className="prose prose-green dark:prose-invert max-w-none prose-headings:font-bold prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-p:leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-3 py-1 rounded-lg"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Compartir */}
      <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
        <ShareButtons productName={post.title} productUrl={postUrl} price={0} />
      </div>

      {/* CTA */}
      <div className="mt-10 bg-green-50 dark:bg-green-950/20 rounded-2xl p-6 border border-green-100 dark:border-green-900/30 text-center">
        <Leaf className="w-8 h-8 text-green-600 mx-auto mb-3" />
        <p className="font-semibold text-gray-900 dark:text-white mb-2">
          ¿Listo para aplicar estos consejos?
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Encuentra todo lo que necesitas en nuestro catálogo
        </p>
        <Link
          href="/catalogo"
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors"
        >
          Ver catálogo
        </Link>
      </div>
    </article>
  );
}
