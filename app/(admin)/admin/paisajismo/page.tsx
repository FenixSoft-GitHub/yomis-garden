import { createAdminClient } from "@/lib/supabase/admin";
import QuotesAdmin from "@/components/admin/QuotesAdmin";

export default async function PaisajismoAdminPage() {
  const supabase = createAdminClient();

  const { data: quotes } = await supabase
    .from("landscaping_quotes")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Cotizaciones de paisajismo
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          {quotes?.length ?? 0} solicitudes en total
        </p>
      </div>
      <QuotesAdmin quotes={quotes ?? []} />
    </div>
  );
}
