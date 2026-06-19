import BlogPostForm from "@/components/admin/BlogPostForm";

export default function NuevoArticuloPage() {
  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Nuevo artículo</h1>
        <p className="text-gray-400 text-sm mt-1">
          Crea una nueva guía de cuidado
        </p>
      </div>
      <BlogPostForm />
    </div>
  );
}
