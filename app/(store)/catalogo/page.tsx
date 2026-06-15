import { Suspense } from "react";
import { getProducts } from "@/lib/hooks/useProducts";
import ProductCard from "@/components/store/ProductCard";
import FilterPanel from "@/components/store/FilterPanel";
// import { Skeleton } from "@/components/ui/skeleton";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function CatalogoPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const products = await getProducts({
    categoria: params.categoria,
    luz: params.luz,
    riego: params.riego,
    pet_friendly: params.pet_friendly === "1",
    interior: params.interior === "1",
    dificultad: params.dificultad,
    busqueda: params.busqueda,
  });

  const titulo = params.categoria
    ? params.categoria.charAt(0).toUpperCase() +
      params.categoria.slice(1).replace(/-/g, " ")
    : "Todo el catálogo";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {titulo}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          {products.length} productos encontrados
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filtros */}
        <div className="lg:w-56 shrink-0">
          <Suspense>
            <FilterPanel />
          </Suspense>
        </div>

        {/* Grid de productos */}
        <div className="flex-1">
          {products.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg">
                No se encontraron productos con esos filtros.
              </p>
              <p className="text-sm mt-2">
                Intenta cambiar o limpiar los filtros.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
