import { CheckCircle, Leaf, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PageProps {
  searchParams: Promise<{ order?: string }>;
}

export default async function PedidoConfirmadoPage({
  searchParams,
}: PageProps) {
  const { order } = await searchParams;

  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="size-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="size-12 text-green-600" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-3">
        ¡Pedido confirmado!
      </h1>
      {order && (
        <p className="text-green-600 font-mono font-semibold text-lg mb-3">
          {order}
        </p>
      )}
      <p className="text-gray-500 mb-2">
        Gracias por tu compra. Nos pondremos en contacto contigo pronto para
        coordinar el envío y confirmar el pago.
      </p>
      <p className="text-gray-400 text-sm mb-10">
        Revisa tu email para los detalles del pedido.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/catalogo">
          <Button className="bg-green-600 hover:bg-green-700 text-white gap-2">
            <Leaf className="size-4" />
            Seguir comprando
          </Button>
        </Link>
      </div>
    </div>
  );
}
