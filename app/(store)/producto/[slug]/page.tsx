import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/hooks/useProducts";
import ProductDetail from "@/components/store/ProductDetail";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductoPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return <ProductDetail product={product} />;
}
