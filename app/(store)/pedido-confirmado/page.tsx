import { CheckCircle, Leaf, XCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PageProps {
  searchParams: Promise<{
    order?: string;
    payment?: string;
    cancelled?: string;
  }>;
}

export default async function PedidoConfirmadoPage({
  searchParams,
}: PageProps) {
  const { order, payment, cancelled } = await searchParams;

  if (cancelled) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="size-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="size-12 text-red-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Pago cancelado
        </h1>
        <p className="text-gray-500 mb-8">
          Tu pedido fue creado pero el pago no se completó. Puedes intentarlo de
          nuevo.
        </p>
        <Link href="/checkout">
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            Volver al checkout
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="size-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="size-12 text-green-600" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
        ¡Pedido confirmado!
      </h1>
      {order && (
        <p className="text-green-600 font-mono font-semibold text-lg mb-3">
          {order}
        </p>
      )}
      {payment === "success" && (
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-4 inline-block">
          <p className="text-green-700 text-sm font-medium">
            ✅ Pago con tarjeta procesado exitosamente
          </p>
        </div>
      )}
      <p className="text-gray-500 mb-2">
        Gracias por tu compra. Nos pondremos en contacto contigo pronto para
        coordinar el envío.
      </p>
      <p className="text-gray-400 text-sm mb-10">
        Revisa tu email para los detalles del pedido.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/catalogo">
          <Button className="bg-green-600 hover:bg-green-700 text-white gap-2">
            <Leaf className="w-4 h-4" />
            Seguir comprando
          </Button>
        </Link>
        <Link href="/mis-pedidos">
          <Button
            variant="outline"
            className="border-green-600 text-green-700 gap-2"
          >
            Ver mis pedidos
          </Button>
        </Link>
      </div>
    </div>
  );
}
