import { createAdminClient } from "@/lib/supabase/admin";
import { notFound } from "next/navigation";
import BlogPostForm from "@/components/admin/BlogPostForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditarArticuloPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = createAdminClient();

  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (!post) notFound();

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Editar artículo</h1>
        <p className="text-gray-400 text-sm mt-1">{post.title}</p>
      </div>
      <BlogPostForm initialData={post} />
    </div>
  );
}
