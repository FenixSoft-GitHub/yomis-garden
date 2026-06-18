export default function CatalogoLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse mb-2" />
        <div className="h-4 w-32 bg-gray-100 dark:bg-gray-700 rounded-xl animate-pulse" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Skeleton filtros */}
        <div className="lg:w-56 shrink-0 hidden lg:flex flex-col gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-32 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse"
            />
          ))}
        </div>

        {/* Skeleton productos */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden"
            >
              <div className="aspect-square bg-gray-100 dark:bg-gray-800 animate-pulse" />
              <div className="p-4 flex flex-col gap-3">
                <div className="h-3 w-20 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
                <div className="h-5 w-36 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="flex gap-2">
                  <div className="h-6 w-20 bg-gray-100 dark:bg-gray-800 rounded-full animate-pulse" />
                  <div className="h-6 w-20 bg-gray-100 dark:bg-gray-800 rounded-full animate-pulse" />
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-50 dark:border-gray-800">
                  <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-8 w-8 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
