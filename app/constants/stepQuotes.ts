import { Leaf, TreePine, Building2, Calendar } from "lucide-react";

export const stepQuotes = [
  {
    step: "01",
    title: "Solicita tu cotización",
    desc: "Llena el formulario con los detalles de tu proyecto. Es gratis y sin compromiso.",
  },
  {
    step: "02",
    title: "Nos contactamos",
    desc: "En menos de 24 horas te contactamos para conocer mejor tus necesidades.",
  },
  {
    step: "03",
    title: "Recibe tu propuesta",
    desc: "Te enviamos un diseño y presupuesto detallado adaptado a tu espacio.",
  },
];

export const projectTypes = [
  {
    icon: Leaf,
    title: "Residencial",
    desc: "Jardines y terrazas para hogares",
    color:
      "bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400",
  },
  {
    icon: Building2,
    title: "Comercial",
    desc: "Lobbies, oficinas y locales",
    color: "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400",
  },
  {
    icon: TreePine,
    title: "Corporativo",
    desc: "Grandes espacios empresariales",
    color:
      "bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-400",
  },
  {
    icon: Calendar,
    title: "Eventos",
    desc: "Decoración floral para eventos",
    color:
      "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400",
  },
];
