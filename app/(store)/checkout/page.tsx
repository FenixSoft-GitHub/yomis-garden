import CheckoutForm from "@/components/store/CheckoutForm";

export default function CheckoutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Finalizar pedido
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Completa tus datos para procesar el pedido
        </p>
      </div>
      <CheckoutForm />
    </div>
  );
}
