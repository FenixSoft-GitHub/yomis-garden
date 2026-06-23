import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  searchParams: Record<string, string | undefined>;
}

function buildHref(
  searchParams: Record<string, string | undefined>,
  page: number,
) {
  const sp = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (key === "page") return;
    if (value !== undefined && value !== "") sp.set(key, value);
  });
  if (page > 1) sp.set("page", String(page));
  const qs = sp.toString();
  return qs ? `/catalogo?${qs}` : "/catalogo";
}

function getPageRange(current: number, total: number): (number | "...")[] {
  const delta = 1;
  const range: (number | "...")[] = [];
  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);

  range.push(1);
  if (left > 2) range.push("...");
  for (let i = left; i <= right; i++) range.push(i);
  if (right < total - 1) range.push("...");
  if (total > 1) range.push(total);

  return range;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  searchParams,
}: PaginationControlsProps) {
  if (totalPages <= 1) return null;

  const pages = getPageRange(currentPage, totalPages);

  const linkBase =
    "px-4 h-9 rounded-lg text-sm font-medium border transition-colors flex flex-row justify-center items-center gap-1";
  const linkInactive =
    "border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800";
  const linkDisabled =
    "pointer-events-none opacity-40 border-gray-200 dark:border-gray-700";

  return (
    <nav
      aria-label="Paginación"
      className="flex items-center justify-center gap-2 flex-wrap"
    >
      <Link
        href={buildHref(searchParams, currentPage - 1)}
        aria-disabled={currentPage === 1}
        className={`${linkBase} px-2.5 md:px-4 ${currentPage === 1 ? linkDisabled : linkInactive} `}
      >
        <ChevronLeft className="size-4" />
        <span className="hidden md:inline">Anterior</span>
      </Link>

      <div className="flex items-center justify-center gap-1.5 flex-wrap">
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`dots-${i}`} className="px-2 text-gray-400">
              …
            </span>
          ) : (
            <Link
              key={p}
              href={buildHref(searchParams, p)}
              aria-current={p === currentPage ? "page" : undefined}
              className={`${linkBase} ${
                p === currentPage
                  ? "bg-green-600 text-white border-green-600"
                  : linkInactive
              }`}
            >
              {p}
            </Link>
          ),
        )}
      </div>

      <Link
        href={buildHref(searchParams, currentPage + 1)}
        aria-disabled={currentPage === totalPages}
        className={`${linkBase} px-2.5 md:px-4 ${currentPage === totalPages ? linkDisabled : linkInactive}`}
      >
        <span className="hidden md:inline">Siguiente</span>
        <ChevronRight className="size-4" />
      </Link>
    </nav>
  );
}
