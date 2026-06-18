export default function ProductoLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="size-20 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
            {i < 3 && <span className="text-gray-300">/</span>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Imagen skeleton */}
        <div className="flex flex-col gap-4">
          <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse" />
          <div className="flex gap-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="size-20 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Info skeleton */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="size-24 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
            <div className="size-64 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
          </div>
          <div className="size-32 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
          <div className="size-48 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="size-24 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse"
              />
            ))}
          </div>
          <div className="h-12 w-full bg-green-100 dark:bg-green-900/30 rounded-xl animate-pulse" />
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-5">
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
