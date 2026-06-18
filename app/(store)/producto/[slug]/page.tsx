import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, getProducts } from "@/lib/hooks/useProducts";
import ProductDetail from "@/components/store/ProductDetail";
import RelatedProducts from "@/components/store/RelatedProducts";
import ReviewList from "@/components/store/ReviewList";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Producto no encontrado",
    };
  }

  const description =
    product.description ??
    `Compra ${product.name} en Yomi's Garden. ${product.category?.name ?? "Plantas y accesorios"} de calidad con envío a toda Venezuela.`;

  return {
    title: product.name,
    description,
    keywords: [
      product.name,
      product.category?.name ?? "",
      "vivero Venezuela",
      "plantas Venezuela",
      "comprar plantas",
      ...(product.tags ?? []),
    ].filter(Boolean),
    openGraph: {
      title: `${product.name} — Yomi's Garden`,
      description,
      images: product.images?.[0]
        ? [{ url: product.images[0], alt: product.name }]
        : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} — Yomi's Garden`,
      description,
      images: product.images?.[0] ? [product.images[0]] : [],
    },
  };
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductoPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <div>
      <ProductDetail product={product} />

      {/* Productos relacionados */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RelatedProducts
          productId={product.id}
          categoryId={product.category_id}
        />

        {/* Reseñas */}
        <div className="mt-16 border-t border-gray-100 dark:border-gray-800 pt-12 pb-16">
          <ReviewList productId={product.id} />
        </div>
      </div>
    </div>
  );
}