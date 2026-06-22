import { Leaf } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="size-16 rounded-full border-4 border-green-100 dark:border-green-900 border-t-green-600 animate-spin" />
          <Leaf className="size-6 text-green-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <p className="text-sm text-gray-400 dark:text-gray-500 animate-pulse">
          Cargando Yomi&apos;s Garden...
        </p>
      </div>
    </div>
  );
}
