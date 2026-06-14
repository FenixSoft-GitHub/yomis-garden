import {
  CreditCard,
  Smartphone,
  DollarSign,
} from "lucide-react";

export const paymentMethods = [
  {
    value: "zelle",
    label: "Zelle",
    icon: DollarSign,
    desc: "Transferencia desde USA",
  },
  {
    value: "pago_movil",
    label: "Pago Móvil",
    icon: Smartphone,
    desc: "Bancamóvil Venezuela",
  },
  {
    value: "stripe",
    label: "Tarjeta",
    icon: CreditCard,
    desc: "Visa / Mastercard",
  },
];
