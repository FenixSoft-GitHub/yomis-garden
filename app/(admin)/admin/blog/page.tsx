import { createAdminClient } from "@/lib/supabase/admin";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlogPostsTable from "@/components/admin/BlogPostsTable";

export default async function BlogAdminPage() {
  const supabase = createAdminClient();

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Guías de cuidado</h1>
          <p className="text-gray-400 text-sm mt-1">
            {posts?.length ?? 0} artículos en total
          </p>
        </div>
        <Link href="/admin/blog/nuevo">
          <Button className="bg-green-600 hover:bg-green-700 text-white gap-2">
            <Plus className="w-4 h-4" />
            Nuevo artículo
          </Button>
        </Link>
      </div>
      <BlogPostsTable posts={posts ?? []} />
    </div>
  );
}
